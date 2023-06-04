import s from './style.module.css';
import { useState, useEffect } from 'react';
import DoForm from '../DoForm/DoForm';
import Filter from '../FilterCOntacts/Filtercontacts';
import ContactList from '../ContactList/ContactList';
import ClearButton from 'components/ClearButton/ClearButton';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Julia Turkina', number: '050-111-86-46' },
      { id: 'id-6', name: 'Vova Turkin', number: '095-222-81-12' },
      { id: 'id-4', name: 'Kyivstar', number: '0-800-300-460' },
      { id: 'id-5', name: 'Ukrtelecom', number: '0-800-506-800' },
      { id: 'id-7', name: 'Serhii Struzhak', number: '0666-77-22-74' },
    ]
  );
  const [filter, setFilter] = useState('');

  const clearContact = () => {
    setContacts([]);
    return;
  };

  const addContact = user => {
    contacts.some(contact => {
      return contact.name.toLowerCase() === user.name.toLowerCase();
    })
      ? alert(`${user.name} is already in list`)
      : setContacts([...contacts, user]);
  };

  const filterContacts = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    return () => {};
  }, [contacts]);

  const getVisibleContacts = () => {
    const normalizedContacts = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedContacts);
    });
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(el => el.id !== contactId));
  };

  const onClickItem = e => {
    if (e.target.nodeName !== 'BUTTON')
      console.dir('Тут має бути модалка)! (недопрацьовано) ');
  };
  const visibleContacts = getVisibleContacts();

  return (
    <div className={s.container}>
      <div className={s.form}>
        <h2>Phonebook</h2>
        <div className={s.input}>
          <DoForm contacts={contacts} addContact={addContact} />
        </div>
      </div>
      <div>
        {contacts.length ? <h2>Contacts</h2> : ''}
        {contacts.length > 1 ? (
          <Filter value={filter} filterContacts={filterContacts} />
        ) : (
          ''
        )}
        {contacts.length ? (
          <ContactList
            visibleContacts={visibleContacts}
            deleteContact={deleteContact}
            onClickItem={onClickItem}
          />
        ) : (
          ''
        )}
      </div>
      {(contacts.length === visibleContacts.length) &
      (visibleContacts.length > 1) ? (
        <ClearButton clearContact={clearContact} />
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

export default App;
