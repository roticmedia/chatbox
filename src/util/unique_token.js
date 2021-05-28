const { v4 } = require('uuid')
const axios = require('axios')

const unique_token = async () => {
    axios({
        method: 'GET',
        url: 'https://api.ipify.org',

    }).then((response) => {
        console.log(response.data  + new Date().getTime())  ;
    }).catch((err) => {
        console.log(err)
        return v4() + new Date().getTime() ;
    })
}

module.exports = unique_token;