import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Clock, DollarSign, Star, Users } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

const SubscriptionCard = ({subscription}) => {
    const services = {
    ['Google One']:{
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
    ['Google One Premium']:{
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
    ['YouTube Premium']:{
      id: 3,
      service: 'YouTube Premium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
      category: 'Entertainment',
      rating: 4.8,
      description: 'Ad-free YouTube, YouTube Music, and offline downloads',
      features: ['Ad-free videos', 'Background play', 'YouTube Music', 'Offline downloads']
    },
    ['YouTube Music Premium']:{
      id: 4,
      service: 'YouTube Music Premium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg',
      category: 'Music',
      rating: 4.4,
      description: 'Ad-free music streaming with offline listening',
      features: ['Ad-free music', 'Background play', 'Offline downloads', 'High quality audio']
    },
    ['Google Workspace']:{
      id: 5,
      service: 'Google Workspace',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg',
      category: 'Productivity',
      rating: 4.7,
      description: 'Professional email and productivity tools',
      features: ['Custom email domain', 'Google Drive', 'Meet & Calendar', '30GB storage']
    },
    ['Google Workspace Standard']:{
      id: 6,
      service: 'Google Workspace Standard',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg',
      category: 'Productivity',
      rating: 4.8,
      description: 'Enhanced productivity with 2TB storage per user',
      features: ['Custom email', '2TB storage', 'Advanced Meet', 'Security controls']
    },
    ['Google Play Pass']:{
      id: 7,
      service: 'Google Play Pass',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg',
      category: 'Gaming',
      rating: 4.2,
      description: 'Access to premium apps and games without ads',
      features: ['Premium apps', 'No ads', 'In-app purchases', '1000+ games & apps']
    },
    ['Google Nest Aware']:{
      id: 8,
      service: 'Google Nest Aware',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
      category: 'Smart Home',
      rating: 4.3,
      description: 'Smart home security with video history',
      features: ['Video history', 'Intelligent alerts', 'Activity zones', 'Familiar face alerts']
    },
    ["Google Stadia Pro"]:{
      id: 9,
      service: 'Google Stadia Pro',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
      category: 'Gaming',
      rating: 4.3,
      description: 'Cloud gaming with premium features',
      features: ['4K gaming', 'Free monthly games', 'Exclusive discounts', 'HDR support']
    }
    };

  return (
                <Card key={subscription.id} className="bg-zinc-800 border-zinc-700 hover:border-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/10">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
                          <img
                            src={services[subscription.service].image}
                            alt={subscription.service}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-zinc-300 text-sm">{services[subscription.service].rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">{subscription.service}</CardTitle>
                      <CardDescription className="text-zinc-400">
                        {services[subscription.service].description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-zinc-700 text-zinc-300">
                          {services[subscription.service].category}
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
                          {services[subscription.service]?.features?.slice(0, 3)?.map((feature, index) => (
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
  )
}

export default SubscriptionCard