import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {KeyContactsType, ProfileType} from "../../../redux/profile-reducer";
import ProfileStatWithHooks from './ProfileStatWIthHooks';
import userPhoto from '../../../assets/images/user.png'
import {NullableType} from "../../../utils/typeAssist";
import ProfileDataForm from "./ProfileDataForm";


type PropsType = {
    profile: NullableType<ProfileType>
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: Blob) => void
    saveProfile?: any //ANY!!!!!!
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)


    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => { // ANY!!!!!!!!!!
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: any) => {
        saveProfile(formData).then(() => setEditMode(false))
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt=""/>
                {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataForm
                        initialValues={profile}
                        profile={profile}
                        onSubmit={onSubmit}
                    />
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   goToEditMode={() => setEditMode(true)}
                    />
                }

                <ProfileStatWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    );
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div><b>Name</b>: {profile.fullName}</div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My profession skills</b>: {profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {(Object.keys(profile.contacts) as KeyContactsType).map((key) => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}: { contactTitle: string, contactValue: NullableType<string> }) => {
    return <div className={s.contact}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo;
