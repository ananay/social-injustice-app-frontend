import React, { useState } from 'react';
import Header from "../components/header"
import {FaPaypal} from 'react-icons/fa'

const Home = () => {
    return (
        <Header active="about">
            <div className={"scaffolded"}>
                <h2>About this project</h2>
                <p>Made by Shefali Deosthali, Zachary McHugh, Guoan Hu, Marquell David, Hunter Paulson and Ananay Arora for Paypal.</p>
            </div>
        </Header>
    )
}

export default Home