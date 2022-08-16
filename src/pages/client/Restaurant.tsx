import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useRestaurantsQuery } from '../../graphql/__generated__'

export default function Restaurant() {
  const { data, loading, error } = useRestaurantsQuery({
    variables: {
      restaurantsInput: {
        page: 1,
      },
    },
  })
  return (
    <>
      <Helmet>
        <title>Restaurants | Kuber</title>
      </Helmet>
      <div>
        <form className='bg-gray-800 w-full py-32 flex items-center justify-center'>
          <input
            className='input w-3/12'
            type='search'
            placeholder='Search Restaurants...'
          />
        </form>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='container mt-8'>
            <div className='flex justify-around max-w-xs mx-auto cursor-pointer'>
              {data?.allCategories.categories?.map((category, i) => (
                <div className='flex flex-col items-center' key={i}>
                  <div
                    style={{
                      backgroundImage: `url(${
                        '/images/' + category.slug + '.svg'
                      })`,
                    }}
                    className='w-14 h-14 rounded-full flex justify-center items-center bg-cover bg-no-repeat hover:bg-gray-300'
                  ></div>
                  <span className='text-sm mt-1'>{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
