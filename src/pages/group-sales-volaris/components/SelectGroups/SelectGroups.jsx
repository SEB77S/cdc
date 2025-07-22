import { Select, Spin, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { getGroupsVolaris } from '../../../../api/groupSalesVolaris';

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


const SelectGroups = ({ setGroup, isNotFirstPassenger, isAddingNewPassenger }) => {
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [listGrops, setListGrops] = useState([]);
    const [valueSelected, setValueSelected] = useState([]);

    const handleChange = (value) => {
        setModalOpen(true);
        setValueSelected(value);
    };

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await getGroupsVolaris();
                setListGrops(response.data);
            } catch (error) {
                setListGrops([]);
                console.error("Error fetching groups:", error);
            } finally {
                setLoading(false);
            }
        };
        getGroups()
    }, []);



    return (
        <div className='mt-4 mb-4'>

            <Form.Item label="Grupo">
                <Select
                    disabled={isNotFirstPassenger || isAddingNewPassenger ? true : false}
                    onChange={(value) => handleChange(value)}
                    options={listGrops.map(item => ({ value: item.id, label: item.name }))}
                    className="w-full mt-2"
                    placeholder="Seleccione un grupo" />
            </Form.Item>
            {loading &&
                <div className='mt-4 mb-4 flex justify-center'>
                    <Spin size="large" />
                </div>

            }
            <ConfirmModal
                isOpen={modalOpen}
                handleOk={() => {
                    setModalOpen(false);
                    setGroup(valueSelected);
                }}
                handleCancel={() => setModalOpen(false)}
                group={valueSelected}
            />
        </div>
    );
};

export default SelectGroups