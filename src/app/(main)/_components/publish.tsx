"use client";

import { Doc } from "../../../../convex/_generated/dataModel";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {useOrigin} from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {useState} from "react";
import {toast} from "sonner";
import { Button } from "@/components/ui/button";
import {Copy, Globe, Check, Globe2} from "lucide-react"

interface PublishProps {
    initialData: Doc<"documents">
}

export const Publish = ({
    initialData
}: PublishProps) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true,
        })
            .finally(() => setIsSubmitting(false));
        
        toast.promise(promise, {
            loading: "Publishing...",
            success: "Effy Published!",
            error: "Failed to publish effy"
        })
    };

    const onUnpublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false,
        })
            .finally(() => setIsSubmitting(false));
        
        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Effy Unpublished!",
            error: "Failed to unpublish effy"
        })
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                toast.error("Failed to copy URL");
            });
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="cursor-pointer">
                    Publish
                    {initialData.isPublished && (
                        <Globe 
                            className="text-sky-500 size-4 ml-2 animate-pulse"
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 align-end align-offset-8" forceMount>
                {initialData.isPublished ? (
                    <div className="space-y-4 ">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse size-4" />
                            <p className="text-xs font-medium text-sky-500">
                                This Effy is live on web 
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input 
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                value={url}
                                disabled
                            />
                            <Button onClick={onCopy} disabled={copied} className="size-8 rounded-l-none">
                                {copied ? (
                                    <Check className="size-4" />
                                ) : (
                                    <Copy 
                                        className="size-4"
                                    />
                                )}
                            </Button>
                        </div>
                        <Button size="sm" className="w-full text-xs cursor-pointer" disabled={isSubmitting} onClick={onUnpublish} >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="size-8 text-muted-foreground mb-2" 
                        />
                        <p className="text-sm font-medium mb-2">
                            Publish this Effy
                        </p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with others
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-xs cursor-pointer"
                            size="sm"
                        >
                            Publish Effy
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}