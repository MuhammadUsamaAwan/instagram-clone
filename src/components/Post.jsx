import { useEffect } from 'react'
import Modal from 'react-modal'
import avatar from '../assets/images/avatar.jpg'
import { ReactComponent as Like } from '../assets/icons/notliked.svg'
import { ReactComponent as Unlike } from '../assets/icons/liked.svg'
import { ReactComponent as Comment } from '../assets/icons/commentpost.svg'
import { ReactComponent as Share } from '../assets/icons/share.svg'
import { ReactComponent as Saved } from '../assets/icons/savedpost.svg'
import moment from 'moment'

const Post = ({
  openPostModal,
  setOpenPostModal,
  post,
  isUser = true,
  isFollowed = false,
  userInfo,
}) => {
  Modal.setAppElement(document.getElementById('root'))

  useEffect(() => {}, [])

  return (
    <Modal
      isOpen={openPostModal}
      closeTimeoutMS={100}
      onRequestClose={() => setOpenPostModal(false)}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
        },
        content: {
          border: 0,
          borderRadius: '0 4px 4px 0',
          width: 'fit-content',
          height: 'fit-content',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 0,
        },
      }}
    >
      {/* image */}
      <div className='w-[75vw] h-[50vh] sm:h-[94vh] bg-white flex'>
        <img
          src={post.image}
          alt='post'
          className='h-full w-[65%] object-cover'
        />
        {/* post info */}
        <div className='w-[35%] flex flex-col'>
          {/* user info */}
          <div className='flex items-center space-x-3 mb-2 border-b border-gainsboro px-4 py-3.5'>
            <div className='w-8 h-8 overflow-hidden rounded-full flex'>
              <img
                src={userInfo.photoURL ? userInfo.photoURL : avatar}
                alt='profile'
              />
            </div>
            <div className='font-semibold'>{userInfo.displayName}</div>
            {!isFollowed && isUser && (
              <button className='text-vividcerulean font-semibold'>
                Follow
              </button>
            )}
          </div>
          {/* comments */}
          <div className='flex-1 px-4'>No comments yet...</div>
          {/* actions */}
          <div className='px-4 flex items-center justify-between py-3.5 border-t border-gainsboro'>
            <div className='flex items-center space-x-4'>
              <Like />
              <Comment />
              <Share />
            </div>
            <Saved />
          </div>
          {/* likes */}
          <div className='font-semibold px-4'>0 likes</div>
          {/* time */}
          <div className='px-4 uppercase text-[0.625rem] text-philippinegray pb-3.5 border-b border-gainsboro'>
            {moment(post.timestamp.toDate()).fromNow()}
          </div>
          {/* new comment */}
          <form className='flex px-4'>
            <input
              placeholder='Add a comment...'
              className='flex-1 py-3.5 outline-0'
            />
            <button className='text-vividcerulean font-semibold'>Post</button>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default Post
