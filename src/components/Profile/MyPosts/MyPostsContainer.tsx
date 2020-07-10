import React from 'react';
import {addPostActionCreator, changeNewTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../storeContext";


const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
                (store: any) => { // ANY!!!!!!!!!!!!!!!!!!!!!!!!!
                    let state = store.getState().profilePage
                    let addPost = () => {
                        store.dispatch(addPostActionCreator())
                    }
                    let onPostChange = (text: string) => {
                        let action = changeNewTextActionCreator(text)
                        store.dispatch(action)
                    }
                    return <MyPosts
                        posts={state.posts}
                        changeNewText={onPostChange}
                        addPost={addPost}
                        newPostText={state.newPostText}
                    />
                }
            }
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;
