import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import logo from "../.././public/logo.png"
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart } from 'lucide-react'
import { PenBox } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
const Header = () => {
  const [showSignIn, setshowSignIn] = useState(false);
  const [search, setsearch] = useSearchParams();
  const { user } = useUser();
  useEffect(() => {
    if (search.get('sign-in')) {
      setshowSignIn(true);
      setsearch({});
    }
  }, [search])
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setshowSignIn(false);
    }
  }
  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link>
          <img src={logo} alt="" className='h-20' />
        </Link>
        <div className='flex gap-8'>
          <SignedOut>
            <Button onClick={() => setshowSignIn(true)} variant="outline" >Login</Button>
          </SignedOut>

          <SignedIn>
            {/* add a  condition here */}

            {user?.unsafeMetadata?.role === 'recruiter' && (
              <div>
               
                <Button variant="destructive" className='rounded-full'>
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
                <Link to="/post-job"> </Link>
              </div>
            )}
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              },
            }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="my Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>


      {
        showSignIn && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handleOverlayClick}>
            <SignIn
              signUpForceRedirectUrl='/onboarding'
              fallbackRedirectUrl='/onboarding'
            />
          </div>
        )
      }
    </>
  )
}

export default Header