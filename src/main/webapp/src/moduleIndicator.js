import React, { useState} from 'react';

function ModuleIndicator (props){

    return(
        <span className={props.className} >{props.text}</span>
    );
}

export default ModuleIndicator;