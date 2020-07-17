import React from 'react';
import './customers.css';
import Contact from './Contact'

export default class Customers extends React.Component {


    render(){
        return (
          <div className="allContacts">
              <div className="contactsContainer">
                <ul>
                    {this.props.contacts.map(c=>{
                        return(
                            <Contact key={c._id} id={c._id} name={c.name} number={c.number} address={c.address} deleteContact={this.props.deleteContact} clickUpdateButton={this.props.clickUpdateButton}/>
                        )
                    })}
                </ul>
              </div>
          </div>
        );


    }
}

