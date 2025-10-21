"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import transferSubscriptionAction from "@/actions/payments/transfer-subscription";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const transferSubscriptionSchema = z
  .object({
    fromUserEmail: z
      .string()
      .min(1, "Source user is required")
      .email("Please enter a valid email"),
    toUserEmail: z
      .string()
      .min(1, "Destination user is required")
      .email("Please enter a valid email"),
  })
  .refine((data) => data.fromUserEmail !== data.toUserEmail, {
    message: "Source and destination users cannot be the same",
    path: ["toUserEmail"],
  });

type TransferSubscriptionForm = z.infer<typeof transferSubscriptionSchema>;

export default function AdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TransferSubscriptionForm>({
    resolver: zodResolver(transferSubscriptionSchema),
    defaultValues: {
      fromUserEmail: "",
      toUserEmail: "",
    },
  });

  const onSubmit = async (data: TransferSubscriptionForm) => {
    try {
      const result = await transferSubscriptionAction({
        fromUserEmail: data.fromUserEmail,
        toUserEmail: data.toUserEmail,
      });
      toast.success(result.message);
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to transfer subscription"
      );
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel - Transfer Subscription</CardTitle>
          <CardDescription>
            Transfer a subscription from one user account to another. This
            action is irreversible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-2">
              <label htmlFor="fromUser" className="text-sm font-medium">
                Source User Email
              </label>
              <Input
                id="fromUser"
                type="email"
                placeholder="old@example.com"
                autoComplete="off"
                {...register("fromUserEmail")}
                disabled={isSubmitting}
                required
              />
              {errors.fromUserEmail && (
                <p className="text-xs text-destructive mt-1">
                  {errors.fromUserEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="toUser" className="text-sm font-medium">
                Destination User Email
              </label>
              <Input
                id="toUser"
                type="email"
                placeholder="new@example.com"
                autoComplete="off"
                {...register("toUserEmail")}
                disabled={isSubmitting}
                required
              />
              {errors.toUserEmail && (
                <p className="text-xs text-destructive mt-1">
                  {errors.toUserEmail.message}
                </p>
              )}
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Warning
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>
                      This action will permanently transfer the subscription
                      from the source user to the destination user. The source
                      user will lose access to their subscription immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              variant="destructive"
            >
              {isSubmitting ? "Transferring..." : "Transfer Subscription"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
