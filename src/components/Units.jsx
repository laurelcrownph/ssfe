import React, { useState } from 'react';
import { POSITIONS } from '../constants';
import useGetUnits from '../hooks/useGetUnits';
import NewModal from './NewModal';

export default function Units() {

    const header_names = [
        'Unit Name',
        'Manager',
        'Man Power',
        'Total Apps'
    ];

    const headers = header_names.map(header =>
        <th key={header}>{header}</th>
    );

    const field_labels = [
        {
            key: 'unit_name',
            name: 'Unit Name',
            type: 'text'
        },
        {
            key: 'manager',
            name: 'Manager Name',
            type: 'text'
        },
        {
            key: 'advisor_code',
            name: 'Advisor Code',
            type: 'text'
        },
        {
            key: 'coding_date',
            name: 'Coding Date',
            type: 'date'
        }
    ]

    let rows = useGetUnits().map((unit, index) =>
        <tr key={index}>
            <td>{unit.unit_name}</td>
            <td>{unit.manager}</td>
            <td>{unit.advisors.length}</td>
            <td>{unit.total_apps}</td>
        </tr>
    )

    let [inputs, setInputs] = useState({
        advisor_code: "",
        coding_date: "",
        unit_name: "",
        manager: ""
    })

    let branch_manager = inputs.manager.split(" ")
    let data = {
        advisors: [
            {
                advisor_code: inputs.advisor_code,
                apps: [],
                awards: [],
                coding_date: inputs.coding_date,
                first_name: branch_manager[0],
                last_name: branch_manager[1],
                position: POSITIONS.BRANCH_MANAGER,
                unit_name: inputs.unit_name
            }
        ],
        man_power: 0,
        manager: inputs.manager,
        participations: [
            {
                participation_name: 0.0,
                participation_percent: 0.0
            }
        ],
        total_apps: 0,
        unit_name: inputs.unit_name
    }

    function generateOptions(props) {
        return (
            props.map(option =>
                <option key={option} value={option}>{option}</option>
            )
        )
    }


    let fields = field_labels.map(field =>{
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
                    <input key={field.key} id={field.key} className="input_text" type={field.type} name={field.key} onChange={handleChange} value={inputs[field.key]} placeholder={field.name} required />
                </>
            )
        } else if (field.type === 'date') {
            return (
                <>
                    <label key={field.name} className='filter_label'>{field.name}</label>
                    <input key={field.key} id={field.key} className="input_text" type={field.type} name={field.key} onChange={handleChange} value={inputs[field.key]} placeholder={field.name} required />
                </>
            )
        }
    }
    )

    function handleChange(event) {
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    return (
        <>
            <div className="container">
                <h1>Units</h1>
                <div className='btn_container_padding'>
                    <NewModal type={"unit"} header_name={"Create a New Unit"}
                        button_name={"New Unit"}
                        btn_trigger_name={"Create"}
                        fields={fields}
                        data={data} />
                    <NewModal type={"unit"} header_name={"Add Advisor"}
                        button_name={"Add Advisor to Unit"}
                        btn_trigger_name={"Add"}
                        fields={fields} />
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