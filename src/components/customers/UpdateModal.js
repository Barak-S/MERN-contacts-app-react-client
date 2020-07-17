import React from 'react'
import './customers.css';


export default class UpdateModal extends React.Component{

    state={
        updatedName: this.props.contactToUpdate.name,
        updatedNumber: this.props.contactToUpdate.number,
        updatedAddress: this.props.contactToUpdate.address,
        id: this.props.contactToUpdate.id
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){


        return(
            <div className="newContact">
                <h3>Update Contact</h3>
                <form onSubmit={(e)=>{this.props.updateContact(e, this.state.updatedName, this.state.updatedNumber, this.state.updatedAddress, this.state.id); this.props.closeUpdateModal() }}>
                    <label>Name: </label><input type= "text" name="updatedName" autocomplete="off" value={this.state.updatedName} onChange={(e)=>this.handleChange(e)}></input>
                    <label>Number: </label><input type="text" name="updatedNumber" autocomplete="off" value={this.state.updatedNumber} onChange={(e)=>this.handleChange(e)}></input>
                    <label>Address: </label><input type="text" name="updatedAddress" autocomplete="off" value={this.state.updatedAddress} onChange={(e)=>this.handleChange(e)}></input>
                    <input type="submit"></input>
                    <br/>
                    <button onClick={()=>this.props.closeUpdateModal()}>Close</button>
                </form>
            </div>
        )
    }
}