import Link from 'next/link';
import Image from 'next/image'; 
import { UserCircleIcon } from '@heroicons/react/24/solid'; 
import { UserButton, auth } from '@clerk/nextjs';

const Header = () => {
  const { userId } = auth(); 

  return (
    <header className="w-full flex justify-between items-center border-b p-4">
      <div className="flex justify-center flex-grow">
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src="/nutrixa-logo.svg"
              alt="nutrixa-icon"
              width={250}
              height={150}
              priority
            />
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        {userId ? (
          <>
            <input
              type="text"
              placeholder="search"
              className="p-2 border border-gray-300 rounded-full text-sm"
            />
            <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-sm">
              Search
            </button>
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
              className='text-black hover:text-gray-300 mr-4 text-xl'
            >
              Sign In
            </Link>
            <Link
              href='sign-up'
              className='text-black hover:text-gray-300 mr-4 text-xl'
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
  );
};

export default Header;
