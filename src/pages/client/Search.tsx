import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSearchRestaurantLazyQuery } from '../../graphql/__generated__'

export default function Search() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState<string | null>(null)

  const [queryReadyToStart, { loading, data, called }] =
    useSearchRestaurantLazyQuery()
  useEffect(() => {
    const query = searchParams.get('query')
    if (!query) {
      return navigate('/', { replace: true })
    }
    setQuery(query)
    queryReadyToStart({
      variables: {
        input: { query },
      },
    })
  }, [navigate, searchParams, queryReadyToStart])
  console.log(loading, data, called)
  return (
    <>
      <Helmet>
        <title>Search | Kuber</title>
      </Helmet>
      {loading ? <div>Loading...</div> : <div>{query}</div>}
    </>
  )
}
