import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  return (
    <div className='w-screen'>
        <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">

            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                {/* <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-40 left-40 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div> */}

                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>

                <div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 animate-pulse"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '50px 50px',
                }}
                ></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-20 w-full bg-white/10 backdrop-blur-xl border-b border-white/20">

                <div className=" mx-auto px-4 sm:px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div
                                className="bg-transparent w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                            >
                                <img
                                    src="./subuddy.png"
                                    alt="DMSE"
                                    className="aspect-square w-8 rounded-l"
                                />                        
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-white">Subuddy</h1>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2 text-gray-300">
                            <WalletMultiButton />
                        </div>
                    </div>
                </div>
            </nav>

        </div>        
    </div>

  );
}
