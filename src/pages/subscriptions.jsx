import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateSubscription from '@/components/app/CreateSubscription';
import SubscriptionCard from '@/components/app/SubscriptionCard';
import MySubscription from '@/components/app/MySubscription';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '@/utils/getProgram';
import { utils, BN } from "@coral-xyz/anchor";
import { toast } from 'sonner';

const Subscriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const wallet = useAnchorWallet();
  const [activeTab, setActiveTab] = useState('browse');
  const [onchainSubscriptions, setOnchainSubscriptions] = useState([]);
  const [userCreatedSubscriptions, setUserCreatedSubscriptions] = useState([
    {
      id: 1001,
      service: 'YouTube Premium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
      email: 'creator@example.com',
      pricePerSlot: 2.99,
      totalSlots: 5,
      remainingSlots: 1,
      createdDate: '2023-10-15',
      status: 'Active',
      joinedUsers: [
        { id: 1, email: 'user1@example.com', walletAddress: '5Hs6...8JkL', joinedDate: '2023-10-16', status: 'Verified' },
        { id: 2, email: 'user2@example.com', walletAddress: '7Gh3...2MnB', joinedDate: '2023-10-17', status: 'Verified' },
        { id: 3, email: 'user3@example.com', walletAddress: '9Kj8...1PqR', joinedDate: '2023-10-18', status: 'Verified' },
        { id: 4, email: 'user4@example.com', walletAddress: '2Fg7...5LmN', joinedDate: '2023-10-19', status: 'Pending' }
      ],
      filledSlots: 4,
      totalRevenue: 8.97, // 3 verified users * $2.99
      needsWithdrawal: true,
      invitesSent: 2,
      invitesAccepted: 3
    },
    {
      id: 1002,
      service: 'Google One',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Google_One_logo.svg',
      email: 'creator@example.com',
      pricePerSlot: 1.99,
      totalSlots: 4,
      remainingSlots: 2,
      createdDate: '2023-10-10',
      status: 'Active',
      joinedUsers: [
        { id: 1, email: 'user5@example.com', walletAddress: '3Rt9...0OpQ', joinedDate: '2023-10-11', status: 'Verified' }
      ],
      filledSlots: 2, // Including creator
      totalRevenue: 1.99, // 1 verified user * $1.99
      needsWithdrawal: false,
      invitesSent: 3,
      invitesAccepted: 1
    }
  ]);


  const filteredSubscriptions = onchainSubscriptions.filter(sub => {
    const matchesSearch = sub.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || sub.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'slots') return b.remainingSlots - a.remainingSlots;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.rating - a.rating; // default popular
  });

  const categories = ['All', 'Cloud Storage', 'Entertainment', 'Music', 'Productivity', 'Gaming', 'Smart Home'];

const fetchSubscriptions = async () => {
  const id = toast.loading("fetching subscriptions ...")
  console.log("wallet: ", wallet);
  if (!wallet) {
    return toast.info("Please connect your wallet!", {id})
  };

  try {
    const program = getProgram(wallet);
    console.log("program: ", program);

    // discriminator filter for Subscription
    const accounts = await program.provider.connection.getProgramAccounts(program.programId, {
      filters: [
        {
          memcmp: {
            offset: 0,
            bytes: utils.bytes.bs58.encode(
              program.coder.accounts.accountDiscriminator("subscription")
            ),
          },
        },
      ],
    });

    console.log("raw subscription accounts:", accounts);

    // decode accounts into proper objects
    const subscriptions = accounts.map((acc) => {
      const data = program.coder.accounts.decode("subscription", acc.account.data);
      console.log("decoded subscription account:", data);
      const pricePerSlotInLamports = data.pricePerSlot.toNumber();
      const pricePerSlotInSol = pricePerSlotInLamports / 1e9;

      return {
        pubkey: acc.pubkey.toBase58(),
        id: Number(data.subscriptionId), // u64 → number
        service: data.serviceName,
        email: data.creatorEmail,
        creator: data.creator.toBase58(),
        pricePerSlot: parseFloat(pricePerSlotInSol.toFixed(6)),
        totalSlots: data.maxSlots,
        filledSlots: data.filledSlots,
        remainingSlots: data.maxSlots - data.filledSlots,
        status: data.status,
        joiners: data.joiners.map((j) => ({
          email: j.email,
          wallet: j.joiner.toBase58(),
          confirmed: j.confirmed,
        })),
      };
    });

    console.log("fetched subscriptions: ", subscriptions);
    setOnchainSubscriptions(subscriptions);
    return toast.success("fetched successfully", {id})

  } catch (err) {
    console.error("Failed to fetch subscriptions:", err);
    return toast.error("Failed to fetch subscription, try again!!", {id});
  }
};

useEffect(() => {
  if (wallet) {
    fetchSubscriptions();
  }
}, [wallet]);

  return (
    <div className="bg-zinc-900">
      
      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center my-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Google Subscriptions
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              Join shared Google subscriptions and save money on Google services
            </p>
            
            {/* Create Subscription Button */}
            <CreateSubscription setActiveTab={setActiveTab} fetchSubscriptions={fetchSubscriptions} />
          </div>

          {/* Tabs for Browse vs My Subscriptions */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-zinc-800 border border-zinc-700 p-1">
              <TabsTrigger 
                value="browse" 
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400"
              >
                Browse Subscriptions
              </TabsTrigger>
              <TabsTrigger 
                value="my-subscriptions" 
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400"
              >
                My Subscriptions
              </TabsTrigger>
            </TabsList>

            {/* Browse Subscriptions Tab */}
            <TabsContent value="browse">
              {/* Filters Section */}
              <Card className="bg-zinc-800 border-zinc-700 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters & Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="space-y-2">
                      <Label htmlFor="search" className="text-zinc-300">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                        <Input
                          id="search"
                          placeholder="Search Google services..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                        />
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Service Category</Label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-700 border-zinc-600">
                          <SelectItem value="all" className="text-white">All Categories</SelectItem>
                          {categories.slice(1).map(category => (
                            <SelectItem key={category} value={category} className="text-white">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort By */}
                    <div className="space-y-2">
                      <Label className="text-slate-300">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="popular" className="text-white">Most Popular</SelectItem>
                          <SelectItem value="price-low" className="text-white">Price: Low to High</SelectItem>
                          <SelectItem value="price-high" className="text-white">Price: High to Low</SelectItem>
                          <SelectItem value="slots" className="text-white">Available Slots</SelectItem>
                          <SelectItem value="rating" className="text-white">Highest Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-zinc-300">
                  Showing {filteredSubscriptions.length} of {onchainSubscriptions.length} Google subscriptions
                </p>
              </div>

              {/* Subscriptions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredSubscriptions.map((subscription, i) => (
                  <SubscriptionCard subscription={subscription} key={i} />
                ))}
              </div>

              {/* Empty State */}
              {filteredSubscriptions.length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-zinc-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No subscriptions found</h3>
                  <p className="text-zinc-400 mb-4">Try adjusting your filters or search terms</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setSortBy('popular');
                    }}
                    variant="outline"
                    className="font-medium transition-all duration-200"
                    style={{ 
                      borderColor: '#efe000', 
                      color: '#efe000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#efe000';
                      e.target.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#efe000';
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* My Subscriptions Tab */}
            <TabsContent value="my-subscriptions">
              <MySubscription userCreatedSubscriptions={userCreatedSubscriptions} setUserCreatedSubscriptions={setUserCreatedSubscriptions}/>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;