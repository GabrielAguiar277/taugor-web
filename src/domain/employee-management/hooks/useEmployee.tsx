import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeProvider";

export function useEmployee(){
    return useContext(EmployeeContext);
}