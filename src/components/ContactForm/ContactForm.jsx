import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddContact } from 'redux/phone.reducer';
import { selectContacts } from 'redux/phone.selectors';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setPhone(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      name,
      phone,
    };

    if (
      contacts.some(
        item => item.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${name} is already in your contacts`);
      return;
    }

    const newContact = {
      ...contact,
      id: nanoid(),
    };

    dispatch(fetchAddContact(newContact));
    setName('');
    setPhone('');
    event.target.lastElementChild.blur();
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label>
        <p>Name:</p>
        <input
          className={css.inputName}
          type="text"
          value={name}
          onChange={handleNameChange}
          name="name"
          maxLength="16"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <p>Number:</p>
        <input
          className={css.inputNumber}
          type="tel"
          value={phone}
          onChange={handleNumberChange}
          name="number"
          maxLength="13"
          pattern="\+?\d{1,4}?[.\-\s]?\(?\d{1,3}?\)?[.\-\s]?\d{1,4}[.\-\s]?\d{1,4}[.\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.addBtn}>
        Add contact
      </button>
    </form>
  );
};
