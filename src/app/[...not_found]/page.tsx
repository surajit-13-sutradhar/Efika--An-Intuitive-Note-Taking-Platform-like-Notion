import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "The page you are looking for does not exist."
};

export default function NotFoundCatch() {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="text-xl font-medium">
                Oops! Page not found.
            </h2>
            <Link 
                href="/documents"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
                Go back
            </Link>
        </div>
    )
}

// This ensures the page is statically generated
export const dynamic = 'force-static';
export const revalidate = false; 