import { Button, Col, Divider, Form, Input, Radio, Row, Upload } from 'antd';
import { SearchOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';

const UploadDataPassenger = ({ index, passengerId, setFormDataByPassenger, nationality }) => {
    const { control, watch } = useForm();
    const watchedFields = watch();

    useEffect(() => {
        setFormDataByPassenger(prev => ({
            ...prev,
            [index]: { ...watchedFields, id: passengerId },
        }));
    }, [watchedFields, index, passengerId, setFormDataByPassenger]);

    return (
        <form >
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="Foto pasaporte o MRZ" >
                        <Controller
                            name="photoOrMRZ"
                            control={control}
                            render={({ field }) => (
                                <Radio.Group {...field}>
                                    <Radio value="photo">Foto</Radio>
                                    <Radio value="mrz">MRZ</Radio>
                                </Radio.Group>
                            )}
                        />
                    </Form.Item>
                    {watch("photoOrMRZ") === "mrz" ? (
                        <Form.Item label="Escriba el MRZ">
                            <Controller
                                name="mrzCode"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        suffix={
                                            <SearchOutlined
                                                style={{ cursor: "pointer", color: "#1890ff" }}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    window.open(
                                                        `http://www.highprogrammer.com/cgi-bin/uniqueid/mrzp`,
                                                        "_blank"
                                                    );
                                                }}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Form.Item>
                    ) : watch("photoOrMRZ") === "photo" ? (
                        <Form.Item label="Foto pasaporte">
                            <Controller
                                name="passportPhoto"
                                control={control}
                                render={({ field }) => (
                                    <Upload
                                        style={{ width: "100%" }}

                                        accept="image/*"
                                        beforeUpload={(file) => {
                                            field.onChange(file);
                                            return false;
                                        }}
                                        fileList={field.value ? [field.value] : []}
                                        onRemove={() => field.onChange(null)}
                                    >
                                        <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
                                    </Upload>
                                )}
                            />
                        </Form.Item>
                    ) : null}
                </Col>
                {nationality !== "United States of America-US" &&
                    <>
                        <Divider size="middle" />
                        <Col span={24}>
                            <Form.Item label="Foto visa o residencia">
                                <Controller
                                    name="visaPhoto"
                                    control={control}
                                    render={({ field }) => (
                                        <Upload
                                            accept="image/*"
                                            beforeUpload={(file) => {
                                                field.onChange(file);
                                                return false;
                                            }}
                                            fileList={field.value ? [field.value] : []}
                                            onRemove={() => field.onChange(null)}
                                        >
                                            <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
                                        </Upload>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </>
                }
            </Row>
        </form>
    );
};


export default UploadDataPassenger