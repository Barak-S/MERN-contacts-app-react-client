import React from 'react'; 
import './App.css';

import Customers from './components/customers/customers'
import AddCustomers from './components/customers/AddCustomer'
import Modal from './components/customers/UpdateModal'


class App extends React.Component {

  state={
      contacts: [],
      updating: false,
      contactToUpdate: {}
  }

  addCustomers=(e, paramName, paramNumber, paramAddress)=>{
    e.preventDefault()
    let newContact = {name: paramName, 
                      number: paramNumber,
                      address: paramAddress}

    if (paramName.length !== 0 && paramNumber.length !== 0){
      fetch('http://localhost:5000/contacts',{
          method: "POST",
          headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify(newContact)
      }).then(resp=>resp.json())
      .then(newContact=>this.setState({
            contacts: [...this.state.contacts, newContact[0]]
          })
      ) 
      .catch(() => console.log("Can’t POST bro :("))
    }
  }

  
  fetchContacts(){
    fetch('http://localhost:5000/contacts')
    .then(response => response.json())
    .then(contacts => this.setState({
        contacts
    }))
    .catch(() => console.log("Can’t access http://localhost:5000/contacts response. Blocked by browser?"))
  }

  deleteContact=(paramName, paramNumber, id)=>{
    fetch('http://localhost:5000/contacts',{
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: paramName, 
            number: paramNumber,
            _id: id
        })
    })
    this.deleteContactInState(id)
}

  clickUpdateButton=(name, number, address, id)=>{
    this.setState({
      updating: !this.state.updating,
      contactToUpdate: {name, number, address, id}
    })
  }

  updateContact=(e, paramName, paramNumber, paramAddress, paramId)=>{
    e.preventDefault()
      fetch('http://localhost:5000/contacts',{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: paramName, 
            number: parseInt(paramNumber),
            address: paramAddress,
            _id: paramId
        })
      })
      .then(resp=>resp.json())
      .then(updatedContact=>{

        let findConatctInState = this.state.contacts.filter(c=> c._id === updatedContact._id)[0]
        let indexOfContact= this.state.contacts.indexOf(findConatctInState)
        
        let conatctsArray = [...this.state.contacts]
        let myContact = {...conatctsArray[indexOfContact]}
        myContact.name = updatedContact.name
        myContact.number = updatedContact.number
        myContact.address = updatedContact.address

        conatctsArray[indexOfContact] = myContact

        this.setState({
          contacts: conatctsArray
        })

      })
  }

  deleteContactInState(id){
    let myContacts = [...this.state.contacts].filter(c=>c._id !== id)
    this.setState({
      contacts: myContacts
    })
  }
  

  componentDidMount(){
    this.fetchContacts()
  }

  render(){

    return (
      <div className="App">
        {!this.state.updating? 
        <div>
          <AddCustomers
            addCustomers={this.addCustomers}
          />
          <Customers
            contacts={this.state.contacts}
            deleteContact={this.deleteContact}
            clickUpdateButton={this.clickUpdateButton}
          />
          </div>
          :
          <Modal
            contactToUpdate={this.state.contactToUpdate}
            updateContact={this.updateContact}
            closeUpdateModal={this.clickUpdateButton}
          />
      
      
        }
      </div>
    );
  }
}

export default App;


//this.props.updateContact(this.props.name, this.props.number)