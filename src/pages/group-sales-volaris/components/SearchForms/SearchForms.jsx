import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, Modal } from 'antd';
import { getIncompleteGroupsDatesVolaris } from '../../../../api/groupSalesVolaris';
import ModalCompleteForm from '../ModalCompleteForm/ModalCompleteForm';

const SearchForms = () => {
    const [allGroups, setAllGroups] = useState([]);
    const [options, setOptions] = useState([]);
    const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);
    const [selectedDK, setSelectedDK] = useState("");

    const handleSelect = (value) => {
        setSelectedDK(value);
        if (value) {
            setIsModalCompleteOpen(true);
        }
    };

    const handleSearch = (searchText) => {
        if (!searchText) {
            setOptions([]);
            return;
        }

        const filteredOptions = allGroups
            .filter((item) => item.label.toLowerCase().includes(searchText.toLowerCase()))
            .map((item) => ({
                value: item.value,
                label: item.label,
            }));

        setOptions(filteredOptions);
    };

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await getIncompleteGroupsDatesVolaris();

                const formattedOptions = response.data.data.map((item) => ({
                    value: item.customer_number_dk,
                    label: item.customer_number_dk || 'Sin DK',
                }));

                setAllGroups(formattedOptions);
            } catch (error) {
                console.error("Error fetching groups:", error);
                setAllGroups([]);
            }
        };

        getGroups();
    }, []);

    return (
        <>
            <AutoComplete
                style={{ width: 300 }}
                options={options}
                onSelect={handleSelect}
                onSearch={handleSearch}
                placeholder="Actualización de registros"
            >
                <Input.Search size="middle" enterButton />
            </AutoComplete>
            <ModalCompleteForm selectedDK={selectedDK} isModalCompleteOpen={isModalCompleteOpen} setIsModalCompleteOpen={setIsModalCompleteOpen} />
        </>
    );
};

export default SearchForms;
