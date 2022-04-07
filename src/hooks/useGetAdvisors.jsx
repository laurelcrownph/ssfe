import {useState,useEffect} from 'react';
import SunSwiftService from '../SunSwiftService';

export default function useGetAdvisors() {
    const [advisors, setAdvisors] = useState([]);
   
    /*,[] ran once useEffect*/
    useEffect(() => {
        SunSwiftService.getAdvisors()
            .then(
                response => {
                    setAdvisors(response.data);
                }
            )
    }, []);
    return advisors;
}