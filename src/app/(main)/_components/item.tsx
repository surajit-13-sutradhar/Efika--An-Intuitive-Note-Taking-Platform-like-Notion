"use client";

import { Id } from "../../../../convex/_generated/dataModel";

import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils"
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
}

export const Item = (
    {
        id, 
        label, 
        onClick, 
        icon: Icon, 
        active, 
        documentIcon, 
        isSearch, 
        level=0, 
        onExpand, 
        expanded
    }: ItemProps) => {
    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const orArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({id})
            .then(() => router.push("/documents"))

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Effy moved to trash!",
            error: "Failed to archive effy."
        })
    };

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if(!id) return;
        const promise = create({title: "Untitled", parentDocument: id}).then((documentId) => {
            if (!expanded) {
                onExpand?.();
            }
            router.push(`/documents/${documentId}`);
        })

        toast.promise(promise, {
            loading: "Creating a new Effy",
            success: "Effy Created!",
            error: "Failed to create Effy"
        })
    }
    
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    return (
        <div onClick={onClick} role="button" style={{paddingLeft: level ? `${(level * 12) + 12}px` : "12px"}} className={cn("group min-h-[24px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium cursor-pointer", active && "bg-primary/5 text-primary")}
        >   
            {!!id && (
                <div role="button" className="h-full rounded-sm hover:bg-neutral-300 dark: bg-neutral-500 mr-1"
                onClick={handleExpand}
                >
                    <ChevronIcon 
                        className="size-4 shrink-0 text-muted-foreground/50"
                    />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 text-[16px]">
                    {documentIcon}
                </div>
            ) : <Icon 
                className="shrink-0 h-[16px] w-[16px] mr-2 text-muted-foreground"
            />}
            <span className="truncate hover:cursor-pointer">
                {label}
            </span>

            {isSearch && (
                <samp className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">
                        ctrl + k
                    </span>
                </samp>
            )}

            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            asChild
                        >
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 transition h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            >
                                <MoreHorizontal className="size-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={orArchive}>
                                <Trash2Icon className="size-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by: {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div role="button" onClick={onCreate} className="opacity-0 group-hover:opacity-100 transition h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 cursor-pointer">
                        <Plus className="size-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level } : {level?: number }){
    return (
        <div style={{paddingLeft: level ? `{(level * 12) + 25}px` : "12px"}} className="flex gap-x-2 py-[4px]">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}