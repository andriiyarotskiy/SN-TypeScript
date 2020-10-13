import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType, KeyContactsType} from "../../../redux/profile-reducer";
import s from './ProfileInfo.module.css'
import style from "../../common/FormsControls/FormsControls.module.css";


type ProfileDataType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<{ error: any, handleSubmit: any, profile: ProfileType }> & ProfileDataType> = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {error && <div className={style.formSummaryError}>{error}</div>}
        <div>
            <b>Full Name</b>: {createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>:
            {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>

        <div>
            <b>My profession skills</b>:
            {createField('My profession skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About me</b>:
            {createField('About me', 'aboutMe', [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {(Object.keys(profile.contacts) as KeyContactsType).map((key) => {
            return <div key={key} className={s.contact}>
                <b>{key} : {createField(key, 'contacts.' + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}
const ProfileDataReduxForm = reduxForm<any, any>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm;