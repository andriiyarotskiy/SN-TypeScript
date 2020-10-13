import React, {ChangeEvent, useEffect, useState} from 'react'

type ProfileStatType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatWithHooks = (props: ProfileStatType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <b>Status</b>: <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input
                    autoFocus={true}
                    onChange={onStatusChange}
                    value={status}
                    onBlur={deactivateEditMode}/>
            </div>
            }
        </div>
    );
}

export default ProfileStatWithHooks