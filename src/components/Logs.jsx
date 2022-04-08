import React from 'react';
import useGetIOUs from '../hooks/useGetIOUs';

export default function Logs() {
    let logs = useGetIOUs();
    
    const header_names = [
        'Log Date',
        'Unit Name',
        'Code',
        'Coding Date',
        'First Name',
        'Last Name',
        'Position',
        'Awards',
        'Total AC',
        'Total NSC'
    ];

    const headers = header_names.map(header =>
        <th key={header}>{header}</th>
    );
    
    let rows = logs.map((log,index) => 
        <tr key={index}>
            <td>{log.date}</td>
            <td>{log.advisor.unit_name}</td>
            <td>{log.advisor.advisor_code}</td>
            <td>{log.advisor.coding_date}</td>
            <td>{log.advisor.first_name}</td>
            <td>{log.advisor.last_name}</td>
            <td>{log.advisor.position}</td>
            <td>{log.advisor.awards.join(",")}</td>
        </tr>
    )

    return (
        <>
            <div className="container">
            <h1>Logs</h1>
            <table>
                <thead>
                <tr>
                    {headers}
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            </div>
        </>
    );
}