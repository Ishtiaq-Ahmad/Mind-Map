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
  const {data: {dataset,selectedTab,multiNodeData, showPasteButton, showCopyButton, copyNode, elementData, _nodesNumber,_nodesName,_periodsNodesData, copyText },handleOpen, pasteNodeFileHandler, copyNodeHandler } = multiTabContext;

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
       const _copyNodeHandler =() =>{
        copyNodeHandler()
        // console.log("copy",elementData);
      }
      const pasteNodeHandler = () => {
        const{id: copiedNodeId, type: copiedTypeId, data} = copyNode;
        try {
           const xNumber = Math.floor(Math.random() * 100 + 1);
        const yNumber = Math.floor(Math.random() * 100 + 1);
            let pasteNode = {
          id: copiedNodeId,
          type: copiedTypeId,
          position: { x: xNumber, y: yNumber },
          data: { label: data.label},
        };
         
      let pasteNodeData = [...dataset[selectedTab], pasteNode];
        pasteNodeFileHandler(pasteNodeData,);
        } catch (error) {
          console.log('paste option not working');
        }
       
      }
  
      
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
        {multiNodeData.length > 1 ?(<Button variant="contained" fullWidth style={{marginBottom:"10px"}} onClick={groupDataHandler}>Create a Group</Button>) : null}
      </div>
      {showCopyButton ? <Button fullWidth variant="contained" onClick={_copyNodeHandler} >{copyText}</Button> : null} 
      {showPasteButton ? <Button fullWidth style={{marginTop:"10px"}} variant="contained" onClick={pasteNodeHandler} >Paste</Button> : null}
        </div>
    )
}

export default DragAbleNodes
