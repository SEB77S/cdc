import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Upload,
  message,
  Button,
  Select,
  Card,
  notification,
  Spin,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { postDataXML } from "../../api/updateDataService";

const { Dragger } = Upload;

const UploadData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [fileList, setFileList] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (!fileList.length) {
      message.error("Debes seleccionar un archivo antes de subir.");
      return;
    }

    const formData = new FormData();
    formData.append("csv_file", fileList[0].originFileObj);
    formData.append("module_name", data.module_name);
    formData.append("file_type", data.file_type);

    try {
      const response = await postDataXML(formData);
      openNotification(response.data.rows_inserted || 0, true);
      setFileList([]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al subir:", error);
      message.error("Hubo un error al subir el archivo.");
      openNotification(error || 0, false);
      setIsLoading(false);
    }
  };

  const openNotification = (message, success) => {
    if (success) {
      api.success({
        message: "Documento cargado",
        description: `Se han cargado ${message} registros con éxito.`,
        duration: 10,
      });
    }
    else {
      api.error({
        message: "Hubo un problema!",
        description: `${message}`,
        duration: 10,
      });
    }
  };

  return (
    <div className="flex justify-center my-2">
      <div className="p-8 max-w-4xl mx-auto bg-white w-fit rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Carga de Datos
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div>
              <label className="block mb-1 font-medium">
                Selecciona un módulo
              </label>
              <Controller
                name="module_name"
                control={control}
                rules={{ required: "Selecciona un módulo" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    placeholder="Selecciona un módulo"
                    className="w-full"
                    options={[{ value: "admin_crm", label: "Admin CRM" }]}
                  />
                )}
              />
              {errors.module_name && (
                <p className="text-red-500 text-sm">
                  {errors.module_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Selecciona una categoría
              </label>
              <Controller
                name="file_type"
                control={control}
                rules={{ required: "Selecciona una categoría" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    placeholder="Selecciona una categoría"
                    className="w-full"
                    options={[
                      { value: "odv", label: "ODV Auditado" },
                      { value: "call", label: "Llamada" },
                      { value: "oc", label: "OC" },
                    ]}
                  />
                )}
              />
              {errors.file_type && (
                <p className="text-red-500 text-sm">
                  {errors.file_type.message}
                </p>
              )}
            </div>
          </div>

          <Card className="shadow-md border border-gray-200">
            <Controller
              name="archivo"
              control={control}
              rules={{ required: "Debes seleccionar un archivo .xlsx" }}
              render={({ field }) => (
                <Dragger
                  name="file"
                  fileList={fileList}
                  accept=".xlsx"
                  beforeUpload={() => false}
                  customRequest={({ onSuccess }) =>
                    setTimeout(() => onSuccess("ok"), 0)
                  }
                  onChange={(info) => {
                    const newFileList = info.fileList.slice(-1);
                    setFileList(newFileList);
                    field.onChange(newFileList[0]?.originFileObj || null);
                  }}
                  onDrop={(e) =>
                    console.log("Archivo soltado:", e.dataTransfer.files)
                  }
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="text-lg font-medium mt-2">
                    Haz click o arrastra el archivo XLSX aquí
                  </p>
                  <p className="text-sm text-gray-500">
                    Solo se permiten archivos .xlsx
                  </p>
                </Dragger>
              )}
            />
            {errors.archivo && (
              <p className="text-red-500 text-sm mt-2">
                {errors.archivo.message}
              </p>
            )}
          </Card>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full my-8 h-12 text-lg"
            disabled={
              !watch("module_name") ||
              !watch("file_type") ||
              fileList.length === 0 ||
              isLoading
            }
          >
            Cargar archivo
          </Button>
        </form>

        {contextHolder}
        {isLoading && (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadData;
