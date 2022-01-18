import React, { useState, useRef, useContext, useEffect } from "react";
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
// import { PathFindingEdge } from "@tisoap/react-flow-smart-edge";
import CustomNodeComponent from "./CustomNodeComponent";
import { getDocById } from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import { SmartEdge, SmartEdgeProvider } from '@tisoap/react-flow-smart-edge';

const nodeTypes = {
  special: CustomNodeComponent,
};
// let id = 0; 
// const getId = () => `node_${id++}`;

const FlowChart = (props) => {
  const containerContext = useContext(ContainerData);
  const {
    data: { dataset, docID, selectedTab: _selectedTab },
    updateDataSetHandler,
    onElementClickHandler,
    onDragHandler,
    onEdgeHandler,
    removeElementHandler,
    multipleSelectNode,
    paneClickHandler,
    loadDataHandler,
    nodeDragIdHandler,
    nodeDragHandler,
  } = containerContext;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let docId = null;
      let _nodesData = null;

      if (nodeID) {
        const { data: _nodesDataa } = await getDocById("nodesData", nodeID);
        _nodesData = _nodesDataa;
        console.log('csv first data', _nodesData);
      }
      
      if (_nodesData) {
        _nodesData = await JSON.parse(_nodesData.dumpData);
        docId = _nodesData.docId;
        _nodesData = _nodesData.data;
        console.log('csv data',_nodesData);
      }
    
      let isCollectionEmpty = _nodesData ? false : true;

      // if (!isCollectionEmpty) {

      //   let myData = _nodesData ? _nodesData : [];
      //   console.log('aahhm',myData);
      //   let __self = new Array(myData.length);

      //   __self.fill(8);

      //   setCounter(__self);

      //   loadDataHandler(myData, docId, false);
      // } else {
      //   console.log("else part");
      // }
    } catch (error) {
      console.log("new issue", { error });
    }
  };

  const reactFlowWrapper = useRef(null);
  const componentRef = useRef();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [selectedTab, setSelectedTab] = useState(_selectedTab);
  const [uploadImage, setUploadImage] = useState([]);
  const nodeContext = useContext(NodeContext);
  const [showArrow, setShowArrow] = useState(false);
  const [screenCapture, setScreenCapture] = useState("");
  const [counter, setCounter] = useState([]);
  const {
    data: { tabs, nodeID },
  } = nodeContext;
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
    const _data = getOutgoers(element, dataset);
    const treeData = _data.map((item) => item.id);
    let __edges = dataset.filter((item) => item.source && item.target);
    let treeDataUpdate = "";
    const edgesConnect = getConnectedEdges([element], __edges);
    const edgesId = edgesConnect.map((item) => item.id);
    const hi = [...edgesId, element.id];
    treeDataUpdate = [...treeData, ...hi];
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
    paneClickHandler(event);
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
  const onDrop = async (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    let DOCID = uuidv4();
    const newNode = {
      id: uuidv4(),
      type,
      position,
      data: { label: `${type} node` },
    };
    let finalData;
    if (dataset && dataset.length > 0) {
      finalData = [...dataset[selectedTab], newNode];
    } else {
      finalData = [newNode];
    }

    // docID is our local context id if exists

    // let finalData = dataset;
    // if (dataset.length > 0) {
    //   // update the first doc in database collection
    //   // do not generatrate new uuid
    //   // get docID from store
    //   finalData = [...dataset[selectedTab], newNode];
    //   const { data } = await getDocById("nodesData", docID);

    //   updateDocWithId("nodesData", docID, {
    //     data: finalData,
    //     docId: docID,
    //   });
    // } else {
    //   finalData = [newNode];
    //   // alert("else");
    //   const myDocId = uuidv4();
    //   await createDocWithID("nodesData", myDocId, {
    //     docId: myDocId,
    //     data: finalData,
    //   });
    // }
    onDragHandler(selectedTab, finalData, docID ? docID : DOCID, false);
  };

  const onEdgeDoubleClick = (event, edge) => {
    setShowArrow(true);
    console.log('edge', edge);
    onEdgeHandler(edge);
  };

  const onNodeDragStop = async (event, node) => {
    let nodePositionX = node.position.x;
    let nodePositionY = node.position.y;
    nodeDragHandler(selectedTab, node, nodePositionX, nodePositionY);
  };
  const onNodeDragStart = (event, node) => {
    let nodeId = node.id;

    nodeDragIdHandler(selectedTab, nodeId);
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
                // lg={tabs ? 7 : 9}
                // md={tabs ? 8 : 10}
                sm={tabs ? 8 : 10}
                xs={12}
              >
                {/* <div>tab container ....# {selectedTab}</div> */}
                <div style={{ height: "93vh" }} ref={reactFlowWrapper}>
                <SmartEdgeProvider options={{ debounceTime: 3000 , nodePadding: 10, gridRatio : 40, lineType : "straight", lessCorners : false}}>
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
                    edgeTypes={{ smart: SmartEdge }}
                    onNodeDragStop={onNodeDragStop}
                    onNodeDragStart={onNodeDragStart}
                    nodeTypes={nodeTypes}
                    onPaneClick={onPaneClick}
                  >
                    <Controls />
                    <Background color="#aaa" gap={16} />
                  </ReactFlow>
                  </SmartEdgeProvider>
                </div>
              </Grid>
              <Grid item  xs={2} className="sidebar">
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
