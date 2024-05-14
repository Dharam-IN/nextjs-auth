import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const {email, password} = reqbody;
        console.log(reqbody)

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User Not Found"}, {status: 500})
        }

        console.log(user)

        const validPassword = bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Chech Your Credentials"}, {status: 500})
        }

        const tokenData = {
            id: user._id,
            username: user.name,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: '1d'});
        const response = NextResponse.json({
            message: "Logged in Success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

