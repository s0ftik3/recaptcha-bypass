const axios = require('axios')
const { load } = require('cheerio')
const { parse } = require('qs')

const { RELOAD_URL, POST_DATA } = require('./constants')

axios.interceptors.request.use(
    (config) => {
        config.headers['Accept'] = '*/*'
        config.headers['Connection'] = 'keep-alive'

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

if (!String.prototype.format) {
    String.prototype.format = function () {
        const args = arguments
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match
        })
    }
}

module.exports = class ReCaptchaBypass {
    constructor(anchor) {
        this._anchor = anchor
        this._params = parse(anchor)
    }

    /**
     * @returns {Promise<any>}
     */
    async bypass() {
        const reCaptchaToken = await this.#getReCaptchaToken()
        const data = this.#getPostData(reCaptchaToken, this._params)

        const reload = await axios({
            method: 'POST',
            url: RELOAD_URL + this._params.k,
            data,
        })

        if (!reload.data) throw new Error('reCaptcha did not send any response')

        reload.data = reload.data.replace(")]}'", '')
        return JSON.parse(reload.data)
    }

    /**
     * @returns {Promise<*|string>}
     */
    async #getReCaptchaToken() {
        const { data } = await axios({
            method: 'GET',
            url: this._anchor,
        })

        const $ = load(data)
        const reCaptchaToken = $('input[id="recaptcha-token"]').attr('value')

        if (!reCaptchaToken) throw new Error('reCaptcha token not found')

        return reCaptchaToken
    }

    /**
     * @param reCaptchaToken
     * @param params
     * @returns {string}
     */
    #getPostData(reCaptchaToken, params) {
        if (!params.v || !params.k || !params.co)
            throw new Error('params parameter must include all the listed params: v, k and co')

        return POST_DATA.format(params.v, reCaptchaToken, params.k, params.co)
    }
}
