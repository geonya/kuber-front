interface FormButtonProps {
  isValid: boolean;
  loading: boolean;
  actionText: string;
}

const FormButton = ({ isValid, loading, actionText }: FormButtonProps) => (
  <button
    className={`button ${
      isValid
        ? 'bg-green-500 hover:bg-green-700'
        : 'bg-gray-400 hover:bg-gray-700'
    }`}
    disabled={isValid ? false : true}
  >
    {loading ? 'Loading...' : actionText}
  </button>
);

export default FormButton;
