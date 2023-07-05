import Joi from "joi";
import validation from "./validation";
import validateFieldFromSchema from "./specificValidation";

const registerSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(100).required(),
  middleName: Joi.string().alphanum().min(2).max(100).allow("").required(),
  lastName: Joi.string().alphanum().min(2).max(100).required(),
  email: Joi.string()
    .min(6)
    .max(100)
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})"))
    .min(6)
    .max(20)
    .required()
    .label('Password')
    .messages({
      "string.pattern.base": 'The password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      "string.empty": 'Password cannot be empty.',
      "any.required": 'Password is required.',
    }),
  repeat_password: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
  phone: Joi.string().min(9).max(12).required(),
  country: Joi.string().min(6).max(100),
  imageUrl: Joi.string().min(6).max(100).allow(""),
  imageAlt: Joi.string().min(6).max(100).allow(""),
  state: Joi.string().min(2).max(100).allow(""),
  city: Joi.string().min(2).max(100).required(),
  street: Joi.string().min(2).max(100).required(),
  houseNumber: Joi.string().min(1).max(100).required(),
  zipCode: Joi.number().integer().positive().min(1).max(99999999),
  biz: Joi.bool().required(),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

const validateRegisterFieldFromSchema = (userInput, userFieldId) => {
  return (validateFieldFromSchema(registerSchema, userInput, userFieldId));
}

export default validateRegisterFieldFromSchema;

export {validateRegisterSchema, registerSchema};