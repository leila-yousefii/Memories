import { useState, useEffect } from "react";
import { storage, db, timestamp } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const storageRef = ref(storage, file.name);
    const collectionRef = collection(db, "images");
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          const createdAt = timestamp;
          setDoc(doc(collectionRef), {
            url: url,
            createdAt,
            currentuser: currentUser.email,
          });
        });
      }
    );
  }, [file, currentUser.email]);


  return { progress, url, error };
};
export default useStorage;
