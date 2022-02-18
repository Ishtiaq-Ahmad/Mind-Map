import React,{useContext} from 'react'
import '../../style/SideBar.css';
import CsvFile from './CsvFile'
import "../../style/SideBar.css";
import MultiTabContext from '../../Context/multiTab/MultiTabContext';
import Button from '@mui/material/Button';
import {createDocWithID,getDocById, updateDocWithId}from '../../utils/helpers'
import AuthNodeContext from '../../Context/auth/authContext';




const DragAbleNodes = () => {
  const multiTabContext = useContext(MultiTabContext);
  const authNodeContext = useContext(AuthNodeContext)
  const { data: { role, userId, email, full_name }} = authNodeContext;
  const {data: {multiNodeData, docID, fetchData, createGroup },handleOpen ,fetchedGroupData} = multiTabContext;

   const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };

      const groupDataHandler = async () => {
        handleOpen();
      //   let multiNodeSize = multiNodeData.length;
      //   if(fetchData){
      //    let finalData = [...fetchData, ...multiNodeData];
      // updateDocWithId("groupNodes", docID, {finalData})
      //  .then(async() => {
      //        await getDocById("groupNodes", docID).then((value) => {
      //           const dbData = value.data.finalData ;
               
      //           fetchedGroupData(dbData, multiNodeSize)
      //        })
      //      });
      //   }else {
        
      // await createDocWithID("groupNodes", docID, {multiNodeData})
      //      .then(async() => {
      //        await getDocById("groupNodes", docID).then((value) => {
      //           const dbData = value.data.multiNodeData ;
      //           fetchedGroupData(dbData, multiNodeSize)
      //        })
      //      })
      //   }
           
      };
    return (
        <div>
        <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dragAble_input_node" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dragAble_default_node" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dragAble_output_node" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
      <div className="dragAble_special_node" onDragStart={(event) => onDragStart(event, 'special')} draggable>
        Special Node
      </div>
      <CsvFile/>
      <div style={{marginTop:'6px'}}>
        {multiNodeData.length > 1 ?(<Button variant="contained" fullWidth onClick={groupDataHandler}>Create a Group</Button>) : null}
      </div>
     
        </div>
    )
}

export default DragAbleNodes
