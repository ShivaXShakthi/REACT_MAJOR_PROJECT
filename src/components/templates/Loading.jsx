import React from "react";
import loadingGif from "/loader.gif";

const Loading = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center ">
            <img src={loadingGif} alt="" />
        </div>
        
    );
};

export default Loading;