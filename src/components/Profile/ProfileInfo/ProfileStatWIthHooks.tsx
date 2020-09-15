import React, {ChangeEvent, useState} from 'react'

type ProfileStatType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatWithHooks = (props: ProfileStatType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>('')

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
                <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
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