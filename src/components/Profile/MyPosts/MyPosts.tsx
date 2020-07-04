import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {
    addPostActionCreator,
    changeNewTextActionCreator,
    PostsType,
    ProfileActionType
} from "../../../redux/state";

type MyPostsType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: (action: ProfileActionType) => void // ????
}

const MyPosts = (props: MyPostsType) => {

    let postsElement = props.posts.map(p => <Post key={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}/>)

    let addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.dispatch(changeNewTextActionCreator(text))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        value={props.newPostText}
                        onChange={newTextChangeHandler}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>

    );
}

export default MyPosts;
