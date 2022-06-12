import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import avatar from '../assets/images/avatar.jpg'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Like } from '../assets/icons/notliked.svg'
import { ReactComponent as Unlike } from '../assets/icons/liked.svg'
import { ReactComponent as Comment } from '../assets/icons/commentpost.svg'
import { ReactComponent as Share } from '../assets/icons/share.svg'
import { ReactComponent as Saved } from '../assets/icons/savedpost.svg'
import {
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { auth, db } from '../config/firebase.config'
import moment from 'moment'

const Post = ({ openPostModal, setOpenPostModal, postId }) => {
  const navigate = useNavigate()
  const [postData, setPostData] = useState()
  const [submitLikeLoading, setSubmitLikeLoading] = useState(false)
  const [comment, setComment] = useState('')
  const [submitCommentLoading, setSubmitCommentLoading] = useState(false)
  const [submitCommentDisabled, setSubmitCommentDisabled] = useState(true)

  const getPost = async () => {
    const docRef = doc(db, 'posts', postId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setPostData(docSnap.data())
    }
  }

  Modal.setAppElement(document.getElementById('root'))

  const handleLike = async () => {
    setSubmitLikeLoading(true)
    await updateDoc(doc(db, 'posts', postId), {
      likes: arrayUnion(auth.currentUser.uid),
    })
    setSubmitLikeLoading(false)
  }

  const handleComment = async e => {
    e.preventDefault()
    setSubmitCommentLoading(true)
    await updateDoc(doc(db, 'posts', postId), {
      comments: arrayUnion({
        comment,
        userName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      }),
    })
    setComment('')
    setSubmitCommentLoading(false)
  }

  const handleUnlike = async () => {
    setSubmitLikeLoading(true)
    await updateDoc(doc(db, 'posts', postId), {
      likes: arrayRemove(auth.currentUser.uid),
    })
    setSubmitLikeLoading(false)
  }

  useEffect(() => {
    if (postId) getPost()
  }, [postId, handleLike, handleUnlike, handleComment])

  useEffect(() => {
    if (comment) setSubmitCommentDisabled(false)
    else setSubmitCommentDisabled(true)
  }, [comment])

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
      <div className='w-[75vw] h-[50vh] sm:h-[94vh] bg-white flex'>
        {/* image */}
        <img
          src={postData?.image}
          alt='post'
          className='h-full w-1/2 sm:w-[65%] object-cover'
        />
        {/* post info */}
        <div className='w-1/2 sm:w-[35%] flex flex-col'>
          {/* user info */}
          <div
            className='flex items-center space-x-3 mb-2 px-4 pt-3.5 cursor-pointer'
            onClick={() => {
              setOpenPostModal(false)
              navigate(`/users/${postData?.userRef}`)
            }}
          >
            <div className='w-8 h-8 overflow-hidden rounded-full flex'>
              <img
                src={postData?.photoURL ? postData?.photoURL : avatar}
                alt='profile'
              />
            </div>
            <div className='font-semibold'>{postData?.displayName}</div>
          </div>
          <p className='px-4 border-b border-gainsboro pb-3.5'>
            {postData?.caption}
          </p>
          {/* comments */}
          {postData?.comments.length !== 0 ? (
            <div className='flex-1 px-4 py-3.5 overflow-scroll post-comment'>
              {postData?.comments.map(comment => (
                <div key={comment?.comment} className='mb-4 flex space-x-3'>
                  <img
                    src={comment?.photoURL ? comment?.photoURL : avatar}
                    alt='profile'
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <div className='font-semibold'>
                    {comment?.userName}
                    <span className='ml-1 font-normal'>{comment?.comment}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex-1 px-4 py-3.5'>No comments yet...</div>
          )}
          {/* actions */}
          <div className='px-4 flex items-center justify-between py-3.5 border-t border-gainsboro'>
            <div className='flex items-center space-x-4'>
              <button disabled={submitLikeLoading} className='cursor-pointer'>
                {postData?.likes.includes(auth.currentUser.uid) ? (
                  <Unlike onClick={handleUnlike} />
                ) : (
                  <Like onClick={handleLike} />
                )}
              </button>
              <label htmlFor='comment' className='cursor-pointer'>
                <Comment />
              </label>
              <Share />
            </div>
            <Saved />
          </div>
          {/* likes */}
          <div className='font-semibold px-4'>
            {postData?.likes ? postData?.likes.length : 0} likes
          </div>
          {/* time */}
          <div className='px-4 uppercase text-[0.625rem] text-philippinegray pb-3.5 border-b border-gainsboro'>
            {moment(postData?.timestamp?.toDate()).fromNow()}
          </div>
          {/* new comment */}
          <form className='flex px-4' onSubmit={e => handleComment(e)}>
            <input
              id='comment'
              placeholder='Add a comment...'
              className='flex-1 py-3.5 outline-0'
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxLength='20'
            />
            <button
              className={`${
                submitCommentLoading || submitCommentDisabled
                  ? 'text-freshair'
                  : 'text-vividcerulean'
              } font-semibold`}
              disabled={submitCommentLoading || submitCommentDisabled}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default Post
