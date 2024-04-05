export interface EmployeeData {
    active: boolean;
    admissionAt: number;
    adress: string;
    birthday: {
      seconds: number;
      nanoseconds: number;
    };
    createdAt: number;
    email: string;
    firstName: string;
    gender: "Masculino" | "Feminino";
    id: string;
    imageUrl: string;
    lastName: string;
    level: string;
    role: string;
    salary: string;
    sector: string;
    tell: string;
  }