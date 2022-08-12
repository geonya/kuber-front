interface TitleProps {
	title: string
}
export default function Title({ title }: TitleProps) {
	return <h4 className="w-full text-center text-xl font-medium">{title}</h4>
}
