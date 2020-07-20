import React from 'react'
import styles from './Users.module.css'

const Users = (props: any) => {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://cdn2.iconfinder.com/data/icons/people-occupation-job/64/Ninja-Warrior-Assassin-Japan-Fighter-Avatar-Martial_arts-512.png',
                followed: true,
                fullName: 'Andiy',
                status: 'Junior',
                location: {country: 'Ukraine', city: 'Kiev'}
            },
            {
                id: 2,
                photoUrl: 'https://cdn2.iconfinder.com/data/icons/people-occupation-job/64/Ninja-Warrior-Assassin-Japan-Fighter-Avatar-Martial_arts-512.png',
                followed: false,
                fullName: 'Voicek',
                status: 'Middle',
                location: {country: 'Poland', city: 'Krakow'}
            },
            {
                id: 3,
                photoUrl: 'https://cdn2.iconfinder.com/data/icons/people-occupation-job/64/Ninja-Warrior-Assassin-Japan-Fighter-Avatar-Martial_arts-512.png',
                followed: false,
                fullName: 'David',
                status: 'Senior',
                location: {country: 'England', city: 'London'}
            },
        ])
    }

    return <div>
        {
            props.users.map((u: { id: string | number | undefined; photoUrl: string | undefined; followed: any; fullName: React.ReactNode; status: React.ReactNode; location: { country: React.ReactNode; city: React.ReactNode } }) =>
                <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}

                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
                </div>)
        }
    </div>

}

export default Users;