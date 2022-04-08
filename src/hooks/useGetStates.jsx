import {useState,useEffect} from 'react';
import CordaSerivce from '../services/CordaService';

export default function useGetIOUs() {
    const [states, setStates] = useState([]);
    useEffect(() => {
        CordaSerivce.getStates()
            .then(
                response => {
                    setStates(response.data);
                }
            )
    }, []);
    return states;
}