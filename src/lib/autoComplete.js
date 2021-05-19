const { v4 } = require('uuid')

const { select, selectAll } = require('../util/dom')
const append = require('../ui/append')

const autoComplete = () => {
    select('#rotic-auto .rotic-loading-container').style.display = 'block';
    select('#rotic-auto').style.display = 'block'

    if (selectAll('.rotic-auto-message').length !== 0) {
        selectAll('.rotic-auto-message').forEach((node) => {
            node.remove()
        })
    }

    fetch("https://api.rotic.ir/recommender", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify({
            text: select('#rotic-text').value.trim(),
        }),
    })
        .then(response => response.json())
        .then((res) => {
            if (res.response) {
                select('#rotic-auto .rotic-loading-container').style.display = 'none';

                if (selectAll('.rotic-auto-message').length !== 0) {
                    selectAll('.rotic-auto-message').forEach((node) => {
                        node.remove()
                    })
                }

                res.response.forEach((text) => {
                    select('#rotic-auto').insertAdjacentHTML('beforeend', append.autoComplete(text, v4()))
                })
            }
        })
}


module.exports = autoComplete;