import React from 'react'
import { useTheme } from '../Features/ThemeReducer'

const Footer = () => {
  const {theme,changeTheme}=useTheme()
  const name="text-center text-lg-start   text-muted"

  return (
   <>
 
<footer className={theme==='dark'? `${name} + bg-secondary `  :name}>
   
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
 
    <div>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-google"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-github"></i>
      </a>
    </div>

  </section>

  <section className="">
    <div className="container text-center text-md-start mt-5">

      <div className="row mt-3">
       
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
        
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>Sister Companies
          </h6>
          <p>
            <a href="#!" className="text-reset">ChildrenPark School</a>
          </p>
          <p>
            <a href="#!" className="text-reset">ElderPark AgeCare Service</a>
          </p>
          <p>
            <a href="#!" className="text-reset">TaxiPark </a>
          </p>
          <p>
            <a href="#!" className="text-reset">AgriPark</a>
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" className="text-reset">Fried Momo</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Veg momo</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Dal Bhat</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Machha</a>
          </p>
        </div>
 
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
       
          <h6 className="text-uppercase fw-bold mb-4">
          
          </h6>
          <p>
            <a href="#!" className="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Settings</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Orders</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Help</a>
          </p>
        </div>
 
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
           
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3"></i>Bhaktapur-7,Nepal</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            email@foodpark.com.np
          </p>
          <p><i className="fas fa-phone me-3"></i> + 977 019234322</p>
          <p><i className="fas fa-print me-3"></i> + 977 9812343455</p>
        </div>
         
      </div>
      
    </div>
  </section>
  
  <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    © 2023 Copyright:
    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">Foodpark Group</a>
  </div>
   
</footer>

   </>
  )
}

export default Footer