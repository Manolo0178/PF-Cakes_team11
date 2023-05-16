const validation = (userData,errorsState) =>{
    // username
    const errors = { ...errorsState }; 

    if(!userData.username) 
        errors.username ="";
    else if(userData.username.length>35) 
        errors.username ="No debe superar 35 caracteres";
    else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(userData.username)) {
        errors.username ="su email no es válido";
    } else {
        errors.username ="";
    }
        
    // password
    if(!userData.password)
        errors.password ="";
    else if(!/[A-Za-z0-9]/.test(userData.password))
        errors.password ="La contraseña deben ser numeros y letras";
    else if (userData.password.length<6 || userData.password.length>20)
        errors.password ="Debe estar entre 6 a 20 caracteres";
    else {
        errors.password ="";
    }

    return errors;
};

export default validation;