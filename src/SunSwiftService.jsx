import axios from 'axios'

// const base_api_host='http://localhost:'
// const base_port= '8080'
const base_api_host='http://52.148.72.71:'
const base_port= '8089'
const base_path= '/sun-swift/1.0.0'
const base_url = base_api_host.concat(base_port).concat(base_path)

class SunSwiftService {
    getAdvisors(params) {
        var config = {
            method: 'get',
            url: base_url.concat('/advisors'),
            params: params
        };
        return axios(config)
    }

    getLogs() {
        return axios.get(`${base_url}/logs`);
    }

    getUnits(){
        return axios.get(`${base_url}/units`);
    }

    createUnit(unit) {
        return axios.post(`${base_url}/units`,unit);
    }

    createApp(advisor_code,app) {
        var config = {
            method: 'put',
            url: base_url.concat('/advisors/'),
            data: app
        };
        return axios(config);
    }

    generateReports(params){
        var config = {
            method: 'get',
            url: base_url.concat('/reports'),
            params: params
        };
        return axios(config)
    }
}

export default new SunSwiftService()