import React from 'react';
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div className={s.mainImage}>
                <img
                    src="https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="image"/>
            </div>
            <div className={s.descriptionBlock}>ava + description</div>

        </div>
    );
}

export default ProfileInfo;
