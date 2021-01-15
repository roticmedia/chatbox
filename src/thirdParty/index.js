const Goftino = require("./Goftino")

const handleThirdParty = (driver) => {
    try {
        if (driver === "goftino") {
            return Goftino;
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    handleThirdParty
}