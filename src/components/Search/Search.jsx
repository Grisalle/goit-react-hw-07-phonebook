import { useDispatch } from 'react-redux';
import { filterContact } from 'redux/phone.reducer';
import css from './Search.module.css';

export const Search = () => {
  const dispatch = useDispatch();

  return (
    <input
      className={css.search}
      onChange={event => dispatch(filterContact(event.target.value))}
    />
  );
};
