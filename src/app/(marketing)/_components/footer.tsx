import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <div className="flex items-center justify-between w-full p-6 bg-background z-50 dark:[#1f1f1f]">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold">e.</span>
            <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-4 text-muted-foreground text-xs">
                <Button variant="ghost" size="sm" className="cursor-pointer text-xs">Privacy Policy</Button>
                <Button variant="ghost" size="sm" className="cursor-pointer text-xs">Terms & Conditions</Button>
            </div>
        </div>
    );
};
