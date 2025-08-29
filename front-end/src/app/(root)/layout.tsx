import Link from "next/link";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

import { FaStore } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <nav className="w-full h-14 px-4 border-b flex justify-around items-center">
                <Link href={"/"} className="flex items-center gap-2">
                    <FaStore className="w-8 h-8" />
                    <h1 className="text-lg font-bold">E-Store</h1>
                </Link>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Product</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">About</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger className="border h-9 w-9 flex justify-center items-center  rounded-md">
                            <FaCartShopping className="w-5 h-5" />
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="w-full h-[300px] flex flex-col justify-center items-center gap-2 border">
                                <FaCartShopping className="w-20 h-20 text-slate-400" />
                                <p className="text-slate-400">Cart is empty</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Link href={"/login"} className="h-9 px-4 flex justify-center items-center rounded-md bg-slate-900 text-slate-50">
                        Login
                    </Link>
                </div>
            </nav>
            <main className="w-full p-4 flex flex-col gap-4">
                {children}
            </main>
        </>
    )
}