import React from 'react';
import './customers.css';

export default class AddCustomers extends React.Component {

    state={
        name: "",
        number: "",
        address: ""
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render(){
        return (
          <div className="newContact">
              <h3>Add Contact</h3>
              <form method="POST" onSubmit={(e)=>this.props.addCustomers(e, this.state.name, this.state.number, this.state.address)} className="form">
                <label>Name </label><input autocomplete="off" type="text"  name="name" onChange={(e)=>this.handleChange(e)}></input>
                <br/>
                <label>Number </label><input autocomplete="off" type="text"  name="number" onChange={(e)=>this.handleChange(e)}></input>
                <br/>
                <label>Address </label><input autocomplete="off" type="text"  name="address" onChange={(e)=>this.handleChange(e)}></input>
                <br/>
                <button className="submit"type="submit">Submit</button>
            </form>
                
          </div>
        );


    }
}

