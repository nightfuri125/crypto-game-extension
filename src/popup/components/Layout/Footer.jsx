import React from "react";
import { useDispatch } from "react-redux";
import { MENU_ITEMS } from "../../data";
import { setPageStages } from "../../redux/slices/authSlice";

const Footer = (props) => {
  const dispatch = useDispatch();

  const switchMenu = (pageNumber) => {
    dispatch(setPageStages(pageNumber))
  }

  return (
    <div className="absolute bottom-0 w-full border-t-[1px] p-[14px] px-5 border-semiSplitter flex justify-between bg-[#141414]">
      {
        MENU_ITEMS.map((item, index) => (
          <div
            className={"cursor-pointer hover:text-primary " + (index == props.activeMenu ? "text-primary" : "text-white")}
            key={index}
            onClick={() => switchMenu(index + 3)}
          >
            {item.content}
          </div>
        ))
      }
    </div>
  );
}

export default Footer;