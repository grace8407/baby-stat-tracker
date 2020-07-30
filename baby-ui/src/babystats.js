import axios from 'axios'

function callBabyStatsAPI(request) { 
    return axios.post('http://localhost:10000/babystats', request)
}

export default callBabyStatsAPI

