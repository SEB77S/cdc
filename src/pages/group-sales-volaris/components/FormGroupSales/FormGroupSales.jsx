import { useForm, Controller } from "react-hook-form";
import {
    Input,
    Select,
    Radio,
    DatePicker,
    Upload,
    Button,
    Row,
    Col,
    Form,
    message,
} from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { calculateAgeAndSetPassengerType } from "../../helpers/validationsForm";
import SelectGroups from "../SelectGroups/SelectGroups";
import { useGetDates } from "../../hooks/useGetDates";
import SearchForms from "../SearchForms/SearchForms";

const { TextArea } = Input;

const FormGroupSales = ({ passengers, setPassengers, editingPassenger, setEditingPassenger,
    editingIndex, setEditingIndex, group, setGroup
}) => {
    const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            travelIinfant: 'no',
            extraBaggageUponReturn: 'no',
            extraLuggageOutwardJourney: 'no',
            wheelchair: 'no',
        }
    });

    const { datesDeparture, datesReturn } = useGetDates(group);
    const isNotFirstPassenger = editingIndex !== null && editingIndex !== 0;
    const isAddingNewPassenger = editingIndex === null && passengers.length > 0;

    useEffect(() => {
        setValue('firstDate', '');
        setValue('returnDate', '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group]);

    const handleAddPassenger = (data) => {
        const isEditing = editingPassenger !== null;
        const isEditingFirst = editingIndex === 0;
        const isCreatingFirstPassenger = passengers.length === 0;

        // Solo copiar fechas si NO es el primer pasajero
        if (!isEditingFirst && !isCreatingFirstPassenger) {
            data.firstDate = passengers[0].firstDate;
            data.returnDate = passengers[0].returnDate;
            data.DKCustomerNumber = passengers[0].DKCustomerNumber || '';
        }

        if (isEditing) {
            const updatedPassengers = [...passengers];
            updatedPassengers[editingPassenger.index] = data;
            setPassengers(updatedPassengers);
            setEditingPassenger(null);
            message.success("Pasajero editado correctamente");
            setEditingIndex(null);
        } else {
            setPassengers(prev => [...prev, data]);
            message.success("Pasajero agregado");
        }

        reset();
    };


    const cancelUpdatePassenger = () => {
        setEditingPassenger(null);
        reset();
        setEditingIndex(null);
    }

    const birthDate = watch('dateBirth');
    const returnDateStr = watch('returnDate') ? watch('returnDate') : passengers[0]?.returnDate || '';

    useEffect(() => {
        if (!birthDate || !returnDateStr) return;
        const returnDateClean = returnDateStr?.match(/^[A-Za-z]+ \d{1,2}[A-Za-z]{3}\d{2}/)[0];
        calculateAgeAndSetPassengerType({
            birthDate,
            returnDateClean,
            setValue,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [birthDate, returnDateStr]);

    useEffect(() => {
        if (editingIndex !== null) {
            const pasajero = passengers[editingIndex];
            for (const key in pasajero) {
                if (editingIndex !== 0 && (key === 'firstDate' || key === 'returnDate')) {
                    setValue(key, passengers[0]?.[key] || '');
                } else if (key === 'DKCustomerNumber' && editingIndex !== 0) {
                    setValue(key, passengers[0]?.DKCustomerNumber || '');
                } else {
                    setValue(key, pasajero[key]);
                }
            }
        } else {
            reset();
            if (passengers.length > 0) {
                setValue('firstDate', passengers[0].firstDate || '');
                setValue('returnDate', passengers[0].returnDate || '');
                setValue('DKCustomerNumber', passengers[0].DKCustomerNumber || '');
            } else {
                setValue('firstDate', '');
                setValue('returnDate', '');
                setValue('DKCustomerNumber', '');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingIndex, passengers]);


    useEffect(() => {
        if (editingIndex === null && passengers.length > 0) {
            setValue('DKCustomerNumber', passengers[0].DKCustomerNumber || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingIndex, passengers]);


    return (
        <div className="bg-white p-6 rounded-2xl shadow-md mx-auto mt-10">
            <div className="flex justify-end  mb-4">
                <SearchForms />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center mt-4">Formulario de pasajeros</h2>
            <SelectGroups setGroup={setGroup} passengers={passengers} isNotFirstPassenger={isNotFirstPassenger} isAddingNewPassenger={isAddingNewPassenger} />
            {group &&
                <Form layout="vertical" onFinish={handleSubmit(handleAddPassenger)}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Fecha ida" validateStatus={errors.firstDate ? "error" : ""}
                                help={errors.firstDate ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="firstDate"
                                    control={control}
                                    rules={{ required: isNotFirstPassenger || isAddingNewPassenger ? false : true }}
                                    render={({ field }) => (
                                        <Select {...field}
                                            key={JSON.stringify(datesDeparture)}
                                            disabled={isNotFirstPassenger || isAddingNewPassenger}
                                            value={field.value || passengers[0]?.firstDate || undefined}
                                            options={datesDeparture} />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Fecha retorno" validateStatus={errors.returnDate ? "error" : ""}
                                help={errors.returnDate ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="returnDate"
                                    control={control}
                                    rules={{ required: isNotFirstPassenger || isAddingNewPassenger ? false : true }}
                                    render={({ field }) => (
                                        <Select {...field}
                                            key={JSON.stringify(datesReturn)}
                                            disabled={isNotFirstPassenger || isAddingNewPassenger}
                                            value={field.value || passengers[0]?.returnDate || undefined}
                                            options={datesReturn} />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Nombres según pasaporte" validateStatus={errors.names ? "error" : ""}
                                help={errors.names ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="names"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Apellidos según pasaporte" validateStatus={errors.lastNames ? "error" : ""}
                                help={errors.lastNames ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="lastNames"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Fecha de nacimiento" validateStatus={errors.dateBirth ? "error" : ""} help={errors.dateBirth ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="dateBirth"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <DatePicker {...field} className="w-full" />}
                                />
                                {/* <label htmlFor="dateBirth">{AgePassenger(watch('dateBirth'))}</label> */}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tipo de pasajero" >
                                <Controller
                                    name="typePassenger"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            disabled
                                            {...field}
                                            options={[
                                                { label: "Child", value: "child" },
                                                { label: "Adult", value: "adult" }
                                            ]}
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Nacionalidad" validateStatus={errors.nationality ? "error" : ""}
                                help={errors.nationality ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="nationality"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            <Radio value="El Salvador-SV">El Salvador-SV</Radio>
                                            <Radio value="United States of America-US">United States of America-US</Radio>
                                            <Radio value="Guatemala-GT">Guatemala-GT</Radio>
                                            <Radio value="Mexico-MX">Mexico-MX</Radio>
                                            <Radio value="Otro">Otro</Radio>
                                        </Radio.Group>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        {watch("nationality") === "Otro" &&
                            <Col span={24}>
                                <Form.Item validateStatus={errors.otherNationality ? "error" : ""}
                                    help={errors.otherNationality ? "Este campo es obligatorio" : ""}>
                                    <Controller
                                        name="otherNationality"
                                        control={control}
                                        rules={{ required: watch("nationality") === "Otro" ? true : false }}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                </Form.Item>
                            </Col>
                        }
                        <Col span={24}>
                            <Form.Item label="Forma de pago" validateStatus={errors.formPayment ? "error" : ""}
                                help={errors.formPayment ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="formPayment"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            <Radio value="Authorize">Authorize</Radio>
                                            <Radio value="Pagado en Efectivo en Agencia">Pagado en Efectivo en Agencia</Radio>
                                            <Radio value="CC Merchant">CC Merchant</Radio>
                                            <Radio value="Plan de Pago">Plan de Pago</Radio>
                                        </Radio.Group>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Género" validateStatus={errors.gender ? "error" : ""} help={errors.gender ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            <Radio value="male">Male</Radio>
                                            <Radio value="female">Female</Radio>
                                        </Radio.Group>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="¿Viaja con infante?">
                                <Controller
                                    name="travelIinfant"
                                    control={control}
                                    disabled={watch("typePassenger") === "child"}
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            <Radio value="si">Sí</Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        {watch("travelIinfant") === "si" &&
                            <>
                                <Col span={24}><div style={{ height: 2, width: "100%", backgroundColor: "#d9d9d9", margin: "20px 0px" }}></div></Col>
                                <Col span={8}>
                                    <Form.Item label="Nombres según pasaporte" validateStatus={errors.namesInfant ? "error" : ""} help={errors.namesInfant ? "Este campo es obligatorio" : ""}>
                                        <Controller
                                            name="namesInfant"
                                            control={control}
                                            rules={{ required: watch("travelIinfant") === "si" }}
                                            render={({ field }) => <Input {...field} />}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Apellidos según pasaporte" validateStatus={errors.lastNamesInfant ? "error" : ""} help={errors.lastNamesInfant ? "Este campo es obligatorio" : ""}>
                                        <Controller
                                            name="lastNamesInfant"
                                            control={control}
                                            rules={{ required: watch("travelIinfant") === "si" }}
                                            render={({ field }) => <Input {...field} />}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Fecha de nacimiento" validateStatus={errors.dateBirthInfant ? "error" : ""} help={errors.dateBirthInfant ? "Este campo es obligatorio" : ""}>
                                        <Controller
                                            name="dateBirthInfant"
                                            control={control}
                                            rules={{ required: watch("travelIinfant") === "si" }}
                                            render={({ field }) => <DatePicker {...field} className="w-full" />}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Género" validateStatus={errors.genderInfant ? "error" : ""} help={errors.genderInfant ? "Este campo es obligatorio" : ""}>
                                        <Controller
                                            name="genderInfant"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Radio.Group {...field}>
                                                    <Radio value="male">Male</Radio>
                                                    <Radio value="female">Female</Radio>
                                                </Radio.Group>
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Nacionalidad" validateStatus={errors.nationalityInfant ? "error" : ""}
                                        help={errors.nationalityInfant ? "Este campo es obligatorio" : ""}>
                                        <Controller
                                            name="nationalityInfant"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Radio.Group {...field}>
                                                    <Radio value="El Salvador-SV">El Salvador-SV</Radio>
                                                    <Radio value="United States of America-US">United States of America-US</Radio>
                                                    <Radio value="Guatemala-GT">Guatemala-GT</Radio>
                                                    <Radio value="Mexico-MX">Mexico-MX</Radio>
                                                    <Radio value="Otro">Otro</Radio>
                                                </Radio.Group>
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Foto pasaporte o MRZ">
                                        <Controller
                                            name="photoOrMRZInfant"
                                            control={control}
                                            render={({ field }) => (
                                                <Radio.Group {...field}>
                                                    <Radio value="photo">Foto</Radio>
                                                    <Radio value="mrz">MRZ</Radio>
                                                </Radio.Group>
                                            )}
                                        />
                                    </Form.Item>
                                    {watch("photoOrMRZInfant") === "mrz" ?
                                        <Form.Item label="Escriba el MRZ" >
                                            <Controller
                                                name="mrxCodeInfant"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        suffix={
                                                            <SearchOutlined
                                                                style={{ cursor: "pointer", color: "#1890ff" }}
                                                                onMouseDown={(e) => {
                                                                    e.preventDefault();
                                                                    const url = `http://www.highprogrammer.com/cgi-bin/uniqueid/mrzp`;
                                                                    window.open(url, "_blank");
                                                                }}
                                                            />
                                                        }
                                                    />
                                                )}

                                            />
                                        </Form.Item>
                                        : watch("photoOrMRZInfant") === "photo" ?
                                            <Form.Item label="Foto pasaporte">
                                                <Controller
                                                    name="passportPhotoInfant"
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
                                            : null
                                    }
                                </Col>
                                <Col span={24}><div style={{ height: 2, width: "100%", backgroundColor: "#d9d9d9", margin: "20px 0px" }}></div></Col>
                            </>
                        }
                        <Col span={12}>
                            <Form.Item label="Número de Cliente DK" validateStatus={errors.DKCustomerNumber ? "error" : ""}
                                help={errors.DKCustomerNumber ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="DKCustomerNumber"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        const isEditing = editingIndex !== null;
                                        const isEditingFirst = editingIndex === 0;
                                        // const isAdding = editingIndex === null;
                                        const isDisabled = (!isEditing && passengers.length > 0) || (isEditing && !isEditingFirst);

                                        return (
                                            <Input
                                                {...field}
                                                disabled={isDisabled}
                                            />
                                        );
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email Si no tienes coloca notiene@notiene.com" validateStatus={errors.email ? "error" : ""}
                                help={errors.email ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Desea agregar silla de ruedas" >
                                <Controller
                                    name="wheelchair"
                                    control={control}
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            <Radio value="si">Si</Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Desea pagar segunda pieza extra de equipaje a la ida" >
                                <Controller
                                    name="extraLuggageOutwardJourney"
                                    control={control}
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            <Radio value="si">Si</Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Desea pagar segunda pieza extra de equipaje al regreso">
                                <Controller
                                    name="extraBaggageUponReturn"
                                    control={control}
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            <Radio value="si">Si</Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Comentarios" validateStatus={errors.comments ? "error" : ""}
                                help={errors.comments ? "Este campo es obligatorio" : ""}>
                                <Controller
                                    name="comments"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <TextArea rows={3} {...field} />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Foto pasaporte o MRZ">
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
                            {watch("photoOrMRZ") === "mrz" ?
                                <Form.Item label="Escriba el MRZ" >
                                    <Controller
                                        name="mrxCode"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                suffix={
                                                    <SearchOutlined
                                                        style={{ cursor: "pointer", color: "#1890ff" }}
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            const url = `http://www.highprogrammer.com/cgi-bin/uniqueid/mrzp`;
                                                            window.open(url, "_blank");
                                                        }}
                                                    />
                                                }
                                            />
                                        )}

                                    />
                                </Form.Item>
                                : watch("photoOrMRZ") === "photo" ?
                                    <Form.Item label="Foto pasaporte">
                                        <Controller
                                            name="passportPhoto"
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
                                    : null
                            }
                        </Col>
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
                        <Col span={24} className="text-right">
                            {editingPassenger &&
                                <Button type="default" className="mr-2" onClick={cancelUpdatePassenger}>
                                    Cancelar
                                </Button>
                            }
                            <Button type="primary" htmlType="submit">
                                {editingPassenger ? "Actualizar pasajero" : "Agregar nuevo pasajero"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            }
        </div>
    );
};

export default FormGroupSales;
