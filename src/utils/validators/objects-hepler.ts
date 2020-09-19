import {UsersType} from "../../redux/users-reducer";

export const updateObjectInArray = (items: UsersType[], itemId: number, objPropName: string, newObjProps: {followed: boolean}) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}