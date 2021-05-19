const DOMpurify = require("dompurify")

const mk = require("../lib/markdown")
const { select } = require('../util/dom')

const text = () => DOMpurify.sanitize(select("#rotic-text").value.trim())
const markdown = (text) => DOMpurify.sanitize(mk(text))

module.exports = {
    text,
    markdown
}
