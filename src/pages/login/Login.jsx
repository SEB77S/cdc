import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Alert, Typography } from 'antd';
import logo from '../../assets/logo.png';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
  const { control, handleSubmit } = useForm();
  const login = useUserStore((s) => s.login);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="HappyTours" className="h-12 mb-2" />
          <Title level={3}>CDC Admin</Title>
        </div>

        {error && <Alert type="error" message={error} className="mb-4" />}

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Correo electrónico">
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Formato de correo no válido',
                },
              }}
              defaultValue=""
              render={({ field, /* fieldState */ }) => (
                <Input {...field} placeholder="usuario@ejemplo.com" />
              )}
            />
          </Form.Item>

          <Form.Item label="Contraseña">
            <Controller
              name="password"
              control={control}
              rules={{ required: 'La contraseña es obligatoria' }}
              defaultValue=""
              render={({ field }) => (
                <Input.Password {...field} placeholder="••••••••" />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {loading ? 'Validando...' : 'Iniciar sesión'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
