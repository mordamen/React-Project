import Joi from 'joi';
import validation from './validation';

const registerSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(100)
        .required()
        .label('First Name')
        .messages({
            'string.alphanum': ' must only contain alphanumeric characters',
            'string.min': ' should have a minimum length of {#limit} characters',
            'string.max': ' should have a maximum length of {#limit} characters',
            'any.required': ' is required',
        }),
    middleName: Joi.string()
        .alphanum()
        .min(2)
        .max(100)
        .allow('')
        .label('Middle Name')
        .messages({
            'string.alphanum': ' must only contain alphanumeric characters',
            'string.min': ' should have a minimum length of {#limit} characters',
            'string.max': ' should have a maximum length of {#limit} characters',
        }),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(100)
        .required()
        .label('Last Name')
        .messages({
            'string.alphanum': ' must only contain alphanumeric characters',
            'string.min': ' should have a minimum length of {#limit} characters',
            'string.max': ' should have a maximum length of {#limit} characters',
            'any.required': ' is required',
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .min(6)
        .max(100)
        .required()
        .label('Email')
        .messages({
            'string.email': ' must be a valid email',
            'string.min': ' should have a minimum length of {#limit} characters',
            'string.max': ' should have a maximum length of {#limit} characters',
            'any.required': ' is required',
        }),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})"))
        .min(6)
        .max(20)
        .required()
        .label('Password')
        .messages({
        'string.pattern.base': ' must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
        'string.empty': ' cannot be empty',
        'any.required': ' is required',
        }),
    // repeat_password: Joi.valid(Joi.ref('password'))
    //     .messages({
    //     'any.only': 'The two passwords do not match',
    //     }),
    repeat_password: Joi.any(),
    phone: Joi.string()
        .min(9)
        .max(12)
        .required()
        .label('Phone')
        .messages({
        'string.min': ' should have a minimum length of {#limit} characters',
        'string.max': ' should have a maximum length of {#limit} characters',
        'any.required': ' is required',
        }),
    imageUrl: Joi.string().min(6).max(100).allow('').label('Image URL').messages({
        'string.min': ' should have a minimum length of {#limit} characters',
        'string.max': ' should have a maximum length of {#limit} characters',
    }),
    imageAlt: Joi.string().min(6).max(100).allow('').label('Image alt text').messages({
        'string.min': ' should have a minimum length of {#limit} characters',
        'string.max': ' should have a maximum length of {#limit} characters',
    }),
    country: Joi.string()
        .min(6)
        .max(100)
        .label('Country')
        .messages({
        'string.min': ' should have a minimum length of {#limit} characters',
        'string.max': ' should have a maximum length of {#limit} characters',
        }),
    state: Joi.string().min(2).max(100).allow('').label('State').messages({
        'string.min': ' should have a minimum length of {#limit} characters',
        'string.max': ' should have a maximum length of {#limit} characters',
    }),
    city: Joi.string().min(2).max(100).required().label('City').messages({
        'string.empty': ' is required',
        'string.min': ' should have a minimum length of {#limit} characters',
        'string.max': ' should have a maximum length of {#limit} characters',
        'any.required': ' is required',
    }),
    street: Joi.string().min(2).max(100).required().label('Street').messages({
        'string.empty': ' is required',
        'string.min': ' should have a minimum length of {#limit} characters',
        'string.max': ' should have a maximum length of {#limit} characters',
        'any.required': ' is required',
    }),
    houseNumber: Joi.string().min(1).max(100).required().label('House number').messages({
        'string.empty': ' is required',
        'string.min': ' should have a minimum length of {#limit} characters',
        'string.max': ' should have a maximum length of {#limit} characters',
        'any.required': ' is required',
    }),
    zipCode: Joi.number().integer().positive().min(1).max(99999999).allow('').label('Zip code').messages({
        'number.base': ' must be a valid number',
        'number.integer': ' must be an integer',
        'number.positive': ' must be a positive number',
        'number.min': ' should be at least {#limit}',
        'number.max': ' should not exceed {#limit}',
    }),
    biz: Joi.bool().required(),
});

const validateRegisterSchema = (userInput) =>
    validation(registerSchema, userInput);

// const validateRegisterFieldFromSchema = (userInput, userFieldId) => {
//     return (validateFieldFromSchema(registerSchema, userInput, userFieldId));
// }

const validateRegisterFieldFromSchema = (userInput, userFieldId) => {
    const validationResult = registerSchema.validate({ [userFieldId]: userInput }, { abortEarly: false });
    const errors = {};

    if (validationResult.error) {
        validationResult.error.details.forEach((detail) => {
        if (detail.context.key === userFieldId) {
            if (!errors[userFieldId]) {
            errors[userFieldId] = `${detail.context.label} ${detail.message}`;
            } else {
            errors[userFieldId] += ` and ${detail.message}`;
            }
        }
        });
    }

    return errors;
};



export default validateRegisterFieldFromSchema;

export {validateRegisterSchema, registerSchema};
