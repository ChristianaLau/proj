import Link from 'next/link';
import Image from 'next/image'; 
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
        position: 'absolute',
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
                alt="Nutrixa Logo"
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
              <div className='ml-auto space-x-2'>
          {/*Strength Training More Info */}
          <Link href='more-info' legacyBehavior>
            <a className='px-4 py-2 text-white rounded-3xl bg-green-500 transition duration-600'>
              Strength
            </a>
          </Link>

          {/*Cardio Training More Info */}
          <Link href='more-info2' legacyBehavior>
            <a className='px-4 py-2 text-white rounded-3xl bg-green-500 transition duration-600'>
              Cardio
            </a>
          </Link>

          {/*Fat Burning More Info */}
          <Link href='more-info3' legacyBehavior>
            <a className='px-4 py-2 text-white rounded-3xl bg-green-500 transition duration-600'>
              Fat Burn
            </a>
          </Link>

          {/*Health Fitness More Info */}
          <Link href='more-info4' legacyBehavior>
            <a className='px-4 py-2 text-white rounded-3xl bg-green-500 transition duration-600'>
              Health
            </a>
          </Link>
        </div>
              <div className="flex items-center justify-center w-16 h-16">
                <UserButton
                  afterSignOutUrl='/'
                />
              </div>
            </>
          ) : (
            <>
              <Link href='sign-in' legacyBehavior>
                <a className='px-4 py-2 text-white bg-green-500 rounded-3xl hover:bg-green-700 transition duration-600' style={{ position: 'relative', right:'100px', marginRight:'25px'}}>
                  Sign In
                </a>
              </Link>
              <Link href='sign-up' legacyBehavior>
                <a className='px-4 py-2 text-white bg-green-500 rounded-3xl hover:bg-green-700 transition duration-600' style={{ position: 'relative',right:'100px'}}>
                  Sign Up
                </a>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
