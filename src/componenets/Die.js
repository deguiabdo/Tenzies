import React from "react";

export default function Die(props){

    return (
      <div
        onClick={props.holdDie}
        className={`  ${
          props.isHeld ? "bg-green-500" : "bg-white"
        } w-10 h-10 rounded-lg  shadow-md grid place-items-center text-slate-800 font-bold text-2xl`}
      >
        {props.value}
      </div>
    );
}