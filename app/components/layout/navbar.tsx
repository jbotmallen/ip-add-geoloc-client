import React from 'react';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, MailIcon, UserIcon } from "lucide-react"
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router';

export const NavigationBar = () => {
    const { logout, user } = useAuth();
    const handleSignOut = async () => {
        await logout();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full max-w-5xl flex h-14 items-center justify-between mx-auto px-4 md:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className='h-8 w-8 object-contain' loading='eager' />
                    <span className="font-bold text-lg">IpLoc</span>
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatar.png" alt="User" />
                                <AvatarFallback>
                                    <UserIcon className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuItem aria-readonly>
                            <MailIcon className="mr-2 h-4 w-4" />
                            <span>{user?.email}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} variant='destructive' className='cursor-pointer'>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
};