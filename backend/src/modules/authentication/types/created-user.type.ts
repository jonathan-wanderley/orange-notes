export interface CreatedUserType {
  id?: string;
  email: string;
  name: string;
  roles: {
    role: {
      id: string;
      name: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
}
