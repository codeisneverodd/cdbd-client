import bcrypt from 'bcryptjs';

export async function saltAndHashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function comparePasswordToHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
