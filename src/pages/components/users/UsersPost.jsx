import React from 'react'
import camera from '../../../assets/images/camera.png'

const UsersPost = () => {
  return (
    <div className='flex items-center justify-center flex-col mt-24'>
      <img src={camera} alt='posts' className='mb-12' />
      <h1 className='font-light text-[1.75rem]'>No Posts Yet</h1>
    </div>
  )
}

export default UsersPost
