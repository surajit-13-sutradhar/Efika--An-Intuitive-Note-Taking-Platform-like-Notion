"use client";
import {Button} from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Your notes, your way. Welcome to <span className="underline">Efika</span>.
            </h1>

            {/* subheading */}
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">Efika is a connected workspace for better, faster work.</h3>
            
            <Button className="cursor-pointer mt-4">
                Enter Efika
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    )
}