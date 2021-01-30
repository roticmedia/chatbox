const set = (message, response, buttons = []) => {
    localStorage.setItem(
        "__rotic-bot",
        JSON.stringify(
            get().concat([{
                message,
                response,
                buttons
            }])
        ))
}

const get = () => {
    try {
        if (localStorage.getItem("__rotic-bot") !== null) {
            return JSON.parse(localStorage.getItem("__rotic-bot"))
        } else {
            return []
        }

    } catch (err) {
        return []
    }
}

module.exports = { get, set }