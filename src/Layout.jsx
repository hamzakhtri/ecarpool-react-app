import React from 'react'
import TopBar from './components/TopBar/TopBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function Layout() {
    return (
        <>
            <TopBar/>
            <Outlet/>
            <Footer/>
        </>

    )
}

export default Layout