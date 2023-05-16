const validation = (form, errorsState) => {
    const errors = { ...errorsState };
    
// name
  if (!form.name) errors.name = "";
  else if (form.name.length < 3) errors.name = "Debe de tener al menos 3 caracteres"
  else if (form.name.length > 35)
    errors.name = "No debe superar 35 caracteres";
   else {
    errors.name = "";
  }

//summary
    if (!form.summary) errors.summary = "";
    else if (form.summary.length < 20) errors.summary = "Debe tener al menos 20 caracteres"
    else errors.summary = ""

//description
    if (!form.description) errors.description = ""
    else if (form.description.length < 30) errors.description = "Debe tener al menos 30 caracteres"
    else errors.description = ""

  return errors;
};

export default validation;
