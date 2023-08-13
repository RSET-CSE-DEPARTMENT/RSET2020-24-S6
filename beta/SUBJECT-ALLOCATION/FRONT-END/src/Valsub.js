const Valsub = (addUser) =>{
    let errors={}

    if(!addUser.subid) {
        errors.subid = "Subject Id required"
    }

    if(!addUser.subname) {
        errors.subname = "Name required"
    }

    if(!addUser.depid) {
        errors.depid = "Department Id required"
    }

    
    return errors;
}

export default Valsub;