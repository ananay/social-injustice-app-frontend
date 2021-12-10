import React, { useState } from 'react';
import Header from "./header"
import { FaPaypal } from 'react-icons/fa'
import ChartComponent from './components/chart'

const Home = () => {
    return (
        <Header active={"home"}>
            <center>
                <div className={"scaffolded"}>
                    <h2>Welcome to <FaPaypal /> Social Injustice Index!</h2>
                </div>
                <ChartComponent />
            </center>
        </Header>
    )
}

export default Home