// Script para crear un usuario administrador
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

// Configuración de Firebase (usando las mismas credenciales que en firebaseConfig.js)
const firebaseConfig = {
  apiKey: "AIzaSyArwjJewGV5j_vzWjqOsQPoJMSFtaCkSZE",
  authDomain: "lovenda-98c77.firebaseapp.com",
  projectId: "lovenda-98c77",
  storageBucket: "lovenda-98c77.appspot.com",
  messagingSenderId: "844882125080",
  appId: "1:844882125080:web:4015c2e2e6eedf009f7e6d",
  measurementId: "G-4QMWEHYPG8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Crear usuario administrador
async function createAdminUser() {
  const email = 'admin@lovenda.com';
  const password = 'admin123';
  
  try {
    // Crear el usuario en Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('Usuario creado exitosamente:', user.uid);
    
    // Crear el documento del usuario en Firestore con rol de admin
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      role: 'admin',
      displayName: 'admin',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('Usuario administrador creado exitosamente en Firestore');
    console.log('Puedes iniciar sesión con:');
    console.log('Email:', email);
    console.log('Contraseña:', password);
    
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  } finally {
    // Cerrar la conexión
    process.exit(0);
  }
}

// Ejecutar la función
createAdminUser();
