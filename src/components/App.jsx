import { Component } from "react"
import { nanoid } from 'nanoid'
import Filter from "./Filter/filter.jsx"
import ContactForm from "./PhoneFilter/phonefilter.jsx";
import ContactList from "./ContactList/contactlist.jsx"
export class App extends Component {

  state = {
    contacts: [],
    filter: ''
  }

      handleChange = ({ target: {value, name}}) => {
        this.setState({
			[name]: value,
		});
  };

  handleChangeFilter = value => {
        this.setState({
			filter: value,
		});
  };

    deleteContact = (id) => {
      this.setState((p) => ({
  contacts: p.contacts.filter((e)=> e.id!==id)
}))
  }
  

  createContact = (data) => {
    const contact = {
      ...data,
      id: nanoid(),
    }

    const isDublicated = this.state.contacts.find((e) => e.name.toLowerCase() === data.name.toLowerCase())
    if (isDublicated) {
      alert("This contact is already added")
      return
    } else {
this.setState((prev) => ({
			contacts: [...prev.contacts, contact],
		}))
    }

    
  }


  render() {
     const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    return (
      <div
        style={{
          width: '370px',
          fontSize: 34,
          color: '#010101',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
<h1>Phonebook</h1>
        <ContactForm createContact={this.createContact}
          onChange={this.handleChange} />
        <div>
          <Filter
          onChange={this.handleChangeFilter} />
        <ContactList
          contactsArr={filteredContacts}
          deleteContact={this.deleteContact}/>
        </div>
      </div>
    );
  }
};