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
              className= 'px-4 py-2 text-white bg-green-500 rounded-3xl hover:bg-green-700 transition duration-600' style={{ position: 'relative', right: '-350px' }}

            >
              Sign In
            </Link>
            <Link
              href='sign-up'
              className= 'px-4 py-2 text-white bg-green-500 rounded-3xl hover:bg-green-700 transition duration-600' style={{ position: 'relative', left: '380px' }}

            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      <div className='ml-auto'>
        {/* Additional content can go here */}
         {/*Strength Training More Info */}
         <Link href='more-info' className='px-4 py-2 text-white  rounded-3xl hover:bg-lime-400 transition duration-600' style={{ position: 'relative', top: '1155px', right: '937px' }}>
          More Info
        </Link>

        {/*Cardio Training More Info */}
        <Link href='more-info2' className='px-4 py-2 text-white  rounded-3xl hover:bg-lime-400 transition duration-600' style={{ position: 'relative', top: '1155px', right: '710px' }}>
          More Info
        </Link>

        {/*Fat Burning More Info */}
        <Link href='more-info3' className='px-4 py-2 text-white  rounded-3xl hover:bg-lime-400 transition duration-600' style={{ position: 'relative', top: '1155px', right: '483px' }}>
          More Info
        </Link>

        {/*Health Fitness More Info */}
        <Link href='more-info4' className='px-4 py-2 text-white  rounded-3xl hover:bg-lime-400 transition duration-600' style={{ position: 'relative', top: '1155px', right: '255px' }}>
          More Info
        </Link>
      </div>
    </header>
    </div>
  );
};

export default Header;


