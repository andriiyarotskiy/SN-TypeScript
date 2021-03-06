import React, {ChangeEvent} from 'react'

type ProfileStatType = {
    status: string
    updateStatus: (status: string) => void
}


class ProfileStatus extends React.Component<ProfileStatType> {


    state = {
        editMode: false,
        title: 'yo-YO',
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({editMode: true}) // setState метод - АСИНХРОНЕН!!!
    }
    deactivateMode = () => {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatType>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input
                        onChange={this.onStatusChange}
                        autoFocus={true}
                        onBlur={this.deactivateMode}
                        value={this.state.status}/>
                </div>
                }
            </div>
        );
    }
}

export default ProfileStatus