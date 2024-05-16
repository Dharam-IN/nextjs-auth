import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connect()

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json();
        const {token} = reqbody;
        console.log("tokennn", token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
        console.log("userrrrr", user)
        if(!user){
            return NextResponse.json({error: "Invalid Token"}, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        user.save();
        
        return NextResponse.json({message: "Email Verified", sucess: true}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}