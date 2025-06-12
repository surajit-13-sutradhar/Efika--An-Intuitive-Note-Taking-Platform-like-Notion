"use client";

import { useMutation } from "convex/react";
import {useQuery} from "convex/react";
import { use } from "react";
import { Loader } from "lucide-react";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

import { Toolbar } from "@/components/toolbar";
import {Cover} from "@/components/cover";
import dynamic from "next/dynamic";
import {useMemo} from "react";

// making params a promise to avoid hydration error
interface DocumentIdProps {
    params: Promise<{
        documentId: Id<"documents">;
    }>;
};

const DocumentIdPage = ({
    params
}: DocumentIdProps) => {
    // unwrap the params object using React.use()
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), {ssr: false}) , [])
    const unwrappedParams = use(params);
    
    const document = useQuery(api.documents.getById, {
        documentId: unwrappedParams.documentId
    });

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: unwrappedParams.documentId,
            content
        })
    }

    if (document === undefined) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin">
                    <Loader className="h-6 w-6 text-muted-foreground" />
                </div>
            </div>
        ) 
    }

    if (document === null) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-muted-foreground font-medium text-sm">
                    Document not found
                </div>
            </div>
        )
    }

    return (
        <div className="pb-40">
            <Cover preview url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar preview initialData={document} />
                <Editor editable={false}  onChange={onChange} initialContent={document.content} />
            </div>
        </div>
    )
}

export default DocumentIdPage;