import {prismaClient} from "@prisma/client";

const prisma = new prismaClient({
    log: process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"] 
    : ["error"]
});

const connectDB = async () =>{
    try {
        await prisma.$connect()
        console.log("db connected via prisma")
    } catch (error) {
        console.error("databse connection error : ${error.message}");
        process.exit(1);
    }

}
const disconnectDB = async () =>{
    await prisma.$disconnect()

};

export {prisma, connectDB , disconnectDB};