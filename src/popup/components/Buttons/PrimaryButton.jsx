import React from "react";
import 'font-awesome/css/font-awesome.min.css';

const PrimaryButton = (props) => {
  return (
    <button className={`solarity-button font-medium py-[22px] px-[22px] rounded-[22px] text-white w-[100%] h-[62px] text-[16px] sm:text-[16px] text-center tracking-wider inline-flex items-center justify-center ${props.bordered ? 'text-lightprimary border-lightprimary border-2' : ''} ${props.disabled ? 'bg-[#1d1e20] button-disabled text-grey' : 'bg-[#29B080]'} ${props.styles}`} onClick={props.disabled ? null : props.onClick}>
      {props.icon ? <i className="fa fa-chrome fa-lg pr-[10px]"></i> : ""}
      <span>{props.caption}</span>
    </button>
  );
};

export default PrimaryButton;
