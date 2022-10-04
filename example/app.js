const ReCaptchaBypass = require('../src/recaptcha-bypass')
const reCaptchaBypass = new ReCaptchaBypass(
    'https://www.google.com/recaptcha/api2/anchor' + '' // your anchor payload
)

;(async () => {
    try {
        const response = await reCaptchaBypass.bypass()

        console.log(response)
    } catch (err) {
        console.error(err)
    }
})()
