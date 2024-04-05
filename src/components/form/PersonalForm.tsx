import { MenuItem, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaCircleArrowUp } from "react-icons/fa6";
import { useUpload } from "../../domain/upload-management/hooks/useUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { personalInfoSchema, PersonalInfoData } from "../../domain/employee-management/schemas/PersonalInfoSchema";
import { handleName, handleNumberBrazilFormat, handleTrim } from "../../utils/InputHandlers";


interface PersonalFormProps {
    
    submit: (data: PersonalInfoData) => void;
    goBack: () => void;
}

export function PersonalForm({ submit, goBack }: PersonalFormProps) {

    const { handleSubmit, control, formState: { errors }, setValue } = useForm<PersonalInfoData>({
        resolver: zodResolver(personalInfoSchema),
        
    });

    const submitForm = (data: PersonalInfoData) => {
        submit(data)
    }
    
    const [imagePreview, setImagePreview] = useState("");
    const { uploadImage, loading } = useUpload();
    const imageRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(e.target.files && e.target.files.length > 0){

            let reader = new FileReader();
            let file = e.target.files[0];
    
            reader.onloadend = () => {
                if(typeof reader.result === "string"){
                    setImagePreview(reader.result)
                }
            }
    
            reader.readAsDataURL(file);

            const imageURL = await uploadImage(file);
            console.log("------TESTE--------")
            console.log(imageURL);
            console.log(loading)
            setValue("imageUrl", imageURL);
        }
    }

    return(
        <form 
            className="flex flex-col justify-between flex-grow py-10"
            onSubmit={handleSubmit(submitForm)}
        >
            <div>
                {/* FORM HORIZONTAL */}
                <div className="w-full flex gap-5 mb-8">
                    <div className="flex flex-col w-full">
                        <div className="mb-8 w-full">

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
                                        

                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                        onChange={(e) => field.onChange(handleName(e))}
                                    />
                                )}
                            />

                            
                        </div>
                        <div className="mb-8 w-full">
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
                                        

                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        onChange={(e) => field.onChange(handleName(e))}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-full">
                            <Controller 
                                name="gender"
                                control={control}
                                rules={{ required: "Este campo é obrigatório" }}
                                render={({ field }) => (
                                    <>
                                        
                                        <TextField
                                            {...field}
                                            select
                                            autoComplete="given-name"
                                            fullWidth
                                            id="gender"
                                            label="Sexo*"
                                            variant="filled"
                                            defaultValue=""
                                            
                                            helperText={errors.gender?.message}
                                            error={!!errors.gender}
                                            
                                        >
                                            <MenuItem value="Male">Masculino</MenuItem>
                                            <MenuItem value="Female">Feminino</MenuItem>
                                        </TextField>
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex w-full h-full gap-5">
                            <div className="w-96 h-full rounded bg-gray-300 overflow-hidden flex justify-center items-center">
                                {
                                    imagePreview && (
                                        <img src={imagePreview} height="100%" />
                                    )
                                }
                            </div>

                            <div className="w-full">
                                <h2 className="font-medium mb-4">Foto de perfil</h2>

                                <div 
                                    className="cursor-pointer flex items-center gap-3"
                                    onClick={() => {
                                        imageRef.current?.click();
                                    }}
                                >
                                    <button type="button">
                                        <FaCircleArrowUp color="#269eef" size={30} />
                                    </button>
                                    <span className="text-[#269eef] font-medium text-sm">Adicionar foto</span>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEGUNDA PARTE DO FORM */}

                <div>
                    
                    <div className="mb-4">
                        <Controller 
                            name="adress"
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoComplete="given-name"
                                    fullWidth
                                    id="adress"
                                    label="Endereço*"
                                    multiline
                                    placeholder="Avenida Paulista, 1234, São Paulo - SP - 07010 001"
                                    variant="filled"
                                    

                                    error={!!errors.adress}
                                    helperText={errors.adress?.message}
                                    onChange={(e) => field.onChange(handleTrim(e))}
                                />
                            )}
                        />
                    </div>

                    <div>

                        <div className="w-full flex gap-5">
                            <div className="mb-4 w-full">
                                <Controller 
                                    name="email"
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (

                                        <TextField
                                            {...field}
                                            autoComplete="e-mail"
                                            fullWidth
                                            id="email"
                                            label="E-mail*"
                                            variant="filled"
                                            

                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                            </div>

                            <div className="w-full">
                                <Controller 
                                    name="tell"
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            autoComplete=""
                                            fullWidth
                                            id="tell"
                                            label="Telefone*"
                                            variant="filled"
                                            

                                            error={!!errors.tell}
                                            helperText={errors.tell?.message}
                                            onChange={(e) => field.onChange(handleNumberBrazilFormat(e))}
                                        />
                                    )}
                                />
                            </div>

                        </div>

                        <div className="w-full">
                            <div className="mb-4">
                                
                            </div>

                            <div>
                                <Controller 
                                    name="birthday"
                                    control={control}
                                    rules={{ required: true }}
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
                                            label="Data de nascimento"
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

                <input type="file" onChange={handleImageChange} ref={imageRef} hidden/>


            </div>

            <div className="flex justify-between">
                <button type="button" onClick={goBack} className="flex items-center gap-3 px-5 py-1 pl-0">
                    <FaArrowLeft color="#269eef"/>

                    <span className="text-[#269eef] font-medium text-base">Home</span>
                </button>

                <button className="bg-[#269eef] text-white font-medium rounded-full px-5 py-1">
                    Próximo
                </button>
            </div>
        </form>
        
    );
}