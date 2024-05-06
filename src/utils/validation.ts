// validationUtils.js

export const validateUsername = (username: string ) => {
    const minLength = 3;
    const usernameRegex = /^[A-Za-z]+$/;
  
    if (!username) {
      return "Username is required";
    }
  
    if (username.length < minLength) {
      return `Username should have at least ${minLength} letters`;
    }
  
    if (!usernameRegex.test(username)) {
      return "Username should only contain letters";
    }
  
    if (/\s/.test(username)) {
      return "Username should not contain empty space";
    }
  
    return true; // Return true if validation passes
  };
  


export const validateEmail = (email: string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email) ? true : "Invalid email format";
};


export const validatePassword = (val: string) => {
    if (typeof val !== "string") return false;
  
    const validations = [
      { condition: val.length >= 6, message: "Password should be at least 6 characters long." },
      { condition: /\d/.test(val), message: "Password should contain at least one digit." },
      { condition: /[a-z]/.test(val), message: "Password should contain at least one alphabet." },
      { condition: /[!@#$%^&*(),.?":{}|<>]/.test(val), message: "Password should contain at least one special character." },
      { condition: !/\s/.test(val), message: "Password should not contain spaces." }
    ];
  
    const failedValidation = validations.find(validation => !validation.condition);
    return failedValidation ? failedValidation.message : true;
  };

  