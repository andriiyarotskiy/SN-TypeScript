import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = ({currentPage, onPageChanged, pageSize, totalUsersCount, users, ...props}: any) => {

    return <div>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   pageSize={pageSize}
                   totalItemsCount={totalUsersCount}
        />
        {
            users.map((u: any) => <User user={u} key={u.id}
                                        followingInProgress={props.followingInProgress}
                                        unfollow={props.unfollow}
                                        follow={props.follow}

            />)
        }
    </div>
}

export default Users