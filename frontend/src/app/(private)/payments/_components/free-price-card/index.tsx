import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { AuthContext } from "@/contexts/auth";
import { getCurrencyForRegion, getCurrencySymbol } from "@/lib/utils";
import { Check } from "lucide-react";
import { useContext } from "react";

interface Props {
  isActive: boolean;
}

export default function FreePriceCard({ isActive }: Props) {
  const { user } = useContext(AuthContext);
  const currency = getCurrencyForRegion(user?.region || "other");

  return (
    <>
      <Card className={isActive ? "border-primary shadow-lg" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Free Plan
            {isActive && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                Current
              </span>
            )}
          </CardTitle>
          <CardDescription>Perfect for getting started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-bold">
            {getCurrencySymbol(currency)}0.00
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">Up to 10 notes</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">Basic features</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
