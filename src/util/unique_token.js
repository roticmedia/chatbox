const $ = require("jquery")

const unique_token = async () => {
    let response = 0;
    await $.ajax({
        method: "get",
        url: "https://api.ipify.org",
        success: function (res) {
            response =  res + "**" + new Date().getTime()
        }
    })

    return response;
}

module.exports = unique_token;