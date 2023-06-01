import s from './style.module.css';
import { Component } from 'react';
import DoForm from '../DoForm/DoForm';
import Filter from '../FilterCOntacts/Filtercontacts';
import ContactList from '../ContactList/ContactList';
import ClearButton from 'components/ClearButton/ClearButton';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Julia Turkina', number: '050-111-86-46' },
      { id: 'id-6', name: 'Vova Turkin', number: '095-222-81-12' },
      { id: 'id-4', name: 'Kyivstar', number: '0-800-300-460' },
      { id: 'id-5', name: 'Ukrtelecom', number: '0-800-506-800' },
      { id: 'id-7', name: 'Serhii Struzhak', number: '0666-77-22-74' },
    ],
    filter: '',
  };
  clearContact = () => {
    this.setState({
      contacts: [],
    });
    return;
  };
  componentDidMount() {
    this.setState(({ contacts }) => ({
      contacts: [
        ...(JSON.parse(localStorage.getItem('contacts')) ||
          this.state.contacts),
      ],
    }));
  }

  addContact = user => {
    this.state.contacts.some(contact => {
      return contact.name.toLowerCase() === user.name.toLowerCase();
    })
      ? alert(`${user.name} is already in list`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, user],
        }));
  };

  phoneNumber = e => {
    this.setState({
      number: e.target.elements.value,
    });
    return;
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevState.contacts);
    // console.log(this.state.contacts);
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedContacts = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedContacts);
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== contactId),
    }));
  };
  onClickItem = e => {
    if (e.target.nodeName !== 'BUTTON')
      console.dir('Тут має бути модалка)! (недопрацьовано) ');
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={s.container}>
        <div className={s.form}>
          <h2>Phonebook</h2>
          <div className={s.input}>
            <DoForm
              contacts={this.state.contacts}
              addContact={this.addContact}
            />
          </div>
        </div>
        <div>
          {this.state.contacts.length ? <h2>Contacts</h2> : ''}
          {this.state.contacts.length > 1 ? (
            <Filter value={filter} filterContacts={this.filterContacts} />
          ) : (
            ''
          )}
          {this.state.contacts.length ? (
            <ContactList
              visibleContacts={visibleContacts}
              deleteContact={this.deleteContact}
              onClickItem={this.onClickItem}
            />
          ) : (
            ''
          )}
        </div>
        {(this.state.contacts.length === visibleContacts.length) &
        (visibleContacts.length > 1) ? (
          <ClearButton clearContact={this.clearContact} />
        ) : (
          ''
        )}
        <p className={s.totalContacts}>
          Total Contacts:
          <span className={s.totalNumber}>{visibleContacts.length}</span>
        </p>
      </div>
    );
  }
}

export default App;
