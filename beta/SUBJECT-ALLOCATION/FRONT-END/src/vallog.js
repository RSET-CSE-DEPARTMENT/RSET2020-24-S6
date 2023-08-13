const Vallog = (values) =>{
    let errors={}

    if(!values.aid) {
        errors.aid = "Admin Id required"
    }

    if(!values.password) {
        errors.password = "Password required"
    }

    return errors;
}

export default Vallog;