import { Controller, useForm } from "react-hook-form";
import { employeeInfoSchema, EmployeeInfoData } from "../../domain/employee-management/schemas/EmployeeInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { FaArrowLeft } from "react-icons/fa6";

interface EmployeeFormProps {
    submit: (data: any) => void;
    goBack: () => void;
    load: boolean | undefined
}

export function EmployeeForm({submit, goBack, load}: EmployeeFormProps) {

    const { control, handleSubmit, formState: { errors } } = useForm<EmployeeInfoData>({
        resolver: zodResolver(employeeInfoSchema)
    });

    const submitForm = (data: EmployeeInfoData) => {
        submit(data);
        // window.location.reload()
    }

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        let length = value.length;

        if(length > 2) {
            value = value.substring(0, length - 2) + "," + value.substring(length - 2);
        }

        return value;

    }

    return(
        <form 
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col h-full py-10"
        >
            <div className="flex flex-grow gap-5">

                <div className="w-full">
                    <div className="mb-4">
                        <Controller 
                            name="role"
                            control={control}
                            defaultValue=''
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    id="role"
                                    label="Cargo*"
                                    variant="filled"
                                    

                                    error={!!errors.role}
                                    helperText={errors.role?.message}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <Controller 
                            name="level"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    autoComplete="given-name"
                                    fullWidth
                                    id="level"
                                    label="Nível*"
                                    variant="filled"
                                    defaultValue=""
                                    
                                    helperText={errors.level?.message}
                                    error={!!errors.level}
                                    
                                >
                                    <MenuItem value="Junior">Júnior</MenuItem>
                                    <MenuItem value="Mid-Level">Pleno</MenuItem>
                                    <MenuItem value="Senior">Sênior</MenuItem>
                                    <MenuItem value="Lead">Lead</MenuItem>
                                </TextField>
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <Controller 
                            name="sector"
                            control={control}
                            defaultValue=''
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    id="role"
                                    label="Setor*"
                                    variant="filled"
                                    

                                    error={!!errors.sector}
                                    helperText={errors.sector?.message}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4 flex w-full gap-3">
                        <div className="w-1/3">
                            <Controller 
                                name="salary"
                                control={control}
                                defaultValue=''
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
                        
                        <div className="w-full">
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
                    </div>


                </div>
            </div>

            <div className="flex justify-between">
                <button type="button" onClick={goBack} className="flex items-center gap-3 px-5 py-1 pl-0">
                    <FaArrowLeft color="#269eef"/>

                    <span className="text-[#269eef] font-medium text-base">Anterior</span>
                </button>

                <button className="bg-[#269eef] text-white font-medium rounded-full px-5 py-1">
                    {
                        load ? (
                            <><CircularProgress /> <span>Casdastrando...</span></>
                        ) : (
                            <>Cadastrar</>
                        )
                    }
                </button>
            </div>
        </form>
    );
}