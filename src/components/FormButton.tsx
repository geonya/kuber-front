interface FormButtonProps {
  isValid: boolean;
  loading: boolean;
  actionText: string;
}

const FormButton = ({ isValid, loading, actionText }: FormButtonProps) => (
  <button
    className={`${isValid ? 'button__green--hover' : 'button__gray--hover'}`}
    disabled={isValid ? false : true}
  >
    {loading ? 'Loading...' : actionText}
  </button>
);

export default FormButton;
