interface FormErrorProps {
  errorMessage: string;
}
export const FormError = ({ errorMessage }: FormErrorProps) => (
  <span className='form__error'>{errorMessage}</span>
);
