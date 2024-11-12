import { getVerificationTokenByEmail } from '@/data/verification-token';
import jwt from "jsonwebtoken";
import prisma from './database';

export const generateVerificationToken = async (email: string) => {
    // Generate a random token 
    const token = jwt.sign({ email: email }, process.env.SECRET??'', { expiresIn: "24h" });
    const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

    // Check if a token already exists for the user
    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    // Create a new verification token
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires: new Date(expires)
        }
    })

    return verificationToken;
}