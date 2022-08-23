import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useRestaurantsQuery } from '../../graphql/__generated__'

export default function Restaurant() {
  const { data, loading } = useRestaurantsQuery({
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
            className='input w-1/2 sm:w-4/12'
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
            <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-7'>
              {data?.restaurants.results?.map((restaurant) => (
                <div className='space-y-3'>
                  <div
                    style={{ backgroundImage: `url(${restaurant.coverImg})` }}
                    className='bg-cover bg-no-repeat py-28'
                  />
                  <h3 className='text-xl font-bold mb-2'>{restaurant.name}</h3>
                  <div className='border-t border-gray-300 py-1' />
                  <span className='text-gray-500'>
                    {restaurant.category?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
