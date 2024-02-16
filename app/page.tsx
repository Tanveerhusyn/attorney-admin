import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Root = async() => {
    const session = await getServerSession();

    if(session){
        redirect('/dashboard')
    }
    else{
        redirect('/sign-in')
    }

  return (
    <div>Loading</div>
  )
}

export default Root