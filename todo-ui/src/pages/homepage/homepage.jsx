import { Outlet } from "react-router-dom"
import Sidebar from "../../components/sidebar/sidebar"
import './homepage.css'

const Homepage=()=>{
    return (
        <div className="homepage-container">
            <Sidebar />
            <Outlet/>
        </div>
    )
}

export default Homepage