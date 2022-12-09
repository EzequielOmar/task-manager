const signup_user_validationSchema = {
  firstName: {
    notEmpty: true,
    custom: {
      options: (value) => {
        if (value && value.length >= 2 && value.length <= 100) return true;
      },
    },
    errorMessage: "First name is invalid",
  },
  lastName: {
    notEmpty: true,
    custom: {
      options: (value) => {
        if (value && value.length >= 2 && value.length <= 100) return true;
      },
    },
    errorMessage: "Last name is invalid",
  },
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage: "Email is invalid",
  },
  password: {
    notEmpty: true,
    custom: {
      options: (value) => {
        if (value && value.length >= 6) return true;
      },
    },
    errorMessage: "Password is invalid, minimum 6 characters",
  },
};

module.exports = signup_user_validationSchema;
