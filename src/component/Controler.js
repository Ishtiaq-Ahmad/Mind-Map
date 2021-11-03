import React from 'react'
import {Controls, Background} from 'react-flow-renderer';
  

const Controler = () => {
    return (
        <div>
            <Controls />
            <Background color="#aaa" gap={16} />
        </div>
    )
}

export default Controler
