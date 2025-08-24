import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


const CreateSubscription = ({userCreatedSubscriptions, setUserCreatedSubscriptions}) => {
    const [email, setEmail] = useState('');
    const [pricePerSlot, setPricePerSlot] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [slots, setSlots] = useState(1);

      
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

    
  const handleCreateSubscription = () => {
    if (!email || !selectedService || !pricePerSlot) {
      alert('Please fill all required fields');
      return;
    }

    const newSubscription = {
      id: Date.now(),
      service: selectedService,
      email: email,
      pricePerSlot: parseFloat(pricePerSlot),
      totalSlots: parseInt(slots),
      remainingSlots: parseInt(slots) - 1, // Subtract one for the creator
      createdDate: new Date().toLocaleDateString(),
      status: 'Active',
      joinedUsers: [{
        id: 1,
        email: email,
        walletAddress: 'Your wallet address',
        joinedDate: new Date().toLocaleDateString(),
        status: 'Verified'
      }],
      filledSlots: 1,
      totalRevenue: 0,
      needsWithdrawal: false,
      invitesSent: 0,
      invitesAccepted: 0
    };

    setUserCreatedSubscriptions([...userCreatedSubscriptions, newSubscription]);
    
    // Reset form
    setEmail('');
    setPricePerSlot('');
    setSelectedService('');
    setSlots(1);
    
    // Switch to the "My Subscriptions" tab
    setActiveTab('my-subscriptions');
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
                    <Input
                      id="slots"
                      type="number"
                      value={slots}
                      onChange={(e) => {
                        const value = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
                        setSlots(value);
                      }}
                      className="col-span-3 bg-zinc-700 border-zinc-600 text-white"
                      min="1"
                      max="5"
                    />
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