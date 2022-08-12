import { Link } from 'react-router-dom'
import useMe from '../hooks/userMe'
import { logoSymbol, userSymbol } from '../hooks/useSymbols'

export default function Header() {
	const { data } = useMe()
	return (
		<>
			{!data?.me.verified && (
				<div className="bg-red-400 py-3 px-3 text-center text-white text-sm text-bold">
					Please verify your email.
				</div>
			)}
			<header className="py-4 px-5 xl:px-0">
				<div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
					{logoSymbol(121, 21)}
					<span className="text-xs cursor-pointer">
						<Link to="/edit-profile">{userSymbol(48, 48)}</Link>
						{data?.me.email}
					</span>
				</div>
			</header>
		</>
	)
}
