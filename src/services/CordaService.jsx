import axios from 'axios'

const api_endpointa = process.env.REACT_APP_api_endpointa_PARTYA
const api_endpointab = process.env.REACT_APP_api_endpointa_PARTYB

class CordaService {

    getIOUs() {
        var config = {
            method: 'get',
            url: '/ious',
            baseURL: api_endpointa
        };
        return axios(config);
    }

    getStates() {
        var config = {
            method: 'get',
            url: '/states',
            baseURL: api_endpointa
        };
        return axios(config);
    }
    
    createIOU(state) {
        var config = {
            method: 'post',
            url: '/create-iou?iouValue='.concat(state.amount).concat('&partyName=O=PartyB,L=Makati,C=PH'),
            baseURL: api_endpointa
        };
        return axios(config);
    }
    
}

export default new CordaService()