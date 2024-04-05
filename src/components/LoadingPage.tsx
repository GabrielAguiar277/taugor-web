import logo from "../assets/taugor.png";
import CircularProgress from '@mui/material/CircularProgress';

export function LoadingPage() {
    return (
        <div className="h-screen w-screen bg-white flex justify-center items-center flex-col">
            <img src={logo}/>
            <CircularProgress />
        </div>
    )
}