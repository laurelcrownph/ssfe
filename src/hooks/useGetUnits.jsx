import {useState,useEffect} from 'react';
import SunSwiftService from '../SunSwiftService';

export default function useGetUnits() {
    const [units, setUnits] = useState([]);
   
    /*,[] ran once useEffect*/
    useEffect(() => {
        SunSwiftService.getUnits()
            .then(
                response => {
                    setUnits(response.data);
                }
            )
    }, []);
    return units;
}