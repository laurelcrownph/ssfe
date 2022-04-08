import {useState,useEffect} from 'react';
import CordaSerivce from '../services/CordaService';

export default function useGetIOUs() {
    const [ious, setIOUs] = useState([]);
    useEffect(() => {
        CordaSerivce.getIOUs()
            .then(
                response => {
                    setIOUs(response.data);
                }
            )
    }, []);
    return ious;
}