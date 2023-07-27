import { motion } from "framer-motion";

const Modal = ({ selectedImage, setSelectedImage }) => {
  return (
    <div
      className="backdrop"
      onClick={(e) => {
        if (e.target.classList.contains("backdrop")) setSelectedImage(null);
      }}
    >
      <motion.img
        src={selectedImage}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.img>
    </div>
  );
};

export default Modal;
