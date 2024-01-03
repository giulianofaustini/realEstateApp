import { useState } from 'react'
import { UserInterface} from '../../../src/interfaces/userInterface'

export const SignUp = () => {

 const [ formData, setFormData ] = useState<UserInterface>({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
})
// const [ error, setError ] = useState<string | null>(null)
// const [ loading, setLoading ] = useState<boolean>(false)

const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value
    })
}

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(formData)
    const res = await fetch('http://localhost:3000/api/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data)
} 

// console.log(formData)


 
  return (
    <div className="max-w-lg  mx-auto mt-10"> 
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" onChange={handleFormChange}/>
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" onChange={handleFormChange}/>
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" onChange={handleFormChange}/>
        <button  className=' bg-sky-200 p-3 rounded-lg text-white hover:opacity-85 hover:text-slate-500 disabled:opacity-50' type='submit' >
        Sign Up
      </button>
      </form>
    </div>
  )
}
