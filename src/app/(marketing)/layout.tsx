import React from "react";

import Navbar from "./_components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const MarketingLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return (

        <div className="h-full dark:[#1f1f1f]">
            {/* <Navbar /> */}
                <Navbar />
                <main className="h-full pt-40">
                {children}
            </main>
        </div>
    )
}

export default MarketingLayout