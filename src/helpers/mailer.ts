import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel';

export const sendMail = async({email, emailType, userId}: any) => {
    try {

        //TODO: configure mail for usage
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log(hashedToken)

        // console.log("MAIL:", email)
        // console.log("USERID:", userId)
        // console.log("emailType:", emailType)
        // console.log(typeof emailType)

        if(emailType == "VERIFY"){
            await User.findByIdAndUpdate(userId, {$set:{
                verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
            }})
        }else if(emailType == "RESET"){
            await User.findByIdAndUpdate(userId, {$set:{
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
            }})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "76dd27a58dbc8b",
              pass: "f6c4846bd6444f"
            }
        });

        const mailOptions = {
            from: 'dharamdotin@gmail.com',
            to: email,
            subject: emailType == "VERIFY" ? "Verify Your email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p> `,
        }

        const mailReponse = await transport.sendMail(mailOptions)
        return mailReponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}
