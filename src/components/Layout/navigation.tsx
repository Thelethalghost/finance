"use client"

import { useState } from "react";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";
import NavButton from "./navbutton";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";


const routes = [
  {
    href: "/",
    label: "Overview"
  },
  {
    href: "/transactions",
    label: "Transactions"
  },
  {
    href: "/accounts",
    label: "Accounts"
  },
  {
    href: "/categories",
    label: "Categories"
  },
  {
    href: "/settings",
    label: "Settings"
  }
];


const Navigation = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const pathName = usePathname();
  const onClick = (href: string) => {

    router.push(href);
    setIsOpen(false);
  };


  if(isMobile){
    return(
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            size="sm"
            variant="outline"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:text-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" /> 
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathName === route.href ? "secondary":"ghost"}
                onClick = {() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }


  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathName === route.href}
        />
      ))}
    </nav>
  )
}

export default Navigation
// export const a = ]