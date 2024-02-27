import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: {
      label: 'User Name',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
  },
  async authorize(credentials) {
    // we are keeping it simple in this case by not using prisma or any database and just hard coding our values
    if (credentials.username === 'CU' && credentials.password === '123456') {
      return {
        name: 'Chukwuma',
      };
    } else {
      return null;
    }
  },
});

const config = {
  providers: [Google, credentialsConfig],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/middlewareProtected') {
        return !!auth;
        //turns the auth to a boolean. The type of the auth is a session, so if the session exists, the auth would be true and if it is not, the auth would be false and returns false from this authorized function and redirects us to the signIn page automatically
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// The credentials object has 2 main purposes:
// 1. To define the shape of our credentials, for example, we want our users to have the username/email and password in order to be able sign in with the credentials provider
// 2. We can specify the type and the shape of the inputs inside the signIn page of the next-auth.

// When the user clicks on the Sign In button in the Sign In page, the username and password would be packed as a credentials object and would be sent to this 'authorize' function.

// In real world scenarios where we have a separate backend server, we call tbe login API of the backend server and send the credentials to it and wait for the response.
// The backend server checks the database if the user exists or not and if the user exists, it returns the user object and we can return it from the 'authorize' function.

// If we use nextjs for a fullstack project, we usually have a database and we can access it inside the nextjs with some ORMs like prisma or drizzle ORM.

// Creating a custom signIn page with credentials or google provider follows the same steps as in next-auth v4.
