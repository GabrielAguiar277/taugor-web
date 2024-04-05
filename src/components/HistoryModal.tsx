import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { EmployeeData } from "../domain/employee-management/types/EmployeeData";
import { useEmployee } from "../domain/employee-management/hooks/useEmployee";
import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useDocument } from "../domain/document-management/hooks/useDocument";

interface ModalProps {
    user: EmployeeData | null | undefined,
    onClose: () => void
}

export function HistoryModal({user, onClose}: ModalProps){

    if(!user) return;

    const { getEmployeeHistory } = useEmployee();
    const readOnly = true;
    const { downloadPDF } = useDocument();

    const [userForm, setUserForm] = useState<EmployeeData | undefined | null>();
    const [userHistory, setUserHistory] = useState<any>();

    useEffect(() => {
        const fetchHistory = async () => {
            const history = await getEmployeeHistory(user.id);
            setUserHistory(history);
        }
        fetchHistory();
    }, [])

    return(
        <div 
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
            style={{background: "rgb(0, 0, 0, 0.5)"}} 
            className="absolute top-0 left-0 right-0 bottom-0 flex justify-end"
        >
            <div className="h-full w-[40%] bg-white flex flex-col" onClick={(e) => e.stopPropagation()}>
                <header className="flex justify-between items-center px-5 py-3 border-b">
                    <h3 className="font-medium text-lg">
                        Histórico de {`${user.firstName} ${user.lastName}`}
                    </h3>

                    <div className="cursor-pointer" onClick={onClose}>
                        <IoIosCloseCircleOutline size={30} color="#f87171" />
                    </div>
                </header>

                <main className="flex flex-wrap gap-2 w-full">
                    
                </main>

                <main className="text-gray-500 flex-grow overflow-y-auto">
                    <div className="w-full flex justify-center items-center py-10 border-b">
                        <div className="flex flex-col justify-center items-center">
                            <div className="px-14 mb-3">
                                <img className="rounded-full" src={user.imageUrl}/>
                            </div>
                            <strong className="text-black">{`${user.firstName} ${user.lastName}`}</strong>
                            <span>{user.email}</span>
                            <span>{user.tell}</span>
                        </div>
                    </div>

                    <div className="py-5 px-5 border-b flex gap-2">
                        {
                            readOnly && (
                                <button 
                                    onClick={() => downloadPDF(userForm)}
                                    className="bg-red-500 hover:bg-red-700 py-1 px-2 rounded flex items-center gap-2 transition-all"
                                >
                                    <FaFilePdf color="#FFF"/>
                                    <span className="text-white">
                                        Fazer download
                                    </span>
                                </button>
                            )
                        }

                        <TextField 
                            className=" transition-all rounded font-medium cursor-pointer text-black"
                            select
                            fullWidth
                        >
                            {
                                
                                userHistory?.map((item: EmployeeData) => {
                                    
                                    return (
                                        
                                        <MenuItem onClick={() => {
                                            setUserForm(item)
                                        }}>{item.id}</MenuItem>
                                        
                                    )
                                })
                                
                            }
                        </TextField>
                        
                        
                        
                    </div>

                    <div className="w-full px-5 py-4">
                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Nome"
                                
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.firstName}
                            />
                        </div>
                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Sobrenome" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.lastName}
                            />
                        </div>
                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="E-mail" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.email}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Telefone" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.tell}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Sexo" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.gender}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Endereço" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.adress}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Data de nascimento" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.birthday}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Função" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.role}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Nível" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.level}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Setor" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.sector}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Admitido em:" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.admissionAt}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField 
                                fullWidth 
                                variant="filled" 
                                label="Salário (R$)" 
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                value={userForm?.salary}
                            />
                        </div>

                    </div>

                </main>
            </div>
        </div>
    )
}