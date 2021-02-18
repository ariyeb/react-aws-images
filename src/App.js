import { useEffect, useState } from 'react';
import './App.css';
import { deleteImage, getIamgesData, sendImage } from './server/files';

function App() {
  const [images, setImages] = useState([]);
  const url = "http://localhost:3030/";

  useEffect(() => {
    getIamgesData()
      .then(imagesData => {
        setImages(imagesData);
      });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.children[0].files);
    const fileInput = event.target.children[0];
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    sendImage(formData)
      .then(res => {
        alert(res.originalName + " uploaded");
        return getIamgesData();
      })
      .then(imagesData => {
        setImages(imagesData);
      });
  };

  const onClickDelete = (location, _id) => {
    deleteImage(location, _id)
      .then(() => {
        alert("image deleted");
        return getIamgesData();
      })
      .then(imagesData => {
        setImages(imagesData);
      });
  };

  return (
    <div>
      <h1>Files App</h1>
      <form onSubmit={ onSubmit }>
        <input type="file" name="file" />
        <button type="submit">Submit</button>
      </form>
      {images.map(image => (
        <div key={ image._id }>
          <p>{ image.originalName }</p>
          <img src={ url + "get-image?key=" + image.location + "&name=" + image.originalName } alt={ image.originalName } />
          <button onClick={ () => { onClickDelete(image.location, image._id); } }>Delete { image.originalName }</button>
        </div>
      )) }
    </div>
  );
}

export default App;
