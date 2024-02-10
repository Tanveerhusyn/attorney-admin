
import '../globals.css'
import { SideBar } from '@/components/sidebar';
import Header from '@/components/header';
import PageWrapper from '@/components/pagewrapper';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

import { NextAuthOptions } from 'next-auth';
import { redirect } from 'next/navigation';



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/sign-in')
  }

  console.log("Session", session)
  return (

    <section className='min-h-screen flex'>
      <SideBar></SideBar>
      <Header></Header>
      <PageWrapper children={children}></PageWrapper>
    </section>


  )
}
