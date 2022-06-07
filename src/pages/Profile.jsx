import { auth } from '../config/firebase.config'
import avatar from '../assets/images/avatar.jpg'
import { ReactComponent as Settings } from '../assets/icons/settings.svg'

const Profile = () => {
  return (
    <section className='grid place-content-center'>
      <div className='py-[1.875rem] px-0 sm:px-5 w-screen md:w-[48rem] xl:w-[60.9375rem]'>
        {/* profile header */}
        <div className='flex'>
          <div className='h-[9.375rem] w-[9.375rem] rounded-full overflow-hidden flex'>
            <img
              src={
                auth.currentUser.photoURL ? auth.currentUser.photoURL : avatar
              }
              alt=''
            />
          </div>

          <div>
            <div>
              <div>
                <h2>{auth.currentUser.userName}</h2>
                <button>Edit Profile</button>
                <Settings />
              </div>
            </div>

            <div>
              <div>
                <span>0</span>posts
              </div>
              <div>
                <span>0</span>followers
              </div>
              <div>
                <span>0</span>following
              </div>
            </div>

            <div>
              <div>{auth.currentUser.name}</div>
              <div>Bio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
