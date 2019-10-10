import React from 'react';
import titleArr from './titleList.jsx';
const SetTitle = () => {
    const hash = window.location.hash.split('?')[0];
    console.log(window.location.hash)
    console.log(hash)
    let title = 'CCVT';
    for (let key in titleArr){
        if(titleArr[key].hash === hash){
            title = titleArr[key].title;
            return title;
        }
    }
};
export default SetTitle;