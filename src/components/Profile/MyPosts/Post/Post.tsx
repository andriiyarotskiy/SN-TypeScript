import React from 'react';
import s from './Post.module.css'


type PostType = {
    message: string,
    likesCount: string
}

const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" alt="ava"/>
            {props.message}
            <div><span>{props.likesCount}</span></div>
        </div>
    );
}

export default Post;

