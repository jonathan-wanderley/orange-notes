import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Check, CrownIcon } from "lucide-react";
import createStripeCheckoutAction from "@/actions/payments/create-stripe-checkout";
import { AuthContext } from "@/contexts/auth";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import createBillingPortalAction from "@/actions/payments/create-billing-portal";

interface Props {
  type: "free" | "month" | "year";
  isActive: boolean;
  totalInCents: number;
  planId: string;
  hasAnySubscription: boolean;
}

export default function PlanCard({
  type,
  isActive,
  totalInCents,
  planId,
  hasAnySubscription,
}: Props) {
  return (
    <>
      {type == "free" && (
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
              $0<span className="text-sm text-muted-foreground">/month</span>
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
      )}

      {type == "month" && (
        <Card className={isActive ? "border-primary shadow-lg" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CrownIcon className="h-5 w-5 text-primary" />
              Pro Plan
              {isActive && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  Current
                </span>
              )}
            </CardTitle>
            <CardDescription>For power users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">
              ${totalInCents / 100}
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Unlimited notes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Advanced features</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {!isActive ? (
              <>
                {!hasAnySubscription && (
                  <Button
                    type="button"
                    className="w-full cursor-pointer"
                    onClick={() => createStripeCheckoutAction(planId)}
                  >
                    Upgrade
                  </Button>
                )}
              </>
            ) : (
              <Button
                type="button"
                className="w-full cursor-pointer"
                onClick={() => createBillingPortalAction(window.location.href)}
              >
                Manage Subscription
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      {type == "year" && (
        <Card className={isActive ? "border-primary shadow-lg" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CrownIcon className="h-5 w-5 text-primary" />
              Pro Plan
              {isActive && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  Current
                </span>
              )}
            </CardTitle>
            <CardDescription>For power users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">
              ${totalInCents / 100}
              <span className="text-sm text-muted-foreground">/year</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Unlimited notes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Advanced features</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {!isActive ? (
              <>
                {!hasAnySubscription && (
                  <Button
                    type="submit"
                    role="link"
                    className="w-full cursor-pointer"
                    onClick={() => createStripeCheckoutAction(planId)}
                  >
                    Upgrade
                  </Button>
                )}
              </>
            ) : (
              <Button
                type="button"
                className="w-full cursor-pointer"
                onClick={() => createBillingPortalAction(window.location.href)}
              >
                Manage Subscription
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
