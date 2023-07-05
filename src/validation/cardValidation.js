import Joi from "joi";
import validation from "./validation";
import validateFieldFromSchema from "./specificValidation";

const cardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  email: Joi.string()
    .min(6)
    .max(100)
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  phone: Joi.string().min(9).max(12).required(),
  url: Joi.string().min(6).max(1024).allow(""),
  web:  Joi.string().min(6).max(256).allow(""),
  alt: Joi.string().min(6).max(256).allow(""),
  country: Joi.string().min(2).max(100).required(),
  state: Joi.string().min(2).max(100).allow(""),
  city: Joi.string().min(2).max(100).required(),
  street: Joi.string().min(2).max(100).required(),
  houseNumber: Joi.string().min(1).max(100).required(),
  zipCode: Joi.number().integer().positive().min(1).max(99999999),
});

const validateCardSchema = (userInput) =>
  validation(cardSchema, userInput);

const validateCardFieldFromSchema = (userInput, userFieldId) => {
  return (validateFieldFromSchema(cardSchema, userInput, userFieldId));
}

export default validateCardFieldFromSchema;

export {validateCardSchema};