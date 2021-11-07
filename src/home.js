import React, { useState } from 'react';
import Header from "./header"
import {FaPaypal} from 'react-icons/fa'

const Home = () => {
    return (
        <Header active={"home"}>
            <div className={"scaffolded"}>
                <h2>Welcome to <FaPaypal /> Social Injustice Index!</h2>
                <p>While it's a little quiet, over here, we've scaffolded this project and are ready to work on the app. Be sure to check back later!</p>
            </div>
        </Header>
    )
}

export default Home