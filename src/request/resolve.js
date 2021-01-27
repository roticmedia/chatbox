const $ = require("jquery")

module.exports = (uniqueToken) => {
    $.ajax({
        method: "post",
        url: "test",
        headers: {
            "Content-Type": "application/json",
        },
        dataType: "json",
        crossDomain: true,
        data: uniqueToken,
        success: (res) => {

        }
    })
}