import React from 'react'
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Bell, CheckCircle, CreditCard, DollarSign, Download, Edit, Trash2, User, Users } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';


const CreateSubscriptionCard = ({subscription, services}) => {
    
  return (
    <Card key={subscription.id} className="bg-zinc-700 border-zinc-600">
      <CardContent className="p-6">
        <div className="flex justify-between items-start flex-wrap sm:flex-unwrap gap-y-5 sm:gap-y-0 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
              <img
                src={services[subscription?.service].image}
                alt={services[subscription.service].service}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl">{subscription.service}</h3>
              <p className="text-zinc-400 text-sm">Created: {subscription.createdDate}</p>
            </div>
          </div>
          { subscription.joiners.length === subscription.totalSlots &&
            <div className="flex gap-2">
              <Button
                size="sm" 
                variant="outline"
                className="text-zinc-300 bg-orange-700 hover:bg-zinc-600 hover:text-white"
              >
                <Bell className="w-4 h-4 mr-1" />
                Send Invites
              </Button>
            </div>
          }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
              <p className="text-white font-medium">${(subscription.pricePerSlot * (subscription.totalSlots - subscription.remainingSlots))}</p>
            </div>
          </div>
          {subscription.joiners.length === subscription.totalSlots &&
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-zinc-400 text-sm">Invites accepted</p>
                <p className="text-white font-medium">{subscription.invitesAccepted}</p>
              </div>
            </div>
          }
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
                      <p className="text-zinc-400 text-xs">{user.wallet}</p>
                      <p className="text-zinc-400 text-xs">Confirmed: {user.confirmed ? "True" : "Pending..."}</p>
                    </div>
                    <Badge
                      variant={user.status === 'Verified' ? "default" : "secondary"}
                      className={user.status === 'Verified' ? "bg-green-500" : "bg-yellow-500"}
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
              <Download className="w-5 h-5 text-yellow-400" />
              <h4 className="text-yellow-400 font-medium">Withdraw Funds</h4>
            </div>
            <p className="text-zinc-300 text-sm mb-3">
              All slots are filled and verified. You can now withdraw the funds.
            </p>
            <Button 
              onClick={() => handleWithdrawFunds(subscription.id)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Withdraw ${subscription.totalRevenue.toFixed(2)}
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
  )
}

export default CreateSubscriptionCard