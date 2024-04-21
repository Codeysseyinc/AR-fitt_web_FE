import React from 'react'
import { Grid } from '@mui/material'
import ItemCard from '../atomicComponents/ItemCard'

const SuggestedItems = () => {
  const items = Array.from({ length: 8 }, (_, index) => ({
    productName: `Product Name`,
    brandName: `Brand`,
  }));

  return (
    <Grid container className='flex flex-col gap-6 px-5'>
      <h1 className='m-0 p-0 font-Montserrat font-bold text-xl text-gray-400'>Suggested Items</h1>
      {/* Grid Rows */}
      <Grid className="flex flex-col gap-8">
        {Array.from({ length: items.length / 4 }, (_, rowIndex) => (
          <Grid key={rowIndex} className='flex justify-between'>
            {/* Grid Cols */}
            {Array.from({ length: 4 }, (_, colIndex) => (
              <ItemCard
                key={rowIndex * 4 + colIndex}
                productName={items[rowIndex * 4 + colIndex].productName}
                brandName={items[rowIndex * 4 + colIndex].brandName}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default SuggestedItems
