import { useContext } from "react";
import { UploadContext } from "../context/UploadProvider";

export function useUpload(){
    return useContext(UploadContext);
}