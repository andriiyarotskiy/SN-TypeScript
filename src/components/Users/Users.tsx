import React from "react";
import userPhoto from '../../assets/images/user.png'
import styles from './Users.module.css'
import {NavLink} from "react-router-dom";


let Users = (props: any) => {

    let pagesCount = Math.ceil((props.totalUsersCount / props.pageSize) / 100)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span key={p} className={(props.currentPage === p && styles.selectedPage) || ''}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map((u: any) => // ANY
                <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'profile/' + u.id}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button
                                disabled={props.followingInProgress.some((id: number) => id === u.id)} // если ИДшка равна u.id то тогда кнопка дизейблится
                                onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                            : <button
                                disabled={props.followingInProgress.some((id: number) => id === u.id)} // если ИДшка равна u.id то тогда кнопка дизейблится
                                onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
                </div>)
        }
    </div>
}

export default Users