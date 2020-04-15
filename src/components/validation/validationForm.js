export const validationForm = (values) =>{
    if (values) return undefined
    return "Error: Please write your text";
}

export const validationFormInput = (values) =>{
    if (values) return undefined
    return " ";
}

// создали санку передав в одну функцию другую с наследием всех данных
export const maxLengthCreator = (maxLength) => (values) =>{
    if (values.length > maxLength) return `Error: max Length is greater then ${maxLength}`
    return undefined;
}