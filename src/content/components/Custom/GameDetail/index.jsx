import React from "react";
import { useState } from "react";
import GameDetailPanel from "./GameDetailPanel";
import { GameDetailData } from "../../../data";
import { ArrowLeft, TwitterIcon, DiscordIcon, FacebookIcon } from "../../Icons";

const stores = chrome.runtime.getURL('static/img/library/stores.png')
const badges = chrome.runtime.getURL('static/img/library/badges.png')
const logo = chrome.runtime.getURL('logo.png')

const socialIcons = [
  { index: "twitter", icon: <TwitterIcon /> },
  { index: "discord", icon: <DiscordIcon /> },
  { index: "website", icon: <FacebookIcon /> },
];

const GameDetail = (props) => {
  const { setPage, setIframe, selectedGame } = props
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="flex flex-col w-full">
      <div className="my-[10px] text-[#F3F3F3] font-500 md:text-[24px] xs:text-[18px] cursor-pointer flex items-center w-fit" onClick={() => setPage(0)}>
        <ArrowLeft />
        <span className="ml-[10px]">{selectedGame.title}</span>
      </div>

      <div className={`relative mt-[15px]`}>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full mx-auto xs:w-[75%] xl:w-[25%] lg:w-[30%] md:w-[35%] sm:w-[45%]">
            <GameDetailPanel
              data={selectedGame}
              onPlay={setIframe}
            />
          </div>
          <div className="w-full xl:w-[75%] lg:w-[70%] md:w-[65%] sm:w-[55%]">
            <div className="border-y-[1px] border-[#1D1F1F] pl-[50px] mt-[25px] sm:mt-0">
              <ul className="flex flex-row text-[14px] py-[17.5px]">
                <li className={`${tabIndex === 0 ? 'text-[#29B080]' : "text-[#929298]"} w-[100px]`}><span className="cursor-pointer" onClick={() => setTabIndex(0)}>About</span></li>
                <li className={`${tabIndex === 1 ? 'text-[#29B080]' : "text-[#929298]"} w-[100px]`}><span className="cursor-pointer" onClick={() => setTabIndex(1)}>Store</span></li>
                <li className={`${tabIndex === 2 ? 'text-[#29B080]' : "text-[#929298]"} w-[100px]`}><span className="cursor-pointer" onClick={() => setTabIndex(2)}>Server</span></li>
              </ul>
            </div>
            {
              tabIndex === 0 ?
                <>
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[65%] pl-[20px] lg:pl-[50px]">
                      <div className="py-[20px] flex flex-row justify-between items-center">
                        <div className="text-white font-bold text-[21px]">
                          Description
                        </div>
                        <div>
                          <ul className="flex flex-row">
                            {socialIcons.map(
                              (item, index) => (
                                <a href={selectedGame[item.index]} target="_blank" key={index}>
                                  <li
                                    className="h-[35px] w-[35px] bg-[#131314] rounded-[12px] border-[1px] border-[#272829] flex flex-row justify-center items-center ml-[15px] cursor-pointer hover:border-[#29B080] hover:bg-focusbackground overflow-hidden"
                                    key={index}
                                  >
                                    {item.icon}
                                  </li>
                                </a>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <div
                        className="text-[16px] text-[#B3B3B7] lg:h-[400px] overflow-scroll pr-[10px]"
                        dangerouslySetInnerHTML={{
                          __html: selectedGame.description,
                        }}
                      ></div>
                    </div>
                    <div className="w-full lg:w-[35%] pl-[20px] lg:pl-[35px]">
                      <div className="text-white font-bold py-[20px] text-[21px]">
                        Quests
                      </div>
                      {selectedGame.quests.map((quest, index) => (
                        <div className="flex mb-[10px]" key={index}>
                          <div>
                            <img
                              src={quest.image}
                              width={70}
                              height={70}
                            // className="w-[70px] h-[70px]"
                            />
                          </div>
                          <div className="ml-[15px]">
                            <div className="text-[16px] text-white font-medium">
                              {quest.title}
                            </div>
                            <div className="text-[12px] text-white font-normal">
                              {quest.description}
                            </div>
                            {/* <div className="text-[12px] text-[#29B080] font-normal mt-[5px]">
                              Rarity: {quest.rarity}%
                            </div> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
                : tabIndex === 1 ?
                  <>
                    <div className="sm:pl-[20px] lg:pl-[50px]">
                      <div className="text-white font-bold py-[20px] text-[21px]">Passes</div>
                      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-[32px] justify-items-center lg:max-h-[400px] overflow-auto sm:pr-[10px]">
                        {selectedGame.stores.map((store, index) => (
                          <div className="bg-[#181818] px-[15px] py-[20px] rounded-[20px] w-[70%] sm:w-full" key={index}>
                            <div className="text-center mb-[15px] flex justify-center">
                              <img
                                src={store.image}
                                height={80}
                                width={80}
                              />
                            </div>
                            <div className="text-white font-semibold text-[18px]">
                              {store.title}
                            </div>
                            <div className="flex items-center text-white font-medium text-[18px] mt-[10px]">
                              <img
                                src={logo}
                                height={18}
                                width={18}
                              />
                              &nbsp;<span>{store.price}</span>
                            </div>
                            <button
                              className={`font-medium py-[8.5px] rounded-[12px] text-white w-[100%] text-[14px] sm:text-[14px] text-center tracking-wider  inline-flex items-center justify-center bg-[#29B080] hover:bg-lightprimary mt-[20px]`}
                            >
                              <span>Buy</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                  : tabIndex === 2 ?
                    <div className="pl-[50px]">
                      <div className="text-white font-medium py-[20px]">There are currently no running experiences.</div>
                    </div>
                    : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
