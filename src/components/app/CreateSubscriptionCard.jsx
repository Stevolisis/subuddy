import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import {
  Bell,
  CheckCircle,
  CreditCard,
  DollarSign,
  Download,
  User,
  Users,
} from 'lucide-react';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '@/utils/getProgram';
import { getSubscriptionPDA } from '@/utils/getSubscriptionPda';
import { getEscrowPDA } from '@/utils/getEscrowPda';
import { BN } from 'bn.js';
import { toast } from 'sonner';
import * as anchor from "@coral-xyz/anchor";

const CreateSubscriptionCard = ({ subscription, services, fetchSubscriptions }) => {
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const wallet = useAnchorWallet();

  const handleWithdrawFunds = () => {
    if (wallet && wallet.publicKey.toString() === subscription.creator) {
      setShowWithdrawDialog(true);
    } else {
      toast.info('Only the creator can withdraw funds!', { id: 'withdraw-toast' });
    }
  };

  const handleConfirmWithdraw = async () => {
    const id = toast.loading('Withdrawing funds...');
    if (!wallet || !subscription.id) {
      toast.error('Wallet or subscription data missing', { id });
      return;
    }

    setIsWithdrawing(true);
    try {
      const program = getProgram(wallet);
      const [subscriptionPda] = getSubscriptionPDA(
        new anchor.web3.PublicKey(subscription.creator),
        subscription.id,
        program.programId
      );
      const [escrowPda] = getEscrowPDA(subscriptionPda, program.programId);

      const tx = await program.methods
        .creatorWithdraw(
          new BN(subscription.id, 16),
          new anchor.web3.PublicKey(wallet.publicKey)
        )
        .accounts({
          creator: wallet.publicKey,
          subscription: subscriptionPda,
          escrow: escrowPda,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .transaction(); // 👈 build but don’t send

      // ✅ Manually send with fresh blockhash
      const { blockhash, lastValidBlockHeight } = await program.provider.connection.getLatestBlockhash();

      tx.recentBlockhash = blockhash;
      tx.feePayer = wallet.publicKey;

      const signed = await wallet.signTransaction(tx);
      const sig = await program.provider.connection.sendRawTransaction(signed.serialize(), {
        skipPreflight: false,
        preflightCommitment: "processed",
      });
      await program.provider.connection.confirmTransaction({
        signature: sig,
        blockhash,
        lastValidBlockHeight,
      });

      console.log('Withdraw transaction signature:', tx);
      const updatedSub = await program.account.subscription.fetch(subscriptionPda);
      console.log('Subscription after withdraw:', updatedSub);
      toast.success('Funds withdrawn successfully!', { id });

      setShowWithdrawDialog(false);
      fetchSubscriptions();

    } catch (error) {
      console.error('Failed to withdraw funds:', error);

      let errorMsg = 'Failed to withdraw funds';

      // Anchor errors often have `error.error.errorMessage`
      if (error.error?.errorMessage) {
        errorMsg = error.error.errorMessage;
      } else if (error.message) {
        errorMsg = error.message;
      }

      toast.error(errorMsg, { id });
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <Card key={subscription.id} className="bg-zinc-700 border-zinc-600">
      <CardContent className="p-6">
        <div className="flex justify-between items-start flex-wrap sm:flex-unwrap gap-y-5 sm:gap-y-0 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
              <img
                src={services[subscription?.service]?.image}
                alt={services[subscription.service]?.service}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl">{subscription.service}</h3>
              <p className="text-zinc-400 text-sm">{services[subscription.service]?.description}</p>
            </div>
          </div>
          {subscription.joiners.length === subscription.totalSlots && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-zinc-300 bg-blue-700 hover:bg-zinc-600 hover:text-white"
              >
                <Bell className="w-4 h-4 mr-1" />
                Send Invites
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-zinc-400 text-sm">Price per slot</p>
              <p className="text-white font-medium">${subscription.pricePerSlot}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-zinc-400 text-sm">Slots filled</p>
              <p className="text-white font-medium">{subscription.filledSlots}/{subscription.totalSlots}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-zinc-400 text-sm">Total revenue</p>
              <p className="text-white font-medium">${subscription.pricePerSlot * (subscription.totalSlots - subscription.remainingSlots)}</p>
            </div>
          </div>
          {subscription.joiners.length === subscription.totalSlots && (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-zinc-400 text-sm">Invites accepted</p>
                <p className="text-white font-medium">{subscription.invitesAccepted}</p>
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-zinc-600 my-4" />

        <div className="mb-4">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Users who joined:
          </h4>
          <div className="bg-zinc-800 rounded-lg p-3">
            {subscription.joiners && subscription.joiners.length > 0 ? (
              <div className="space-y-3">
                {subscription.joiners.map((user, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-zinc-700 rounded">
                    <div>
                      <p className="text-white text-sm">{user.email}</p>
                      <p className="text-zinc-400 text-xs">{user.wallet.slice(0, 9)}...{user.wallet.slice(35, 44)}</p>
                      <p className="text-zinc-400 text-xs">Confirmed: {user.confirmed ? 'True' : 'Pending...'}</p>
                    </div>
                    <Badge
                      variant={user.confirmed ? 'default' : 'secondary'}
                      className={user.confirmed ? 'bg-green-500' : 'bg-yellow-500'}
                    >
                      {user.confirmed ? 'Confirmed' : 'Not Confirmed'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-sm">No users have joined yet</p>
            )}
          </div>
        </div>

        {subscription.filledSlots === subscription.totalSlots && subscription.invitesAccepted === subscription.totalSlots && subscription.status !== 3 && (
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-yellow-400" />
              <h4 className="text-yellow-400 font-medium">Withdraw Funds</h4>
            </div>
            <p className="text-zinc-300 text-sm mb-3">
              All slots are filled and verified. You can now withdraw the funds.
            </p>
            <Button
              onClick={handleWithdrawFunds}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Withdraw ${subscription.pricePerSlot * subscription.filledSlots}
            </Button>
          </div>
        )}

        {subscription.filledSlots === subscription.totalSlots && subscription.status === 3 &&  (
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-400 text-sm">Funds successfully withdrawn</p>
            </div>
          </div>
        )}

        {/* Withdraw Funds Dialog */}
        <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
          <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Confirm Withdrawal</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Are you sure you want to withdraw ${subscription.pricePerSlot * subscription.filledSlots} from the {subscription.service} subscription?
                <br />
                <strong>Warning:</strong> This action will close the escrow and mark the subscription as completed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => setShowWithdrawDialog(false)}
                variant="outline"
                className="text-zinc-300 bg-zinc-700 hover:bg-zinc-600 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmWithdraw}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                disabled={isWithdrawing}
              >
                {isWithdrawing ? 'Withdrawing...' : 'Yes, Withdraw'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CreateSubscriptionCard;