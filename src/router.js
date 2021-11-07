import Home from './home.js'
import About from './about.js'
import { Route, Routes } from 'react-router-dom';


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about" element={<About />} />
            <Route component={Error} />
        </Routes>
    )
}

export default Router;