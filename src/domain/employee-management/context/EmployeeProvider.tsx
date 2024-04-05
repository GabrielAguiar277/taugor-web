import { createContext, ReactNode, useEffect, useState } from "react";
import { useAuth } from "../../auth-management/context/AuthProvider";
import { collection, addDoc, query, where, getDocs, getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../database/firebaseconfig";
import { PersonalEmployeeInfoData } from "../schemas/PersonalEmployeeInfoSchema";

interface EmployeeContextType {

    allEmployees?: any
    getEmployeeById?: any

    createEmployee?: any
    editEmployee?: any

    dismissEmployee?: any

    getEmployeeHistory?: any

    load?: boolean

}

export const EmployeeContext = createContext<EmployeeContextType>({

});

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {

    const { currentUser } = useAuth();

    const [allEmployees, setAllEmployees] = useState<any[]>();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const fetchAllEmployees = async () => {
            let employees: any = [];

            if(currentUser) {
                const q = query(collection(db, "users", currentUser.uid, "employees"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    employees.push({ id: doc.id, ...doc.data() })
                });
            }
    
            setAllEmployees(employees);

            console.log(employees)
        }

        fetchAllEmployees();
    }, [currentUser, load]);


    async function createEmployee(user: any) {

        if(currentUser){

            setLoad(true)

            console.log("Criando...")

            await addDoc(collection(db, "users", currentUser.uid, "employees"), {
                ...user,
                createdAt: Date.now(),
                admissionAt: user.admissionAt.getTime(),
                birthday: user.birthday.getTime(),
                active: true,
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoad(false);
                window.location.reload()
            })
        }

    }

    async function editEmployee(employee: PersonalEmployeeInfoData, employeeId: string) {


        if(currentUser){
            setLoad(true)

            const employeeRef = doc(db, "users", currentUser.uid, "employees", employeeId);
            const docSnap = await getDoc(employeeRef);

            const employeeData = docSnap.data();
            const historyCollectionRef = collection(db, "users", currentUser.uid, "history");

            await addDoc(historyCollectionRef, {
                ...employeeData,
                originalId: employeeId,
                copiedAt: serverTimestamp()
            });

            try {
                const employeeRef = doc(db, "users", currentUser.uid, "employees", employeeId);
                

                await updateDoc(employeeRef, {
                    ...employee,
                    admissionAt: employee.admissionAt.getTime(),
                    birthday: employee.birthday.getTime() 
                    
                })

            } catch (error) {
                console.error(error)
            } finally {
                setLoad(false);
            }
            
        }
    }

    async function getEmployeeHistory(employeeId: string) {
        if(currentUser){

            const historyQuery = query(collection(db, "users", currentUser.uid, "history"), where("originalId", "==", employeeId));
            const querySnapshot = await getDocs(historyQuery);

            let history: any = [];

            querySnapshot.forEach(doc => {
                let data = doc.data();

                data.copiedAt = data.copiedAt ? new Date(data.copiedAt.seconds * 1000) : 'Sem data';
                history.push({...data, id: doc.id});

                
            });

            return history;
        }
    }

    async function dismissEmployee(employeeId: string) {

        
        if(currentUser){
            setLoad(true)

            try {
                const employeeRef = doc(db, "users", currentUser.uid, "employees", employeeId);
                

                await updateDoc(employeeRef, {
                    active: false
                })

            } catch (error) {
                console.error(error)
            } finally {
                setLoad(false);
                window.location.reload()
            }
            
        }
    }


    return (
        <EmployeeContext.Provider
            value={{
                allEmployees,
                createEmployee,
                dismissEmployee,
                editEmployee,
                getEmployeeHistory,
                load
            }}
        >
            { children }
        </EmployeeContext.Provider>
    )
}

