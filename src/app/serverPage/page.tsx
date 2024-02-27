import { auth } from 'auth';
import React from 'react';

const ServerPage = async () => {
  const session = await auth(); // we do not need to use getServerSession from version 4 here and we do not need to pass the authOptions argument to the function too

  if (!session || !session.user)
    return (
      <div className="text-red-500 p-5 text-center">You Need To Sign In</div>
    );

  return <div>This is a server page and must be protected</div>;
};

export default ServerPage;
