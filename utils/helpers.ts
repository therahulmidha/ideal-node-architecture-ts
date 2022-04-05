import Joi, { ValidationResult } from "joi";

export function getJoiValiationError(validationResult: ValidationResult) {
  return (
    validationResult?.error?.details[0]?.message ??
    "Request Data Validation Failed"
  );
}

export function validateMongooseObjectId(parameter: string) {
  return Joi.string().regex(/^[0-9a-fA-F]{24}$/, "Valid Id").validate(parameter);
}
