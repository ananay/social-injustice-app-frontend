import React, { useState } from 'react';
import Header from "./header"
import { FaPaypal } from 'react-icons/fa'
import Map from "./components/map"

const Home = () => {

    // Holds the US State you clicked on the Map
    const [selectedMapState, setSelectedMapState] = useState("Arizona");

    return (
        <Header active={"home"}>
            <center>
                <div className={"scaffolded"}>
                    <h2>Welcome to <FaPaypal /> Social Injustice Index!</h2>
                </div>
                <Map
                    selectedMapState={selectedMapState}
                    setSelectedMapState={setSelectedMapState} 
                />
                <h1>{selectedMapState}</h1>
            </center>
        </Header>
    )
}

export default Home