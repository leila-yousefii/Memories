import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

const ImageGrid = ({ setSelectedImage }) => {
  const { docs } = useFirestore("images");
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            key={doc.id}
            className="img-wrap"
            whileHover={{ opacity: 1 }}
            layout
          >
            <motion.img
              onClick={() => setSelectedImage(doc.url)}
              src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            ></motion.img>
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
