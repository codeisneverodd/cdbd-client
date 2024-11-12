import prisma from "@/lib/database";

export const getUserByEmail = async (email: string) => {
    try {
        const lowerCaseEmail = email.toLowerCase();
        const user = await prisma.user.findUnique({
            where: {
                email: lowerCaseEmail
            }
        })

        return user;
    } catch (error) {
        return null
    }
}

export const getUserById = async (id:string) => {
    try {
        const user = await prisma.user.findUnique({
        where: {
            id
        }
    }); 

    return user;
    } catch (error) {
        return null
    }
}


export const getUserFromDb = async (email: string, password: string) => {
  // logic to get user from db
  // example: const user
  return await prisma.user.findFirst({ where: { email, password } });
//   return user;
};