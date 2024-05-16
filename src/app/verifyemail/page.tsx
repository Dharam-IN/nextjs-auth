'use client'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [token, setToken] = useState("")
    const [verify, setVerify] = useState(false)
    const [error, setError] = useState(false)

    // const router = useRouter();

    const verifyUser = async () => {
        try {
            console.log("TOKEN",token)
            await axios.post("/api/users/verifyemail", token)
            setVerify(true)
        } catch (error: any) {
            setError(true)
            console.log("Error in Verify", error.response.data)
        }
    }

    useEffect(() => {
        // FIRST OPTION USING PURE JAVASCRIPT FOR EXTRACT URL DATA
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")

        // SECOND OPTION USING NEXT JS
        // const {query} = router;
        // const urlTokenTwo = query.token;
    }, [])

    useEffect(() => {
        if(token.length > 0){
            verifyUser()
        }
    }, [token])

  return (
    <div>
      <div className="flex justify-center flex-col gap-3 items-center min-h-screen w-full">
        <h1>Verify Email</h1>
        <h2>{token ? token : "no token"}</h2>

        {
            verify && (
                <div>Verified</div>
            )
        }
        {
            error && (
                <div>Error</div>
            )
        }
      </div>
    </div>
  )
}

export default page
