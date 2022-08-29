import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Restaurant from '../../components/Restaurant'
import { useRestaurantsQuery } from '../../graphql/__generated__'

interface ISearchFormValues {
  query: string
}

export default function Restaurants() {
  let navigate = useNavigate()
  const [page, setPage] = useState(1)
  const { data, loading } = useRestaurantsQuery({
    variables: {
      restaurantsInput: {
        page,
      },
    },
  })
  const onNextPageClick = () => setPage((current) => current + 1)
  const onPrevPageClick = () =>
    setPage((current) => (current !== 1 ? current - 1 : 1))
  const { register, handleSubmit } = useForm<ISearchFormValues>()
  const onSearchFormValid = ({ query }: ISearchFormValues) => {
    navigate({
      pathname: `/search`,
      search: `query=${query}`,
    })
  }

  return (
    <>
      <Helmet>
        <title>Restaurants | Kuber</title>
      </Helmet>
      <div>
        <form
          onSubmit={handleSubmit(onSearchFormValid)}
          className='bg-gray-800 w-full py-32 flex items-center justify-center'
        >
          <input
            {...register('query', { required: true, minLength: 2 })}
            className='input w-3/5 lg:w-4/12'
            type='search'
            placeholder='Search Restaurants...'
          />
        </form>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='container mt-8 pb-20 md:grid-cols-3'>
            <div className='flex justify-around max-w-xs mx-auto cursor-pointer'>
              {data?.allCategories.categories?.map((category, i) => (
                <div className='flex flex-col items-center group' key={i}>
                  <div
                    style={{
                      backgroundImage: `url(${
                        '/images/' + category.slug + '.svg'
                      })`,
                    }}
                    className='w-16 h-16 rounded-full flex justify-center items-center bg-cover bg-no-repeat group-hover:bg-gray-200'
                  />
                  <span className='text-sm mt-1'>{category.name}</span>
                </div>
              ))}
            </div>
            <div className='w-full mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-7'>
              {data?.restaurants.results?.map((restaurant, i) => (
                <Restaurant key={i} {...restaurant} />
              ))}
            </div>
            <div className='grid grid-cols-3 items-center text-center max-w-sm mt-10 mx-auto'>
              {page > 1 ? (
                <button
                  className='focus:outline-none font-medium text-2xl'
                  onClick={onPrevPageClick}
                >
                  &larr;
                </button>
              ) : (
                <div />
              )}
              <span>
                Page {page} of {data?.restaurants.totalPages}
              </span>
              {page !== data?.restaurants.totalPages ? (
                <button
                  className='focus:outline-none font-medium text-2xl'
                  onClick={onNextPageClick}
                >
                  &rarr;
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
