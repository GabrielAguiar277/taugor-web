import { useEmployee } from "../domain/employee-management/hooks/useEmployee";
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { IoEyeSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { Modal } from "./Modal";
import { useState } from "react";
import { EmployeeData } from "../domain/employee-management/types/EmployeeData";
import { HistoryModal } from "./HistoryModal";

export function Overview({handleClick}: {handleClick: any}) {

    const { allEmployees } = useEmployee();
    const [selectedUser, setSelectedUser] = useState<EmployeeData | null | undefined>();
    const [selectedHistoryUser, setSelecHistorytedUser] = useState<EmployeeData | null | undefined>();

    return(
        <div className="h-full w-full pt-7">
            <div className="flex items-center mb-4">
                <h2 className="font-medium">Funcionários</h2>
                <div className="h-px bg-slate-500 w-full mx-3"/>
                <button
                    onClick={handleClick}
                    className="whitespace-nowrap px-5 py-2 bg-[#2480c4] transition-all rounded font-medium text-white hover:bg-[#2871a8]"
                >Criar funcionário</button>
            </div>

            <main>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cargo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contrato
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allEmployees.map((item: EmployeeData) => {

                                if(item.active){
                                    return (
                                        <tr className="bg-white border-b hover:bg-gray-50 " key={item.id}>
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                                <img className="w-10 h-10 rounded-full" src={item.imageUrl} alt={`${item.firstName} ${item.lastName}`}/>
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{`${item.firstName} ${item.lastName}`}</div>
                                                    <div className="font-normal text-gray-500">{item.email}</div>
                                                </div>  
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.role}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatDistance(
                                                    new Date(item.admissionAt),
                                                    new Date(),
                                                    {
                                                        addSuffix: true,
                                                        locale: ptBR
                                                    }
                                                )}
                                            </td>
                                            <td className="px-6 py-4 flex gap-1">
                                                
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(item);
                                                    }}
    
                                                    className="p-2 bg-[#2480c4] rounded hover:bg-[#2871a8] transition-all"
                                                >
                                                    <IoEyeSharp size={18} color="#fff"/>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelecHistorytedUser(item);
                                                    }}
    
                                                    className="p-2 bg-yellow-500 rounded hover:bg-yellow-600 transition-all"
                                                >
                                                    <FaHistory size={18} color="#fff"/>
                                                </button>
                                                
                                            </td>
                                        </tr>
                                    );
                                }

                            })
                        }
                  </tbody>
                </table>
            </main>

            <div className="flex items-center my-4">
                <h2 className="font-medium whitespace-nowrap">Funcionários demitidos</h2>
                <div className="h-px bg-slate-500 w-full mx-3"/>
            </div>

            <main>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cargo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contrato
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allEmployees.map((item: EmployeeData) => {

                                if(item.active === false){
                                    return (
                                        <tr className="bg-white border-b hover:bg-gray-50 " key={item.id}>
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                                <img className="w-10 h-10 rounded-full" src={item.imageUrl} alt={`${item.firstName} ${item.lastName}`}/>
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{`${item.firstName} ${item.lastName}`}</div>
                                                    <div className="font-normal text-gray-500">{item.email}</div>
                                                </div>  
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.role}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatDistance(
                                                    new Date(item.admissionAt),
                                                    new Date(),
                                                    {
                                                        addSuffix: true,
                                                        locale: ptBR
                                                    }
                                                )}
                                            </td>
                                            <td className="px-6 py-4 flex gap-1">
                                                
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(item);
                                                    }}
    
                                                    className="p-2 bg-[#2480c4] rounded hover:bg-[#2871a8] transition-all"
                                                >
                                                    <IoEyeSharp size={18} color="#fff"/>
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setSelecHistorytedUser(item);
                                                    }}
    
                                                    className="p-2 bg-yellow-500 rounded hover:bg-yellow-600 transition-all"
                                                >
                                                    <FaHistory size={18} color="#fff"/>
                                                </button>
                                                
                                            </td>
                                        </tr>
                                    );
                                }

                            })
                        }
                  </tbody>
                </table>
            </main>

            <Modal user={selectedUser} onClose={() => {
                setSelectedUser(null);
            }} />

            <HistoryModal user={selectedHistoryUser} onClose={() => {
                setSelecHistorytedUser(null);
            }} />
        </div>
    )
}