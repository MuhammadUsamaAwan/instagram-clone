import { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { Link } from 'react-router-dom'

const CommentsSection = ({ comments }) => {
  const [commentsData, setCommentsData] = useState([])
  const getComments = async () => {
    comments.forEach(async comment => {
      const docRef = doc(db, 'users', comment.userRef)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists())
        setCommentsData(commentsData => [
          ...commentsData,
          {
            comment: comment.comment,
            userRef: comment.userRef,
            userName: docSnap.data().userName,
            photoURL: docSnap.data().photoURL,
          },
        ])
    })
  }
  useEffect(() => {
    getComments()
  }, [comments])

  return (
    <>
      {commentsData.length !== 0 ? (
        <div className='flex-1 px-4 py-3.5 overflow-scroll post-comment'>
          {commentsData.map(comment => (
            <Link
              to={`users/${comment.userRef}`}
              key={comment?.comment}
              className='mb-4 flex space-x-3'
            >
              <img
                src={comment?.photoURL}
                alt='profile'
                className='w-8 h-8 rounded-full object-cover'
              />
              <div className='font-semibold'>
                {comment?.userName}
                <span className='ml-1 font-normal'>{comment?.comment}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex-1 px-4 py-3.5'>No comments yet...</div>
      )}
    </>
  )
}

export default CommentsSection
