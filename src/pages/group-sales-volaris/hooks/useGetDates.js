import { useEffect, useState } from "react";
import { getGroupsDatesVolaris } from "../../../api/groupSalesVolaris";


export const useGetDates = (id) => {
    const [datesDeparture, setDatesDeparture] = useState([]);
    const [datesReturn, setDatesReturn] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await getGroupsDatesVolaris(id);
                const departureOptions = response.data?.departure?.map((item) => ({
                    label: item,
                    value: item
                })) || [];

                const returnOptions = response.data?.return?.map((item) => ({
                    label: item,
                    value: item
                })) || [];

                setDatesDeparture(departureOptions);
                setDatesReturn(returnOptions);
            } catch (error) {
                console.error("Error fetching dates:", error);
                setDatesDeparture([]);
                setDatesReturn([]);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getGroups();
        }
    }, [id]);


    return { datesDeparture, datesReturn, loading };
};
