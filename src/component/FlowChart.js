import React, { useState, useEffect, useRef, useContext } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
} from "react-flow-renderer";
import Minimap from "./Minimap";
import { Grid } from "@material-ui/core";
import "./SideBar.css";
import Header from "./Header";
import MindMapSideBar from "./SideBar";
import "./Header.css";
import DragAbleNodes from "./DragAbleNodes";
import Node, { nodesData } from "./FlowChartData";
import NodeContext from "../Context/auth/authContext";
import ContainerData from "../Context/multiTab/MultiTabContext";
import click from '../assets/images/check.png'
import { SoapOutlined } from "@mui/icons-material";


let id = 0;
const getId = () => `dndnode_${id++}`;

  const FlowChart = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const containerContext=useContext(ContainerData)
  const {data:{dataset, selectedNode},addTabHandler,updateDataSetHandler,nodeBgColorHandler,onElementClickHandler}=containerContext
  const [selectedTab,setSelectedTab]=useState(0)
  console.log({dataset:dataset[selectedTab]})
  const [elements, setElements] = useState(dataset[selectedTab]);
  const [nodeName, setNodeName] = useState("Node name");
  const [uploadImage, setUploadImage] = useState([])
  const [nodeBg, setNodeBg] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [textColor, setTextColor] =useState("");
  const [textSize, setTextSize] = useState('');
  const [textTransform, setTextTransform] = useState('')
  const [fontStyle, setFontStyle] = useState('');
  const [borderSize, setBorderSize] = useState(1);
  const [borderRadios, setBorderRadios] = useState(1);
  // const [selectedNode, setSelectedNode] = useState("");
  const nodeContext = useContext(NodeContext);
  const [showArrow, setShowArrow] = useState(false);
  const [arrowTypeName, setArrowTypeName] = useState();
  const [selectAnimation, setSelectAnimation] = useState(false);
  const [selectArrow, setSelectArrow] = useState();
  const [isHidden, setIsHidden] = useState(false);
  const [edgeLabel, setEdgeLabel] = useState();
  const [labelColor, setLabelColor] = useState("");
  const [nodeHidden, setNodeHidden] = useState(false);
  const [hideArrow, setHideArrow] = useState(false);
  const [counter,setCounter]=useState([0])


  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => {
  const generatedEdge=   addEdge({ ...params, type: "buttonedge", label: "label" },dataset[selectedTab])
  // dispatch action to store for data updation
      // send addEdge to dispatch
// const generatedEdge=addEdgeHandler(params)
console.log(generatedEdge)
updateDataSetHandler(selectedTab, generatedEdge)
    // setElements((els) =>
    //   addEdge({ ...params, type: "buttonedge", label: "label" }, els)
    // );
  };

   const onElementClick = (event, element) => {
     onElementClickHandler(element)
  };


  const addEdgeHandler=(...params)=>{
    console.log({params});
    // console.log( addEdge({ ...params, type: "buttonedge", label: "label" }));
    // return  addEdge({ ...params, type: "buttonedge", label: "label" })
    return true;
  }
  const onLoad = (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
  };

  const onEdgeDoubleClick = (event, edge) => {
    setShowArrow(true);
    setSelectArrow(edge.id);
    
  };

  useEffect(() => {
    if (arrowTypeName && selectArrow) {
      const index = elements.findIndex((item) => item.id === selectArrow);
      const newElements = [...elements];
      newElements[index].type = arrowTypeName;
      setElements([...newElements]);
    }
  }, [arrowTypeName, selectArrow]);

  useEffect(() => {
    // alert(selectArrow)
    if (selectAnimation && selectArrow) {
      const index = elements.findIndex((item) => item.id === selectArrow);
      const newElements = [...elements];
      newElements[index].animated = selectAnimation;
      setElements([...newElements]);
    } else if (selectArrow) {
      const index = elements.findIndex((item) => item.id === selectArrow);
      const newElements = [...elements];
      newElements[index].animated = false;
      setElements([...newElements]);
    }
  }, [selectAnimation, selectArrow]);

  useEffect(() => {
    if (edgeLabel && selectArrow) {
      const index = elements.findIndex((item) => item.id === selectArrow);
      const newElements = [...elements];
      newElements[index].label = edgeLabel;
      setElements([...newElements]);
    }
  }, [edgeLabel, selectArrow]);

 

  //  ***********Format Node color******************

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectedNode) {
          el.data = { ...el.data, label: nodeName };    
        }

        return el;
      })
    );
  }, [nodeName, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectedNode) {
          el.data = { ...el.data, label:  uploadImage};    
        }

        return el;
        
      })
    );
  }, [uploadImage, setElements]);
 


 
 useEffect(() => {
   const nodeColor = dataset[selectedTab].map((el) => {
        if (el.id === selectedNode) {
          el.style = { ...el.style, backgroundColor: nodeBg };
        }
        return el;
      })
   nodeBgColorHandler(selectedTab, nodeColor)
   
 }, [nodeBg])
  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectedNode) {
          // el.style = { ...el.style, backgroundColor: nodeBg };
          el.style = { ...el.style, color: textColor};
          el.style = { ...el.style, borderColor: borderColor };
          el.style = { ...el.style, borderStyle: 'solid', borderWidth: borderSize};
          el.style = {...el.style, borderRadius: borderRadios}
          el.style = { ...el.style, fontStyle: fontStyle, textDecoration: fontStyle , fontWeight: fontStyle};
          el.style = { ...el.style, fontSize: textSize };
          el.style = { ...el.style, textTransform: textTransform };
          
        }

        return el;
      })
    );
  }, [ textColor, borderColor, fontStyle, textSize, textTransform, borderSize, borderRadios, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectedNode) {
          el.isHidden = nodeHidden;
        } 
        return el;
      })
    );
  }, [nodeHidden, setElements]);


  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectArrow) {
          el.isHidden = hideArrow;
        }

        return el;
      })
    );
  }, [hideArrow, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((e) => {
        e.isHidden = isHidden;
        return e;
      })
    );
  }, [isHidden]);

const tabGenerator= ()=>{
  return (
    counter.map((element,index)=>{
  return   <div key={index} onClick={()=>setSelectedTab(index)}>tab {index}</div>
    })
  )
}
  return (
    <div>
      <Header />
      <Grid container spacing={12}>
       <Grid item lg={2} md={2} sm={2} xs={12} className="sidebar">

         <button onClick={()=>{
           
           setCounter([...counter,8]);
           addTabHandler()
           
           }}>add tab</button>

          {/* using map */}
            {tabGenerator()}
         {/* generated tabs */}
       </Grid>
        <Grid item lg={8} md={8} sm={8} xs={12}>
        <div>
          tab container # {selectedTab}
        </div>
          <div style={{ height: "93vh" }} ref={reactFlowWrapper}>
            <ReactFlow
              elements={dataset[selectedTab]}
              onElementClick={onElementClick}
              onLoad={onLoad}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              deleteKeyCode={46}
              zoomOnDoubleClick={false}
              key="edges"
              onDragOver={onDragOver}
              onDrop={onDrop}
              onEdgeDoubleClick={onEdgeDoubleClick}
              edgeTypes
            >
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </Grid>
        <Grid item lg={2} md={2} sm={2} className="sidebar">
          <MindMapSideBar
            nodeName={nodeName}
            setNodeName={setNodeName}
            nodeBg={nodeBg}
            setNodeBg={setNodeBg}
            showArrow={showArrow}
            arrowTypeName={arrowTypeName}
            setArrowTypeName={setArrowTypeName}
            selectAnimation={selectAnimation}
            setSelectAnimation={setSelectAnimation}
            edgeLabel={edgeLabel}
            setEdgeLabel={setEdgeLabel}
            labelColor={labelColor}
            setLabelColor={setLabelColor}
            nodeHidden={nodeHidden}
            setNodeHidden={setNodeHidden}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            hideArrrow={hideArrow}
            setHideArrow={setHideArrow}
            borderColor = {borderColor}
            setBorderColor = {setBorderColor}
            textColor = {textColor}
            setTextColor = {setTextColor}
            borderSize = {borderSize}
            setBorderSize = { setBorderSize}
            fontStyle = {fontStyle}
            setFontStyle = {setFontStyle}
            textSize={textSize}
            setTextSize = {setTextSize}
            textTransform= {textTransform}
            setTextTransform ={ setTextTransform}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
            borderRadios = {borderRadios}
            setBorderRadios ={ setBorderRadios}
            
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FlowChart;
