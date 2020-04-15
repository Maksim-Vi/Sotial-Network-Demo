import React from 'react'

class  ProfileStatus extends React.Component {
   
    state= {
        editMode: false,
        status: this.props.status
    }

    onMode = () => {
        this.setState({
            editMode: true
            
        })
       // this.forceUpdate() // функция что говорит реакту перерисуйся, лучше не испоьзовать
    }
    
    offMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateUserStatus(this.state.status);
    }

    onChangeStatus = (e) =>{
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevState, prevProps){
        if (prevState.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }
    }

    render(){
        return (
            <>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.onMode}>{this.props.status || "No status"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    {/* value={this.state.status} - сначала запускаем статус тот что в локальном стейте, потом его перезаписываем с сервера   */}
                    <input onChange={this.onChangeStatus} autoFocus={true} onBlur={this.offMode} value={this.state.status} />
                </div>
                }
            </>
        )
    }   
}

export default ProfileStatus