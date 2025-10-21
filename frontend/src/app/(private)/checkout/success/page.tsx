import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl">Subscription confirmed!</CardTitle>
          <CardDescription className="text-base">
            Congratulations! Your subscription has been activated successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>You now have unlimited notes</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/notes">
              <Button className="w-full cursor-pointer">Go to my notes</Button>
            </Link>
            <Link href="/payments">
              <Button variant="outline" className="w-full cursor-pointer">
                View plan details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
