import React, { useRef, useState } from 'react';
import styled from './userinput.module.css';
import { toast } from 'react-toastify';

const UserImageInput = () => {
  //creating referece to image file input
  const imageRef=useRef();
  // hook for storing selected image 
    const [selectedImg , setSelectedImg]=useState(null);

    // hook for storing processed buffer 
    const [processedImage, setProcessedImage]=useState(null);

    // hook for handle button text 
    const [buttonFont, setButtonFont]=useState("Remove Background");

    // hook for handle button show (which button should show )
    const [isDownloadAvailable, setIsDownloadAvailable]=useState(false);

    // hook to store final conveted image name 
    const [imageFinalUrl, setFinalImageUrl]=useState("");


//function to handle to take image input
  const   handleSelection=(event)=>{
    const selectedImage = imageRef.current.files[0];
    const oneMb=1048576;

    if (selectedImage) {
      // checking image size 
        if(selectedImage.size>=oneMb*5){
          toast.error("please select image less than 5mb");
          return ;
        }
      //  check the file type, size, etc.
      if(selectedImage.type!=='image/jpeg'){
        toast.error("please select only jpeg or jpg image");
        return ;
      }

      // Update the state with the selected image
      setSelectedImg(selectedImage);
      setButtonFont("Remove Background");
      setIsDownloadAvailable(false);
  }
}


//function to handle Removing image's background
const handleSubmit=async (e)=>{
e.preventDefault();
setButtonFont("Removing...");
//api end point url
const url="https://clipdrop-api.co/remove-background/v1";

if(!selectedImg){
  toast.error("please select an image");
setButtonFont("Remove Background");
return ;
  }


  //creating form data
  const form = new FormData()
  form.append('image_file', selectedImg);
 
  
  //requesting api call to remove background
  fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': '0201d66d536299c885e18fe0b4dd7ab4940a17d0131b78ec6e7d0a33830c715f1602320e8cef5e71e8fdf49b2fd1438e',
    },
    body: form,
  })
    .then(response => {
      return  response.arrayBuffer()
    })
    .then(buffer => {
      // buffer here
      setProcessedImage(buffer);
      setIsDownloadAvailable(true);
    }).catch((error)=>{
      console.log(error);
      toast.error("somthing went wrong");
    })

}


// function to handle to downloading the processed image 
const handleDownload = () => {
  // creating blob 
  const blob = new Blob([processedImage], { type: 'image/png' });

   //  Creating a URL for the Blob
   const blobUrl = URL.createObjectURL(blob);

   //Creating an <a> element and set its attributes
   const a = document.createElement('a');
   a.href = blobUrl;
   const dummyUrl=selectedImg.name.split('.');
   a.download = `${dummyUrl[0]}.png`;

   //Triggering a click event on the <a> element to initiate the download
   a.click();

   // Cleaning up: Revoke the Blob URL
   URL.revokeObjectURL(blobUrl);
};

//   accept="image/*
// accept="image/png, image/jpeg"

  return (
    <div className={styled.userInput_sec}>
        <form onSubmit={handleSubmit} >
            <div className={styled.inutFile_sec}>
              <label onClick={()=> document.getElementById('imageInput').click()}> <img src={ require('../../assets/image/upload.png')} /> Choose a Photo </label>
            <input className={styled.fileinputTag} id='imageInput' type='file' ref={imageRef} onChange={()=> handleSelection()} accept="image/*" /><br />
            </div>
             <span className={styled.imagePath}>{selectedImg && selectedImg.name}</span>
            {isDownloadAvailable ? <button type='button' className={styled.downloadbtn} onClick={()=>handleDownload()}>Download</button> : <button className={styled.userInput_RemoveBg_btn} type='submit'>{buttonFont}</button> }
        </form>
    </div>
  )
}

export default UserImageInput;
