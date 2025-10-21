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
import createBillingPortalAction from "@/actions/payments/create-billing-portal";
import { Price } from "@/lib/types/price";
import { getCurrencySymbol } from "@/lib/utils";

interface Props {
  data: Price;
  currentSubscriptionPriceId: string | null;
}

export default function PriceCard({ data, currentSubscriptionPriceId }: Props) {
  return (
    <>
      <Card
        className={
          data.id === currentSubscriptionPriceId
            ? "border-primary shadow-lg"
            : ""
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CrownIcon className="h-5 w-5 text-primary" />
            {data.product}
            {data.id === currentSubscriptionPriceId && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                Current
              </span>
            )}
          </CardTitle>
          <CardDescription>For power users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-bold">
            {getCurrencySymbol(data.currency)}
            {data.amount.toFixed(2)}
            <span className="text-sm text-muted-foreground">
              /{data.interval}
            </span>
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
          {!(data.id === currentSubscriptionPriceId) ? (
            <>
              {!currentSubscriptionPriceId && (
                <Button
                  type="button"
                  className="w-full cursor-pointer"
                  onClick={() => createStripeCheckoutAction(data.id)}
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
    </>
  );
}
