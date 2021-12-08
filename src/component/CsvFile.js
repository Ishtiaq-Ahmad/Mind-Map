// import React,{useCallback,useContext, useState} from 'react'
// import {useDropzone} from 'react-dropzone'
// import NodeContext from '../Context/multiTab/MultiTabContext';
// import './Header.css'
// const CsvFile = () => {
//   // const [result , setResult] = useState()
//   //   const nodeContext = useContext(NodeContext)
//   //   const {csvFileHandler} = nodeContext
//   //     const onDrop = useCallback(acceptedFiles => {
//     // Do something with the files
//     // const reader = new FileReader();
//     // reader.onabort = () => console.log("file reading was aborted");
//     // reader.onerror = () => console.log("file reading has failed");
//     // reader.onload = () => {
//     //   // Do whatever you want with the file contents
//     //   let binaryStr = reader.result;
//     //   // console.log('pyarey log',binaryStr.toString());
//     //   // let result = reader.readAsText(acceptedFiles[0]);
//     //   setResult(reader.readAsText(acceptedFiles[0]))
//     // // csvFileHandler(result)
//     //   // console.log({ result });
//     // };
//   // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


// export default CsvFile
import React ,{useState, useContext} from 'react'
import NodeContext from '../Context/multiTab/MultiTabContext';
// import { v4 as uuidv4 } from "uuid";

const CsvFile = () => {
  
       const nodeContext = useContext(NodeContext)
    const {csvFileHandler} = nodeContext
  // const [file , setFile] = useState('')
  const handleFile = (e) => {
    const file = (e.target.files[0])
    var reader = new FileReader();
    reader.onload = function(event) {
    // The file's text will be printed here
    const myResult = event.target.result
    console.log(myResult)
  };

    reader.readAsText(file);
   
  }
  return (
    <div>
      {/* <input type = 'file' onChange={(e) => csvFileHandler(e)} /> */}
    </div>
  )
}

export default CsvFile

