import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStat from "./ProfileStat";

type PropsType = {
    profile: ProfileType | null
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
            <ProfileStat status={"yo"}/>
            </div>
        </div>
    );
}

export default ProfileInfo;
