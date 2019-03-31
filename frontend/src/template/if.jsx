import React from 'react';

export default props => {
    if(props.validacao)
    {
        return null;
    }else{
        return(props.children);
    }
}