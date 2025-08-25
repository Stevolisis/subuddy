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
import { CheckCircle, CreditCard, DollarSign, User, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '@/utils/getProgram';
import { getSubscriptionPDA } from '@/utils/getSubscriptionPda';
import { getEscrowPDA } from '@/utils/getEscrowPda';
import { BN } from 'bn.js';
import { toast } from 'sonner';
import * as anchor from "@coral-xyz/anchor";

const JoinedSubscriptionCard = ({ subscription, services, fetchSubscriptions }) => {
  const status = ['Open', 'Filled', 'Confirmed', 'Completed', 'Refunded'];
  const wallet = useAnchorWallet();
  const yourSlot = (subscription.joiners || []).findIndex(
    (j) => j.wallet?.toString() === wallet.publicKey?.toString()
  ) + 1;
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmSubscription = () => {
    if (wallet) {
      setShowConfirmDialog(true);
    } else {
      toast.info('Please connect your wallet to confirm the subscription!', {
        id: 'confirm-toast',
      });
    }
  };

  const handleConfirm = async () => {
    const id = toast.loading('Confirming subscription...');
    if (!wallet || !subscription.id) {
      toast.error('Wallet or subscription data missing', { id });
      return;
    }

    setIsConfirming(true);
    try {
      const program = getProgram(wallet);
      const [subscriptionPda] = getSubscriptionPDA(
        new anchor.web3.PublicKey(subscription.creator),
        subscription.id,
        program.programId
      );
      const [escrowPda] = getEscrowPDA(subscriptionPda, program.programId);

      const tx = await program.methods
        .confirmInvite(
          new BN(subscription.id, 16),
          new anchor.web3.PublicKey(subscription.creator)
        )
        .accounts({
          joiner: wallet.publicKey,
          subscription: subscriptionPda,
          escrow: escrowPda,
        })
        .rpc();

      console.log('Confirm transaction signature:', tx);
      const updatedSub = await program.account.subscription.fetch(subscriptionPda);
      console.log('Subscription after confirm:', updatedSub);
      toast.success('Subscription confirmed successfully!', { id });

      setShowConfirmDialog(false);
      fetchSubscriptions();
    } catch (error) {
      console.error('Error joining subscription:', error);

      let errorMsg = 'Failed to confirm subscription';

      // Anchor errors often have `error.error.errorMessage`
      if (error.error?.errorMessage) {
        errorMsg = error.error.errorMessage;
      } else if (error.message) {
        errorMsg = error.message;
      }

      toast.error(errorMsg, { id });
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Card key={subscription.id} className="bg-zinc-700 border-zinc-600">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
              <img
                src={services[subscription?.service]?.image}
                alt={subscription.service}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl">{subscription.service}</h3>
              <p className="text-zinc-400 text-sm">{services[subscription?.service]?.description}</p>
              <p className="text-zinc-400 text-sm">
                Creator: {subscription.creator.slice(0, 9)}...{subscription.creator.slice(35, 44)}
              </p>
            </div>
          </div>
          <Badge
            className="ml-2"
            style={{
              backgroundColor:
                status[subscription.status] === 'Filled'
                  ? '#10b981'
                  : status[subscription.status] === 'Open'
                  ? '#f59e0b'
                  : '#ef4444',
              color: 'white',
            }}
          >
            {status[subscription.status]}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-zinc-400 text-sm">Slots filled</p>
              <p className="text-white font-medium">{subscription.filledSlots}/{subscription.totalSlots}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-zinc-400 text-sm">Your slot</p>
              <p className="text-white font-medium">#{yourSlot}</p>
            </div>
          </div>
        </div>

        {subscription.status === 1 && subscription.joiners?.some(
            j => j.wallet?.toString() === wallet.publicKey?.toString() && j.confirmed !== true
          ) && ( // Status 1 = Filled
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <h4 className="text-blue-400 font-medium">Confirm Subscription</h4>
            </div>
            <p className="text-zinc-300 text-sm mb-3">
              All slots are filled. Please confirm the subscription to release funds to the creator.
            </p>
            <Button
              onClick={handleConfirmSubscription}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm & Release Funds
            </Button>
          </div>
        )}

        { subscription.joiners?.some(
            j => j.wallet?.toString() === wallet.publicKey?.toString() && j.confirmed === true
          ) && ( // Status 2 = Confirmed
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-400 text-sm">Subscription active and confirmed</p>
            </div>
          </div>
        )}

        {/* Confirm Subscription Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Confirm Subscription</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Are you sure you have confirmed the invite to the {subscription.service} service with the creator?
                <br />
                <strong>Warning:</strong> By agreeing, funds will be released to the creator once all joiners confirm.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => setShowConfirmDialog(false)}
                variant="outline"
                className="text-zinc-300 bg-zinc-700 hover:bg-zinc-600 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-[#d4c700] text-black hover:bg-[#b3a300]"
                disabled={isConfirming}
              >
                {isConfirming ? 'Confirming...' : 'Yes, Confirm'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default JoinedSubscriptionCard;