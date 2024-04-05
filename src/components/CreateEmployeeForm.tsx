import { useState } from "react";
import { PersonalForm } from "./form/PersonalForm";
import { EmployeeForm } from "./form/EmployeeForm";
import { PersonalInfoData } from "../domain/employee-management/schemas/PersonalInfoSchema";
import { EmployeeInfoData } from "../domain/employee-management/schemas/EmployeeInfoSchema";
import { useEmployee } from "../domain/employee-management/hooks/useEmployee";

export function CreateEmployeeForm() {



    const [step, setStep] = useState(1);

    const [personalForm, setPersonalForm] = useState<PersonalInfoData>();

    const { createEmployee, load } = useEmployee();

    return (
        <>
            <div className="h-full w-full pt-7 flex flex-col">
                {
                    step === 1 && ( <PersonalForm  submit={(data: PersonalInfoData) => {
                        setStep(2);
                        setPersonalForm(data);

                    }} goBack={() => {window.location.reload()}} />)
                }
                {
                    step === 2 && (<EmployeeForm submit={(data: EmployeeInfoData) => {

                        createEmployee({...personalForm, ...data})
                    }} goBack={() => setStep(1)} load={load}/>)
                }
            </div>
        </>
    );
}