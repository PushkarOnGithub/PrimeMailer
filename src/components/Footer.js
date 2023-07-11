import React from 'react'

const Footer = () => {
  return (
    <div className='container' style={{color:'white', backgroundColor:'#233959', width:'100%'}}>
    {/* <!-- Footer --> */}
<footer className="page-footer font-small teal pt-4">
  <div className="container-fluid text-center text-md-left">
    <div className="row">
      <div className="col-md-6 mt-md-0 mt-3">
        <h5 className="text-uppercase font-weight-bold">Footer text 1</h5>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <hr className="clearfix w-100 d-md-none pb-3"/>
      <div className="col-md-6 mb-md-0 mb-3">
        <h5 className="text-uppercase font-weight-bold">Footer text 2</h5>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  </div>
  <div className="footer-copyright text-center py-3">© 2023 Copyright:
    {/* <a href="/"> MDBootstrap.com</a> */}
  </div>
</footer>
    </div>
  )
}

export default Footer
