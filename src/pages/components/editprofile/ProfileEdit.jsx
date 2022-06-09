import { useEffect, useState } from 'react'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { auth, db } from '../../../config/firebase.config'
import avatar from '../../../assets/images/avatar.jpg'

const ProfileEdit = () => {
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [bio, setBio] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const getProfile = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setName(docSnap.data().name)
      setUserName(docSnap.data().userName)
      setBio(docSnap.data().bio)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitLoading(true)
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name,
        userName,
        bio,
      })
      updateProfile(auth.currentUser, {
        displayName: userName,
      })
      setSubmitError(false)
      setSubmitSuccess(true)
    } catch (err) {
      setSubmitError(true)
      setSubmitSuccess(false)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      {/* edit photo */}
      <div className='flex items-center justify-center mb-4'>
        <div className='flex flex-1 justify-end'>
          <div className='rounded-full overflow-hidden flex items-center justify-center h-[2.625rem] w-[2.625rem]'>
            <img
              src={
                auth.currentUser.photoURL ? auth.currentUser.photoURL : avatar
              }
              alt='avatar'
            />
          </div>
        </div>
        <div className='flex-[4] ml-8'>
          <h1 className='text-[1.25rem] mb-0.5'>
            {auth.currentUser.displayName}
          </h1>
          <button type='button' className='text-vividcerulean font-semibold'>
            Change Profile Photo
          </button>
        </div>
      </div>
      {/* name */}
      <div className='flex items-center justify-center mb-4'>
        <div className='flex flex-1 justify-end'>
          <label htmlFor='name' className='font-semibold text-base'>
            Name
          </label>
        </div>
        <div className='flex-[4] ml-8'>
          <input
            id='name'
            value={name}
            onChange={e => setName(e.target.value)}
            className='border border-gainsboro w-full sm:w-[75%] rounded px-2.5 py-[3px] text-base'
          />
        </div>
      </div>
      {/* username */}
      <div className='flex items-center justify-center mb-4'>
        <div className='flex flex-1 justify-end'>
          <label htmlFor='username' className='font-semibold text-base'>
            Username
          </label>
        </div>
        <div className='flex-[4] ml-6 sm:ml-8'>
          <input
            id='username'
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className='border border-gainsboro w-full sm:w-[75%] rounded px-2.5 py-[3px] text-base'
          />
        </div>
      </div>
      {/* bio */}
      <div className='flex items-center justify-center mb-4'>
        <div className='flex flex-1 justify-end'>
          <label htmlFor='bio' className='font-semibold text-base'>
            Bio
          </label>
        </div>
        <div className='flex-[4] ml-8'>
          <textarea
            id='bio'
            value={bio}
            onChange={e => setBio(e.target.value)}
            className='border border-gainsboro w-full sm:w-[75%] rounded px-2.5 py-[3px] text-base'
          />
        </div>
      </div>
      {/* error */}
      {submitError && (
        <div className='flex items-center justify-center mb-4'>
          <div className='flex flex-1 justify-end'></div>
          <div className='flex-[4] ml-8'>
            <p className='text-desire w-[70%]'>
              Something went wrong while trying to save your information please
              try again
            </p>
          </div>
        </div>
      )}
      {/* success */}
      {submitSuccess && (
        <div className='flex items-center justify-center mb-4'>
          <div className='flex flex-1 justify-end'></div>
          <div className='flex-[4] ml-8'>
            <p className='w-[70%]'>Profile Saved</p>
          </div>
        </div>
      )}
      {/* submit */}
      <div className='flex items-center justify-center mb-4'>
        <div className='flex flex-1 justify-end'></div>
        <div className='flex-[4] ml-8'>
          <button
            className={`${
              submitLoading
                ? 'bg-freshair pointer-event-none'
                : 'bg-vividcerulean'
            } text-white font-semibold px-2 py-1 rounded`}
            disabled={submitLoading}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default ProfileEdit
