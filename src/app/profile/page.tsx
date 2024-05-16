'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


const page = () => {

    const [data, setData] = useState()

    const router = useRouter()
    
    const getUserDetail = async () => {
        const response = await axios.post("/api/users/me")
        console.log(response.data.data._id)
        setData(response.data.data._id);
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2>Profile page</h2>
        <hr />
        <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>Test:- {data}</Link>}</h2>
        <hr />
        <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
        <button className="bg-green-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetail}>Get user detail</button>
      
    </div>
  )
}

export default page
