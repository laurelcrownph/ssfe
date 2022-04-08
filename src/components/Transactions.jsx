import React, { useState } from 'react';
import useGetIOUs from '../hooks/useGetIOUs'
import NewModal from './NewModal';
import { MODE_OF_PAYMENT,APP_TYPE,TIMEZONE, POSITIONS } from '../constants';

export default function Transactions() {

    const transactions = useGetIOUs();
    const filter_labels = [   
        {
            key: 'amount',
            name: 'Amount',
            type: 'text'
        },
        {
            key: 'party_name',
            name: 'Party Name',
            type: 'text'
        }
    ]
            
    const new_app_labels = [
        {
            key: 'amount',
            name: 'Amount',
            type: 'text'
        },
        {
            key: 'party_name',
            name: 'Party Name',
            type: 'text'
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

    let rows = transactions.map(transaction =>
        <tr key={transaction.ref.txhash}>
            <td>{transaction.ref.txhash}</td>
            <td>{transaction.state.data.lender}</td>
            <td>{transaction.state.data.borrower}</td>
            <td>{transaction.state.data.value}</td>
        </tr>
    )

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
        amount: app_inputs.amount,
        party_name: app_inputs.party_name
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
                {/* <h2>Filter By</h2>
                <div className="filter">
                    {filter_fields}
                </div>
                <button className='btn' onClick={filterTransactions}>SEARCH</button>    */}
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
                <div className='btn_container_padding'>
                    <NewModal type={"Transactions"}
                        header_name={"Add new Transaction"}
                        button_name={"New Transaction"}
                        btn_trigger_name={"Create"}
                        fields={new_app_fields}
                        data={data}
                        advisor_code={app_inputs.advisor_code} />
                </div>
            </div>
        </>
    );
}