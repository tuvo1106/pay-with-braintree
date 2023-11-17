"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SideBar from "@/components/sidebar";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <div className="md:hidden">
                    <Menu />
                </div>
                {/* <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                ></Button> */}
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SideBar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
