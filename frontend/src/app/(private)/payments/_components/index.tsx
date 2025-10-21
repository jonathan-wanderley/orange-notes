"use client";

import { useContext, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Mail } from "lucide-react";
import { AuthContext } from "@/contexts/auth";
import { Price } from "@/lib/types/price";
import PriceCard from "./price-card";
import FreePriceCard from "./free-price-card";
import { Subscription } from "@/lib/types/subscription";

interface Props {
  data: Price[];
  subscription: Subscription | null;
}

const Payments = ({ data, subscription }: Props) => {
  const { user } = useContext(AuthContext);
  const [isPro, setIsPro] = useState(false);
  const currentSubscriptionPriceId =
    subscription && subscription.status === "ACTIVE"
      ? subscription.stripeSubscriptionPriceId
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Subscription & Payments</h1>
          <p className="text-muted-foreground">
            Manage your Orange Notes subscription
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Free Plan Card */}
          <FreePriceCard isActive={!currentSubscriptionPriceId} />

          {/* Pro Plan Card */}
          {data.map((price, i) => (
            <PriceCard
              key={i}
              data={price}
              currentSubscriptionPriceId={currentSubscriptionPriceId}
            />
          ))}
        </div>

        {/* Transfer Subscription Card */}
        {isPro && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Transfer Subscription
              </CardTitle>
              <CardDescription>
                Transfer your Pro subscription to another account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transfer-email">Recipient Email</Label>
                  <Input
                    id="transfer-email"
                    type="email"
                    placeholder="email@example.com"
                    // value={transferEmail}
                    // onChange={(e) => setTransferEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    The recipient will receive an email to accept the transfer
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Transfer Subscription
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Transfer Subscription?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will transfer your Pro subscription to{" "}
                      {`transferEmail`}. You will lose access to Pro features
                      immediately. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {}}>
                      Confirm Transfer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Payments;
