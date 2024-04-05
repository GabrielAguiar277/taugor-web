import { Controller, useForm } from "react-hook-form";
import { PersonalEmployeeInfoData, personalEmployeeInfoSchema } from "../../domain/employee-management/schemas/PersonalEmployeeInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, TextField } from "@mui/material";
import { handleName, handleNumberBrazilFormat, handleTrim } from "../../utils/InputHandlers";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useEmployee } from "../../domain/employee-management/hooks/useEmployee";

export function EditEmployeeForm({userData, readOnly, onClose}: { userData: any, readOnly: boolean, onClose: any }) {

    const { control, formState: { errors }, handleSubmit } = useForm<PersonalEmployeeInfoData>({
        resolver: zodResolver(personalEmployeeInfoSchema),
        defaultValues: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            tell: userData.tell,
            gender: userData.gender,
            birthday: userData.birthday,
            adress: userData.adress,
            admissionAt: userData.admissionAt,
            imageUrl: userData.imageUrl,
            level: userData.level,
            role: userData.role,
            salary: userData.salary,
            sector: userData.sector
        }
    });

    const { editEmployee } = useEmployee();

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        let length = value.length;

        if(length > 2) {
            value = value.substring(0, length - 2) + "," + value.substring(length - 2);
        }

        return value;

    }

    const submitForm = ( data: PersonalEmployeeInfoData ) => {
        editEmployee(data, userData.id);
        onClose();
    }


    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-5">
                <Controller 
                    name="firstName"
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            autoComplete="given-name"
                            fullWidth
                            id="firstName"
                            label="Nome*"
                            variant="filled"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            onChange={(e) => field.onChange(handleName(e))}
                        />
                    )}
                />
            </div>
            <div className="mb-5">
                <Controller 
                    name="lastName"
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextField
                            {...field}
                            autoComplete="given-name"
                            fullWidth
                            id="lastName"
                            label="Sobrenome*"
                            variant="filled"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            onChange={(e) => field.onChange(handleName(e))}
                        />
                    )}
                />
            </div>

            <div className="mb-5">
                <Controller 
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            autoComplete="given-name"
                            fullWidth
                            id="lastName"
                            label="E-mail*"
                            variant="filled"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />
            </div>

            <div className="mb-5">
                <Controller 
                    name="tell"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            autoComplete="given-name"
                            fullWidth
                            id="tell"
                            label="Telefone*"
                            variant="filled"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.tell}
                            helperText={errors.tell?.message}
                            onChange={(e) => field.onChange(handleNumberBrazilFormat(e))}
                        />
                    )}
                />
            </div>
            <div className="mb-5">
                <Controller 
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            autoComplete="given-name"
                            fullWidth
                            id="gender"
                            label="Sexo*"
                            variant="filled"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.gender}
                            helperText={errors.gender?.message}
                        >
                            <MenuItem value="Male">Masculino</MenuItem>
                            <MenuItem value="Female">Feminino</MenuItem>
                        </TextField>
                    )}
                />
            </div>

            <div className="mb-5">
                <Controller 
                    name="adress"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            autoComplete="given-name"
                            fullWidth
                            id="adress"
                            label="Endereço*"
                            variant="filled"
                            multiline
                            placeholder="Avenida Paulista, 1234, São Paulo - SP - 07010 001"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.adress}
                            helperText={errors.adress?.message}

                            onChange={(e) => field.onChange(handleTrim(e))}
                        />
                    )}
                />
            </div>


            <div className="mb-5">
                <Controller 
                    name="birthday"
                    control={control}
                    render={({ field }) => (
                        <DesktopDatePicker 
                            {...field}
                            slotProps={{ 
                                
                                textField: {  
                                    variant: "filled", 
                                    fullWidth: true, 
                                    error: !!errors.birthday,
                                    helperText: errors.birthday?.message
                                }
                            }}  
                            label="Data de nascimento*"
                            value={field.value}
                            inputRef={field.ref}
                            disableFuture

                            onChange={field.onChange}

                            defaultValue={null}
                        />
                    )}
                />
            </div>

            <div className="mb-5">
                <Controller 
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="role"
                            label="Função*"
                            variant="filled"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.role}
                            helperText={errors.role?.message}
                            onChange={(e) => field.onChange(handleTrim(e))}
                        />
                    )}
                />
            </div>

            <div className="mb-5">
                <Controller 
                    name="level"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            fullWidth
                            id="level"
                            label="Nível*"
                            variant="filled"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.level}
                            helperText={errors.level?.message}
                        >
                            <MenuItem value="Junior">Júnior</MenuItem>
                            <MenuItem value="Mid-Level">Pleno</MenuItem>
                            <MenuItem value="Senior">Sênior</MenuItem>
                            <MenuItem value="Lead">Lead</MenuItem>
                        </TextField>
                    )}
                />
            </div>
            <div className="mb-5">
                <Controller 
                    name="sector"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="role"
                            label="Setor*"
                            variant="filled"
                            InputProps={{
                                readOnly
                            }}
                            

                            error={!!errors.sector}
                            helperText={errors.sector?.message}
                            onChange={(e) => field.onChange(handleTrim(e))}
                        />
                    )}
                />
            </div>

            <div className="mb-5">
                <Controller 
                    name="admissionAt"
                    control={control}
                    render={({ field }) => (
                        <DesktopDatePicker 
                            {...field}
                            slotProps={{ 
                                
                                textField: {  
                                    variant: "filled", 
                                    fullWidth: true, 
                                    error: !!errors.admissionAt,
                                    helperText: errors.admissionAt?.message
                                }
                            }}  
                            label="Admitido em*"
                            value={field.value}
                            inputRef={field.ref}
                            disableFuture

                            onChange={field.onChange}

                            defaultValue={null}
                        />
                    )}
                />
            </div>

            <div className="mb-5">
                <Controller 
                    name="salary"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="role"
                            label="Salário(R$)*"
                            variant="filled"
                            multiline
                            fullWidth
                            placeholder="0,00"
                            
                            onChange={(e) => field.onChange(handleAmount(e))}

                            error={!!errors.salary}
                            helperText={errors.salary?.message}
                        />
                    )}
                />
            </div>

            {
                !readOnly && (
                    <div className="flex gap-5">
                        <button type="button" className="w-full text-white rounded transition-all bg-red-500 hover:bg-red-700">Cancelar</button>
                        <button className="w-full bg-[#2480c4] hover:bg-[#2871a8] transition-all text-white py-2 rounded">Enviar</button>
                    </div>
                )
            }

        </form>
    );
}