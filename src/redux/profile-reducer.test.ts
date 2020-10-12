import profileReducer, {deletePost} from "./profile-reducer";
import {ProfilePageType, addPostActionCreator} from "./profile-reducer";

let state: ProfilePageType = {
    posts: [
        {message: 'Hello, how are you doing', likesCount: '10', id: 1},
        {message: 'Hay, nothing', likesCount: '25', id: 2},
        {message: 'learn React, nigger!', likesCount: '1', id: 3},
    ],
    profile: null,
    status: ''
}

it('new post must be added', () => {
    let action = addPostActionCreator("unit tests")

    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
});

it('the message must be correct', () => {
    let action = addPostActionCreator("unit tests")

    let newState = profileReducer(state, action)
    expect(newState.posts[3].message).toBe("unit tests")
});

it('After Deletion The Length Of The Array Decreases', () => {
    let action = deletePost(1)

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});