import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import registerAction from "@/actions/auth/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const regionOptions = [
  { value: "brazil", label: "🇧🇷 Brazil" },
  { value: "united_states", label: "🌎 United States" },
  { value: "europe", label: "🇪🇺 Europe" },
  { value: "other", label: "🌐 Other" },
];

const registerSchema = z.object({
  name: z.string().min(2, "O nome deve conter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  region: z.enum(["brazil", "united_states", "europe", "other"]),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterTab() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      region: "united_states",
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerAction(data);

      toast.success("Registered successfully");
      router.push("/notes");
    } catch (err) {
      toast.error("Failed to register. Please check your data.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Create an account to start using Orange Notes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="register-name">Name</Label>
            <Input
              id="register-name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email Address</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-region">Region</Label>
            <select
              id="register-region"
              {...register("region")}
              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.region}
              defaultValue="other"
            >
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="text-xs text-red-500 mt-1">
                {errors.region.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
