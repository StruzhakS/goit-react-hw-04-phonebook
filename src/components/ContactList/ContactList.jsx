import s from './ContaactList.module.css';
import propTypes from 'prop-types';

const ContactList = ({ visibleContacts, deleteContact, onClickItem }) => {
  return (
    <ul className={s.contactList}>
      {visibleContacts.map(contact => (
        <li
          onClick={e => onClickItem(e)}
          className={s.listItem}
          key={contact.id}
        >
          <p className={s.name}>{contact.name}: </p> <p>{contact.number}</p>
          <button
            className={s.deleteButton}
            type="button"
            onClick={e => deleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  visibleContacts: propTypes.array.isRequired,
  deleteContact: propTypes.func.isRequired,
  onClickItem: propTypes.func.isRequired,
};
export default ContactList;
