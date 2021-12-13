import React,{useContext, useState} from 'react';
import contextData from '../Context/multiTab/MultiTabContext';
import { TextField } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";


const CsvPeriodsData = () => {
const periodsContextData = useContext(contextData)
const {data:{periodsData, specificData},specificDataHandler}=periodsContextData;
// const [_periodsData, _setPeriodsData] = useState()
const arr8 = [...periodsData]
const act = arr8.map((item) => {
    return { label: item}
})

//  arr8.map((item)=>{   
//   return {label:item}
// })
// console.log('hhhhhhhhh', arr8);
// var arr = ['a','b', 'c','d']
// const arr1 = arr.map((item) =>{
//   return {label:item}
// })
// console.log('new data',arr1)

// const nodeSourcePositionHandler = (e) =>{
//     _setPeriodsData(e.target.value)
// }
// console.log('innnnn',periodsDataArray);
    return (
        <div> 
            {/* {periodsData} */}
            <TextField
                    select
                    value={specificData}
                    name={specificData}
                    onChange={
                        (evt) => {
                      specificDataHandler(
                        evt.target.value,
                      );
                    }}
                    label="Periods Data"
                    size="small"
                    variant="outlined"
                    style={{ width: "160px" }}
                    // width="20px"
                    // fullWidth
                  >
                    {act.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
        </div>
    )
}

export default CsvPeriodsData
