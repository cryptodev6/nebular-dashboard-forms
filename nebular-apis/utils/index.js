const CryptoJS = require("crypto-js");

const twilioCredentials = {
    account_sid: "ACe17e7d9542294c3e20497680f05844b3",
    auth_token: "5e97c48a8eff49eede0555a2b493d7ed",
    from_no: '+13605161914'
}

const COUNTRY_CODE = '+91'

const FROM_EMAIL = "no-reply@housefi.io"
const SEND_GRID_KEY = "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"


const CRYPTO_SECRET_KEY = "yCDz9BzCxC16x127xz222yyD2BDx8D93A173C930Dx0xzA692D2D2C2z5zAA"

const encryptData = (str) => {
    var cipherText = CryptoJS.AES.encrypt(str, CRYPTO_SECRET_KEY).toString();
    return cipherText
}

const decryptData = (str) => {
    var bytes = CryptoJS.AES.decrypt(str, CRYPTO_SECRET_KEY);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}

module.exports = {
    twilioCredentials,
    COUNTRY_CODE,
    FROM_EMAIL,
    SEND_GRID_KEY,
    encryptData,
    decryptData
}
