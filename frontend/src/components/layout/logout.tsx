"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Logout() {
  const router = useRouter();
  const [, , removeCookies] = useCookies();

  const handleLogout = () => {
    removeCookies("token");
    router.push("/auth");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 cursor-pointer"
      onClick={handleLogout}
    >
      <LogOutIcon className="h-6 w-6" />
    </Button>
  );
}
