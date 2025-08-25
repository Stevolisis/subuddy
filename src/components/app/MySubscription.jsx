import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Eye, Plus, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CreateSubscriptionCard from './CreateSubscriptionCard';
import JoinedSubscriptionCard from './JoinedSubscriptionCard';


const MySubscription = ({
  userJoinedSubscriptions,
  userCreatedSubscriptions, 
  services,
  fetchSubscriptions
}) => {
  const [mySubscriptionsTab, setMySubscriptionsTab] = useState('created');


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
                  <CreateSubscriptionCard fetchSubscriptions={fetchSubscriptions} subscription={subscription} services={services} key={i}/>
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
                  <JoinedSubscriptionCard fetchSubscriptions={fetchSubscriptions} subscription={subscription} services={services} key={i}/>
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