import usersReducer, {
    setCurrentPage,
    setTotalUsersCount,
    UsersPageType,
    setUsers, followSuccess, unfollowSuccess
} from "./users-reducer";

let startState: UsersPageType;

beforeEach(() => {
    startState = {
        users: [
            {
                fullName: "Shubert",
                id: 42,
                photoUrl: 'photo',
                status: 'pro',
                followed: false,
                location: {
                    country: 'Uk',
                    city: "Kiev"
                }
            }],
        pagesize: 1,
        totalUsersCount: 2,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [1, 2, 3, 4]
    }
})

test('users following must be changed to true and follow', () => {

    const action = followSuccess(42);

    const endState = usersReducer(startState, action)

    expect(endState.users[0].followed).toBe(true);
    expect(startState.users[0].followed).toBe(false);
});
test('users following must be changed to false and unfollow', () => {

    const action = unfollowSuccess(42);

    const endState = usersReducer(startState, action)

    expect(endState.users[0].followed).toBe(false);
});
test('currentPage should be changed from state', () => {

    const action = setUsers([]);

    const endState = usersReducer(startState, action)

    expect(endState.users).toEqual([]);
});
test('totalUsersCount should be changed from state', () => {

    const action = setCurrentPage(5);

    const endState = usersReducer(startState, action)

    expect(startState.currentPage).toBe(1);
    expect(endState.currentPage).toBe(5);
});
test('totalUsersCount should be changed from state', () => {

    const action = setTotalUsersCount(12);

    const endState = usersReducer(startState, action)

    expect(endState.totalUsersCount).toBe(12);
    expect(startState.totalUsersCount).toBe(2);
});