import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { EmployeeData } from "../domain/employee-management/types/EmployeeData";
import { FaUserAltSlash, FaUserEdit  } from "react-icons/fa";
import { useEmployee } from "../domain/employee-management/hooks/useEmployee";
import { EditEmployeeForm } from "./form/EditEmployeeForm";
import { useState } from "react";
import { useDocument } from "../domain/document-management/hooks/useDocument";

interface ModalProps {
    user: EmployeeData | null | undefined,
    onClose: () => void
}

export function Modal({user, onClose}: ModalProps){

    if(!user) return;

    const { dismissEmployee } = useEmployee();
    const { downloadPDF } = useDocument();
    const [readOnly, setReadOnly] = useState(true);

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
                        {`${user.firstName} ${user.lastName}`}
                    </h3>

                    <div className="cursor-pointer" onClick={onClose}>
                        <IoIosCloseCircleOutline size={30} color="#f87171" />
                    </div>
                </header>

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
                                    onClick={() => {
                                        downloadPDF(user)
                                    }}
                                    className="bg-red-500 hover:bg-red-700 py-1 px-2 rounded flex items-center gap-2 transition-all"
                                >
                                    <FaFilePdf color="#FFF"/>
                                    <span className="text-white">
                                        Fazer download
                                    </span>
                                </button>
                            )
                        }
                        {
                            (user.active && readOnly) && (
                                <button 
                                    onClick={() => dismissEmployee(user.id)}
                                    className="bg-red-500 hover:bg-red-700 py-1 px-2 rounded flex items-center gap-2 transition-all"
                                >
                                    <FaUserAltSlash color="#FFF"/>
                                    <span className="text-white">
                                        Demitir
                                    </span>
                                </button>
                            )
                        }
                        {
                            user.active && (
                                <button 
                                    onClick={() => {
                                        setReadOnly(false);
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-700 py-1 px-2 rounded flex items-center gap-2 transition-all"
                                >
                                    <FaUserEdit  color="#FFF"/>
                                    <span className="text-white">
                                        {readOnly ? "Editar" : "Editando"}
                                    </span>
                                </button>
                            )
                        }
                        
                    </div>

                    <div className="w-full px-5 py-4">
                        <EditEmployeeForm readOnly={readOnly} userData={user} onClose={onClose} />
                    </div>

                </main>
            </div>
        </div>
    )
}