import React,{useContext} from 'react'
import '../../style/SideBar.css';
import CsvFile from './CsvFile'



const DragAbleNodes = () => {
 
  

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
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
     
        </div>
    )
}

export default DragAbleNodes
