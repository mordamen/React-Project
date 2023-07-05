import Joi from "joi";

import validation from "./validation";

export const loginSchema = Joi.object({
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
    .messages({
      "string.pattern.base": 'The password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      "string.empty": 'Password cannot be empty.',
      "any.required": 'Password is required.',
    })
});

const validateLoginSchema = (userInput) => validation(loginSchema, userInput);

export default validateLoginSchema;