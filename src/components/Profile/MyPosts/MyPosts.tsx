import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostsType} from "../../../redux/state";

type MyPostsType = {
    posts: Array<PostsType>
    addPost: (postText: string) => void
    changeNewText: (newText: string) => void
    newPostText: string
}

const MyPosts = (props: MyPostsType) => {

    let postsElement = props.posts.map(p => <Post key={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}/>)


    let addPost = () => {
        props.addPost(props.newPostText)
    }

    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewText(e.currentTarget.value)
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
