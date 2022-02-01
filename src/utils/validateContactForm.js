import { isEmail, isEmpty } from "./helpers";

function validateContactForm({ email, full_name, subject, description }){
    const error = {};

    if(!isEmail(email)){
        error.email = "please enter a valid email.";
    }

    if(!email){
        error.email = "please provide your email.";
    }

    if(!full_name){
        error.full_name = "please provide your full name.";
    }

    if(!subject){
        error.subject = "please provide a subject.";
    }

    if(!description){
        error.description = "please provide a message";
    }

    return {
        isValid: isEmpty(error),
        error
    };
}

export default validateContactForm;