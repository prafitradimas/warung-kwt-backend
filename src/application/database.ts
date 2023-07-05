

import { initializeApp, cert } from 'firebase-admin/app';
import { type ServiceAccount } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { serviceAccount } from '../service-account.js';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
});

const db = getFirestore();

export {
    db
};
