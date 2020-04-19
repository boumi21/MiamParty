function login(field) {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mobileReg = /^((\+)33|0)[1-9](\d{2}){4}$/;
    return (emailReg.test(field) || mobileReg.test(field)); 
}

function password(field) {
    const passwordReg = /^(?!.*[\s]).{8,50}$/;
    return passwordReg.test(field);
}

module.exports = {
    login,
    password
};