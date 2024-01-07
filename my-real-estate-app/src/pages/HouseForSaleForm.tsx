import React, { useState } from 'react'
import { HouseInterface } from  "../../../src/interfaces/houseInterface"
import { useNavigate } from 'react-router-dom';


export const HouseForSaleForm = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    
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


      const handleFormForSaleChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/create-house-for-sale", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formDataForSale),
            });

            const data = await res.json();
            console.log('data from the handle submit form to check what info I have', data);

            if (data.ok) {
                setFormDataForSale({
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
                });
                setLoading(false);
                console.log(data.message);
                navigate("/api/housesForSale");
            } else {
                setLoading(false);
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
        navigate("/api/housesForSale");
    }
    }


  return (
    <div className="max-w-lg  mx-auto mt-10">
        <form className='flex flex-col gap-3 m-5' onSubmit={handleFormForSaleChange}>
            <input className='p-5 border rounded-lg' type="text" placeholder='title' id='title' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='description' id='description' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="number" placeholder='price' id='price' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='address' id='address' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='location' id='location' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='imageUrl' id='imageUrl' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='agent' id='agent' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='bedrooms' id='bedrooms' onChange={handleFormChange}/>
            <input className='p-5 border rounded-lg' type="text" placeholder='bathrooms' id='bathrooms' onChange={handleFormChange}/>
            <button className='p-5 border rounded-lg' disabled={loading}>Submit</button>
        </form>


    </div>
  )
}
