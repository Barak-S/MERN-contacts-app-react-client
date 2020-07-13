import React from 'react';
import './customers.css';

export default class Customer extends React.Component {

    render(){

        return (

            <div className="contactDiv">
                <li className="ListItem"><h4>{this.props.name}</h4> 
                    <h5>{this.props.number}</h5>
                    <p>{this.props.address}</p>
                    <button className="delete" onClick={()=>this.props.deleteContact(this.props.name, this.props.number, this.props.id)}>Delete</button> 
                    <button className= "update" onClick={()=> this.props.clickUpdateButton(this.props.name, this.props.number, this.props.address, this.props.id)}>Update</button>
                </li>

            </div>

        );


    }
}