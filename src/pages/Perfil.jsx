import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Perfil() {
  const navigate = useNavigate();
  const { 
    user, 
    updateProfile, 
    sendVerificationEmail, 
    sendPasswordReset, 
    updateUserEmail,
    updateUserPassword,
    reauthenticate
  } = useUserContext();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({ 
    displayName: '', 
    email: '', 
    weddingName: '', 
    logoUrl: '', 
    partnerName: '', 
    partnerEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        displayName: user.displayName || '',
        email: user.email || '',
        weddingName: user.weddingName || '',
        logoUrl: user.logoUrl || '',
        partnerName: user.partnerName || '',
        partnerEmail: user.partnerEmail || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile({
        displayName: form.displayName,
        weddingName: form.weddingName,
        logoUrl: form.logoUrl,
        partnerName: form.partnerName,
        partnerEmail: form.partnerEmail
      });
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      toast.error(`Error al actualizar el perfil: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    setIsLoading(true);
    try {
      await updateUserPassword(form.newPassword);
      toast.success('Contraseña actualizada correctamente');
      setForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (error) {
      toast.error(`Error al actualizar la contraseña: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerification = async () => {
    try {
      await sendVerificationEmail();
      toast.success('Correo de verificación enviado. Por favor revisa tu bandeja de entrada.');
    } catch (error) {
      toast.error(`Error al enviar el correo de verificación: ${error.message}`);
    }
  };

  const handlePasswordReset = async () => {
    if (!form.email) {
      toast.error('Por favor ingresa tu correo electrónico');
      return;
    }
    try {
      await sendPasswordReset(form.email);
      toast.success('Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico');
    } catch (error) {
      toast.error(`Error al enviar el enlace de restablecimiento: ${error.message}`);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Configuración de Cuenta</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Perfil
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'password' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Contraseña
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'email' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Correo Electrónico
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Información del Perfil</h2>
              <form onSubmit={handleProfileSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nombre de Usuario
                    </label>
                    <Input
                      type="text"
                      name="displayName"
                      value={form.displayName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nombre de la Boda
                    </label>
                    <Input
                      type="text"
                      name="weddingName"
                      value={form.weddingName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      URL del Logo
                    </label>
                    <Input
                      type="url"
                      name="logoUrl"
                      value={form.logoUrl}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com/logo.png"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nombre de la Pareja
                    </label>
                    <Input
                      type="text"
                      name="partnerName"
                      value={form.partnerName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Correo de la Pareja
                    </label>
                    <Input
                      type="email"
                      name="partnerEmail"
                      value={form.partnerEmail}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Cambiar Contraseña</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contraseña Actual
                    </label>
                    <Input
                      type="password"
                      name="currentPassword"
                      value={form.currentPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nueva Contraseña
                    </label>
                    <Input
                      type="password"
                      name="newPassword"
                      value={form.newPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirmar Nueva Contraseña
                    </label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Correo Electrónico</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Estado de Verificación</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {user.emailVerified 
                          ? 'Tu correo electrónico ha sido verificado.' 
                          : 'Tu correo electrónico no ha sido verificado.'}
                      </p>
                    </div>
                    {!user.emailVerified && (
                      <Button 
                        onClick={handleSendVerification}
                        variant="outline"
                        disabled={isLoading}
                      >
                        Verificar Correo
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Restablecer Contraseña</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    ¿Olvidaste tu contraseña? Te enviaremos un enlace para restablecerla a tu correo electrónico.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="tu@email.com"
                      className="flex-1"
                    />
                    <Button 
                      onClick={handlePasswordReset}
                      variant="outline"
                      disabled={isLoading}
                    >
                      Enviar Enlace
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
