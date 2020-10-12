import React from "react";
import userPhoto from '../../assets/images/user.png'
import styles from './Users.module.css'
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, ...props}: any) => {
    console.log(user.followed)
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                             className={styles.userPhoto} alt=''/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button
                                disabled={followingInProgress.some((id: number) => id === user.id)} // если ИДшка равна user.id то тогда кнопка дизейблится
                                onClick={() => {
                                    props.unfollow(user.id)
                                }}>Unfollow</button>
                            : <button
                                disabled={followingInProgress.some((id: number) => id === user.id)} // если ИДшка равна user.id то тогда кнопка дизейблится
                                onClick={() => {
                                    props.follow(user.id)
                                }}>Follow</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span>
                </span>
        </div>

    )
}

export default User