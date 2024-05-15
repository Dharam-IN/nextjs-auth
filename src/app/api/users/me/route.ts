import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helpers/getDatafromToken";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    const userID = await getDataFromToken(request)

    const user = await User.findById({_id: userID}).select("-password")

    return NextResponse.json({
        message: "User Found",
        data: user
    })

}
