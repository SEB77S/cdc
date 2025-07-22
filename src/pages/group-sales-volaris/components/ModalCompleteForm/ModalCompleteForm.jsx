import { message, Modal } from 'antd';
import { Collapse } from 'antd';
import { useState } from 'react';
import { getPassengersByDK, updatePassengerPhoto } from '../../../../api/groupSalesVolaris';
import UploadDataPassenger from '../UploadDataPassenger/UploadDataPassenger';
import { useUpdateEffect } from '../../../../hooks/useUpdateEffect';

const ModalCompleteForm = ({ selectedDK, isModalCompleteOpen, setIsModalCompleteOpen }) => {
    const [passengers, setPassengers] = useState([]);
    const [group, setGroup] = useState("");
    const [formDataByPassenger, setFormDataByPassenger] = useState({});

    useUpdateEffect(() => {
        const passengersByDK = async () => {
            try {
                const response = await getPassengersByDK(selectedDK);
                setGroup(response?.data?.data[0].group_name || "");
                const formattedOptions = response.data.data.map((item, index) => ({
                    key: item.id,
                    label: `${item.first_name_passport} ${item.last_name_passport}`,
                    children: (
                        <UploadDataPassenger
                            index={index}
                            passengerId={item.id}
                            formDataByPassenger={formDataByPassenger} setFormDataByPassenger={setFormDataByPassenger}
                            nationality={item.nationality}

                        />
                    ),
                }));
                setPassengers(formattedOptions);

            } catch (error) {
                setPassengers({});
                console.error("Error fetching groups:", error);
            }
        };

        passengersByDK();
    }, [selectedDK]);

    const handleSendAll = async () => {
        const globalFormData = new FormData();
        Object.entries(formDataByPassenger).forEach(([passengerId, data]) => {
            globalFormData.append(`passengers[${passengerId}]photoOrMRZ`, data.photoOrMRZ);
            globalFormData.append(`passengers[${passengerId}]id`, data.id)
            if (data.photoOrMRZ === 'mrz') {
                globalFormData.append(`passengers[${passengerId}]mrzCode`, data.mrzCode || '');
            }
            if (data.passportPhoto) {
                globalFormData.append(`passengers[${passengerId}]passportPhoto`, data.passportPhoto);
            }
            if (data.visaPhoto) {
                globalFormData.append(`passengers[${passengerId}]visaPhoto`, data.visaPhoto);
            }
        });

        const response = await updatePassengerPhoto(globalFormData);
        if (response.status === 200) {
            message.success('Pasajero actualizado correctamente');
            setIsModalCompleteOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalCompleteOpen(false);
    };

    return (
        <Modal
            title={`Completar datos de pasajeros para el grupo ${group}`}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalCompleteOpen}
            onOk={handleSendAll}
            onCancel={handleCancel}
            okText="Actualizar pasajeros"
        >
            <>
                <Collapse
                    defaultActiveKey={['1']}
                    expandIconPosition={'start'}
                    items={passengers}
                />
            </>
        </Modal>
    )
}

export default ModalCompleteForm