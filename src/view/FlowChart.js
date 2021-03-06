import React, { useState, useRef, useContext, useEffect } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
  getOutgoers,
  getConnectedEdges,
} from "react-flow-renderer";
import "../App.css";
import { Grid } from "@material-ui/core";
import "../style/SideBar.css";
import Header from "../component/Header";
import MindMapSideBar from "../component/sidebar/SideBar";
import MultiTab from "../component/MultiTab";
import "../style/Header.css";
import NodeContext from "../Context/auth/authContext";
import ContainerData from "../Context/multiTab/MultiTabContext";
import { ScreenCapture } from "react-screen-capture";
import { useReactToPrint } from "react-to-print";
import CustomNodeComponent from "../component/CustomNodeComponent";
import { getDocById } from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import { SmartEdge, SmartEdgeProvider } from "@tisoap/react-flow-smart-edge";
import logo from "../assets/images/logo512.png";
import { app } from "../backend/firebase";
import { getAuth } from "firebase/auth";


const nodeTypes = {
  special: CustomNodeComponent,
};
// let id = 0;
// const getId = () => `node_${id++}`;

const FlowChart = (props) => {
  const auth = getAuth(app);
  const containerContext = useContext(ContainerData);
  const nodeContext = useContext(NodeContext);
  // const [nodePadding , setNodePadding] = useState(20)

  const {
    data: {
      dataset,
      docID,
      selectedTab,
      smartPadding,
      smartGrid,
      smartLine,
      smartCorner,
      specificData,
      showModalName,
      showTabName,
      showDate,
      showPeriod,
      showUser,
      showSoftwareOwner,
      showSoftwareDeveloper,
      showSideBar
    },
    updateDataSetHandler,
    onElementClickHandler,
    onDragHandler,
    onEdgeHandler,
    removeElementHandler,
    multipleSelectNode,
    paneClickHandler,
    nodeDragIdHandler,
    nodeDragHandler,
    loadDataHandler,
  } = containerContext;
  const {
    data: { tabs, nodeID, fullName, role },
  } = nodeContext;

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       let userId = user.id;
  //       // ...
  //     } else {
  //       console.log("logggggggg");
  //     }
  //   });
  // }, []);

  const fetchData = async () => {
    try {
      let docId = null;
      let _nodesData = null;

      if (nodeID) {
        const { data: _nodesDataa } = await getDocById("nodesData", nodeID);
        _nodesData = _nodesDataa;
      }

      if (_nodesData) {
        _nodesData = await JSON.parse(_nodesData.dumpData);
        docId = _nodesData.docId;
        _nodesData = _nodesData.data;
        //  _nodesData= _nodesData[0]
      }

      let isCollectionEmpty = _nodesData ? false : true;

      if (!isCollectionEmpty) {
        let myData = _nodesData ? _nodesData : [];
        myData.map((ele) => {});
        let __self = new Array(myData.length);
        __self.fill(8);
        setCounter(__self);

        loadDataHandler(myData, docId, false);
      } else {
        console.log("No data in database");
      }
    } catch (error) {
      console.log("No data fetch", { error });
    }
  };

  const reactFlowWrapper = useRef(null);
  const componentRef = useRef();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [uploadImage, setUploadImage] = useState([]);
  const [screenCapture, setScreenCapture] = useState("");
  const [counter, setCounter] = useState([]);

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
  let currentDate = new Date();

  let date =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate();
  let time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  const handlePrint = useReactToPrint({
    content: () => {
      const tableStat = componentRef.current.cloneNode(true);
      const PrintElem = document.createElement("div");
      const header =
        `${role !== 1 ? `<img src="${logo}" alt="" class="watermark"/>` : ""}` +
        `<div class="page-footer">
        ${
          showModalName
            ? `Model Name: <strong>${window.location.hostname} </strong>`
            : ""
        }
        ${
          showTabName
            ? `Tab Name: <strong> Screen: ${selectedTab} </strong> `
            : ""
        }
        ${showDate ? `Date <strong>${date + " " + time}</strong>  ` : ""}
        ${showPeriod ? `Period: <strong>${specificData}</strong> ` : ""}
        ${showUser ? `User: <strong>${fullName}</strong>` : ""}
        ${showSoftwareOwner ? `Software Owner: <strong>Fritz</strong>` : ""}
        ${
          showSoftwareDeveloper
            ? ` Software Developer: <strong>DIGIT SOLUTION</strong>`
            : ""
        }
        </div>`;
      PrintElem.innerHTML = header;
      PrintElem.appendChild(tableStat);
      return PrintElem;
    },
  });

  const onElementsRemove = (elementsToRemove) => {
    const deleteElement = removeElements(
      elementsToRemove,
      dataset[selectedTab]
    );
    removeElementHandler(deleteElement);
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
    updateDataSetHandler(generatedEdge);
  };

  const onElementClick = (event, element, edge) => {
    console.log('elemet', element);
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
        const multiId = seletedElements.map((item) => {
          return item.id;
        });
        multipleSelectNode(multiId, seletedElements);
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
    onDragHandler(finalData, docID ? docID : DOCID, false);
  };

  const onEdgeDoubleClick = (event, edge) => {
    onEdgeHandler(edge);
  };

  const onNodeDragStop = async (event, node) => {
    let nodePositionX = node.position.x;
    let nodePositionY = node.position.y;
    nodeDragHandler(node, nodePositionX, nodePositionY);
  };
  const onNodeDragStart = (event, node) => {
    let nodeId = node.id;

    nodeDragIdHandler(nodeId);
  };
// switch(showSideBar) {
//   case tabs:
//     const x = 10
//     break;
//   case :
//     // code block
//     break;
//   default:
//     // code block
// }
  return (
    <div>
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <div>
            <Header
              onStartCapture={onStartCapture}
              handlePrint={handlePrint}
              {...props}
            />
            <Grid container spacing={12}>
              {tabs ? (
                <Grid item lg={2} md={2} sm={2} xs={12} className="sidebar">
                  <MultiTab setCounter={setCounter} counter={counter} />
                </Grid>
              ) : null}

          <Grid item xs={tabs ? 8 : 10   }  ref={componentRef}>
                <div style={{ height: '93vh' }} ref={reactFlowWrapper}>
                  <SmartEdgeProvider
                    options={{
                      nodePadding: smartPadding,
                      gridRatio: smartGrid,
                      lineType: smartLine,
                      lessCorners: smartCorner,
                    }}
                  >
                    <ReactFlow
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
                      connectionMode="loose"
                      arrowHeadColor="blue"
                    >
                      <Controls />
                      <Background color='#aaa' gap={16} />
                    </ReactFlow>
                  </SmartEdgeProvider>
                </div>
              </Grid>
              {
                showSideBar ? (
                  <Grid item xs={2} className="sidebar">
                <MindMapSideBar
                  uploadImage={uploadImage}
                  setUploadImage={setUploadImage}
                  handleSave={handleSave}
                  screenCapture={screenCapture}
                />
              </Grid>
                ) : null
              }
              
            </Grid>
          </div>
        )}
      </ScreenCapture>
    </div>
  );
};

export default FlowChart;
