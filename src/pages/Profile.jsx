import { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { useLocation, Link } from 'react-router-dom'
import { auth, db } from '../config/firebase.config'
import avatar from '../assets/images/avatar.jpg'
import { ReactComponent as Settings } from '../assets/icons/settings.svg'
import { ReactComponent as PostsIcon } from '../assets/icons/posts-profile.svg'
import { ReactComponent as PostsActiveIcon } from '../assets/icons/posts-profile-active.svg'
import { ReactComponent as SavedIcon } from '../assets/icons/saved-profile.svg'
import { ReactComponent as SavedActiveIcon } from '../assets/icons/saved-profile-active.svg'
import { ReactComponent as TaggedIcon } from '../assets/icons/tagged.svg'
import { ReactComponent as TaggedActiveIcon } from '../assets/icons/tagged-active.svg'
import ProfilePosts from './components/profile/ProfilePosts'
import ProfileSaved from './components/profile/ProfileSaved'
import ProfileTagged from './components/profile/ProfileTagged'
import PublicFooter from '../layouts/PublicFooter'

const Profile = () => {
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState({})
  const [activeTab, setActiveTab] = useState('')

  const getProfile = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setCurrentUser(docSnap.data())
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    setActiveTab(location.search.slice(1) ? location.search.slice(1) : 'posts')
  }, [location])

  return (
    <section className='grid place-content-center'>
      <div className='py-[1.875rem] px-0 sm:px-5 w-screen md:w-[48rem] xl:w-[60.9375rem] min-h-[82vh]'>
        {/* profile header */}
        <div className='flex items-center'>
          <div className='flex-1'>
            <div className='h-[4.6875rem] sm:h-[9.375rem] w-[4.6875rem] sm:w-[9.375rem] rounded-full overflow-hidden flex ml-0 sm:ml-14'>
              <img
                src={
                  auth.currentUser.photoURL ? auth.currentUser.photoURL : avatar
                }
                alt='avatar'
                loading='lazy'
              />
            </div>
          </div>

          <div className='flex-[2] space-y-4'>
            <div>
              <div className='flex items-center space-x-6'>
                <h2 className='text-[1.75rem] font-light'>
                  {auth.currentUser.displayName}
                </h2>
                <button className='font-semibold rounded border border-gainsboro py-[0.3125rem] px-[0.5625rem] hidden sm:block'>
                  <Link to='/editprofile'>Edit Profile</Link>
                </button>
                <button>
                  <Settings width={24} height={24} />
                </button>
              </div>
            </div>

            <div className='flex space-x-6 text-base'>
              <div>
                <span className='font-semibold mr-1'>0</span>posts
              </div>
              <div>
                <span className='font-semibold mr-1'>0</span>followers
              </div>
              <div>
                <span className='font-semibold mr-1'>0</span>following
              </div>
            </div>

            <div className='text-base'>
              <div className='font-semibold'>{currentUser?.name}</div>
              <div>{currentUser.bio ? currentUser.bio : 'bio'}</div>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className='border-t border-gainsboro mt-8 flex justify-center items-center space-x-20'>
          {/* post tab */}
          <button
            className={`${
              activeTab === 'posts' && 'border-t'
            } text-xs flex items-center py-6`}
            onClick={() => setActiveTab('posts')}
          >
            {activeTab === 'posts' ? <PostsActiveIcon /> : <PostsIcon />}
            <span
              className={`${
                activeTab !== 'posts' && 'text-philippinegray'
              } uppercase ml-1 font-semibold tracking-tighter-[1px]`}
            >
              posts
            </span>
          </button>
          {/* saved tab */}
          <button
            className={`${
              activeTab === 'saved' && 'border-t'
            } text-xs flex items-center py-6`}
            onClick={() => setActiveTab('saved')}
          >
            {activeTab === 'saved' ? <SavedActiveIcon /> : <SavedIcon />}
            <span
              className={`${
                activeTab !== 'saved' && 'text-philippinegray'
              } uppercase ml-1 font-semibold tracking-tighter-[1px]`}
            >
              saved
            </span>
          </button>
          {/* tagged tab */}
          <button
            className={`${
              activeTab === 'tagged' && 'border-t'
            } text-xs flex items-center  py-6`}
            onClick={() => setActiveTab('tagged')}
          >
            {activeTab === 'tagged' ? <TaggedActiveIcon /> : <TaggedIcon />}
            <span
              className={`${
                activeTab !== 'tagged' && 'text-philippinegray'
              } uppercase ml-1 font-semibold tracking-tighter-[1px]`}
            >
              tagged
            </span>
          </button>
        </div>

        {/* content */}
        {activeTab === 'posts' && <ProfilePosts />}
        {activeTab === 'saved' && <ProfileSaved />}
        {activeTab === 'tagged' && <ProfileTagged />}
      </div>

      <PublicFooter />
    </section>
  )
}

export default Profile
