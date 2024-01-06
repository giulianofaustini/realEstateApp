import React, { useState } from 'react'
import { HouseInterface } from  "../../../src/interfaces/houseInterface"



export const HouseForSaleForm = () => {



    const [ formDataForSale , setFormDataForSale ] = useState<HouseInterface>({
        id: "",
        title: "",
        description: "",
        price: 0,
        address: "",
        location: "",
        imageUrl: "",
        agent: "",
        bedrooms: 0,
        bathrooms: 0,
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDataForSale({
          ...formDataForSale,
          [e.target.id]: e.target.value,
        });
      };



  return (
    <div className="max-w-lg  mx-auto mt-10">
        <form className='flex flex-col gap-3 m-5'>
            <input className='p-5 border rounded-lg' type="text" placeholder='title' id='title' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='description' id='description' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="number" placeholder='price' id='price' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='address' id='address' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='location' id='location' onChange={handleFormChange}/>
            {/* <input type="image" placeholder='imageUrl' id='imageUrl' onChange={handleFormChange}/> */}
            <input className='p-5 border rounded-lg' type="text" placeholder='agent' id='agent' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='bedrooms' id='bedrooms' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='bathrooms' id='bathrooms' onChange={handleFormChange}/>
        </form>


    </div>
  )
}
