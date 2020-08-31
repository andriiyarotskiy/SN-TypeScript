import React from 'react'

type ProfileStatType = {
    status : string
}


class ProfileStat extends React.Component<ProfileStatType> {

    state = {
        editMode: false,
        title: 'yo-YO'
    }

    activateEditMode = () => {
        this.setState({editMode: true}) // setState метод - АСИНХРОНЕН!!!
    }
    deactivateMode = () => {
        this.setState({editMode: false})
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={this.deactivateMode} value={this.props.status}/>
                </div>
                }
            </div>
        );
    }
}

export default ProfileStat