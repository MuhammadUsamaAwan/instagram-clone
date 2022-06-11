import React, { useState } from 'react'
import Modal from 'react-modal'
import { ReactComponent as NewPostIcon } from '../assets/icons/newpost.svg'
import { ReactComponent as ErrorIcon } from '../assets/icons/error.svg'
import { ReactComponent as LeftArrow } from '../assets/icons/left-arrow.svg'
import { useDropzone } from 'react-dropzone'

const NewPost = ({ openPostModal, setOpenPostModal }) => {
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  Modal.setAppElement(document.getElementById('root'))

  const onDrop = (acceptedFiles, fileRejections) => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onload = function () {
        setImage({ data: reader.result, name: acceptedFiles[0].name })
        setError('')
      }
    }
    if (fileRejections.length > 0) {
      setError(fileRejections[0].errors[0].message)
      setImage(null)
    }
  }

  const { getRootProps, getInputProps, open, acceptedFiles, fileRejections } =
    useDropzone({
      onDrop,
      noClick: true,
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024,
      minSize: 1 * 1024,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'video/mp4': [],
      },
    })

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
          borderRadius: '0.75rem',
          width: 'fit-content',
          height: 'fit-content',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 0,
        },
      }}
    >
      <div className='w-[21.75rem] xl:w-[45rem] min-h-[59vh] sm:min-h-[81vh] flex flex-col'>
        <div className='text-base text-center bg-lotion p-2.5 font-semibold border-b border-gainsboro'>
          {error && "File couldn't be uploaded"}
          {!image && !error && 'Create new post'}
          {image && (
            <div className='flex items-center justify-between px-1'>
              <LeftArrow
                onClick={() => setImage(null)}
                className='cursor-pointer'
              />
              <div>Crop</div>
              <button className='text-vividcerulean text-sm font-semibold'>
                Next
              </button>
            </div>
          )}
        </div>
        <div
          className='flex-1 grid content-center place-items-center'
          {...getRootProps()}
        >
          {!image && !error && (
            <>
              <NewPostIcon className='mb-4' />
              <h2 className='text-[1.375rem] font-light mb-6'>
                Drag photos and videos here
              </h2>
            </>
          )}
          {error && (
            <>
              <ErrorIcon className='mb-4' />
              <h2 className='text-[1.375rem] font-light mb-6'>{error}</h2>
            </>
          )}
          {image && <img src={image?.data} className='h-full w-full' />}
          <input type='file' {...getInputProps()} />
          {!image && (
            <p
              className='bg-vividcerulean text-white font-semibold py-[0.3125rem] px-[0.5625rem] rounded cursor-pointer'
              onClick={open}
            >
              Select from computer
            </p>
          )}
          {error && (
            <p
              className='bg-vividcerulean text-white font-semibold py-[0.3125rem] px-[0.5625rem] rounded cursor-pointer'
              onClick={open}
            >
              Select other files
            </p>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default NewPost
