import React from 'react';
import Popup from 'reactjs-popup';
import SunSwiftService from '../SunSwiftService';
import '../css/NewModal.css'

export default function NewModal(props) {

    
    function createUnit() {
        SunSwiftService.createUnit(props.data).then(
            response => {
                
            }
        ).catch(error => {

        })
        alert('Sign Up Successfully!');
    }

    function createApp() {
        SunSwiftService.createApp(props.advisor_code,props.data).then(
            response => {
                
            }
        ).catch(error => {

        })
        alert('Add app sucess!');
    }

    function getButton() {
        let button = null;
        if (props.type === "unit") {
            button = <button className="btn" onClick={createUnit}>{props.btn_trigger_name}</button>
        } else if (props.type === "advisor") {
            button = <button className="btn" onClick={createApp}>{props.btn_trigger_name}</button>
        }
        return (
            <>
                {button}
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