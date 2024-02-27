'use client';

import { useSession } from 'next-auth/react';

const ClientPage = () => {
  const { data: session } = useSession(); //we rename data 'session' here

  if (!session || !session.user)
    return (
      <div className="text-red-500 p-5 text-center">You Need To Sign In</div>
    );

  return <div>This is a client page and must be protected</div>;
};

export default ClientPage;
