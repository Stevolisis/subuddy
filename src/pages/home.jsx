import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Vote, Shield, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Login attempt:', { registrationNumber, password });
    setIsDialogOpen(false);
  };

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
                                    src="./atbu.png"
                                    alt="DMSE"
                                    className="aspect-square w-8 rounded-l"
                                />                        
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-white">Abubakar Tafawa Balewa University</h1>
                                <p className="text-xs sm:text-sm text-gray-300">Electronic Voting System</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2 text-gray-300">
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Secure Platform</span>
                        </div>
                    </div>
                </div>
            </nav>


            <main className='text-center py-6'>
                <div className="flex justify-center my-12">
                    <div className="relative">
                        <div
                            className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-500"
                            style={{ backgroundColor: '#1348a0' }}
                        >
                                <img
                                    src="./dmse.png"
                                    alt="DMSE"
                                    className="aspect-square w-25 rounded-l"
                                />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className='my-9'>
                    <h2 className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tight drop-shadow-2xl">MECHATRONICS</h2>
                    <p className="text-2xl sm:text-2xl md:text-3xl font-light text-gray-300 my-2">DEPARTMENT</p>
                </div>
                
                <div className="flex items-center justify-center space-x-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-32"></div>
                    <div className="bg-white/10 backdrop-blur-sm px-8 py-2 sm:py-4 rounded-full border border-white/20 flex items-center">
                    <span className="text-xl sm:text-2xl font-bold text-white">2025</span>
                    <span className="text-lg sm:text-xl text-gray-300 ml-3">ELECTION</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-32"></div>
                </div>

                <div className="pt-12">
                    <Button
                        className="group px-12 py-6 text-lg font-semibold sm:font-bold text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl border-0"
                        style={{ backgroundColor: '#1348a0' }}
                        onClick={()=> navigate('/voting-portal')}
                    >
                        <Lock className="w-6 h-6 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                            PROCEED TO VOTE
                        <div className="w-2 h-2 bg-green-400 rounded-full ml-4 animate-pulse"></div>
                    </Button>
                </div>

            </main>
            
            {/* Footer */}
            <footer className="absolute bottom-0 z-10 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-6">
                <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm text-gray-400">
                    © 2025 Abubakar Tafawa Balewa University - Mechatronics Department
                </p>
                </div>
            </footer>
        </div>        
    </div>

  );
}
