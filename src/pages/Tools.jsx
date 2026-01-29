import React, { useEffect, useRef } from "react";
import TopBar from "../components/TopBar";

const Tools = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("tools-visible");
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <>
            <section
                ref={ref}
                className="relative min-h-screen overflow-hidden font-sans bg-white tools-animate"
                aria-label="Tools section"
            >
                <style>{`
                    .tools-animate { 
                        opacity: 0; 
                        transform: translateY(26px); 
                        transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.8,.2,1); 
                    }
                    .tools-visible { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                    .tools-stagger-1 { transition-delay: 80ms; }
                    .tools-stagger-2 { transition-delay: 160ms; }
                    .tools-stagger-3 { transition-delay: 260ms; }
                `}</style>

                {/* Top Navigation */}
                <TopBar />

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28">
                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-10 items-start mb-16 md:mb-20">
                        {/* Left: Giant heading */}
                        <div className="lg:col-span-5">
                            <h1
                                className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black tools-stagger-1"
                                style={{
                                    fontSize: "clamp(48px, 9vw, 140px)",
                                }}
                            >
                                Tools
                            </h1>
                        </div>

                        {/* Right: Description */}
                        <div className="lg:col-span-7">
                            <p
                                className="text-gray-600 leading-[1.35] tracking-[-0.005em] tools-stagger-2"
                                style={{ fontSize: "clamp(18px, 2.1vw, 28px)" }}
                            >
                                A collection of useful tools, utilities, and resources I've built or curated to enhance productivity and creativity.
                            </p>

                            {/* Tag line */}
                            <div className="mt-10 md:mt-12 tools-stagger-3">
                                <p className="text-gray-400 uppercase tracking-widest text-[11px] md:text-xs">
                                    UTILITIES ⎯ RESOURCES ⎯ PRODUCTIVITY TOOLS
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/10 mb-16 md:mb-20" />

                    {/* Content Area */}
                    <div className="space-y-8 tools-stagger-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center">
                                        <span className="text-2xl">🛠️</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-black">
                                            Your Tools
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Add your tools here
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-500 leading-relaxed max-w-2xl">
                                    This is where you can display your tools, utilities, and resources. 
                                    Share helpful tools that others can use and benefit from.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tools;
