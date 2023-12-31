import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";


const useFirestore = (collections) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {

    
      const collectionRef = collection(db, collections);
      const q = query(collectionRef, orderBy('createdAt', 'desc'));
          const unsubscribe = onSnapshot(q, (snap) => {
              let documents = [];
              snap.forEach(doc => {
                  documents.push({ ...doc.data(), id: doc.id });
              });
              setDocs(documents);
          });

      return () => unsubscribe();
   
  }, [collections]);

  return { docs };
}

export default useFirestore;