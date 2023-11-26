import { ContactItem } from './ContactItem';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/phone.selectors';
import css from './ContactList.module.css';

export const ContactList = () => {
  const filtredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactList}>
      {filtredContacts.map(contact => (
        <ContactItem contact={contact} key={contact.id} />
      ))}
    </ul>
  );
};
