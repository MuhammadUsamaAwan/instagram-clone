import { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { db } from '../config/firebase.config'
import avatar from '../assets/images/avatar.jpg'
import { ReactComponent as PostsIcon } from '../assets/icons/posts-profile.svg'
import { ReactComponent as PostsActiveIcon } from '../assets/icons/posts-profile-active.svg'
import { ReactComponent as VideosIcon } from '../assets/icons/videos.svg'
import { ReactComponent as VideosActiveIcon } from '../assets/icons/videos-active.svg'
import { ReactComponent as TaggedIcon } from '../assets/icons/tagged.svg'
import { ReactComponent as TaggedActiveIcon } from '../assets/icons/tagged-active.svg'
import PublicFooter from '../layouts/PublicFooter'
import UsersPost from './components/users/UsersPost'
import UsersVideos from './components/users/UsersVideos'
import UsersTagged from './components/users/UsersTagged'

const UserProfile = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const [user, setUser] = useState({})
  const [activeTab, setActiveTab] = useState('')

  const getProfile = async () => {
    const docRef = doc(db, 'users', params.id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setUser(docSnap.data())
      console.log(docSnap.data())
    }
  }

  useEffect(() => {
    getProfile()
  }, [params])

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
                src={user.photoURL ? user.photoURL : avatar}
                alt='avatar'
                loading='lazy'
              />
            </div>
          </div>

          <div className='flex-[2] space-y-4'>
            <div>
              <div className='flex items-center space-x-6'>
                <h2 className='text-[1.75rem] font-light'>{user.userName}</h2>
                <button className='font-semibold rounded bg-vividcerulean text-white py-[0.3125rem] px-[0.5625rem]'>
                  Follow
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
              <div className='font-semibold'>{user.name}</div>
              {user.bio && <div>{user.bio}</div>}
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
            onClick={() => {
              setActiveTab('posts')
              navigate(`/users/${params.id}?posts`)
            }}
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
          {/* videos tab */}
          <button
            className={`${
              activeTab === 'videos' && 'border-t'
            } text-xs flex items-center py-6`}
            onClick={() => {
              setActiveTab('videos')
              navigate(`/users/${params.id}?videos`)
            }}
          >
            {activeTab === 'videos' ? <VideosActiveIcon /> : <VideosIcon />}
            <span
              className={`${
                activeTab !== 'videos' && 'text-philippinegray'
              } uppercase ml-1 font-semibold tracking-tighter-[1px]`}
            >
              videos
            </span>
          </button>
          {/* tagged tab */}
          <button
            className={`${
              activeTab === 'tagged' && 'border-t'
            } text-xs flex items-center  py-6`}
            onClick={() => {
              setActiveTab('tagged')
              navigate(`/users/${params.id}?tagged`)
            }}
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
        {activeTab === 'posts' && <UsersPost />}
        {activeTab === 'videos' && <UsersVideos />}
        {activeTab === 'tagged' && <UsersTagged />}
      </div>

      <PublicFooter />
    </section>
  )
}

export default UserProfile
