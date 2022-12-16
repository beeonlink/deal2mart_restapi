import { phoneValidationPattern, emailValidationPattern, pincodeValidationPattern } from '../constant/regex_pattern';
import { SHOP_CATEGORY, LOCATION_TYPE } from '../../services/constant/options';

export const phoneValidation = () => ({
    "validator": input => phoneValidationPattern.test(input),
    "message": props => `${props.value} is not a valid phone number!`
});

export const emailValidation = () => ({
    "validator": input => emailValidationPattern.test(input),
    "message": props => `${props.value} is not a valid email!`
});

export const shopValidation = () => ({
    "validator": input => SHOP_CATEGORY.indexOf(input) >= 0,
    "message": props => `${props.value} is invalid!`
});

export const locationTypeValidation = () => ({
    "validator": input => LOCATION_TYPE.indexOf(input) >= 0,
    "message": props => `${props.value} is invalid!`
});

export const pincodeValidation = () => ({
    "validator": input => pincodeValidationPattern.test(input),
    "message": props => `${props.value} you need 6 numbers!`
});
