import { useState } from 'react'
import { UserInterface} from '../../../src/interfaces/userInterface'
import { Link, useNavigate} from 'react-router-dom'

export const SignUp = () => {

 const [ formData, setFormData ] = useState<UserInterface>({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
})

const [ loading, setLoading ] = useState<boolean>(false)

const navigate = useNavigate()


const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value
    })
}

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
   
    try {
        const res = await fetch('http://localhost:3000/api/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (data) {
            setFormData({
                username: '',
                email: '',
                password: '',
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

       
        setLoading(false)
      
        console.log(data)
        navigate('/api/sign-in')
    } catch (error) {
        console.log(error)
       
        
        setLoading(false)
    }
 
} 

// console.log(formData)


 
  return (
    <div className="max-w-lg  mx-auto mt-10"> 
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" onChange={handleFormChange}/>
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" onChange={handleFormChange}/>
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" onChange={handleFormChange}/>
        <button disabled={loading}  className=' bg-sky-200 p-3 rounded-lg text-white hover:opacity-85 hover:text-slate-500 disabled:opacity-50' type='submit'
            
        >
        { loading ? 'Loading...' : 'Sign Up' }
      </button>
      </form>
      <div className='flex'>
        <p className='mt-5 text-slate-500'>Or sign in </p>
        <Link className='mt-5 ml-1 text-blue-500 hover:text-blue-600 ' to="/api/sign-in">Now</Link>
      </div>
    </div>
  )
}
