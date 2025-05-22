"use client"
import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Error = () => {
 return (
   <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground">
     <div className="flex items-center gap-4 bg-white shadow-lg p-8 rounded-xl text-black">
       <FaExclamationTriangle className="text-red-500 text-6xl" />
       <div>
         <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
         <p className="mt-2">We couldn’t find the page you’re looking for.</p>
         <div className='space-x-6'>
         <Link href="/" className="mt-4 inline-block text-white bg-[#2A2A2A] hover:bg-[#2A2A2A] px-6 py-2 rounded-lg transition">
           Go Back Home
         </Link>
         <Button onClick={() => window.location.reload()}>Reload</Button>
         </div>
       </div>
     </div>
   </div>
 );
};

export default Error;
