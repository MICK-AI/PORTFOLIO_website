import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LinkTree from "./LinkTree";

const TopBar = () => {
    const [isLinkTreeOpen, setIsLinkTreeOpen] = useState(false);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    return (
        <>
            <section aria-label="Top navigation-wrapper" className="w-full">
                <header role="banner" aria-label="Top navigation" className=" sticky top-0 z-50 flex items-center justify-between  px-5 py-3 mx-4 my-4  bg-white border border-[#e8e8ef] rounded-[14px]  shadow-[0_1px_0_#f5f5f7,0_8px_30px_-16px_rgba(10,10,11,0.06)]transition-all duration-300max-w-[95vw] ">
                    {/* Left side: logo + text */}
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Logo */}
                        <button
                            onClick={() => navigate('/')}
                            className="w-[34px] h-[34px] flex-shrink-0 rounded-lg grid place-items-center font-bold tracking-[0.5px] bg-[#0b0b0e] text-white text-[12px] cursor-pointer hover:opacity-80 transition-opacity"
                            aria-label="Go to home"
                        >
                            MV
                        </button>

                        {/* Text */}
                        <p
                            className="
              text-[#222] 
              text-[13px] 
              whitespace-nowrap 
              overflow-hidden 
              text-ellipsis 
              max-w-[60vw]
              sm:max-w-none 
              sm:whitespace-nowrap
            "
                        >
                            <span className="hidden sm:inline">
                                Messing with machines, ideas, and ethics.
                            </span>
                            <span className="inline sm:hidden">machines, ideas, and ethics.</span>
                        </p>
                    </div>

                    {/* Right side: button */}
                    <button
                        ref={buttonRef}
                        onClick={() => setIsLinkTreeOpen(!isLinkTreeOpen)}
                        aria-label="Link tree"
                        className="
            inline-flex items-center gap-2 px-[14px] py-[9px] 
            border border-[#e7e7ee] rounded-[12px] 
            bg-white text-[#111] text-[13px] no-underline 
            hover:bg-gray-50 active:scale-[0.98] transition-all
            whitespace-nowrap cursor-pointer relative
          "
                    >
                        <span>LINK TREE</span>
                    </button>
                </header>
            </section>

            {/* Link Tree Popover */}
            <LinkTree 
                isOpen={isLinkTreeOpen} 
                onClose={() => setIsLinkTreeOpen(false)}
                buttonRef={buttonRef}
            />
        </>
    );
};

export default TopBar;
