import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Userpics = () => {
  const { currentUser } = useAuth();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "images");
    const q = query(
      collectionRef,
      where("currentuser", "==", currentUser.email),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsubscribe();
  }, [currentUser.email]);

  return (
    <div>
      <div className="justify-center grid grid-cols-3 gap-4">
        {docs &&
          docs.map((doc) => (
            <motion.div
              key={doc.id}
              className="m-2 img-wrap"
              whileHover={{ opacity: 1 }}
              layout
            >
              <motion.img
                className=" min-w-full min-h-[70%] max-h-[50%] max-w-[100%]"
                src={doc.url}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              ></motion.img>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Userpics;
