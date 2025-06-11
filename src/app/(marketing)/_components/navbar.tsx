"use client";

import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { User } from "lucide-react";
import { ClerkProvider } from "@clerk/nextjs";

const Navbar = () => {
    const { isAuthenticated, isLoading} = useConvexAuth()
    const scrolled = useScrollTop();

    return ( 
        <div className={cn(
            "z-50 bg-background fixed flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <div className="w-full flex items-center justify-between">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">e.</span>
                <div className="text-sm sm:text-base flex items-center gap-4">
                    
                    {isLoading && (
                        <Spinner />
                    )}
                    {/* If we are not authenticated show the Login and Sign Up Button */}
                    {!isAuthenticated && !isLoading && (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="cursor-pointer">
                                    Login
                                </Button>
                            </SignInButton>

                            <SignInButton mode="modal">
                                <Button size="sm" className="cursor-pointer">
                                    Get Efika Free
                                </Button>
                            </SignInButton>
                        </>
                    )}

                    {isAuthenticated && !isLoading && (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/documents">
                                    Enter Efika
                                </Link>
                            </Button>

                            {/* UserButton */}
                            <UserButton />
                        </>
                    )}
                    <div className="cursor-pointer">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
