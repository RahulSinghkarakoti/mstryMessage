import bcrypt  from 'bcryptjs';
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
          }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { password: credentials.identifier },
                        ]
                    });
                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in');

                    }
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (isValid) {
                        return user;
                    }else{
                        throw new Error('invalid password');
                    }
                } catch (err: any) {
                    throw new Error(err)

                }
            }
        })
    ],
    callbacks:{
        
        async jwt({ token, user ,account}) {
            if(account?.provider=='google'){
                if(user){
                    await dbConnect()
                    const existingUser=await UserModel.findOne({email:user.email})
                    if(!existingUser){
                        const newUser=await UserModel.create({
                            email: user.email,
                            username: user.name,
                            isVerified: true, // since Google verified the user
                            password: "none",
                        })
                        token._id=newUser._id?.toString();

                        token.username = user?.name as string;
                    }
                    else{
                        token.username = existingUser?.username as string;
                        token._id=existingUser._id?.toString()
                    }
                     
                    token.isVerified = user.isVerified;
                    token.provider=account.provider;
                    token.email = user.email;
                }

            }else{

                if(user){
                    token._id = user._id?.toString(),
                    token.isVerified = user.isVerified;
                    token.isAcceptingMessages = user.isAcceptingMessages;
                    token.username = user.username;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
              session.user._id = token._id;
              session.user.isVerified = token.isVerified;
              session.user.isAcceptingMessages = token.isAcceptingMessages;
              session.user.username = token.username;
            }
            return session;
          },
    },
    session:{
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
      },
} 