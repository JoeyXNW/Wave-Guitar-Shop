export const validate = (element, formData = []) => {
  let error = [true, ""];
  if (!element.validation.required) return error;

  let valid = element.value.trim() !== "";
  let message = `${!valid ? "This field is required" : ""}`;

  if (valid && element.validation.email) {
    valid = /\S+@\S+\.\S+/.test(element.value);
    message = `${!valid ? "Must be a valid email" : ""}`;
  }

  if (element.validation.confirm) {
    valid = element.value.trim() === formData[element.validation.confirm].value;
    message = `${!valid ? "Password do not match" : ""}`;
  }

  error = [valid, message];
  return error;
};

export const update = (element, formData, formName) => {
  const newFormData = { ...formData };
  const newElement = { ...newFormData[element.id] };
  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormData[element.id] = newElement;
  return newFormData;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (key === "passwordConfirm") continue;
    dataToSubmit[key] = formData[key].value;
  }
  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  for (let key in formData) {
    if (!formData[key].valid) return false;
  }
  return true;
};

export const populateOptionFields = (formData, arrayData = [], field) => {
  const newArray = [];

  arrayData.forEach(item => newArray.push({ key: item._id, value: item.name }));
  formData[field].config.options = newArray;
  return formData;
};
