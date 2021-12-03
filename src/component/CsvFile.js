import React,{useCallback,useContext, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import NodeContext from '../Context/multiTab/MultiTabContext';
import './Header.css'
const CsvFile = () => {
  const [result , setResult] = useState()
    const nodeContext = useContext(NodeContext)
    const {csvFileHandler} = nodeContext
      const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    // const reader = new FileReader();
    // reader.onabort = () => console.log("file reading was aborted");
    // reader.onerror = () => console.log("file reading has failed");
    // reader.onload = () => {
    //   // Do whatever you want with the file contents
    //   let binaryStr = reader.result;
    //   // console.log('pyarey log',binaryStr.toString());
    //   // let result = reader.readAsText(acceptedFiles[0]);
    //   setResult(reader.readAsText(acceptedFiles[0]))
    // // csvFileHandler(result)
    //   // console.log({ result });
    // };
    // // console.log('pyarey log',binaryStr.toString());
    // reader.readAsArrayBuffer(acceptedFiles[0]);
     acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="csv-block" {...getRootProps()}>
        <input onChange={csvFileHandler} {...getInputProps()} />
        {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag or Select file here</p>
      )}
        </div>
    )
}

export default CsvFile
