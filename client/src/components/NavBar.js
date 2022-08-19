import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [toglebtn, setToglebtn] = useState('SignIn')
    const [toglelink, setToglelink] = useState('login')


    const toBtn = ()=>{
        if((toglebtn === 'SignIn') && (toglelink === 'login')){
            setToglebtn('SignUp')
            setToglelink('signup')
        }else{
            setToglebtn('SignIn')
            setToglelink('login')
        }
    }



  return (
    <>
        <nav className='navbar' >
            <div >
                <Link to='/' className='logo link-s' > Shild </Link>
            </div>
            <ul className='btn-rt' >
                
                <li>
                    <Link to={toglelink} className='btn link-s' onClick={toBtn} > {toglebtn} </Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default NavBar