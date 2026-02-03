import React from "react";
import TopBar from "./TopBar";
import Roboimg from "../assets/ChatGPT Image Oct 14, 2025, 11_43_12 AM-Photoroom.png";
import About from "./About";

const Hero = () => {
    return (
        <section id="hero" className=" relative min-h-screen overflow-hidden font-sans text-[#0a0a0b] bg-[linear-gradient(0deg,transparent_24%,#e7e7ea_25%,#e7e7ea_26%,transparent_27%,transparent_74%,#e7e7ea_75%,#e7e7ea_76%,transparent_77%),linear-gradient(90deg,transparent_24%,#e7e7ea_25%,#e7e7ea_26%,transparent_27%,transparent_74%,#e7e7ea_75%,#e7e7ea_76%,transparent_77%)]  bg-[length:40px_40px] bg-[position:0_0] w-[100%] " >
            {/* Top Navigation */}
            <TopBar />

            {/* Hero Section — mobile: image bottom touches screen bottom; desktop: unchanged */}
            <main role="main" className="fixed flex h-screen md:h-auto md:min-h-[60vh] w-full items-end justify-center overflow-hidden pb-0 md:pb-6">
                {/* Horizontally scrolling background text (marquee) */}
                <div aria-hidden="true" className="absolute inset-0 top-[-50vh] flex items-center justify-center pointer-events-none" >
                    <style>{`
            .heroMarquee {
              overflow: hidden;
              width: 100%;
              height: 150;
            }

            .heroMarquee__track {
              display: inline-block;
              white-space: nowrap;
              will-change: transform;
              animation: marquee 18s linear infinite;
            }

            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
                    <div className="heroMarquee w-full leading-none">
                        <div className="heroMarquee__track flex items-center justify-center font-serif font-black text-[#0b0b0e] select-none translate-y-[10vh] md:-translate-y-[2vh] text-[26vw] md:text-[14vw] lg:text-[14vw]">
                            <div className="mx-8 flex flex-col items-center">
                                <span className="font-serif text-[26vw] md:text-[14vw] lg:text-[14vw]">
                                    Thamesh Yadav —
                                </span>
                                <span className="mt-2 text-[5.5vw] md:text-[2.5vw] lg:text-[1.5vw] font-normal tracking-[0.25em] uppercase">
                                    Focused on AI systems, ethics, and applied intelligence.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Robot Image — mobile: full width + full height to fit screen; desktop: unchanged */}
                <div className="relative z-[2] grid w-full place-items-center md:w-[min(1100px,92vw)]">
                    <div className="grid h-[calc(100vh-50px)] w-full max-w-[100vw] place-items-center overflow-hidden bg-transparent text-[#2c2f33] font-semibold tracking-[0.04em] md:h-auto md:max-w-none md:aspect-[3/4] md:w-[min(780px,72vw)]">
                        <img
                            src={Roboimg}
                            loading="lazy"
                            decoding="async"
                            alt="Thinking Robot"
                            className="object-cover object-[center_bottom] w-full h-full md:object-[center_top_30%]"
                        />
                    </div>
                </div>
            </main>

            {/* Scroll Cue */}
            <div className="fixed left-6 bottom-[26px] hidden items-center gap-[10px] text-[13px] text-black md:flex font-bold">
                <span
                    aria-hidden="true"
                    className="inline-block h-[28px] w-[28px] rounded-[8px] border-[1.5px] border-black bg-white"
                ></span>
                <span>SCROLL DOWN</span>
            </div>

            {/* Copyright */}
            <div className="fixed right-[22px] bottom-[22px] hidden rounded-[12px] border border-[#ececf2] bg-white px-[12px] py-[10px] text-[12px] text-[#161618] shadow-[0_6px_20px_-14px_rgba(0,0,0,0.25)] md:block font-bold">
                ©2025
            </div>

            {/* About Section */}

        </section>
    );
};

export default Hero;
