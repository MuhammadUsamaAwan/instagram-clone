import { auth } from '../config/firebase.config'

const DM = () => {
  return (
    <section className='grid place-content-center'>
      <div className='flex border border-gainsboro rounded-md bg-white w-screen lg:w-[58.4375rem] mt-0 lg:mt-4 h-[calc(100vh-3.75rem)] lg:h-[calc(100vh-4.75rem)]'>
        {/* left content */}
        <div className='w-[38%] border-r border-gainsboro overflow-scroll scroll-hidden'>
          {/* current user */}
          <div className='text-base font-semibold text-center border-b border-gainsboro py-[1.1rem]'>
            {auth.currentUser.displayName}
          </div>
          {/* users */}
          <div className='mt-1.5 space-y-0.5'>
            {/* user */}
            <button className='w-full flex items-center space-x-2 px-5 py-2 hover:bg-lotion'>
              <img
                src={auth.currentUser.photoURL}
                alt='avatar'
                className='h-[3.5rem] w-[3.5rem] object-cover rounded-full'
              />
              <div>{auth.currentUser.displayName}</div>
            </button>
          </div>
        </div>
        {/* right content */}
        <div className='w-[62%]'>
          {/* chat user header */}
          <div className='flex items-center px-8 py-[1.1rem] border-b border-gainsboro space-x-4'>
            <img
              src={auth.currentUser.photoURL}
              alt='avatar'
              className='h-[1.5rem] w-[1.5rem] object-cover rounded-full'
            />
            <div className='text-base font-semibold text-center'>
              {auth.currentUser.displayName}
            </div>
          </div>
          {/* chat */}
          <div className='overflow-y-scroll scroll-hidden p-4 space-y-2'>
            {/* incomming */}
            <div className='flex space-x-2 items-end'>
              <img
                src={auth.currentUser.photoURL}
                alt='avatar'
                className='h-[1.5rem] w-[1.5rem] object-cover rounded-full mb-2'
              />
              <div className='border border-gainsboro rounded-[1.375rem] px-4 py-2 max-w-[50%]'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste,
                odio.
              </div>
            </div>
            {/* outgoing */}
            <div className='flex space-x-2 items-end justify-end'>
              <div className='border border-gainsboro rounded-[1.375rem] px-4 py-2 max-w-[50%]'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste,
                odio.
              </div>
            </div>
          </div>
          {/* new message */}
        </div>
      </div>
    </section>
  )
}

export default DM
