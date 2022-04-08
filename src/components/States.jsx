import React, { useState } from 'react';
import useGetStates from '../hooks/useGetStates'
import NewModal from './NewModal';
import { MODE_OF_PAYMENT,APP_TYPE,TIMEZONE, POSITIONS } from '../constants';

export default function States() {

    const states = useGetStates();
    const filter_labels = [
        {
            key: 'coding_date',
            name: 'Transaction Date',
            type: 'date'
        },
        {
            key: 'unit_name',
            name: 'Transaction Item',
            type: 'text',
        },
        {
            key: 'position',
            name: 'Position',
            type: 'select',
            options: [
                POSITIONS.ADVISOR,
                POSITIONS.MANAGER_CANDIDATE,
                POSITIONS.UNIT_MANAGER,
                POSITIONS.SALES_MANAGER,
                POSITIONS.BRANCH_MANAGER
            ]
        }, 
        {
            key: 'awards',
            name: 'Awards',
            type: 'select',
            options: [
                POSITIONS.ADVISOR,
                POSITIONS.MANAGER_CANDIDATE,
                POSITIONS.UNIT_MANAGER,
                POSITIONS.SALES_MANAGER,
                POSITIONS.BRANCH_MANAGER
            ]
        },    
        {
            key: 'advisor_code',
            name: 'Advisor Code',
            type: 'text'
        },
        {
            key: 'first_name',
            name: 'First Name',
            type: 'text'
        },
        {
            key: 'last_name',
            name: 'Last Name',
            type: 'text'
        }
    ]
            
    const new_app_labels = [
        {
            key: 'advisor_code',
            name: 'Advisor Code',
            type: 'text'
        },        
        {
            key: 'app_type',
            name: 'App Type',
            type: 'select',
            options: [
                APP_TYPE.APP,
                APP_TYPE.E_APP
            ]
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
            key: 'mode_of_payment',
            name: 'Mode of Payment',
            type: 'select',
            options: [
                MODE_OF_PAYMENT.ONE_TIME,
                MODE_OF_PAYMENT.ANNUAL,
                MODE_OF_PAYMENT.SEMI_ANNUAL,
                MODE_OF_PAYMENT.QUARTERLY
            ]
        },
        {
            key: 'app_count',
            name: 'App Count',
            type: 'number'
        },
        {
            key: 'face_amount',
            name: 'Face Amount',
            type: 'text'
        },
        {
            key: 'serial_number',
            name: 'Serial Number',
            type: 'text'
        },
        {
            key: 'policy_number',
            name: 'Policy Number',
            type: 'text'
        },
        {
            key: 'premium_paid',
            name: 'Premium Paid',
            type: 'text'
        }, 
        {
            key: 'owner_name',
            name: 'Owner Name',
            type: 'text'
        },
        {
            key: 'insured_name',
            name: 'Insured Name',
            type: 'text'
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
        }
    ]

    const header_names = [
        'Transaction ID',
        'Lender',
        'Borrower',
        'Value'
    ];

    const headers = header_names.map(header =>
        <th key={header}>{header}</th>
    );

    
    let [filters, setFilters] = useState({
        advisor_code: '',
        coding_date: '',
        first_name: '',
        last_name: '',
        position: ''
    })


    let query_params = {
        advisor_code: filters.advisor_code,
        coding_date: filters.coding_date,
        position: filters.position,
        first_name: filters.first_name,
        last_name: filters.last_name,
    }

    console.log(states)
    let rows = states.map(transaction =>
        <tr key={transaction.ref.txhash}>
            <td>{transaction.ref.txhash}</td>
            <td>{transaction.state.data.lender}</td>
            <td>{transaction.state.data.borrower}</td>
            <td>{transaction.state.data.value}</td>
        </tr>
    )

    // let rows = states.map(advisor =>
    //     <tr key="test">
    //         <td>"test"</td>
    //     </tr>
    // )


    let [app_inputs, setInputs] = useState({
        advisor_code: "",
        app_count: "",
        app_type: "",
        face_amount: "",
        mode_of_payment: "",
        policy_number: "",
        premium_paid: "",
        product_name: "",
        serial_number: "",
        settled_date: "",
        submitted_date: "",
        insured_name: "",
        owner_name:""
    })

    let data = {
        advisor_code: app_inputs.advisor_code,
        serial_number: app_inputs.serial_number,
        policy_number: app_inputs.policy_number,
        settled_date: app_inputs.settled_date.concat(TIMEZONE.TZ_ASIA),
        submitted_date: app_inputs.submitted_date.concat(TIMEZONE.TZ_ASIA),
        product_name: app_inputs.product_name,
        face_amount: app_inputs.face_amount,
        owner: {
            first_name: app_inputs.owner_name,
            last_name: app_inputs.owner_name,
            birth_date: "",
            smoker: false
        },
        insured: {
            first_name: app_inputs.insured_name,
            last_name: app_inputs.insured_name,
            birth_date: "",
            smoker: false
        },
        mode_of_payment: app_inputs.mode_of_payment,
        app_type: app_inputs.app_type,
        premium_paid: app_inputs.premium_paid,
        app_count: app_inputs.app_count,
        advisor_commision: 0.0,
        advisor_nsc: 0.0
    }

    let new_app_fields = new_app_labels.map(field =>{
        if (field.type === 'select') {
            return (
                <>
                    <label key={field.name} className='filter_label'>{field.name}</label>
                    <div className='align_center'>
                        <select className='select' id={field.key} key={field.key} name={field.name} onChange={handleChange} value={app_inputs[field.key]}>
                            {generateOptions(field.options)}
                        </select>
                    </div>
                </>
            )

        } else if (field.type === 'text') {
            return (
                <>
                    <input key={field.key} id={field.key} className="input_text" type={field.type} name={field.key} onChange={handleChange} value={app_inputs[field.key]} placeholder={field.name} required />
                </>
            )
        } else if (field.type === 'date') {
            return (
                <>
                    <label key={field.name} className='filter_label'>{field.name}</label>
                    <input key={field.key} id={field.key} className="input_text" type={field.type} name={field.key} onChange={handleChange} value={app_inputs[field.key]} placeholder={field.name} required />
                </>
            )
        }
    }
    )

    let filter_fields = filter_labels.map(field => {
        if (field.type === 'select') {
            return (
                <>
                    <label key={field.name} className='filter_label'>{field.name}</label>
                    <div className='align_center'>
                        <select className='filter_select' id={field.key} key={field.key} name={field.name} onChange={handleChange} value={filters[field.key]}>
                            {generateOptions(field.options)}
                        </select>
                    </div>
                </>
            )

        } else if (field.type === 'text') {
            return (
                <>
                    <input key={field.key} id={field.key} className="filter_input" type={field.type} name={field.key} onChange={handleChange} value={filters[field.key]} placeholder={field.name} required />
                </>
            )
        } else if (field.type === 'date') {
            return (
                <>
                    <label key={field.name} className='filter_label'>{field.name}</label>
                    <input key={field.key} id={field.key} className="filter_input" type={field.type} name={field.key} onChange={handleChange} value={filters[field.key]} placeholder={field.name} required />
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

    function handleChange(event) {
        if (event.target.id === 'mode_of_payment') {
            setInputs(inputs => ({ ...inputs, [event.target.id]: document.getElementById("mode_of_payment").value }));
        }
        if (event.target.id === 'product_name') {
            setInputs(inputs => ({ ...inputs, [event.target.id]: document.getElementById("product_name").value }));
        }
        if (event.target.id === 'app_type') {
            setInputs(inputs => ({ ...inputs, [event.target.id]: document.getElementById("app_type").value }));
        }
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
        setFilters(filters => ({ ...filters, [event.target.name]: event.target.value }));
    }

    return (
        <>
            <div className="container">
                <h1>States</h1>
                <div className='btn_container_padding'>
                    <NewModal type={"States"}
                        header_name={"Add new Transaction"}
                        button_name={"New Transaction"}
                        btn_trigger_name={"Create"}
                        fields={new_app_fields}
                        data={data}
                        advisor_code={app_inputs.advisor_code} />
                </div>
                {/* <h2>Filter By</h2>
                <div className="filter">
                    {filter_fields}
                </div>
                <button className='btn' onClick={filterStates}>SEARCH</button>    */}
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