import propTypes from 'prop-types';
import s from './DoForm.module.css';
import { nanoid } from 'nanoid';
const { Component, useState } = require('react');
function DoForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'number') setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    addContact(contact);
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} action="name" onSubmit={handleSubmit}>
      <div className={s.nameBox}>
        <label>
          <span className={s.nameInput}>Name</span>
          <input
            className={s.input}
            type="text"
            name="name"
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={e => handleChange(e)}
            value={name}
          />
        </label>
      </div>

      <div className={s.phoneBox}>
        <label>
          <span className={s.nameInput}>Phone</span>
          <input
            className={s.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            placeholder="Enter number phone"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={e => handleChange(e)}
            value={number}
          />
        </label>
      </div>
      <button className={s.addButton}>Add contact</button>
    </form>
  );
}

DoForm.propTypes = {
  addContact: propTypes.func.isRequired,
};

export default DoForm;
