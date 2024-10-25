import React from 'react';
import CreatePostForm from '../Component/CreatePostForm';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

type Props = {};

const CreatePost = async (props: Props) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect('/Sign-In');
  }
  return (
    <div>
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
