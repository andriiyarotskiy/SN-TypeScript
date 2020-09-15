import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatWithHooks from './ProfileStatWIthHooks';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small} alt=""/>
                <span>fullName: {props.profile.fullName}</span>
                <ProfileStatWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;
