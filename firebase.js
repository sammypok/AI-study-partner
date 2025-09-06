import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "demo-api-key", // We’re not connecting to real Firebase in MVP
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);

export { app };