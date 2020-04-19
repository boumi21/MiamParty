function regexLogin(field) {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const mobileReg = /^((\+)33|0)[1-9](\d{2}){4}$/
    return (emailReg.test(field) || mobileReg.test(field)) 
}

function regexPassword(field) {
    const passwordReg = /^(?!.*[\s]).{8,128}$/
    return passwordReg.test(field)
}

export default {
    regexLogin,
    regexPassword
}