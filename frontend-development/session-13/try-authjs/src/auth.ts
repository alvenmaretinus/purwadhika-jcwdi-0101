import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // pages: {
  //   // you need this for backend signin
  //   signIn: '/signin',
  // },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // this should contain your logic to validate the user credentials
        // for example, you can call your database or an external API

        // return a user object if the credentials are valid
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'secret') {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'secret',
          };
        }

        // return null if the credentials are invalid
        return null;
      },
    }),
  ],
});
