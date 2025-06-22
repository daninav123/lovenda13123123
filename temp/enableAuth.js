// Script para habilitar autenticación por email/contraseña en Firebase
const { initializeApp } = require('firebase/app');
const { getAuth, setPersistence, browserLocalPersistence } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json'); // Asegúrate de tener este archivo

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArwjJewGV5j_vzWjqOsQPoJMSFtaCkSZE",
  authDomain: "lovenda-98c77.firebaseapp.com",
  projectId: "lovenda-98c77",
  storageBucket: "lovenda-98c77.appspot.com",
  messagingSenderId: "844882125080",
  appId: "1:844882125080:web:4015c2e2e6eedf009f7e6d",
  measurementId: "G-4QMWEHYPG8"
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Inicializar Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
});

// Función para habilitar autenticación por email/contraseña
async function enableEmailPasswordAuth() {
  try {
    // Configurar persistencia local
    await setPersistence(auth, browserLocalPersistence);
    
    console.log('Autenticación por email/contraseña habilitada correctamente');
    
    // Crear usuario administrador
    await createAdminUser();
    
  } catch (error) {
    console.error('Error al habilitar autenticación:', error);
  }
}

// Función para crear usuario administrador
async function createAdminUser() {
  const email = 'admin@lovenda.com';
  const password = 'admin123';
  
  try {
    // Crear el usuario usando Admin SDK
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: true,
      disabled: false
    });
    
    console.log('Usuario administrador creado exitosamente:', userRecord.uid);
    
    // Crear el documento del usuario en Firestore con rol de admin
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: email,
      role: 'admin',
      displayName: 'Administrador',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('Documento de usuario administrador creado en Firestore');
    console.log('Puedes iniciar sesión con:');
    console.log('Email:', email);
    console.log('Contraseña:', password);
    
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('El usuario administrador ya existe');
    } else {
      console.error('Error al crear el usuario administrador:', error);
    }
  }
}

// Ejecutar la función principal
enableEmailPasswordAuth();
