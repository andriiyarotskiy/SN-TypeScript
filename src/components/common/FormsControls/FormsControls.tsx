import React from "react"
import s from "./FormsControls.module.css"
import {Field} from "redux-form";

const FormControl = ({meta: {touched, error}, children}: any) => {
    const hasError = touched && error

    return (
        <div className={s.formControl + " " + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
    )
}
export const Input = (props: any) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}><input {...input}{...restProps}/></FormControl>
    )
}


// type createFieldType = {
//     placeholder: string,
//     name: string,
//     validators: Array<RequiredValidateType>,
//     component: any,
//     type: {
//         type: string
//     }
// }
export const createField = (placeholder: any, name: any, validators: any, component: any, props = {}, text = '') => {
    return <div>
        <Field
            {...props}
            placeholder={placeholder}
            name={name}
            component={component}
            validate={validators}
        /> {text}
    </div>
}