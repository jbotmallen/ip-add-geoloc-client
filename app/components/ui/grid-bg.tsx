import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground({ children }: { children?: React.ReactNode }) {
    return (
        <div className="relative flex h-full w-full items-center justify-center bg-white dark:bg-black">
           
            {children}
        </div>
    );
}
