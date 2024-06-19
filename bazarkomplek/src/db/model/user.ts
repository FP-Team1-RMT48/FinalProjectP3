import { z } from "zod";
import { db } from "../config";
import { InputLogin } from "@/app/api/users/login/route";
import { hashPassword } from "@/helpers/bcryptjs";

const UserSchema = z.object({
    username: z.string({message:`Username cannot be empty`}).min(3),
    email: z.string({message:`Email cannot be empty` }).email().min(1),
    password: z.string({message:`Password cannot be empty`}).min(5,{message: `Password length minimum is 5`}),
    location: z.string().optional(),
    phoneNumber: z.string({message:`Phone Number cannot be empty` }),
    isAdmin: z.boolean().default(false).optional()
});

const LoginUserSchema = z.object({
    email: z.string().min(1, { message: "Email cannot be empty" })
        .email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password cannot be empty" }),
});

type User = z.infer<typeof UserSchema>;

export default class Users{
    static userCollection() {
        return db.collection<User>("Users");
    }
    static async findAll() {
        return await this.userCollection().find().toArray();
    }
    static async getUserByEmail(email: string) {
        const userCollection = this.userCollection()
        const data = await userCollection.findOne({ email: email })
        return data;
    }

    static async register(newUser: User) {
        UserSchema.parse(newUser);
        const isEmailUnique = await this.userCollection().findOne({
            email: newUser.email,
        });
        const isUsernameUnique = await this.userCollection().findOne({
            username: newUser.username,
        });
        const isPhoneNumberUnique = await this.userCollection().findOne({
            phoneNumber: newUser.phoneNumber,
        });
        if (isEmailUnique) {
            throw new Error("Email already exists");
        }
        if (isUsernameUnique) {
            throw new Error("Username already exists");
        }
        if (isPhoneNumberUnique) {
            throw new Error("Phone Number already exists");
        }

        return await this.userCollection().insertOne({
            ...newUser,
            password: hashPassword(newUser.password),
        });
    }
    static async login(inputLogin: InputLogin) {
        const parseResult = LoginUserSchema.safeParse(inputLogin);
        if (!parseResult.success) {
            throw parseResult.error;
        }
        return await this.userCollection().findOne({ email: inputLogin.email });
    }
}