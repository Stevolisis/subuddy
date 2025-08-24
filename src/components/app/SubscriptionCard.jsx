import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Clock, DollarSign, Star, Users } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

const SubscriptionCard = ({subscription}) => {
  return (
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
  )
}

export default SubscriptionCard