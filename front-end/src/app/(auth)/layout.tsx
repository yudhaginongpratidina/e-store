"use client"
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode }>) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {setMounted(true);}, []);
    if (!mounted) return null;

    const handleChangeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <>
            <nav className="fixed top-0 z-10 w-full h-14 border-b px-4 flex justify-between items-center">
                <h1 className="text-lg font-bold">E-Commerce</h1>
                <Button onClick={handleChangeTheme} variant="outline" size="icon" className="text-black dark:text-white">
                    {theme === "dark"
                        ? (<FaSun className="h-[1.2rem] w-[1.2rem] transition-all" />)
                        : (<FaMoon className="h-[1.2rem] w-[1.2rem] transition-all" />)
                    }
                </Button>
            </nav>
            <div className="w-full min-h-screen flex justify-center items-center">
                {children}
            </div>
        </>
    );
}
