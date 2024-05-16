'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/navigation"

const page = () => {

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)


  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log(response.data)
      router.push("/profile")
    } catch (error) {
      console.log("Signup Failed", error)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <>
      <div className="flex justify-center items-center min-h-[85vh] bg-gray-100 dark:bg-[#334d5e] px-5 md:py-0 py-10">
        {/* <form className="bg-white dark:bg-[#153448] shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 w-full"> */}
        <div className="bg-white dark:bg-[#153448] shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 w-full">
          <h3 className="text-center text-2xl">{loading ? "Processing" : "Login"}</h3>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2 dark:text-[#DFD0B8]">Email</label>
            <input id="email" name='email' type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Enter your email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2 dark:text-[#DFD0B8]">Password</label>
            <div className="relative">
              <input id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} name='password' type={showPassword ? "text" : "password"} placeholder="Enter your password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <div className='absolute top-[50%] right-3 cursor-pointer translate-y-[-50%]' onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEye className="text-gray-700"/> : <FaEyeSlash className="text-gray-700" />}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" onClick={onLogin} className="bg-blue-500 dark:bg-[#DFD0B8] dark:text-[#153448] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{buttonDisabled ? "No Signup" : "Signup"}</button>
          </div>

          <h6 className='mt-5 dark:text-[#DFD0B8]'>Don't Have an <Link href={"/signup"} className='text-[#3b82f6]'>Account</Link></h6>
        {/* </form> */}
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default page
