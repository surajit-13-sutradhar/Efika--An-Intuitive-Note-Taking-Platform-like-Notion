"use client";

import { File } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import {toast} from "sonner"

import { api } from "../../../../../convex/_generated/api";

// This ensures the page is not prerendered
export const dynamic = 'force-dynamic';

const DocumentsPage = () => {
    const router = useRouter();
    const {user} = useUser();
    const create = useMutation(api.documents.create);

    const onCreateDocument = () => {
        const promise = create({title: "Untitled"})
            .then((documentId) => router.push(`/documents/${documentId}`))

        toast.promise(promise, {
            loading: "Creating Effy...",
            success: () => {
                return "Effy created!";
            },
            error: (error) => {
                return `Error creating Effy: ${error.message}`;
            },
        });
    }

    const onCreateFlow = () => {
        const promise = create({title: "Untitled"})

        toast.promise(promise, {
            loading: "Creating Flow...",
            success: () => {
                return "Flow Created";
            },
            error: (error) => {
                return `Error creating Flow: ${error.message}`
            }
        });
    }

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <span className="text-black dark:text-white">
                <File size={160} />
            </span>

            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Efika
            </h2>

            <Button onClick={onCreateDocument} className="cursor-pointer">
                <PlusCircle className="size-4 mr-2" />
                Create an Effy
            </Button>
            <Button onClick={onCreateFlow} className="cursor-pointer">
                <PlusCircle className="size-4 mr-2" />
                Create a Flow
            </Button>
        </div>
    );
}

export default DocumentsPage