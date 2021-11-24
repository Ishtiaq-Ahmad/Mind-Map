import React, { useState, useRef, useContext } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
  getOutgoers,
  getConnectedEdges,
} from "react-flow-renderer";
import Minimap from "./Minimap";
import { Grid } from "@material-ui/core";
import "./SideBar.css";
import Header from "./Header";
import MindMapSideBar from "./SideBar";
import MultiTab from "./MultiTab";
import "./Header.css";
import NodeContext from "../Context/auth/authContext";
import ContainerData from "../Context/multiTab/MultiTabContext";
import { ScreenCapture } from "react-screen-capture";
import { useReactToPrint } from "react-to-print";
import { SmartEdge ,PathFindingEdge} from '@tisoap/react-flow-smart-edge';
// import { PathFindingEdge  } from "@tisoap/react-flow-smart-edge";
import ColorSelectorNode from './SelectorNode';

 
let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowChart = (props) => {
  const reactFlowWrapper = useRef(null);
  const componentRef = useRef();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const containerContext = useContext(ContainerData);
  const {
    data: { dataset },
    updateDataSetHandler,
    onElementClickHandler,
    onDragHandler,
    onEdgeHandler,
    removeElementHandler,
    multipleSelectNode,
    paneClickHandler
  } = containerContext;
  const [selectedTab, setSelectedTab] = useState(0);
  console.log({ dataset: dataset[selectedTab] });
  const [elements, setElements] = useState(dataset[selectedTab]);
  const [uploadImage, setUploadImage] = useState([]);
  const nodeContext = useContext(NodeContext);
  const [showArrow, setShowArrow] = useState(false);
  const [screenCapture, setScreenCapture] = useState("");
  const [counter, setCounter] = useState([0]);
  const { tabs } = nodeContext.data;
  const handleScreenCapture = (screenCapture) => {
    setScreenCapture(screenCapture);
  };
  const handleSave = () => {
    const screenCaptureSource = screenCapture;
    const downloadLink = document.createElement("a");
    const fileName = "react-screen-capture.png";
    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};
  const onElementsRemove = (elementsToRemove) => {
    const deleteElement = removeElements(
      elementsToRemove,
      dataset[selectedTab]
    );
    removeElementHandler(selectedTab, deleteElement);
  };
  const onConnect = (params) => {
    const generatedEdge = addEdge(
      {
        ...params,
        type: "buttonedge",
        label: "label",
        arrowHeadType: "arrowclosed",
        
      },
      dataset[selectedTab]
    );
    updateDataSetHandler(selectedTab, generatedEdge);
  };

  const onElementClick = (event, element) => {
    const _data = getOutgoers(element, elements);
    const treeData = _data.map((item) => item.id);
    let __edges = elements.filter((item) => item.source && item.target);
    let treeDataUpdate = "";
    const edgesConnect = getConnectedEdges([element], __edges);
    const edgesId = edgesConnect.map((item) => item.id);
    const hi = [...edgesId, element.id];
    treeDataUpdate = [...treeData, ...hi];
    console.log('im the click', element);
    onElementClickHandler(element, treeDataUpdate);
  };
  const onSelectionChange = (seletedElements) => {
    if (seletedElements && seletedElements.length > 1) {
      if (seletedElements) {
        const multi = seletedElements.map((item) => item.id);
        multipleSelectNode(multi);
      }
    }
  };
  const onPaneClick = (event) => {
    paneClickHandler(event)
    // setMultipleSelect([]);
  };
  const addEdgeHandler = (...params) => {
    console.log({ params });
    return true;
  };
  const onLoad = (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  };
// push merged
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
      style:{ width: '150px'},
      
    };
    let finalData = [...dataset[selectedTab], newNode];
    onDragHandler(selectedTab, finalData);
  };

  const onEdgeDoubleClick = (event, edge) => {
    setShowArrow(true);
    onEdgeHandler(edge);
  };
  return (
    <div>
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <div>
            <Header
              onStartCapture={onStartCapture}
              handlePrint={handlePrint}
              selectedTab={selectedTab}
              {...props}
            />
            <Grid container spacing={12}>
              {tabs ? (
                <Grid item lg={2} md={2} sm={2} xs={12} className="sidebar">
                  <MultiTab
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    setCounter={setCounter}
                    counter={counter}
                  />
                </Grid>
              ) : null}
              <Grid
                item
                lg={tabs ? 8 : 10}
                md={tabs ? 8 : 10}
                sm={tabs ? 8 : 10}
                xs={12}
              >
                {/* <div>tab container ....# {selectedTab}</div> */}
                <div style={{ height: "93vh" }} ref={reactFlowWrapper}>
                  <ReactFlow
                    ref={componentRef}
                    elements={dataset[selectedTab]}
                    onElementClick={onElementClick}
                    onLoad={onLoad}
                    onElementsRemove={onElementsRemove}
                    onConnect={onConnect}
                    deleteKeyCode={8}
                    zoomOnDoubleClick={false}
                    key="edges"
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onEdgeDoubleClick={onEdgeDoubleClick}
                    onSelectionChange={onSelectionChange}
                    edgeTypes={{ smart: PathFindingEdge }}
                    // edgeTypes={{
                    //   smart: SmartEdge,
                    // }}
                    nodeTypes={nodeTypes}
                    onPaneClick={onPaneClick}
                  >
                    <Controls />
                    <Background color="#aaa" gap={16} />
                  </ReactFlow>
                </div>
              </Grid>
              <Grid item lg={2} md={2} sm={2} className="sidebar">
                <MindMapSideBar
                  selectedTab={selectedTab}
                  showArrow={showArrow}
                  uploadImage={uploadImage}
                  setUploadImage={setUploadImage}
                  handleSave={handleSave}
                  screenCapture={screenCapture}
                />
              </Grid>
            </Grid>
          </div>
        )}
      </ScreenCapture>
    </div>
  );
};

export default FlowChart;
