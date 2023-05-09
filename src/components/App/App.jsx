import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Container, MainTitle, Title } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'COLltra2-1mqLazNQxCCc', name: 'Anna Klein', number: '459-12-56' },
    ],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const isNewContact = this.state.contacts.some(contact => {
      return contact.name.toLowerCase() === newContact.name.toLowerCase();
    });

    if (isNewContact) {
      this.notifyError();

      return;
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  notifyError = () => toast('Contact aleady exist');

  render() {
    return (
      <Container>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Title>Contacts</Title>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={this.filteredContacts()}
          onDeleteContact={this.deleteContact}
        />
        <ToastContainer />
      </Container>
    );
  }
}
