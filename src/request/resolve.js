const $ = require("jquery")
const { get } = require("../util/localStorage")

module.exports = (uniqueToken) => {
    $.ajax({
        method: "post",
        url: "test",
        headers: {
            "Content-Type": "application/json",
        },
        dataType: "json",
        crossDomain: true,
        data: JSON.stringify({
            uniqueToken,
            messages: get("__rotic-bot")
        }),
    })
}