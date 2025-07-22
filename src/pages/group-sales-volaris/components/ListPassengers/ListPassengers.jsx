import { Avatar, List, Button, Space, Popconfirm, message, Spin } from 'antd';
import { postCreateGroupsVolaris } from '../../../../api/groupSalesVolaris';
import { useState } from 'react';

const ConfirmModal = ({ isOpen, handleOk, handleCancel }) => {
    return (
        <Modal
            title="¿Desea completar los datos de los pasajeros para el grupo?"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Si"
            cancelText="No"
        >
        </Modal>
    );
};


const ListPassengers = ({ passengers, setPassengers, setEditingPassenger, setEditingIndex, group }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = (index) => {
        const updated = passengers.filter((_, i) => i !== index);
        setPassengers(updated);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingPassenger({ ...passengers[index], index });
    };

    const handleFinishSubmit = async () => {
        const formData = new FormData();
        setLoading(true);
        formData.append("groupId", group);
        passengers.forEach((pasajero, index) => {
            formData.append(`pasajeros[${index}]`, JSON.stringify({
                ...pasajero,
                passportPhoto: undefined,
                visaPhoto: undefined,
                nationality: pasajero.otherNationality ? pasajero.otherNationality : pasajero.nationality,
            }));

            if (pasajero.passportPhoto) {
                formData.append(`passportPhoto_${index}`, pasajero.passportPhoto);
            }

            if (pasajero.visaPhoto) {
                formData.append(`visaPhoto_${index}`, pasajero.visaPhoto);
            }
        });
        try {
            const response = await postCreateGroupsVolaris(formData);
            if (response.status === 200) {
                message.success("Pasajeros guardados correctamente");
                setPassengers([]);
                setEditingPassenger(null);
                // message.error("Error al enviar los pasajeros");
            }
            setLoading(false);
        } catch {
            message.error("Error al enviar los pasajeros");
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md mx-auto mt-10">
            <List
                itemLayout="horizontal"
                dataSource={passengers}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <Button key="edit" type="link" onClick={() => handleEdit(index)}>Editar</Button>,
                            <Popconfirm
                                key="delete"
                                title="¿Seguro que deseas eliminar este pasajero?"
                                onConfirm={() => handleDelete(index)}
                            >
                                <Button danger type="link">Eliminar</Button>
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar>{item.names.charAt(0).toUpperCase()}{item.lastNames.charAt(0).toUpperCase()}</Avatar>}
                            title={
                                <div>
                                    {item.names} {item.lastNames}
                                    {index === 0 && <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Principal</span>}
                                </div>
                            }
                            description={item.email}
                        />
                    </List.Item>
                )}
            />
            {loading ?
                <div className='mt-4 mb-4 flex justify-center'>
                    <Spin size="large" />
                </div> :

                <div className="text-right mt-4">
                    <Button type="primary" onClick={handleFinishSubmit} >
                        Enviar pasajeros
                    </Button>
                </div>
            }
        </div>
    );
};

export default ListPassengers;
