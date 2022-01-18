import React,{useContext} from 'react'
import "../style/SideBar.css";
import Curved from "../assets/images/curved_arrow.PNG";
import Smooth from "../assets/images/smooth_arrow.PNG";
import Straight from "../assets/images/straight_arrow.PNG";
import smoothStep from "../assets/images/smoothStep.png";
import MultiTabContext from "../Context/multiTab/MultiTabContext";

const EdgeCustomization = () => {
    const multitabContext = useContext(MultiTabContext);
     const {
    data: {
      nodeName,
    },
    bgColorHandler,
   
  } = multitabContext;
    return (
        <div>
            <h4>Select Arrow</h4>
            <span className="arrow">
              <img
                src={Curved}
                alt="curved arrow"
                className="curved"
                // onClick={changeArrowType}
                id='curved'
              />
              <img
                src={Smooth}
                alt="step arrow"
                className="curved"
                // onClick={changeArrowType}
                 id='step'
              />
              <img
                src={smoothStep}
                alt="smooth arrow"
                className="curved"
                // onClick={changeArrowType}
                  id='smoothstep'
              />
              <img
                src={Straight}
                alt="straight arrow"
                className="curved"
                // onClick={changeArrowType}
                id='straight'
              />
            </span>
        </div>
    )
}

export default EdgeCustomization
