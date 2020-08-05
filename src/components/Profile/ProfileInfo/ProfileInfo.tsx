import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";

type PropsType = {
    profile: ProfileType | null
}

const ProfileInfo = (props: PropsType)=> {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.mainImage}>
                <img
                    src="https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="image"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small} alt=""/>
                <span>fullName: {props.profile.fullName}</span>
            </div>
        </div>
    );
}

export default ProfileInfo;
