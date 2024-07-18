import Image from "next/image";
import Link from "next/link";

//Basic Home Layout

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: 'url(/bg-home.svg)' }}>
      <div className="absolute ml-40 mt-40">
          <h1 className='text-4xl font-serif mb-5'>Feel good, </h1>
          <h1 className='text-4xl font-serif mb-5'>Get fit, </h1>
          <h1 className='text-4xl font-serif mb-5'>Start today!</h1>
        </div>
        <Image src='/logo.png' width={180} height={180} className="mx-auto"/>
        <Image src='/woman.svg' width={600} height={600} className="mx-auto"/>
        <div className="flex flex-col justify-center items-center">
          <Link href="sign-in" className= "w-18 bg-green-500 hover:bg-green-700 text-white font-serif py-2 px-4 rounded-2xl"> Log In </Link>
          <Link href="sign-up" className="font-serif mt-4">Or click here to sign-up.</Link>
        </div>
      </div>
    </>
  );
}
