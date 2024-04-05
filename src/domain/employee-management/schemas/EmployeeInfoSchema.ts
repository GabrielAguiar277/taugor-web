import { z } from "zod";

export const employeeInfoSchema = z.object({
    role: z.string().min(1, "Este campo é obrigatório"),
    level: z.enum(["Junior" , "Mid-Level", "Senior", "Lead"]),
    sector: z.string().min(1, "Este campo é obrigatório"),
    salary: z.string().min(1, "Esse campo é obrigatório"),
    admissionAt: z.date()
});

export type EmployeeInfoData = z.infer<typeof employeeInfoSchema>