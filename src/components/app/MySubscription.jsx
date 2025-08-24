import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Eye, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CreateSubscriptionCard from './CreateSubscriptionCard';
import JoinedSubscriptionCard from './JoinedSubscriptionCard';


const MySubscription = ({userCreatedSubscriptions, setUserCreatedSubscriptions}) => {
  const [mySubscriptionsTab, setMySubscriptionsTab] = useState('created');
    const [userJoinedSubscriptions, setUserJoinedSubscriptions] = useState([
    {
      id: 2001,
      service: 'YouTube Music Premium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg',
      price: 9.99,
      totalSlots: 6,
      joinedDate: '2023-10-15',
      status: 'Active',
      creator: '0xAb5...7Fg2',
      creatorWallet: '0xAb5...7Fg2',
      filledSlots: 4,
      needsConfirmation: false,
      yourSlot: 3,
      yourStatus: 'Verified',
      yourPrice: 1.66, // $9.99 / 6 slots
      paymentReleased: true
    },
    {
      id: 2002,
      service: 'Google Workspace',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg',
      price: 12.00,
      totalSlots: 3,
      joinedDate: '2023-10-18',
      status: 'Pending',
      creator: '0xCde...9Hi3',
      creatorWallet: '0xCde...9Hi3',
      filledSlots: 3,
      needsConfirmation: true,
      yourSlot: 2,
      yourStatus: 'Pending',
      yourPrice: 4.00, // $12.00 / 3 slots
      paymentReleased: false
    }
  ]);

  return (
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
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {userCreatedSubscriptions.map((subscription, i) => (
                            <CreateSubscriptionCard subscription={subscription} key={i}/>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    {/* Joined Subscriptions Tab */}
                    <TabsContent value="joined" className="mt-6">
                      {userJoinedSubscriptions.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="mx-auto w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center mb-4">
                            <Users className="w-8 h-8 text-zinc-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">No joined subscriptions yet</h3>
                          <p className="text-zinc-400 mb-4">Join subscriptions to see them here</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {userJoinedSubscriptions.map((subscription, i) => (
                            <JoinedSubscriptionCard subscription={subscription} key={i}/>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
  )
}

export default MySubscription