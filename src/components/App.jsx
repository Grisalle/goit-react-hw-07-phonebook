import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Search } from './Search/Search';
import { Loader } from './Loader/Loader';
import { fetchAllContacts } from 'redux/phone.reducer';
import { selectIsLoading, selectError } from 'redux/phone.selectors';
import css from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  return (
    <section className="section">
      <div className="container">
        <h1 className={css.title}>Phone book</h1>
        <ContactForm />
        <h2 className={css.contactsTitle}>Contacts</h2>
        <p className={css.search}>Find contacts by name</p>
        <Search />
        {isLoading && <Loader />}
        {errorMessage && (
          <div>Something went wrong. Error message: {errorMessage}</div>
        )}
        <ContactList />
      </div>
    </section>
  );
};
