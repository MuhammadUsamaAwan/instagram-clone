import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, limit } from 'firebase/firestore'
import { db } from '../../../config/firebase.config'
import { useParams } from 'react-router-dom'
import emptyPost from '../../../assets/images/empty-post.jpg'
import likes from '../../../assets/images/likes.png'
import comments from '../../../assets/images/comments.png'
import Post from '../../../components/Post'

const UsersPosts = () => {
  const params = useParams()
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [openPostModal, setOpenPostModal] = useState(false)
  const [post, setPost] = useState({})

  const getPosts = async () => {
    const postsRef = collection(db, 'posts')
    const q = query(postsRef, where('userRef', '==', params.id), limit(20))
    const querySnap = await getDocs(q)
    const posts = []
    querySnap.forEach(doc => {
      return posts.push({
        id: doc.id,
        data: doc.data(),
      })
    })
    setPosts(posts)
    setPostsLoading(false)
  }

  useEffect(() => {
    if (!openPostModal) getPosts()
  }, [openPostModal, params])

  if (postsLoading) return <></>

  if (posts.length === 0)
    return (
      <div className='flex justify-center flex-col sm:flex-row'>
        <div className='order-2 sm:order-1'>
          <img
            src={emptyPost}
            alt='no posts yet'
            className='sm:h-[23.75rem] sm:w-[23.75rem] w-full h-auto'
            loading='lazy'
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
  else
    return (
      <div className='grid grid-cols-3 gap-[0.1875rem] sm:gap-[1.75rem]'>
        {posts.map(post => (
          <div
            key={post.id}
            className='relative cursor-pointer'
            onClick={() => {
              setPost(post)
              setOpenPostModal(true)
            }}
          >
            <img
              src={post.data.image}
              className='h-[8rem] w-[8rem] md:h-[14rem] md:w-[14rem] lg:h-[18.3125rem] lg:w-[18.3125rem] object-cover hover:brightness-75 peer'
            />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-[1.875rem] pointer-events-none invisible peer-hover:visible'>
              <div className='flex items-center space-x-[0.4375rem]'>
                <img
                  src={likes}
                  alt='likes'
                  className='w-[1.25rem] h-[1.25rem]'
                />
                <div className='font-semibold text-base text-white'>
                  {post.data?.likes.length}
                </div>
              </div>
              <div className='flex items-center space-x-[0.4375rem]'>
                <img
                  src={comments}
                  alt='comments'
                  className='w-[1.25rem] h-[1.25rem]'
                />
                <div className='font-semibold text-base text-white'>
                  {post.data?.comments.length}
                </div>
              </div>
            </div>
          </div>
        ))}
        <Post
          openPostModal={openPostModal}
          setOpenPostModal={setOpenPostModal}
          postId={post.id}
        />
      </div>
    )
}

export default UsersPosts
