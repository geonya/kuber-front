interface IRestaurantProps {
  id: number
  coverImg: string
  name: string
  category?: {
    name: string
  } | null
}

export default function Restaurant({
  id,
  coverImg,
  name,
  category,
}: IRestaurantProps) {
  return (
    <div className='flex flex-col'>
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className='bg-cover bg-no-repeat py-28'
      />
      <h3 className='text-xl font-bold mt-2'>{name}</h3>
      <span className='text-xs opacity-50 border-t border-gray-400 mt-2 py-2 '>
        {category?.name}
      </span>
    </div>
  )
}
