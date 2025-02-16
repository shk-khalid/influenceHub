import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCJAx0SE9Vc1OMMUL0a6NFpy-NszVs1p84",
  authDomain: "influencehub-9955b.firebaseapp.com",
  projectId: "influencehub-9955b",
  storageBucket: "influencehub-9955b.firebasestorage.app",
  messagingSenderId: "590549561456",
  appId: "1:590549561456:web:068532add73303afe684b5",
  measurementId: "G-RET0DYYG8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);