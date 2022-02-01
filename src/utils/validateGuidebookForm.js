import { isEmpty } from "./helpers";

function validateGuidebookForm({ name_ar, name_en }){
    const error = {};

    if(!name_ar){
        error.name_ar = "guidebook arabic name is required";
    }

    if(!name_en){
        error.name_en = "guidebook english name is required"
    }

    return {
        isError: !isEmpty(error),
        error
    }
}

export default validateGuidebookForm;