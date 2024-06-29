import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Alert from '../alert/Alert';

export default function Layout({children}) {
    return (
        <>
            <Alert/>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
