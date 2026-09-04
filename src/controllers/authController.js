import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

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
        // generate a JWT token
         const token = generateToken(user.id, res);

        res.status(201).json({ status: "User created successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: token,
         });
    };
   
const loginController = async (req, res) => {
    const { email, password } = req.body;
 try {
    // check if user email exists in the database
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) {
       return res.status(404).json({ Error: "User not found" });
    }

    // compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
       return res.status(401).json({ Error: "Invalid password" });
    }
    // generate a JWT token
    const token = generateToken(user.id, res);


    // if login is successful, return user data (excluding password)
     res.status(200).json({ status: "User logged in successfully",
            data: {
                id: user.id,
                email: user.email,
            },
            token: token,
         });
 } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({ Error: "Internal server error" });
 }
};
const logoutController = async (req, res) => {
    res.cookie("jwt", " ",
        {
            expires: new Date(0), 
            httpOnly: true
        }
    );
    res.status(200).json({ 
        status: "success", 
        message: "Logout successful" ,
    });
}
// export the registerController
export { registerController, loginController, logoutController };