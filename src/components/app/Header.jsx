 import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import { Link } from 'react-router-dom'
 
 
 const Header = () => {
    return (
    <nav className="absolute top-0 z-20 w-full bg-zinc-800 backdrop-blur-xl border-b border-white/20">
      <div className="mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="bg-transparent rounded-xl flex items-center justify-center shadow-lg">
              <img
                src="./subuddy.png"
                alt="DMSE"
                className="aspect-square w-8 rounded-l"
              />                        
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Subuddy</h1>
            </div>
          </Link>
          <div className="hidden sm:flex items-center space-x-2 text-zinc-300">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </nav>  
    )
 }
 
 export default Header