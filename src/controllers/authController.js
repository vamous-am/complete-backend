import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
    const {name, email, password} = req.body;
    
    // check if user exists
    const existUser = await prisma.user.findUnique({
        where: { email: email }
    });

    if (existUser) {
        res.status(409).json({ message: "User already exists with this email" });
    } 
     // hash the password before storing it in the database
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     // create user
     const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ status: "User created successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
         });
    };
   

// export the registerController
export { registerController };