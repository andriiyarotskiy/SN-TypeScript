import usersReducer, {
    setCurrentPage,
    setTotalUsersCount,
    UsersPageType,
    UsersType,
    setUsers, unfollow, follow
} from "./users-reducer";

test('users following must be changed to true and follow', () => {
    const startState: UsersPageType = {
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
        currentPage: 3,
        isFetching: true
    }

    const action = follow(42);

    const endState = usersReducer(startState, action)

    expect(endState.users[0].followed).toBe(true);
    expect(startState.users[0].followed).toBe(false);
});
test('users following must be changed to false and unfollow', () => {
    const startState: UsersPageType = {
        users: [
            {
                fullName: "Shubert",
                id: 42,
                photoUrl: 'photo',
                status: 'pro',
                followed: true,
                location: {
                    country: 'Uk',
                    city: "Kiev"
                }
            }],
        pagesize: 1,
        totalUsersCount: 2,
        currentPage: 3,
        isFetching: true
    }

    const action = unfollow(42);

    const endState = usersReducer(startState, action)

    expect(endState.users[0].followed).toBe(false);
    expect(startState.users[0].followed).toBe(true);
});
test('currentPage should be changed from state', () => {
    const startState = {
        users: [] as Array<UsersType>,
        pagesize: 4,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true
    };

    const action = setUsers([]);

    const endState = usersReducer(startState, action)

    expect(endState.users).toEqual([]);
});
test('totalUsersCount should be changed from state', () => {
    const startState: UsersPageType = {
        users: [],
        pagesize: 3,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true
    };

    const action = setCurrentPage(3);

    const endState = usersReducer(startState, action)

    expect(endState.currentPage).toBe(3);
    expect(endState.totalUsersCount).toBe(0);
});
test('totalUsersCount should be changed from state', () => {
    const startState: UsersPageType = {
        users: [],
        pagesize: 4,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true
    };

    const action = setTotalUsersCount(12);

    const endState = usersReducer(startState, action)

    expect(endState.totalUsersCount).toBe(12);
    expect(endState.pagesize).toBe(4);
});