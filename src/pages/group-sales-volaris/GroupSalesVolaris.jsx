import { useState } from "react";
import FormGroupSales from "./components/FormGroupSales/FormGroupSales.JSX"
import ListPassengers from "./components/ListPassengers/ListPassengers"
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";


const GroupSalesVolaris = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user_id = searchParams.get("user_id")
    useAuth({ user_id: parseInt(user_id) });
    const [passengers, setPassengers] = useState([]);
    const [editingPassenger, setEditingPassenger] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [group, setGroup] = useState(null);

    return (
        <div className={`mb-10 flex-col lg:flex-row gap-4 flex justify-center `}>
            <div className={passengers.length > 0 ? 'w-full lg:w-[45%] md:w-[100%] ' : 'w-full lg:w-[45%] md:w-[100%]'}>
                <FormGroupSales
                    passengers={passengers}
                    setPassengers={setPassengers}
                    editingPassenger={editingPassenger}
                    setEditingPassenger={setEditingPassenger}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    group={group}
                    setGroup={setGroup}
                />
            </div>

            {passengers.length > 0 && (
                <div className="w-full lg:w-[40%] md:w-[100%]">
                    <ListPassengers
                        passengers={passengers}
                        setPassengers={setPassengers}
                        setEditingPassenger={setEditingPassenger}
                        setEditingIndex={setEditingIndex}
                        group={group}
                    />
                </div>
            )}
        </div>

    )
}

export default GroupSalesVolaris