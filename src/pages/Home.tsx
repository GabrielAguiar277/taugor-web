import { useState } from "react";
import { Header } from "../components/Header";
import { Overview } from "../components/Overview";
import { CreateEmployeeForm } from "../components/CreateEmployeeForm";

export function Home(){

    const [page, setPage] = useState("Overview");

    const RenderPage = () => {
        switch (page) {
            case "Overview":
                return <Overview handleClick={() => {setPage("CreateEmployeeForm")}} />;
                break;
            case "CreateEmployeeForm":
                return <CreateEmployeeForm />;
                break;
        }
    }

    return(
        <>
            <Header />
            
            <main 
                style={{ 
                    height: "calc(100vh - 72px)",
                }} 
                className="w-full flex overflow-hidden px-28"
            >

                {/* <section style={{ flex: "0 0 auto" }} className="w-full bg-blue-400 px-28">
                    <Overview />
                </section>

                <section 
                    style={{ 
                        flex: "0 0 auto",
                        marginRight: "100%"
                    }} 
                    className="w-full bg-green-400 px-28"
                >
                    <CreateEmployeeForm />
                </section> */}

                <RenderPage />

            </main>
        </>
    );
}