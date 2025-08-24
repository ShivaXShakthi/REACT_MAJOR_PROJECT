import React from "react";
import loadingGif from "/404.gif";

const NotFound = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center ">
            <img src={loadingGif} alt="" />
        </div>
        
    );
};

export default NotFound;