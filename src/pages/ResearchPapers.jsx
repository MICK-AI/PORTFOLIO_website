import React, { useEffect, useRef } from "react";
import TopBar from "../components/TopBar";

const ResearchPapers = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("research-visible");
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
                className="relative min-h-screen overflow-hidden font-sans bg-white research-animate"
                aria-label="Research Papers section"
            >
                <style>{`
                    .research-animate { 
                        opacity: 0; 
                        transform: translateY(26px); 
                        transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.8,.2,1); 
                    }
                    .research-visible { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                    .research-stagger-1 { transition-delay: 80ms; }
                    .research-stagger-2 { transition-delay: 160ms; }
                    .research-stagger-3 { transition-delay: 260ms; }
                `}</style>

                {/* Top Navigation */}
                <TopBar />

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28">
                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-10 items-start mb-16 md:mb-20">
                        {/* Left: Giant heading */}
                        <div className="lg:col-span-5">
                            <p
                                className="mt-6 text-base md:text-base lg:text-lg tracking-widest uppercase opacity-80 research-stagger-1"
                            >
                                Where intelligence begins.
                            </p>
                            <h1
                                className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black research-stagger-1"
                                style={{
                                    fontSize: "clamp(48px, 9vw, 140px)",
                                }}
                            >
                                Research Papers
                            </h1>
                        </div>

                        {/* Right: Description */}
                        <div className="lg:col-span-7">
                            <p
                                className="text-gray-600 leading-[1.35] tracking-[-0.005em] research-stagger-2"
                                style={{ fontSize: "clamp(18px, 2.1vw, 28px)" }}
                            >
                                A collection of my research work, publications, and explorations in AI, machine learning, ethics, and applied intelligence.
                            </p>

                            {/* Tag line */}
                            <div className="mt-10 md:mt-12 research-stagger-3">
                                <p className="text-gray-400 uppercase tracking-widest text-[11px] md:text-xs">
                                    ACADEMIC RESEARCH ⎯ PUBLISHED PAPERS ⎯ THOUGHT LEADERSHIP
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/10 mb-16 md:mb-20" />

                    {/* Content Area - Add your research papers here */}
                    <div className="space-y-12 research-stagger-3">
                        {/* Research Paper 01 */}
                        <div className="bg-gray-50 border border-gray-200 rounded-[24px] p-8 md:p-12 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/10 transition-all duration-300">

                            {/* Card Header */}
                            <div className="mb-8">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/5 text-black text-[11px] md:text-xs font-bold uppercase tracking-widest mb-4">
                                    RESEARCH WORK ↗
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight mb-4">
                                    Adaptive Task Allocation in Autonomous AI Workflows
                                </h2>
                                <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-4xl">
                                    This research explores distributed task orchestration in autonomous AI workflows using affinity-based eviction to optimize runtime–compliance tradeoffs.
                                </p>
                            </div>

                            {/* Divider inside card */}
                            <div className="h-px w-full bg-black/10 my-8" />

                            {/* Structured Content Layout */}
                            <div className="space-y-10">

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                                    <h3 className="md:col-span-4 text-xl font-bold text-black border-l-4 border-black pl-4">Why I Built This</h3>
                                    <div className="md:col-span-8 text-gray-600 leading-relaxed font-medium space-y-4">
                                        <p>AI agents are no longer just single-task tools — they are increasingly managing multi-step workflows. But when these workflows face dynamic changes, such as shifting priorities or human intervention, many orchestration strategies break down.</p>
                                        <p>Most existing systems rely on a centralized manager agent, sequential LLM chains, or static role assignments. This creates bottlenecks. Instead of scaling models, this work focuses on improving the orchestration layer.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                                    <h3 className="md:col-span-4 text-xl font-bold text-black border-l-4 border-black pl-4">The Core Problem</h3>
                                    <div className="md:col-span-8 text-gray-600 leading-relaxed font-medium space-y-4">
                                        <p>Dynamic task allocation in human-AI workflows often fails under sudden changes. The main issues include limited parallelism due to centralized control, context accumulation in long LLM chains, and poor compositional task decomposition.</p>
                                        <p>The core research question is: Can affinity-based eviction within a distributed planner reduce runtime overhead while preserving compliance and task performance?</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                                    <h3 className="md:col-span-4 text-xl font-bold text-black border-l-4 border-black pl-4">My Approach</h3>
                                    <div className="md:col-span-8 text-gray-600 leading-relaxed font-medium space-y-4">
                                        <p>We implement a DRAMA-inspired distributed multi-agent planner. Instead of routing everything through one manager, agents operate in parallel and handle compositional subtasks independently.</p>
                                        <p>When system constraints change or resource pressure increases, tasks are scored using semantic affinity metrics. Lower-affinity tasks are evicted or reassigned, and context chains are recomposed to reduce overhead. The system optimizes for runtime latency, compliance adherence, and task success rate.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                                    <h3 className="md:col-span-4 text-xl font-bold text-black border-l-4 border-black pl-4">Experimental Design</h3>
                                    <div className="md:col-span-8 text-gray-600 leading-relaxed font-medium space-y-4">
                                        <p>We use the AgentBoard multi-agent evaluation framework. Baselines include a Single-thread Manager Agent, standard DRAMA allocation without eviction, and the Autonomous Manager Agent.</p>
                                        <p>Metrics tracked involve average runtime, compliance score, task completion rate, replanning latency, and resource utilization.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                                    <h3 className="md:col-span-4 text-xl font-bold text-black border-l-4 border-black pl-4">Key Contributions</h3>
                                    <div className="md:col-span-8 text-gray-600 leading-relaxed font-medium space-y-4">
                                        <p>This work proposes distributed planning principles while introducing semantic affinity modeling and eviction strategies to handle dynamic environments better.</p>
                                        <p>It reduces runtime during dynamic task shifts, maintains or improves compliance performance, lowers semantic context overhead, and enables better parallel task execution.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                                    <h3 className="md:col-span-4 text-xl font-bold text-black border-l-4 border-black pl-4">Limitations</h3>
                                    <div className="md:col-span-8 text-gray-600 leading-relaxed font-medium space-y-4">
                                        <p>Affinity scoring introduces additional computation. Performance may vary depending on the task domain, and frequent task eviction could affect system interpretability.</p>
                                    </div>
                                </div>

                            </div>

                            {/* Card Footer / Download Button */}
                            <div className="mt-12 pt-8 border-t border-black/10 flex items-center justify-start">
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-black text-white font-bold text-sm tracking-wide hover:bg-gray-800 hover:scale-[1.02] transition-all shadow-md active:scale-95"
                                >
                                    Download Full Technical Draft (PDF)
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResearchPapers;
