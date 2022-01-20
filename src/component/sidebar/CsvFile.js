import React,{useContext} from 'react';
import MultiTabContext from '../../Context/multiTab/MultiTabContext';
import { v4 as uuidv4 } from "uuid";
import ReactFileReader from 'react-file-reader';
import Button from '@mui/material/Button';

const CsvFile = () => {
const multitabContext = useContext(MultiTabContext);


 const {
    data: { dataset, periodsNodesData, selectedTab },
    loaderFile,
    periodsDataHandler,
    showScvData
  } = multitabContext;


    var i = 1;
  const _csvFileHandler = (files) => {
    //   const file = e.target.files[0];
    let myResult;
    const file = files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      myResult = event.target.result;
      //  const myJSON = JSON.stringify(myResult);
      const data = csvToArray(myResult);
    };
    reader.readAsText(file);

    let _newCsvData;
    const csvToArray = (str, delimiter = ",") => {
      const headers = str.slice(0, str.length - 1).split("\n");

      const arr1 = headers[0];
      let arr2 = [];
      arr2 = arr1.split(",");
      // let arr3 = arr2.slice(0,2)
      const arr4 = arr2.slice(2);
      const arr5 = arr4.map((element) => {
        return element;
      });
      periodsDataHandler(arr5);

      let arr = [];
      let arr10 = [];
      let valuesData = [];
      let _indexNumber = [];
      for (i = 1; i <= headers.length - 1; i++) {
        const xNumber = Math.floor(Math.random() * 100 + 1);
        const yNumber = Math.floor(Math.random() * 100 + 1);
        const arr6 = headers[i];
        const arr7 = arr6.split(",");
        const indexNumber = arr7.find((element) => element > 0);
        _indexNumber.push(indexNumber);
        const arr8 = arr7.slice(1, 2);
        arr10.push(arr8);
        const arr9 = arr7.slice(2);
        valuesData.push(arr9);
        let _csvNode = {
          id: uuidv4(),
          type: "default",
          position: { x: xNumber, y: yNumber },
          // data: { label: headers[i].replace(/,/g, ' ')},
          data: {
            label: (
              <>
                <strong>{`${indexNumber}  `}</strong>
                {arr8}
                <strong> {periodsNodesData}</strong>
              </>
            ),
          },
        };
        arr.push(_csvNode);
        //  _newCsvData = [...dataset[props.selectedTab], ...arr];

        let _newCsvData;
        if (dataset && dataset.length > 0) {
          _newCsvData = [...dataset[selectedTab], ...arr];
        } else {
          _newCsvData = [...arr];
        }
        loaderFile(_newCsvData, _indexNumber, valuesData, arr4, arr10);
      }
    };
    showScvData()
  };
 
  return <div>
       {/* <input type="file" accept=".csv" onChange={_csvFileHandler} /> */}
       <ReactFileReader handleFiles ={_csvFileHandler} fileTypes={[".csv"]} >
             <Button fullWidth variant="outlined">Upload Csv File</Button>
       </ReactFileReader>
  </div>;
};

export default CsvFile;
