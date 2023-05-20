import * as Yup from "yup"

export const addValidationRegisterSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .max(50),
    lastname: Yup.string()
      .required()
      .max(50),
    username: Yup.string()
      .required()
      .max(50),
    email: Yup.string()
      .required()
      .email()
      .matches(/^\S+@\S+\.\S+$/, 'The domain you entered is not valid !')
      .min(14),
    password: Yup.string()
      .required()
      .min(8)
      .test(
        'lowercase',
        'Password must contain at least one lowercase letter',
        value => {
          return /[a-z]/.test(value);
        }
      )
      .test(
        'uppercase',
        'Password must contain at least one uppercase letter',
        value => {
          return /[A-Z]/.test(value);
        }
      )
      .test(
        'digit',
        'Password must contain at least one digit',
        value => {
          return /\d/.test(value);
        }
      ),
    confirmpassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], "passworn dont some !")
  })


  export const addValidationLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email()
      .matches(/^\S+@\S+\.\S+$/, 'The domain you entered is not valid !')
      .min(3),
  })