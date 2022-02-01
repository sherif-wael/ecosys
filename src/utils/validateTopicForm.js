import { isEmpty } from "./helpers";

function validateTopicForm({
    name_ar,
    name_en,
    description_ar,
    description_en,
    order
}){
    const error = {};

    if(!name_ar){
        error.name_ar = "please enter the topic's arabic name";
    }

    if(!name_en){
        error.name_en = "please enter the topic's english name";
    }

    if(!description_ar){
        error.description_ar = "please enter the topic's arabic description";
    }

    if(!description_en){
        error.description_en = "please enter the topic's english description";
    }

    if(!order){
        error.order = "please enter the topic's order";
    }

    return {
        isError: !isEmpty(error),
        error
    }
}

export default validateTopicForm;