import { Connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendMail } from "@/helpers/mailer";

Connect()

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json()

        const {username, email, password} = reqbody;

        // validation
        console.log(reqbody)

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email
        sendMail({email, emailType: "Verify", userId: savedUser._id})

        return NextResponse.json({
            message: "User Register Successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}