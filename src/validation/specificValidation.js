import validation from "./validation";

const validateFieldFromSchema = (schema, userInput, userFieldId) => {

    const fieldSchema = schema.extract(userFieldId);

    const validationRes = validation(fieldSchema, userInput);
    console.log('userFieldId is: ', userFieldId);
    let returnVal;
    
    if(validationRes){
        returnVal = validationRes.undefined;
    }
    else{
        returnVal = null;
    }
    return {[userFieldId]: returnVal};
}
export default validateFieldFromSchema;