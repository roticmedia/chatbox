const set = (message, response, buttons = []) => {
    localStorage.setItem(
        "__rotic-bot",
        JSON.stringify(
            [
                ...get(),
                {
                message,
                response,
                buttons
            },
            ]
        ))
}

const reset = (total) => {
    let messages = get();
    localStorage.setItem(
        "__rotic-bot",
        JSON.stringify(
            [
                ...messages.slice(-total)
            ]
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

module.exports = { get, set, reset }