import React, {createRef} from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostsType} from "../../../redux/state";

type MyPostsType = {
    posts: Array<PostsType>
    addPost: (postText: string) => void
}

const MyPosts = (props: MyPostsType) => {

    let postsElement = props.posts.map(p => <Post key={p.id}
        message={p.message}
        likesCount={p.likesCount}/>)

    let newsPostElement = createRef<HTMLTextAreaElement>()

    let addPost = () => {
        if (newsPostElement.current) {
            props.addPost(newsPostElement.current.value)
            newsPostElement.current.value = ''
        }
        // newsPostElement.current.value = ''
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newsPostElement}></textarea>
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
