import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  const { data } = api.post.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Emoji X</title>
        <meta name="description" content="Social media emoji based" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!user.isSignedIn && <SignInButton />}
        {!!user.isSignedIn && <SignOutButton />}
        <ul>
          {data?.map(({ authorID, content, id }) => (
            <li key={id}>
              <h3>{authorID}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
