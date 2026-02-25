import React, { useEffect, useRef } from "react";
import TopBar from "../components/TopBar";

const toolsData = [
    {
        title: "Intelligence Layer",
        icon: "🧠",
        tools: ["Perplexity AI", "arXiv"],
        purpose: "Real-time trend discovery and research gap identification."
    },
    {
        title: "Research Mapping",
        icon: "🗺️",
        tools: ["Connected Papers", "Semantic Scholar"],
        purpose: "Literature mapping and citation graph exploration."
    },
    {
        title: "Cognitive Layer",
        icon: "⚡",
        tools: ["ChatGPT", "Claude"],
        purpose: "Concept simplification, reasoning, and hypothesis refinement."
    },
    {
        title: "Execution Layer",
        icon: "⚙️",
        tools: ["GitHub Copilot", "VS Code"],
        purpose: "Model implementation and experimentation."
    },
    {
        title: "Validation Layer",
        icon: "📊",
        tools: ["Python (Pandas, Matplotlib)", "Weights & Biases"],
        purpose: "Experiment tracking and result visualization."
    },
    {
        title: "Publication Layer",
        icon: "📝",
        tools: ["Overleaf", "Grammarly"],
        purpose: "Academic formatting and final refinement."
    }
];

const researchPipeline = [
    {
        stage: "Spot the Signal",
        tool: "Perplexity AI",
        description: "I scan real-world AI trends and research gaps before committing to an idea."
    },
    {
        stage: "Map the Landscape",
        tool: "Connected Papers",
        description: "I visualize the citation graph to understand where my idea fits."
    },
    {
        stage: "Break the System",
        tool: "ChatGPT",
        description: "I deconstruct models, equations, and assumptions to find weaknesses."
    },
    {
        stage: "Design the Upgrade",
        tool: "Claude",
        description: "I refine the hypothesis and pressure-test the logic."
    },
    {
        stage: "Build & Experiment",
        tool: "GitHub Copilot + Python",
        description: "I implement, test, and iterate rapidly."
    },
    {
        stage: "Validate Hard",
        tool: "Pandas + Matplotlib + W&B",
        description: "I track metrics, run ablations, and compare baselines."
    },
    {
        stage: "Ship the Paper",
        tool: "Overleaf",
        description: "I structure the research into a clear, reproducible format."
    }
];

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
                                A curated stack of models, platforms, and utilities that power my autonomous execution, research, and development workflows.
                            </p>

                            {/* Tag line */}
                            <div className="mt-10 md:mt-12 tools-stagger-3">
                                <p className="text-gray-400 uppercase tracking-widest text-[11px] md:text-xs font-semibold">
                                    RESEARCH ⎯ EXPLORATION ⎯ EXECUTION
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/10 mb-16 md:mb-20" />

                    {/* Content Area - Workflow Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 tools-stagger-3">
                        {toolsData.map((category, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 border border-gray-200 rounded-[24px] p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/10 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="space-y-6 flex-grow">
                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xl">{category.icon}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-tight">
                                            {category.title}
                                        </h3>
                                    </div>

                                    {/* Tools List */}
                                    <div className="flex flex-wrap gap-2">
                                        {category.tools.map((tool, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-800 shadow-sm"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Purpose Explanation */}
                                <div className="mt-8 pt-6 border-t border-black/5">
                                    <p className="text-gray-500 leading-relaxed font-medium text-[15px]">
                                        {category.purpose}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/10 my-20 md:my-28 tools-stagger-3" />

                    {/* How My AI Research Is Built Section */}
                    <div className="tools-stagger-3">
                        <div className="mb-12 md:mb-16">
                            <p className="text-gray-400 uppercase tracking-widest text-[11px] md:text-xs font-bold mb-4">
                                RESEARCH, ENGINEERED ↗
                            </p>
                            <h2
                                className="leading-[0.95] font-extrabold tracking-[-0.02em] text-black"
                                style={{
                                    fontSize: "clamp(40px, 6vw, 84px)",
                                }}
                            >
                                How My AI Research Is Built
                            </h2>
                        </div>

                        <div className="relative">
                            {/* Vertical connecting line */}
                            <div className="absolute left-[23px] md:left-[31px] top-8 bottom-8 w-[2px] bg-black/5" />

                            <div className="space-y-6 md:space-y-8">
                                {researchPipeline.map((step, idx) => (
                                    <div key={idx} className="relative flex items-start gap-6 md:gap-10">
                                        {/* Number Indicator */}
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center flex-shrink-0 z-10 relative shadow-[0_2px_10px_rgb(0,0,0,0.06)] mt-2 md:mt-4">
                                            <span className="text-black font-extrabold text-lg md:text-xl">{idx + 1}</span>
                                        </div>

                                        {/* Content Card */}
                                        <div className="flex-grow bg-gray-50 border border-gray-200 rounded-[24px] p-6 md:p-10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/10 transition-all duration-300">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                                <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight leading-tight">
                                                    {step.stage}
                                                </h3>
                                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-[11px] md:text-xs font-bold uppercase tracking-widest shadow-sm w-fit flex-shrink-0">
                                                    {step.tool}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed font-medium text-base md:text-lg">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tools;
