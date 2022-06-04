const PublicFooter = () => {
  return (
    <footer className='text-xs text-philippinegray'>
      <div className='flex items-center justify-center space-x-5'>
        <p>Meta</p>
        <p>About</p>
        <p>Blog</p>
        <p>Jobs</p>
        <p>Help</p>
        <p>API</p>
        <p>Privacy</p>
        <p>Terms</p>
        <p>Top Accounts</p>
        <p>Hagtags</p>
        <p>Locations</p>
        <p>Intagram Lite</p>
        <p>Contact Uploading & Non Users</p>
      </div>
      <div className='flex items-center justify-center space-x-5 mt-4'>
        <p>English</p>
        <p>© {new Date().getFullYear()} Instagram from Meta</p>
      </div>
    </footer>
  )
}

export default PublicFooter
