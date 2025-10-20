import Logout from "@/components/layout/logout";
import { Button } from "@/components/ui/button";
import { CreditCardIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/orange-logo.png"
                  alt="Orange Notes"
                  className="h-10 w-10"
                />
                <div>
                  <h1 className="text-2xl font-bold text-primary">
                    Orange Notes
                  </h1>
                </div>
              </Link>

              <nav className="hidden sm:flex items-center gap-1">
                <Link href="/notes">
                  <Button
                    // variant={
                    //   location.pathname === "/notes" ? "default" : "ghost"
                    // }
                    variant="ghost"
                    size="sm"
                    className="gap-2 cursor-pointer"
                  >
                    <FileTextIcon className="h-4 w-4" />
                    Notes
                  </Button>
                </Link>
                <Link href="/payments">
                  <Button
                    // variant={
                    //   location.pathname === "/payments" ? "default" : "ghost"
                    // }
                    variant="ghost"
                    size="sm"
                    className="gap-2 cursor-pointer"
                  >
                    <CreditCardIcon className="h-4 w-4" />
                    Payments
                  </Button>
                </Link>
              </nav>
            </div>
            <div className="mr-2">
              <Logout />
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
