import { useSearchParams } from 'react-router-dom'

export default function Search() {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
  return <div>{keyword}</div>
}
