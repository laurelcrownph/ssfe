import {useState,useEffect} from 'react';
import SunSwiftService from '../SunSwiftService';

export default function useGetLogs() {
    const [logs, setLogs] = useState([]);
   
    /*,[] ran once useEffect*/
    useEffect(() => {
        SunSwiftService.getLogs()
            .then(
                response => {
                    setLogs(response.data);
                }
            )
    }, []);
    return logs;
}