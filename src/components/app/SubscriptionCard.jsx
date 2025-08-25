import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Clock, DollarSign, Star, Users } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '@/utils/getProgram';
import { getEscrowPDA } from '@/utils/getEscrowPda';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { BN } from 'bn.js';
import { getSubscriptionPDA } from '@/utils/getSubscriptionPda';
import * as anchor from "@coral-xyz/anchor";

const SubscriptionCard = ({ fetchSubscriptions, subscription, services }) => {
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [joinerEmail, setJoinerEmail] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const wallet = useAnchorWallet();

  const handleJoinSubscription = () => {
    if (subscription.remainingSlots > 0 && wallet) {
      setShowJoinDialog(true);
    } else if (!wallet) {
      toast.info('Please connect your wallet to join!', { id: 'join-toast' });
    } else {
      toast.info('No available slots to join!', { id: 'join-toast' });
    }
  };

  const handleJoin = async () => {
    const id = toast.loading('Joining subscription...');
    if (!joinerEmail) {
      toast.info('Please enter an email to join', { id });
      return;
    }

    if (!wallet || !subscription.id) {
      toast.error('Wallet or subscription data missing', { id });
      return;
    }

    setIsJoining(true);
    try {
      const program = getProgram(wallet);
      const [subscriptionPda] = getSubscriptionPDA(
        new anchor.web3.PublicKey(subscription.creator), 
        subscription.id, 
        program.programId
      );
      const [escrowPda] = getEscrowPDA(subscriptionPda, program.programId);


      const tx = await program.methods
        .joinSubscription(
          new BN(subscription.id, 16),
          new anchor.web3.PublicKey(subscription.creator),
          joinerEmail.trim(),
        )
        .accounts({
          joiner: wallet.publicKey,
          subscription: subscriptionPda,
          escrow: escrowPda,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
  .transaction(); // 👈 build but don’t send

// ✅ Manually send with fresh blockhash
const { blockhash, lastValidBlockHeight } =
  await program.provider.connection.getLatestBlockhash();

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


      console.log('Join transaction signature:', tx);
      const updatedSub = await program.account.subscription.fetch(subscriptionPda);
      console.log('Subscription after join:', updatedSub);
      toast.success('Joined subscription successfully!', { id });

      // Update local state or refresh subscriptions (if parent provides a callback)
      setJoinerEmail('');
      setShowJoinDialog(false);
      fetchSubscriptions();
      
    } catch (error) {
      console.error('Error joining subscription:', error);

      let errorMsg = 'Failed to join subscription';

      // Anchor errors often have `error.error.errorMessage`
      if (error.error?.errorMessage) {
        errorMsg = error.error.errorMessage;
      } else if (error.message) {
        errorMsg = error.message;
      }

      toast.error(errorMsg, { id });
    } finally {
      setIsJoining(false);
      setShowJoinDialog(false);
    }
  };

  return (
    <Card
      key={subscription.id}
      className="bg-zinc-800 border-zinc-700 hover:border-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/10"
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
            <img
              src={services[subscription.service]?.image}
              alt={subscription.service}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-zinc-300 text-sm">{services[subscription.service]?.rating || 0}</span>
          </div>
        </div>
        <CardTitle className="text-white text-lg">{subscription.service}</CardTitle>
        <CardDescription className="text-zinc-400">
          {services[subscription.service]?.description || 'No description available'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-zinc-700 text-zinc-300">
            {services[subscription.service]?.category || 'Uncategorized'}
          </Badge>
          <div className="flex items-center gap-1" style={{ color: '#efe000' }}>
            <DollarSign className="w-4 h-4" />
            <span className="font-bold">${subscription.pricePerSlot}</span>
            <span className="text-zinc-400 text-sm">/month</span>
          </div>
        </div>

        <Separator className="bg-zinc-700" />

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <Users className="w-4 h-4" />
              <span>Total Slots:</span>
            </div>
            <span className="text-white font-medium">{subscription.totalSlots}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <Clock className="w-4 h-4" />
              <span>Available:</span>
            </div>
            <Badge
              variant={subscription.remainingSlots > 0 ? 'default' : 'destructive'}
              className={subscription.remainingSlots > 0 ? 'bg-zinc-900 text-zinc-300 font-medium' : ''}
              style={subscription.remainingSlots > 0 ? { border: 'none' } : {}}
            >
              {subscription.remainingSlots} slots
            </Badge>
          </div>

          <div className="w-full bg-zinc-700 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((subscription.totalSlots - subscription.remainingSlots) / subscription.totalSlots) * 100}%`,
                backgroundColor: '#efe000',
              }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-zinc-400 text-sm font-medium">Features:</p>
          <ul className="text-zinc-300 text-xs space-y-1">
            {services[subscription.service]?.features?.slice(0, 3)?.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#efe000' }}></div>
                {feature}
              </li>
            )) || <li>No features available</li>}
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full font-medium transition-all duration-200"
          disabled={subscription.remainingSlots === 0 || !wallet}
          variant={subscription.remainingSlots === 0 || !wallet ? 'secondary' : 'default'}
          style={
            subscription.remainingSlots > 0 && wallet
              ? { backgroundColor: '#efe000', color: '#000', border: 'none' }
              : {}
          }
          onMouseEnter={(e) => {
            if (subscription.remainingSlots > 0 && wallet) {
              e.target.style.backgroundColor = '#d4c700';
            }
          }}
          onMouseLeave={(e) => {
            if (subscription.remainingSlots > 0 && wallet) {
              e.target.style.backgroundColor = '#efe000';
            }
          }}
          onClick={handleJoinSubscription}
        >
          {subscription.remainingSlots === 0
            ? 'Full'
            : !wallet
            ? 'Connect Wallet'
            : 'Join Subscription'}
        </Button>
      </CardFooter>

      {/* Join Subscription Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle>Join Subscription</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter your email to join the {subscription.service} subscription.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="joiner-email" className="text-right text-zinc-300">
                Your Email
              </Label>
              <Input
                id="joiner-email"
                type="email"
                value={joinerEmail}
                onChange={(e) => setJoinerEmail(e.target.value)}
                className="col-span-3 bg-zinc-700 border-zinc-600 text-white"
                placeholder="Enter your email address"
                disabled={isJoining}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleJoin}
              className="font-medium transition-all duration-200"
              style={{
                backgroundColor: '#efe000',
                color: '#000',
                border: 'none',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#d4c700')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#efe000')}
              disabled={isJoining}
            >
              {isJoining ? 'Joining...' : 'Join Now'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SubscriptionCard;