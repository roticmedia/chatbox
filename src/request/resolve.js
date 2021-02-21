const $ = require("jquery")
const { get } = require("../util/localStorage")

module.exports = (uniqueToken, callBack) => {
    try {
        $.ajax({
            method: "post",
            url: "https://api.rotic.ir/ai/resolve",
            headers: {
                "Content-Type": "application/json",
            },
            dataType: "json",
            crossDomain: true,
            data: JSON.stringify({
                unique_token: uniqueToken,
                messages: get()
            }),
            success: () => {
                callBack()
            },
            error: () => {
                callBack()
            }
        })
    } catch (e) {
        callBack()
    }

}