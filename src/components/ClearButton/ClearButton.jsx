import s from './ClearButton.module.css';
const ClearButton = ({ clearContact }) => (
  <button
    className={s.clearButton}
    type="button"
    onClick={() => {
      if (
        window.confirm('Are you sure you want to delete all your contacts?')
      ) {
        clearContact();
      }
    }}
  >
    Delete all contacts
  </button>
);
export default ClearButton;
