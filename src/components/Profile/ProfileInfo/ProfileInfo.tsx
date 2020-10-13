import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatWithHooks from './ProfileStatWIthHooks';
import userPhoto from '../../../assets/images/user.png'

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: any //ANY!!!!!!
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}: PropsType) => {
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => { // ANY!!!!!!!!!!
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt=""/>
                {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                <div>fullName: {profile.fullName}</div>
                <ProfileStatWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;
