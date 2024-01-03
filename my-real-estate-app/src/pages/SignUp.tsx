
export const SignUp = () => {



 
  return (
    <div className="max-w-lg  mx-auto mt-10"> 
      <form className="flex flex-col gap-2">
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" />

      </form>
    </div>
  )
}
