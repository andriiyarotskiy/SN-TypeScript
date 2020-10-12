import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

export type AddMessegeFormType = {
    newMessageBody: string
}


const maxLength50 = maxLengthCreator(50)


const AddMessegeForm = (props: InjectedFormProps<AddMessegeFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={"newMessageBody"}
                    placeholder={'Enter your message'}
                    validate={[required, maxLength50]}
                />
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}
export default reduxForm<AddMessegeFormType>({form: "dialogAddMessageForm"})(AddMessegeForm)