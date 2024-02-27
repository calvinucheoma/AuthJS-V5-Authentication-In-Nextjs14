import { auth, signIn, signOut } from 'auth';
import Link from 'next/link';

const AppBar = async () => {
  const session = await auth();
  return (
    <div className="p-2 bg-gradient-to-b from-slate-800 to-slate-600 flex gap-2">
      <Link href="/clientPage" className="text-blue-300">
        Client Page
      </Link>
      <Link href="/serverPage" className="text-blue-300">
        Server Page
      </Link>
      <Link href="/middlewareProtected" className="text-blue-300">
        Middleware Protected Page
      </Link>
      <div className="ml-auto">
        {session && session.user ? (
          <div className="flex gap-2">
            <p>{session.user.name}</p>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit" className="text-blue-300">
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <form
            action={async () => {
              'use server';
              await signIn();
            }}
          >
            <button type="submit" className="text-blue-300">
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppBar;

// ml-auto class inside a flex container would send the element all the way to the right of the container
// we cannot render a button with the 'onClick' function in a server component so we added a form here with a button to avoid changing this to a client component
