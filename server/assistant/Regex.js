function login(field) {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const usernameReg = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    return (emailReg.test(field) || usernameReg.test(field)); 
}

function password(field) {
    const passwordReg = /^(?!.*[\s]).{8,50}$/;
    return passwordReg.test(field);
}

module.exports = {
    login,
    password
};