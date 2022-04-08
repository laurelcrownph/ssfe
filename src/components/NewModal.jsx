import React from 'react';
import Popup from 'reactjs-popup';
import CordaSerivce from '../services/CordaService';
import '../css/NewModal.css'

export default function NewModal(props) {

    
    function createUnit() {
        CordaSerivce.createIOU(props.data).then(
            response => {
                
            }
        ).catch(error => {

        })
        alert('Transaction Created!');
    }

    function createApp() {
        CordaSerivce.createApp(props.advisor_code,props.data).then(
            response => {
                
            }
        ).catch(error => {

        })
        alert('Add app sucess!');
    }

    function getButton() {
        return (
            <>
                <button className="btn" onClick={createUnit}>{props.btn_trigger_name}</button>
            </>
        )
    }

    return (
        <>
            <Popup trigger={<button className='btn'>{props.button_name}</button>} position="right center"
                modal
                nested>
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <h1 className="header">{props.header_name}</h1>
                        <div className="content">
                            {props.type === "unit"} {
                                props.fields
                            }
                        </div>
                        <div className="actions">
                            <Popup
                                trigger={getButton()}
                                position="top center"
                                nested
                            >
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                                    magni omnis delectus nemo, maxime molestiae dolorem numquam
                                    mollitia, voluptate ea, accusamus excepturi deleniti ratione
                                    sapiente! Laudantium, aperiam doloribus. Odit, aut.
                                </span>
                            </Popup>
                            <button
                                className="btn"
                                onClick={() => {
                                    close();
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        </>
    );
}