const $ = require("jquery");
var $rotic = $.noConflict();


const checkGoftino = () => {
    try {
        window.addEventListener('goftino_ready', function () {
            $rotic("#box-widget-icon").click(() => {
                alert(1)
            })
        });
    } catch (err) {}
}

module.exports = {
    checkGoftino
}