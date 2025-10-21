"use client";

import { AuthContext } from "@/contexts/auth";
import { MapPinIcon } from "lucide-react";
import { useContext } from "react";

const regionMap: Record<string, string> = {
  brazil: "Brazil",
  united_states: "United States",
  europe: "Europe",
  other: "Other",
};

export default function UserRegion() {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <MapPinIcon className="h-4 w-4" />
      <p>{regionMap[user.region]}</p>
    </div>
  );
}
