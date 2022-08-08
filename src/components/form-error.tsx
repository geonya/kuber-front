interface IFormError {
  errorMessage: string;
}
export const FormError = ({ errorMessage }: IFormError) => (
  <span className='form__error'>{errorMessage}</span>
);
