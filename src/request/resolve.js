const { get } = require("../util/localStorage")

module.exports = (uniqueToken, api, token, callBack) => {
    try {
        fetch("https://api.rotic.ir/ai/v4/resolve", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                unique_token: uniqueToken,
                messages: get(),
                token,
                api
            }),
        }).then(() => {
            callBack()
        }).catch(() => {
            callBack()
        })
    } catch (e) {
        callBack()
    }

}