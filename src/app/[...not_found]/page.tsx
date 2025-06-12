import Link from "next/link";

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