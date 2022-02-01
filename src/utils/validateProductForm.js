import { isEmpty } from "./helpers";

const requiredKeys = [
    ["name_ar", "please provide an arabic name!"],
    ["name_en", "please provide an english name!"],
    ["description_en", "please provide an english description!"],
    ["description_ar", "please provide an arabic description!"],
    ["price", "please provide a price"],
    ["image", "please upload a product image"]
];

function validateProductForm(productData){
    const error = {};

    const requiredProductKey = (key, message) => {
        if(!productData[key]){
            error[key] = message;
        }
    }

    const execute = () => {
        for(let [key, message] of requiredKeys){
            requiredProductKey(key, message);
        }
    }

    execute();

    return {
        isError: !isEmpty(error),
        error
    }
}

export default validateProductForm;