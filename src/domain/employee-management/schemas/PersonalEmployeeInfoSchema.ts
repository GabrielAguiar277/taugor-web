import { personalInfoSchema } from "./PersonalInfoSchema";
import { employeeInfoSchema } from "./EmployeeInfoSchema";
import { z } from "zod";

export const personalEmployeeInfoSchema = personalInfoSchema.merge(employeeInfoSchema);

export type PersonalEmployeeInfoData = z.infer<typeof personalEmployeeInfoSchema>