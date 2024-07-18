
import { useParams } from "react-router-dom";

import Dashboard from "../dashboard/Dashboard";
import Inventory from "../inventory/Inventory"
import Delivery from "../delivery/Delivery"

const Direction = () => {
    const { direction } = useParams()

    return(
        <>
            {direction === 'dashboard' && <Dashboard />}
            {direction === 'inventory' && <Inventory />}
            {direction === 'delivery' && <Delivery />}
            {direction === 'dashboard' && <Dashboard />}
            {direction === 'dashboard' && <Dashboard />}
            {direction === 'dashboard' && <Dashboard />}
            {direction === 'dashboard' && <Dashboard />}
            {direction === 'dashboard' && <Dashboard />}
            {direction === 'dashboard' && <Dashboard />}
        </>
    )
}

export default Direction;