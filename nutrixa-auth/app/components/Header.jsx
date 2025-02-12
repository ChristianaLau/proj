import Link from 'next/link';
import Image from 'next/image'; 
import { UserCircleIcon } from '@heroicons/react/24/solid'; 
import { UserButton, auth } from '@clerk/nextjs';

const Header = () => {
  const { userId } = auth(); 

  return (
    <div>
    {/* Black line on header */}
    <div style={{ 
      width: '95%', 
      height: '3px', 
      backgroundColor: 'black', 
      position: 'absolute', // Fixed to stay at the top of the page
      top: '127px',
      left: '35px',
      marginBottom: '20px'
    }}>
    </div>


    <header className="w-full flex justify-between items-center border-b p-4">
      <div className="flex justify-start flex-grow">
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src="/nutrixa-logo.svg"
              alt="nutrixa-icon"
              width={200}
              height={100}
              priority
            />
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        {userId ? (
          <>
  <Link href="/dashboard" legacyBehavior>
  <a className="px-4 py-2 text-white bg-green-500 rounded-3xl hover:bg-green-700 transition duration-600">
   My Dashboard
</a>
</Link>
            <div className=" flex items-center">
              <div className="flex items-center justify-center w-16 h-16">
                <UserButton
                  afterSignOutUrl='/'
                  className="w-full h-full"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              href='sign-in'
              className= 'px-4 py-2 text-white bg-green-500 rounded-3xl hover:bg-green-700 transition duration-600' style={{ position: 'relative', right: '70px' }}

            >
              Sign In
            </Link>
            <Link
              href='sign-up'
              className= 'px-4 py-2 text-white bg-green-500 rounded-3xl hover:bg-green-700 transition duration-600' style={{ position: 'relative', left: '-40px' }}

            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      <div className='ml-auto'>
        {/* Additional content can go here */}
        
      </div>
    </header>
    </div>
  );
};

export default Header;


