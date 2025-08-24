import React from 'react'
import { Card, CardContent } from '../ui/card';
import { CheckCircle, CreditCard, DollarSign, User, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const JoinedSubscriptionCard = ({subscription}) => {
    
  return (
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
                                      <p className="text-zinc-400 text-sm">Creator: {subscription.creator}</p>
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

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-yellow-400" />
                                    <div>
                                      <p className="text-zinc-400 text-sm">Your monthly price</p>
                                      <p className="text-white font-medium">${subscription.yourPrice.toFixed(2)}</p>
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
                                      <p className="text-zinc-400 text-sm">Your slot</p>
                                      <p className="text-white font-medium">#{subscription.yourSlot}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-yellow-400" />
                                    <div>
                                      <p className="text-zinc-400 text-sm">Payment status</p>
                                      <p className="text-white font-medium">{subscription.paymentReleased ? 'Released' : 'Held'}</p>
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
  )
}

export default JoinedSubscriptionCard