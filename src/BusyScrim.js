import React, { useRef, useEffect, useState } from 'react'

const BusyScrim = ({message}) => {

    return (
        <div style={{position: 'absolute', left: 10, right: 10, top: 10, bottom: 10, backgroundColor: '#00000088'}}>
            
        </div>
    );
}

export default BusyScrim;