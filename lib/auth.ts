import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { createTransport } from 'nodemailer';
import EmailProvider from 'next-auth/providers/email';
import { db } from '@/lib/db';
import { signInString, signInTemplate } from '@/templates/signIn';
import { activationString, activationTemplate } from '@/templates/activation';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/confirm',
    newUser: '/settings',
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        });

        const template = user?.emailVerified
          ? signInTemplate
          : activationTemplate;
        const string = user?.emailVerified ? signInString : activationString;

        const { host } = new URL(url);
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: string({ url }),
          html: template({ url }),
          headers: {
            'X-Entity-Ref-ID': String(new Date().getTime()),
          },
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = String(user?.id);
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
