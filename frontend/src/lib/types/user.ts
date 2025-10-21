export default interface User {
  id: string;
  name: string;
  email: string;
  region: "brazil" | "united-states" | "europe" | "other";
  roles: string[];
}
