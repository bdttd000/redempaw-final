import { formValidation } from "../constants/constants";

export const registerValidation = (registerData, setError) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
    setError(formValidation.wrongEmail);
    return false;
  }

  if (registerData.password1.length < 10) {
    setError(formValidation.shortPassword);
    return false;
  }

  if (registerData.password1.length > 25) {
    setError(formValidation.longPassword);
    return false;
  }

  if (!/[A-Z]/.test(registerData.password1)) {
    setError(formValidation.capitalLetterInPassword);
    return false;
  }

  if (!/[0-9]/.test(registerData.password1)) {
    setError(formValidation.numberInPassword);
    return false;
  }

  if (!/[!@#$%^&*]/.test(registerData.password1)) {
    setError(formValidation.specialCharInPassword);
    return false;
  }

  if (registerData.password1 !== registerData.password2) {
    setError(formValidation.differentPasswords);
    return false;
  }

  return true;
};
