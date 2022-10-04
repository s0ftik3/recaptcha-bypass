# Google ReCaptcha V3 Bypass Node.js

[![telegram chat](https://img.shields.io/badge/Ask%20a%20Question-Telegram-blue)](https://t.me/vychs)

This option doesn't work on every website. You should test on each yourself. The first and the last thing you have to do is to find the 'anchor' link. You can open Chrome devtools (if you use Chrome but mostly it's called the same - devtools) and check 'Network' tab. What we are looking for is request with 'anchor' word in its name. Once you found it, put it in the class's constructor and have a try.

## Example
Let's say we have a website that uses reCaptcha V3. We go to 'Network' tab on devtools and see this request:

[![example](https://i.ibb.co/BnbZbHr/2022-10-04-21-17-50.jpg)](#)

all we need to do is to copy this URL and put it in constructor:

```javascript
const ReCaptchaBypass = require('recaptcha-bypass')
const reCaptchaBypass = new ReCaptchaBypass(/* HERE'S YOUR LINK YOU JUST COPIED */)
```

after that you can use `bypass()` method inside async function: 

```javascript
const response = await reCaptchaBypass.bypass()
console.log(response)
```

the return value must be an array of values.
