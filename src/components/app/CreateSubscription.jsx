import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '@/utils/getProgram';
import { getSubscriptionPDA } from '@/utils/getSubscriptionPda';
import { getEscrowPDA } from '@/utils/getEscrowPda';
import { v4 as uuidv4 } from "uuid";
import * as anchor from "@coral-xyz/anchor";
import { toast } from 'sonner';


const CreateSubscription = ({fetchSubscriptions,setActiveTab}) => {
    const [email, setEmail] = useState('');
    const [pricePerSlot, setPricePerSlot] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [slots, setSlots] = useState(1);
    const wallet = useAnchorWallet();
    const { connected } = useAnchorWallet() || { connected: false };

    const googleServices = [
        "Google One",
        "Google One Premium",
        "YouTube Premium",
        "YouTube Music Premium",
        "Google Workspace",
        "Google Workspace Standard",
        "Google Play Pass",
        "Google Nest Aware",
        "Google Stadia Pro"
    ];

    
  const handleCreateSubscription = async() => {
    const id = toast.loading('Creating subscription...');
    if (!email || !selectedService || !pricePerSlot) {
      toast.info('Please fill all required fields', {id});
      return;
    }

    console.log('Wallet connected:', connected);
    console.log('Wallet:', wallet);
    if(!wallet) {
        toast.info('Please connect your wallet', {id});
        return;
    }
    if(pricePerSlot <= 0){
        toast.info('Price per slot must be greater than 0', {id});
        return;
    }

    try{
        const program = getProgram(wallet);
        const subscriptionId = uuidv4().replace(/-/g, "").slice(0, 9);
        const parsedPricePerSlot = parseFloat(pricePerSlot);
        console.log('Creating subscription with ID:', subscriptionId);

        const [subscriptionPda] = getSubscriptionPDA(wallet.publicKey, subscriptionId, program.programId);
        const [escrowPda] = getEscrowPDA(subscriptionPda, program.programId);

        const tx = await program.methods
            .createSubscription(
                new anchor.BN(subscriptionId, 16),
                email,
                selectedService,
                new anchor.BN(slots),
                new anchor.BN(Math.round(parsedPricePerSlot * 1e9))
            )
            .accounts({
                creator: wallet.publicKey,
                subscription: subscriptionPda,
                escrow: escrowPda,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();
        console.log('Transaction signature:', tx);

        const sub = await program.account.subscription.fetch(subscriptionPda);
        console.log('Subscription created:', sub);
        toast.success('Subscription created!', {id});

        // Reset form
        // setEmail('');
        // setPricePerSlot('');
        // setSelectedService('');
        // setSlots(1);
        
        // Switch to the "My Subscriptions" tab
        setActiveTab('my-subscriptions');
        fetchSubscriptions();
        return;

    }catch(error){
      console.error("Error creating subscription:", error);
      toast.error(error.message || 'Failed to create subscription', {id});
      return;
    }
  };


   return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="mt-4 font-medium transition-all duration-200"
                    style={{ 
                        backgroundColor: '#efe000', 
                        color: '#000',
                        border: 'none'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#d4c700';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#efe000';
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Subscription
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
                <DialogHeader>
                    <DialogTitle>Create New Subscription</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Fill in the details to create a new Google subscription share.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right text-zinc-300">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3 bg-zinc-700 border-zinc-600 text-white"
                            placeholder="Your email address"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="service" className="text-right text-zinc-300">
                            Service
                        </Label>
                        <Select value={selectedService} onValueChange={setSelectedService}>
                            <SelectTrigger className="col-span-3 bg-zinc-700 border-zinc-600 text-white">
                                <SelectValue placeholder="Select a Google service" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                                {googleServices.map(service => (
                                    <SelectItem key={service} value={service}>
                                        {service}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right text-zinc-300">
                            Price per Slot
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            value={pricePerSlot}
                            onChange={(e) => setPricePerSlot(e.target.value)}
                            className="col-span-3 bg-zinc-700 border-zinc-600 text-white"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="slots" className="text-right text-zinc-300">
                            Slots
                        </Label>
                        <Select value={String(slots)} onValueChange={(val) => setSlots(Number(val))}>
                            <SelectTrigger className="col-span-3 bg-zinc-700 border-zinc-600 text-white">
                                <SelectValue placeholder="Select slots" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <SelectItem key={num} value={String(num)}>
                                        {num}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        onClick={handleCreateSubscription}
                        className="font-medium transition-all duration-200"
                        style={{ 
                            backgroundColor: '#efe000', 
                            color: '#000',
                            border: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#d4c700';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#efe000';
                        }}
                    >
                        Create Subscription
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSubscription