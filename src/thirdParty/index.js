const Goftino = require("./Goftino")
const Raychat = require("./Raychat")
const Crisp = require("./Crisp")
const Retain = require("./Retain")
const Intercome = require("./Intercome")
const SmartSupp = require("./SmartSupp")
const Imber = require('./Imber')

const handleThirdParty = (driver) => {
    try {
        if (driver === "goftino") {
            return Goftino;
        } else if (driver === "raychat") {
            return Raychat;
        } else if (driver === "crisp") {
            return Crisp;
        } else if (driver === "retain") {
            return Retain;
        } else if (driver === "intercome") {
            return Intercome;
        } else if (driver === "smartsupp") {
            return SmartSupp;
        } else if (driver === "imber") {
            return Imber;
        } else {
            return {
                hide: () => {},
                show: () => {},
                open: () => {},
                showInitMessage: () => {}
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    handleThirdParty
}
