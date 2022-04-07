import React, { useState } from 'react';
import '../css/Reports.css'
import SunSwiftService from '../SunSwiftService';
import { MODE_OF_PAYMENT, APP_TYPE, POSITIONS, TIMEZONE } from '../constants';

export default function Reports() {
    let [report, setReport] = useState([])

    const labels = [
        {
            key: 'start_date',
            name: 'Start Date',
            type: 'date'
        },
        {
            key: 'end_date',
            name: 'End Date',
            type: 'date'
        },
        {
            key: 'settled_date',
            name: 'Settled Date',
            type: 'date'
        },
        {
            key: 'submitted_date',
            name: 'Submitted Date',
            type: 'date'
        },
        {
            key: 'product_name',
            name: 'Plan',
            type: 'select',
            options: [
                "Sun FlexiLink",
                "Sun MaxiLink",
                "Sun MaxiOne",
                "Sun Smarter Elit"
            ]
        },
        {
            key: 'ac',
            name: 'AC',
            type: 'text'
        },
        {
            key: 'lives',
            name: 'Lives',
            type: 'text'
        }
    ]

    let [inputs, setInputs] = useState({
        start_date: '',
        end_date: '',
        submitted_date: ''
    });

    const header_names = [
        'Unit Name',
        'Manager',
        'Coding Date',
        'Code',
        'Position',
        'First Name',
        'Last Name',
        'Awards',
        'Total Apps',
        'Total AC',
        'Total NSC'
    ];

    let fields = labels.map(field => {
        if (field.type === 'select') {
            return (
                <>
                    <label key={field.name} className='filter_label'>{field.name}</label>
                    <div className='align_center'>
                        <select className='filter_select' id={field.key} key={field.key} name={field.name} onChange={handleChange} value={inputs[field.key]}>
                            {generateOptions(field.options)}
                        </select>
                    </div>
                </>
            )

        } else if (field.type === 'text') {
            return (
                <>
                    <input key={field.key} id={field.key} className="filter_input" type={field.type} name={field.key} onChange={handleChange} value={inputs[field.key]} placeholder={field.name} required />
                </>
            )
        } else if (field.type === 'date') {
            return (
                <>
                    <label key={field.name} className='filter_label'>{field.name}</label>
                    <input key={field.key} id={field.key} className="filter_input" type={field.type} name={field.key} onChange={handleChange} value={inputs[field.key]} placeholder={field.name} required />
                </>
            )
        }
    }
    )

    function generateOptions(props) {
        return (
            props.map(option =>
                <option key={option} value={option}>{option}</option>
            )
        )
    }

    const headers = header_names.map(header =>
        <th>{header}</th>
    );

    let rows = report.map(advisor =>
        <tr key={advisor.advisor_code}>
            <td>{advisor.unit_name}</td>
            <td>{advisor.advisor_code}</td>
            <td>{advisor.coding_date}</td>
            <td>{advisor.first_name}</td>
            <td>{advisor.last_name}</td>
            <td>{advisor.position}</td>
            <td>{advisor.awards.join(",")}</td>
            <td>{advisor.apps.length}</td>
        </tr>
    )

    let query_params = {
        start_date: inputs.start_date.concat(TIMEZONE.TZ_ASIA),
        end_date: inputs.end_date.concat(TIMEZONE.TZ_ASIA),
        submitted_date: inputs.submitted_date.concat(TIMEZONE.TZ_ASIA)
    }

    function generateReports() {
        SunSwiftService.generateReports(query_params)
            .then(
                response => {
                    console.log(response.data)
                    setReport(response.data);
                }
            )
        alert('Report Generated!')
    }

    function handleChange(event) {
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }


    return (
        <>
            <div className="container">
                <h1>Reports</h1>
                <button className='btn' onClick={generateReports}>GENERATE</button>
                <div className="filter">
                    {fields}
                </div>
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