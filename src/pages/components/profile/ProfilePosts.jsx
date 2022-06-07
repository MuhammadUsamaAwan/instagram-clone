import emptyPost from '../../../assets/images/empty-post.jpg'

const ProfilePosts = () => {
  return (
    <div className='flex justify-center flex-col sm:flex-row'>
      <div className='order-2 sm:order-1'>
        <img
          src={emptyPost}
          alt='no posts yet'
          className='sm:h-[23.75rem] sm:w-[23.75rem] w-full h-auto'
        />
      </div>
      <div className='text-lg flex-1 bg-transparent sm:bg-white text-center sm:flex justify-center flex-col order-1 sm:order-2 py-12 sm:py-0'>
        <h2 className='font-semibold'>
          Start capturing and sharing your moments.
        </h2>
        <p>Get the app to share your first photo or video.</p>
      </div>
    </div>
  )
}

export default ProfilePosts
