export const getErrorPattern = /(?<=: Validation failed: ).*/gm;
export const getErrorPattern2 = /(?<=Shop validation failed: ).*/gm;

export const phoneValidationPattern = /\d{3}-\d{3}-\d{4}/;
export const emailValidationPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export const pincodeValidationPattern = /^\d{6}$/;
