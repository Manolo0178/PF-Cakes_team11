const validation = (form, errorsState) => {
  const errors = { ...errorsState };
  
  // name
  if (!form.name) errors.name = "";
  else if (form.name.length < 3)
    errors.name = "Debe tener mas de 3 caracteres";
  else {
    errors.name = "";
  }
  //cellphone
  if (!form.contact) errors.contact = ""
  else if (form.contact.length < 6) errors.contact = "su numero de teléfono no es válido"
  else errors.contact = ""
  // email
  if (!form.email) errors.email = "";
  else if (form.email.length > 35)
    errors.email = "No debe superar 35 caracteres";
  else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(form.email)
  ) {
    errors.email = "su email no es válido";
  } else {
    errors.email = "";
  }
  // password
  if (!form.password) errors.password = "";
  else if (!/[A-Za-z0-9]/.test(form.password))
    errors.password = "La contraseña deben ser numeros y letras";
  else if (form.password.length < 6 || form.password.length > 20)
    errors.password = "Debe estar entre 6 a 20 caracteres";
  else {
    errors.password = "";
  }

  // confirm password
  if (!form.confirmpassword) {
    errors.confirmpassword = "";
  } else if (form.confirmpassword !== form.password) {
    errors.confirmpassword = "No coincide con la contraseña";
  } else {
    errors.confirmpassword = "";
  }

  return errors;
};

export default validation;

  // const validate = (form) => {
  //   // form name
  //   if (form.name.length > 0 && form.name.length < 4) {
  //     setErrors({ ...errors, name: "debe contener mas de 3 letras" });
  //   }
  //   if (form.name.length === 0 || form.name.length >= 4)
  //     setErrors({ ...errors, name: "" });
    
  //   //form email
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email))
  //     setErrors({ ...errors, email: "su email es inválido" });

  //   //form password
  //   if (form.password.length === 0 || form.password.length > 6)
  //     setErrors({ ...errors, password: "" });
  //   if (form.password.length < 6 && form.password.length > 0)
  //     setErrors({
  //       ...errors,
  //       password: "la contraseña debe de tener entre 6 y 10 caracteres",
  //     });

  //   //form confirm password
  //   if (form.confirmpassword !== form.password)
  //     setErrors({ ...errors, confirmpassword: "no coinciden las contraseñas" });

  //   if (form.confirmpassword == form.password)
  //     setErrors({ ...errors, confirmpassword: "" });

  //   //form celphone falta buscar regex
  //   if (form.contact.length > 0 && form.contact.length < 6)
  //     setErrors({ ...errors, contact: "telefono inválido" });
  //   if (form.contact.length > 6 || form.contact.length === 0)
  //     setErrors({ ...errors, contact: "" });
  // };

