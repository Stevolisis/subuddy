import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'; 
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, Users, DollarSign, Clock, Star, Plus, Eye, Trash2, Edit, CheckCircle, XCircle, User, CreditCard, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Subscriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [email, setEmail] = useState('');
  const [pricePerSlot, setPricePerSlot] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [slots, setSlots] = useState(1);
  const [activeTab, setActiveTab] = useState('browse');
  const [userCreatedSubscriptions, setUserCreatedSubscriptions] = useState([]);
  const [userJoinedSubscriptions, setUserJoinedSubscriptions] = useState([]);
  const [mySubscriptionsTab, setMySubscriptionsTab] = useState('created');

  const subscriptions = [
    {
      id: 1,
      service: 'Google One',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Google_One_logo.svg',
      category: 'Cloud Storage',
      price: 1.99,
      totalSlots: 5,
      remainingSlots: 2,
      rating: 4.5,
      description: '100GB cloud storage with Google services',
      features: ['100GB storage', 'Google support', 'Family sharing', 'Photo editing']
    },
    {
      id: 2,
      service: 'Google One Premium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Google_One_logo.svg',
      category: 'Cloud Storage',
      price: 9.99,
      totalSlots: 5,
      remainingSlots: 3,
      rating: 4.6,
      description: '2TB cloud storage with premium features',
      features: ['2TB storage', 'Premium support', 'VPN access', 'Advanced photo features']
    },
    {
      id: 3,
      service: 'YouTube Premium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
      category: 'Entertainment',
      price: 11.99,
      totalSlots: 6,
      remainingSlots: 1,
      rating: 4.8,
      description: 'Ad-free YouTube, YouTube Music, and offline downloads',
      features: ['Ad-free videos', 'Background play', 'YouTube Music', 'Offline downloads']
    },
    {
      id: 4,
      service: 'YouTube Music Premium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg',
      category: 'Music',
      price: 9.99,
      totalSlots: 6,
      remainingSlots: 4,
      rating: 4.4,
      description: 'Ad-free music streaming with offline listening',
      features: ['Ad-free music', 'Background play', 'Offline downloads', 'High quality audio']
    },
    {
      id: 5,
      service: 'Google Workspace',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg',
      category: 'Productivity',
      price: 6.00,
      totalSlots: 1,
      remainingSlots: 0,
      rating: 4.7,
      description: 'Professional email and productivity tools',
      features: ['Custom email domain', 'Google Drive', 'Meet & Calendar', '30GB storage']
    },
    {
      id: 6,
      service: 'Google Workspace Standard',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg',
      category: 'Productivity',
      price: 12.00,
      totalSlots: 3,
      remainingSlots: 2,
      rating: 4.8,
      description: 'Enhanced productivity with 2TB storage per user',
      features: ['Custom email', '2TB storage', 'Advanced Meet', 'Security controls']
    },
    {
      id: 7,
      service: 'Google Play Pass',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg',
      category: 'Gaming',
      price: 4.99,
      totalSlots: 6,
      remainingSlots: 5,
      rating: 4.2,
      description: 'Access to premium apps and games without ads',
      features: ['Premium apps', 'No ads', 'In-app purchases', '1000+ games & apps']
    },
    {
      id: 8,
      service: 'Google Nest Aware',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
      category: 'Smart Home',
      price: 6.00,
      totalSlots: 4,
      remainingSlots: 1,
      rating: 4.3,
      description: 'Smart home security with video history',
      features: ['Video history', 'Intelligent alerts', 'Activity zones', 'Familiar face alerts']
    },
    {
      id: 9,
      service: 'Google Stadia Pro',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
      category: 'Gaming',
      price: 9.99,
      totalSlots: 4,
      remainingSlots: 0,
      rating: 3.8,
      description: 'Cloud gaming with premium features',
      features: ['4K gaming', 'Free monthly games', 'Exclusive discounts', 'HDR support']
    }
  ];

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

  // Sample data for users who joined subscriptions
  const sampleJoinedUsers = [
    { id: 1, email: 'user1@example.com', walletAddress: '5Hs6...8JkL', joinedDate: '2023-10-15', status: 'Pending' },
    { id: 2, email: 'user2@example.com', walletAddress: '7Gh3...2MnB', joinedDate: '2023-10-16', status: 'Verified' },
    { id: 3, email: 'user3@example.com', walletAddress: '9Kj8...1PqR', joinedDate: '2023-10-17', status: 'Pending' }
  ];

  // Sample data for joined subscriptions
  const sampleJoinedSubscriptions = [
    {
      id: 101,
      service: 'YouTube Premium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
      price: 11.99,
      totalSlots: 6,
      joinedDate: '2023-10-15',
      status: 'Active',
      creator: '0xAb5...7Fg2',
      filledSlots: 4,
      needsConfirmation: false
    },
    {
      id: 102,
      service: 'Google One',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Google_One_logo.svg',
      price: 1.99,
      totalSlots: 5,
      joinedDate: '2023-10-18',
      status: 'Pending',
      creator: '0xCde...9Hi3',
      filledSlots: 5,
      needsConfirmation: true
    }
  ];

  const filteredSubscriptions = subscriptions.filter(sub => {
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
      totalRevenue: parseFloat(pricePerSlot) * (parseInt(slots) - 1),
      needsWithdrawal: false
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

  const handleDeleteSubscription = (id) => {
    setUserCreatedSubscriptions(userCreatedSubscriptions.filter(sub => sub.id !== id));
  };

  const handleWithdrawFunds = (id) => {
    setUserCreatedSubscriptions(userCreatedSubscriptions.map(sub => 
      sub.id === id ? { ...sub, needsWithdrawal: false } : sub
    ));
    alert('Funds withdrawn successfully!');
  };

  const handleConfirmSubscription = (id) => {
    setUserJoinedSubscriptions(userJoinedSubscriptions.map(sub => 
      sub.id === id ? { ...sub, needsConfirmation: false, status: 'Active' } : sub
    ));
    alert('Subscription confirmed! Funds released to creator.');
  };

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
                  Showing {filteredSubscriptions.length} of {subscriptions.length} Google subscriptions
                </p>
              </div>

              {/* Subscriptions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredSubscriptions.map((subscription) => (
                  <Card key={subscription.id} className="bg-zinc-800 border-zinc-700 hover:border-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/10">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
                          <img
                            src={subscription.image}
                            alt={subscription.service}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-zinc-300 text-sm">{subscription.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">{subscription.service}</CardTitle>
                      <CardDescription className="text-zinc-400">
                        {subscription.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-zinc-700 text-zinc-300">
                          {subscription.category}
                        </Badge>
                        <div className="flex items-center gap-1" style={{ color: '#efe000' }}>
                          <DollarSign className="w-4 h-4" />
                          <span className="font-bold">${subscription.price}</span>
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
                            variant={subscription.remainingSlots > 0 ? "default" : "destructive"}
                            className={subscription.remainingSlots > 0 ? "bg-zinc-900 text-zinc-300 font-medium" : ""}
                            style={subscription.remainingSlots > 0 ? { 
                              border: 'none'
                            } : {}}
                          >
                            {subscription.remainingSlots} slots
                          </Badge>
                        </div>

                        <div className="w-full bg-zinc-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${((subscription.totalSlots - subscription.remainingSlots) / subscription.totalSlots) * 100}%`,
                              backgroundColor: '#efe000'
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-zinc-400 text-sm font-medium">Features:</p>
                        <ul className="text-zinc-300 text-xs space-y-1">
                          {subscription.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#efe000' }}></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button 
                        className="w-full font-medium transition-all duration-200"
                        disabled={subscription.remainingSlots === 0}
                        variant={subscription.remainingSlots === 0 ? "secondary" : "default"}
                        style={subscription.remainingSlots === 0 ? {} : { 
                          backgroundColor: '#efe000', 
                          color: '#000',
                          border: 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (subscription.remainingSlots > 0) {
                            e.target.style.backgroundColor = '#d4c700';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (subscription.remainingSlots > 0) {
                            e.target.style.backgroundColor = '#efe000';
                          }
                        }}
                      >
                        {subscription.remainingSlots === 0 ? 'Full' : 'Join Subscription'}
                      </Button>
                    </CardFooter>
                  </Card>
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
              <Card className="bg-zinc-800 border-zinc-700 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    My Subscriptions
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    View and manage your created and joined subscriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Tabs for Created vs Joined Subscriptions */}
                  <Tabs value={mySubscriptionsTab} onValueChange={setMySubscriptionsTab} className="mb-6">
                    <TabsList className="bg-zinc-700 border border-zinc-600 p-1">
                      <TabsTrigger 
                        value="created" 
                        className="data-[state=active]:bg-zinc-600 data-[state=active]:text-white text-zinc-400"
                      >
                        Created by Me
                      </TabsTrigger>
                      <TabsTrigger 
                        value="joined" 
                        className="data-[state=active]:bg-zinc-600 data-[state=active]:text-white text-zinc-400"
                      >
                        Joined by Me
                      </TabsTrigger>
                    </TabsList>

                    {/* Created Subscriptions Tab */}
                    <TabsContent value="created" className="mt-6">
                      {userCreatedSubscriptions.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="mx-auto w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center mb-4">
                            <Plus className="w-8 h-8 text-zinc-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">No subscriptions created yet</h3>
                          <p className="text-zinc-400 mb-4">Create your first subscription to get started</p>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
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
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {userCreatedSubscriptions.map((subscription) => (
                            <Card key={subscription.id} className="bg-zinc-700 border-zinc-600">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="text-white font-semibold text-xl flex items-center gap-2">
                                      {subscription.service}
                                      <Badge 
                                        className="ml-2"
                                        style={{ 
                                          backgroundColor: subscription.status === 'Active' ? '#10b981' : '#ef4444',
                                          color: 'white'
                                        }}
                                      >
                                        {subscription.status}
                                      </Badge>
                                    </h3>
                                    <p className="text-zinc-400 text-sm mt-1">Created: {subscription.createdDate}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="text-zinc-300 border-zinc-600 hover:bg-zinc-600"
                                    >
                                      <Edit className="w-4 h-4 mr-1" />
                                      Edit
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => handleDeleteSubscription(subscription.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                                      <p className="text-white font-medium">${subscription.totalRevenue}</p>
                                    </div>
                                  </div>
                                </div>

                                <Separator className="bg-zinc-600 my-4" />

                                <div className="mb-4">
                                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Users who joined:
                                  </h4>
                                  <div className="bg-zinc-800 rounded-lg p-3">
                                    {subscription.joinedUsers && subscription.joinedUsers.length > 0 ? (
                                      <div className="space-y-3">
                                        {subscription.joinedUsers.map((user) => (
                                          <div key={user.id} className="flex justify-between items-center p-2 bg-zinc-700 rounded">
                                            <div>
                                              <p className="text-white text-sm">{user.email}</p>
                                              <p className="text-zinc-400 text-xs">{user.walletAddress}</p>
                                            </div>
                                            <Badge 
                                              variant={user.status === 'Verified' ? "default" : "secondary"}
                                              className={user.status === 'Verified' ? "bg-green-500" : "bg-zinc-600"}
                                            >
                                              {user.status}
                                            </Badge>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-zinc-400 text-sm">No users have joined yet</p>
                                    )}
                                  </div>
                                </div>

                                {subscription.filledSlots === subscription.totalSlots && subscription.needsWithdrawal && (
                                  <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <CreditCard className="w-5 h-5 text-yellow-400" />
                                      <h4 className="text-yellow-400 font-medium">Withdraw Funds</h4>
                                    </div>
                                    <p className="text-zinc-300 text-sm mb-3">
                                      All slots are filled and verified. You can now withdraw the funds.
                                    </p>
                                    <Button 
                                      onClick={() => handleWithdrawFunds(subscription.id)}
                                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                                    >
                                      Withdraw ${subscription.totalRevenue}
                                    </Button>
                                  </div>
                                )}

                                {subscription.filledSlots === subscription.totalSlots && !subscription.needsWithdrawal && (
                                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-5 h-5 text-green-400" />
                                      <p className="text-green-400 text-sm">Funds successfully withdrawn</p>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    {/* Joined Subscriptions Tab */}
                    <TabsContent value="joined" className="mt-6">
                      {sampleJoinedSubscriptions.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="mx-auto w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center mb-4">
                            <Users className="w-8 h-8 text-zinc-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">No joined subscriptions yet</h3>
                          <p className="text-zinc-400 mb-4">Join subscriptions to see them here</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {sampleJoinedSubscriptions.map((subscription) => (
                            <Card key={subscription.id} className="bg-zinc-700 border-zinc-600">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
                                      <img
                                        src={subscription.image}
                                        alt={subscription.service}
                                        className="w-8 h-8 object-contain"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <h3 className="text-white font-semibold text-xl">{subscription.service}</h3>
                                      <p className="text-zinc-400 text-sm">Joined: {subscription.joinedDate}</p>
                                    </div>
                                  </div>
                                  <Badge 
                                    className="ml-2"
                                    style={{ 
                                      backgroundColor: subscription.status === 'Active' ? '#10b981' : 
                                                     subscription.status === 'Pending' ? '#f59e0b' : '#ef4444',
                                      color: 'white'
                                    }}
                                  >
                                    {subscription.status}
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-yellow-400" />
                                    <div>
                                      <p className="text-zinc-400 text-sm">Price per month</p>
                                      <p className="text-white font-medium">${subscription.price}</p>
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
                                    <User className="w-5 h-5 text-yellow-400" />
                                    <div>
                                      <p className="text-zinc-400 text-sm">Creator</p>
                                      <p className="text-white font-medium text-sm">{subscription.creator}</p>
                                    </div>
                                  </div>
                                </div>

                                {subscription.needsConfirmation && (
                                  <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <CheckCircle className="w-5 h-5 text-blue-400" />
                                      <h4 className="text-blue-400 font-medium">Confirm Subscription</h4>
                                    </div>
                                    <p className="text-zinc-300 text-sm mb-3">
                                      All slots are filled. Please confirm the subscription to release funds to the creator.
                                    </p>
                                    <Button 
                                      onClick={() => handleConfirmSubscription(subscription.id)}
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                      Confirm & Release Funds
                                    </Button>
                                  </div>
                                )}

                                {!subscription.needsConfirmation && subscription.status === 'Active' && (
                                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-5 h-5 text-green-400" />
                                      <p className="text-green-400 text-sm">Subscription active and confirmed</p>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;