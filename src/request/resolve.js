const $ = require("jquery")
const { get } = require("../util/localStorage")

module.exports = (uniqueToken, api, token, callBack) => {
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
                messages: get(),
                token,
                api
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