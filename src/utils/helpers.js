export const isEmpty = value => (
    value === undefined || 
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.length === 0)
);

export const isEmail = email => {
    return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
}

export const getLanguageDirection = lng => {
    if(lng.startsWith("en")) return "ltr";
    return "rtl";
}

export const clamp = (min, value, max) => {
    return Math.max(min, Math.min(value, max));
}

export const convertObjectToFormData = (data, onlyFiles) => {
    const formData = new FormData();

    for(let key of Object.keys(data)){
        if(onlyFiles.includes(key) && !(data[key] instanceof File)) continue;
        formData.append(key, data[key]);
    }

    return formData;
}

export const trim = (str, length) => {
    return str.length <= length ? str : str.slice(0, length) + "...";
}