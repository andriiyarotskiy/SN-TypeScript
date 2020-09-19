export type RequiredValidateType = (value: string) => string | undefined

export const required = (value: string): string | undefined => {
    if (value) return undefined
    return 'Field is required'
}


export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value && value.length > 30) return `Max length is ${maxLength} symbols`
    return undefined
}