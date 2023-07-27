import { useState } from 'react';
import Title from './Title';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import Modal from './Modal';

const HomePage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div>
        <Title></Title>
    <UploadForm></UploadForm>
        <ImageGrid setSelectedImage={setSelectedImage}></ImageGrid>
       {selectedImage && (
          <Modal
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
          ></Modal>)}
    </div>
  )
}

export default HomePage