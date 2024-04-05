import { createContext, ReactNode } from "react";

interface DocumentContextType {
    downloadPDF: (employeeInfo: any) => void;
}

export const DocumentContext = createContext<DocumentContextType>({
    downloadPDF: () => {}
});

export function DocumentProvider({ children }: { children: ReactNode}){

    async function downloadPDF(employeeInfo: any) {
        fetch('http://localhost:5000/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                admissionAt: employeeInfo.admissionAt,
                address: employeeInfo.adress,
                birthday: employeeInfo.birthday,
                createdAt: employeeInfo.createdAt,
                email: employeeInfo.email,
                firstName: employeeInfo.firstName,
                gender: employeeInfo.gender,
                imageUrl: employeeInfo.imageUrl,
                lastName: employeeInfo.lastMame,
                level: employeeInfo.level,
                role: employeeInfo.role,
                salary: employeeInfo.salary,
                sector: employeeInfo.sector,
                tell: employeeInfo.tell
            })
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            // Aqui você pode, por exemplo, criar um link para download do PDF gerado.
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "generated-pdf.pdf";
            document.body.appendChild(a); // O link deve estar no body para ser clicável
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url); // Limpa a URL criada
        })
        .catch(error => console.error('There was a problem with your fetch operation:', error));
    }

    return(
        <DocumentContext.Provider 
            value={{
                downloadPDF
            }}
        >
            {children}
        </DocumentContext.Provider>
    )

}