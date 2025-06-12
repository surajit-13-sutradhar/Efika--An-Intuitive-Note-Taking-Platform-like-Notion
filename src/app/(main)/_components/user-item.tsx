"use client";

import { ChevronsLeftRight } from "lucide-react";

import {Avatar, AvatarImage} from "@/components/ui/avatar";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";

import { SignOutButton, useUser } from "@clerk/clerk-react";

export const UserItem = () => {
    const {user} = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="size-5">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <span className="text-start font-medium line-wrap-1 position-absolute">
                            {user?.firstName}&apos;s Efika
                        </span>
                    </div>

                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground size-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses?.[0]?.emailAddress}
                    </p>

                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar className="size-8">
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.fullName}&apos;s Efika
                            </p>
                        </div>


                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild  className="w-full cursor-pointer text-muted-foreground"> 
                    <SignOutButton>
                        Log Out
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}