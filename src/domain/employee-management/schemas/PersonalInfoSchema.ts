import { z } from "zod";

export const personalInfoSchema = z.object({
    firstName: z.string().min(1, "Este campo é obrigatório"),
    lastName: z.string().min(1, "Este campo é obrigatório"),
    adress: z.string().min(1, "Este campo é obrigatório"),
    tell: z.string().min(1, "Este campo é obrigatório"),
    email: z.string().email("Digite um e-mail válido"),
    birthday: z.date(),
    imageUrl: z.string().optional(),
    gender: z.enum(["Male", "Female"])
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>