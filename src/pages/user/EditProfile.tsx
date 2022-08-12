import { useForm } from 'react-hook-form'
import FormButton from '../../components/FormButton'
import { FormError } from '../../components/FormError'
import Title from '../../components/Title'
import { useEditProfileMutation } from '../../graphql/__generated__'
import useMe from '../../hooks/userMe'

interface IFormProps {
	email?: string
	password?: string
}

export default function EditProfile() {
	const { data: userData } = useMe()
	const { register, handleSubmit, formState, clearErrors } =
		useForm<IFormProps>({
			mode: 'onBlur',
			defaultValues: {
				email: userData?.me.email || '',
				password: ''
			}
		})
	const [editProfile, { loading: EditProfileLoading }] = useEditProfileMutation(
		{
			onCompleted: (data) => {
        if (data.editProfile.ok) {
          // update cache
        }
			}
		}
	)
	const onSubmit = ({email, password}: IFormProps) => {
		if (EditProfileLoading) return
		editProfile({
			variables: {
				input: {
          email,
          ...(password && {password})
				}
			}
		})
	}
	return (
		<div className="mt-52 flex flex-col justify-center items-center">
			<Title title="Edit Profile" />
			<form
				className="w-full grid gap-3 mt-5 max-w-screen-sm"
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					{...register('email', {
						required: '이메일을 입력해주세요.',
						pattern: {
							value:
								/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
							message: '이메일이 형식에 맞지 않습니다.'
						},
						onChange: () => clearErrors()
					})}
					type="text"
					placeholder="Email"
					className="input"
				/>
				{formState.errors.email?.message && (
					<FormError errorMessage={formState.errors.email?.message} />
				)}
				<input
					{...register('password', {
						minLength: {
							value: 4,
							message: '비밀번호는 최소 4자 이상이여야 합니다.'
						},
						onChange: () => clearErrors()
					})}
					type="password"
					placeholder="Password"
					className="input"
				/>
				{formState.errors.password?.message && (
					<FormError errorMessage={formState.errors.password?.message} />
				)}
				<FormButton
					isValid={!EditProfileLoading}
					loading={EditProfileLoading}
					actionText="Update Profile"
				/>
			</form>
		</div>
	)
}
