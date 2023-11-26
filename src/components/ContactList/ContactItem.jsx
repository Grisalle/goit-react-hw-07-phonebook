import { DeleteButton } from 'components/DeleteButton/DeleteButton';
import { useDispatch } from 'react-redux';
import { fetchDeleteContact } from 'redux/phone.reducer';
import css from './ContactItem.module.css';

export const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li className={css.contactItem} id={contact.id}>
      <p>
        <span className={css.userName}>{`${contact.name}: `}</span>
        {`${contact.phone}`}
      </p>
      <DeleteButton
        handleDeleteUser={() => dispatch(fetchDeleteContact(contact.id))}
      />
    </li>
  );
};
