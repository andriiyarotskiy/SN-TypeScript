import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostsType} from '../../../redux/profile-reducer';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';

type MyPostsType = {
    posts: Array<PostsType> // Типизация из Profile-reducer ???????
    newPostText: string
    addPost: (newPostText: string) => void
}

type AddNewPostFormType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10)

let AddNewPostForm = (props: InjectedFormProps<AddNewPostFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'}
                       component={Textarea}
                       validate={[required, maxLength10]}
                       placeholder={'Post message'}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<AddNewPostFormType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)


const MyPosts = React.memo((props: MyPostsType) => {


    let postsElement = props.posts.map(p => <Post key={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}/>)

    let onAddPost = (values: { newPostText: string }) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>

    );
})

export default MyPosts;
