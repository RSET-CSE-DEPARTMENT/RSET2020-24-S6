const Valstaff = (addUser) =>{
    const errors={}

    const tmail_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const tid_pattern =/^T[0-9]{5}$/
    if(!addUser.tname) {
        errors.tname = "Name required";
    }

    if(!addUser.tmail) {
        errors.tmail = "Email required";
    }
    else if(!tmail_pattern.test(addUser.tmail)) {
        errors.tmail ="Wrong Email Format";
    }

    if(!addUser.tid) {
        errors.tid = "Teacher Id required";
    }
    else if(!tid_pattern.test(addUser.tid)) {
        errors.tmail ="Wrong Format";
    }
    

    if(!addUser.password) {
        errors.password = "Password required";
    }

    if(!addUser.depid) {
        errors.depid = "Department Id required";
    }

    return errors;
}

export default Valstaff;