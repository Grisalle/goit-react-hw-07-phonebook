import { ContactItem } from './ContactItem';
import { useSelector } from 'react-redux';
import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(state => state.phoneStore.contacts);
  const filter = useSelector(state => state.filterStore);

  return (
    <ul className={css.contactList}>
      {contacts
        .filter(
          contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.number.toLowerCase().includes(filter.toLowerCase())
        )
        .map(contact => (
          <ContactItem contact={contact} key={contact.id} />
        ))}
    </ul>
  );
};
