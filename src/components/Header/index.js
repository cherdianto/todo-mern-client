import React from 'react'
import LogoIcon from '../../assets/icon/logo'

function Header() {
  return (
    <nav className='flex justify-center gap-2 items-center w-full box-border shadow-xl bg-darkGray mb-10 text-white font-semibold text-3xl font-display'>
        <LogoIcon size='60' background='transparent' color='white'/> <span>ToDo App</span>
    </nav>
  )
}

export default Header