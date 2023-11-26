import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Search } from './Search/Search';
import css from './App.module.css';

export const App = () => {
  const phoneBookContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? phoneBookContacts
    );
  });
  const [filter, setFilter] = useState('');

  const handleDeleteUser = id => {
    if (window.confirm('Are you sure?')) {
      setContacts([...contacts.filter(user => user.id !== id)]);
    }
  };

  const createUser = data => {
    setContacts([
      ...contacts,
      { name: data.name, id: nanoid(), number: data.number },
    ]);
  };

  const handlerSearch = e => {
    setFilter(e.currentTarget.value);
  };

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <section className="section">
      <div className="container">
        <h1 className={css.title}>Phone book</h1>
        <ContactForm
          createUser={createUser}
          userNumber={contacts.number}
          userName={contacts.name}
          contacts={contacts}
        />
        <h2 className={css.contactsTitle}>Contacts</h2>
        <p className={css.search}>Find contacts by name</p>
        <Search onChange={handlerSearch} value={filter} />
        <ContactList
          handleDeleteUser={handleDeleteUser}
          contacts={contacts}
          filter={filter}
        />
      </div>
    </section>
  );
};
