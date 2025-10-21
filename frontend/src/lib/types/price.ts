export type Price = {
  id: string;
  nickname: string | null;
  currency: "USD" | "EUR" | "BRL";
  interval: "month" | "year" | undefined;
  amount: number;
  product: any;
};
