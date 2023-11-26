import css from './DeleteButton.module.css';

export const DeleteButton = ({ userId, handleDeleteUser }) => {
  return (
    <button className={css.deleteBtn} onClick={() => handleDeleteUser(userId)}>
      Delete
    </button>
  );
};
