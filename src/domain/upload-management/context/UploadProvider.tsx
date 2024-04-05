import { createContext, ReactNode, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../../../database/firebaseconfig";

interface UploadContextType {
    uploadImage?: any
    loading?: boolean
}

export const UploadContext = createContext<UploadContextType>({
    uploadImage: null,
});

export const UploadProvide = ({ children }: { children: ReactNode }) => {

    const [loading, setLoading] = useState<boolean>(false);

    async function uploadImage(image: File): Promise<string> {

        setLoading(true);
        
        try {
            // const storageRef = ref(storage, `images/${Date.now()}${image.name}`);
            // uploadBytes(storageRef, image).then((snapshot) => {
            //     getDownloadURL(snapshot.ref).then((downloadURL) => {
            //         console.log(`url: ${downloadURL}`);
            //         return downloadURL;
            //     });
            // });
            const storageRef = ref(storage, `images/${Date.now()}${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref)

            return downloadURL;

        } catch ( error ) {
            console.error("Upload error");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return(
        <UploadContext.Provider
            value={{
                uploadImage,
                loading
            }}
        >
            { children }
        </UploadContext.Provider>
    );

}