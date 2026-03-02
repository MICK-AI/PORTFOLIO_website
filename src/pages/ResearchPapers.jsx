import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ChevronUp,
    FileText,
    Target,
    Zap,
    Search,
    BarChart3,
    Tag,
    BookOpen,
    ArrowUpRight
} from "lucide-react";
import TopBar from "../components/TopBar";

const researchData = [
    {
        id: "01",
        title: "Adaptive Task Allocation in Autonomous AI Workflows",
        type: "Research",
        focusArea: "Autonomous AI Orchestration",
        keywords: ["Multi-Agent Systems", "Distributed Planning", "Affinity Metrics", "Task Decomposition"],
        status: "Published",
        summary: "Exploring distributed task orchestration in autonomous AI workflows. This study introduces affinity-based eviction to optimize the tradeoff between runtime efficiency and compliance, moving away from centralized manager agents to a parallelized, scalable architecture.",
        problem: [
            "Centralized manager agents create significant execution bottlenecks.",
            "Sequential LLM chains suffer from context accumulation and high latency.",
            "Static role assignments fail to adapt to dynamic workflow shifts.",
            "Existing systems struggle with compositional task decomposition and parallel execution."
        ],
        approach: [
            "Implementation of a DRAMA-inspired distributed multi-agent planner.",
            "Adoption of parallel agent execution for independent subtask management.",
            "Integration of semantic affinity metrics to score and prioritize tasks.",
            "Development of affinity-based eviction strategies to reduce overhead during resource pressure."
        ],
        contributions: [
            "Developed a novel distributed planning framework for autonomous systems.",
            "Introduced semantic affinity modeling for intelligent task prioritization.",
            "Proven reduction in runtime during dynamic task shifts.",
            "Enhanced compliance adherence through optimized context recomposition."
        ],
        results: [
            "Evaluated using the AgentBoard multi-agent framework across diverse benchmarks.",
            "Demonstrated significant reduction in average runtime compared to single-thread baselines.",
            "Maintained high compliance scores while lowering semantic context overhead.",
            "Improved resource utilization and replanning latency in high-pressure environments."
        ],
        link: "#"
    },
    {
        id: "02",
        title: "Trade-Off Between Fairness and Efficiency in AI Systems",
        type: "Research",
        focusArea: "AI Ethics & Optimization",
        keywords: ["Fairness", "System Efficiency", "Bias Mitigation", "Multi-objective Optimization"],
        status: "Published",
        summary: "AI is now used in high-impact decisions (e.g., hiring, lending, policing). While fairness is ethically vital, enforcing fairness often affects prediction quality or system efficiency. This paper explores how fairness constraints interact with performance optimization and discusses strategies to balance them responsibly.",
        problem: [
            "Historical bias in data means enforcing fairness may suppress statistically strong signals.",
            "Conflicting optimization goals where fairness constraints add restrictions to the model search space.",
            "Performance degradation as fairness remediation techniques often require extra computational resources.",
            "Mathematical impossibility of satisfying all standard fairness definitions (Parity, Odds, etc.) simultaneously."
        ],
        approach: [
            "Analyzed standard fairness definitions: Demographic Parity, Equalized Odds, and Predictive Parity.",
            "Utilized multi-objective optimization (Pareto Frontiers) to view fairness and accuracy as balancing goals.",
            "Implemented fairness-aware modeling including regularization toward fair representations.",
            "Integrated post-processing adjustments and fairness monitoring using tools like IBM AIF360 and Fairlearn."
        ],
        contributions: [
            "Explored the core nature of the trade-off between algorithmic fairness and system efficiency.",
            "Discussed context-aware strategies to balance these tensions in high-impact AI systems.",
            "Highlighted the limitations of current bias mitigation methods in preserving predictive accuracy.",
            "Proposed embedding human judgment and accountability into technical design choices."
        ],
        results: [
            "Found that no single bias mitigation method preserves accuracy while improving fairness across all tasks.",
            "Quantified the impact of fairness constraints using Pareto Frontiers and multi-objective optimization curves.",
            "Established that healthcare and real-time systems require different fairness vs. performance thresholds.",
            "Recommended transparency and human-in-the-loop governance for responsible AI deployment."
        ],
        link: "#"
    }
];

const ResearchCard = ({ research }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:border-black/10 transition-all duration-500 shadow-sm hover:shadow-xl group">
            {/* Index and Header Area */}
            <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
                    {/* Index */}
                    <div className="flex-shrink-0 select-none">
                        <span className="text-6xl md:text-7xl font-black text-black/[0.03] group-hover:text-black/[0.06] transition-colors duration-500 font-mono leading-none">
                            {research.id}
                        </span>
                    </div>

                    {/* Main Info */}
                    <div className="flex-grow">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-[0.1em] rounded-full">
                                {research.type}
                            </span>
                            <span className="px-3.5 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-[0.1em] rounded-full border border-gray-100">
                                {research.status}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-[1.1] mb-8 group-hover:text-gray-900 transition-colors">
                            {research.title}
                        </h2>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-10 pt-8 border-t border-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-400">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.15em] mb-0.5">Focus Area</p>
                                    <p className="text-sm md:text-base font-bold text-gray-700">{research.focusArea}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 mt-0.5">
                                    <Tag className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.15em] mb-0.5">Keywords</p>
                                    <p className="text-sm md:text-base font-bold text-gray-700 leading-tight">{research.keywords.join(", ")}</p>
                                </div>
                            </div>
                        </div>

                        {/* Short Summary */}
                        <div className="max-w-3xl mb-10">
                            <p className="text-gray-600 font-medium text-lg md:text-xl leading-relaxed italic">
                                "{research.summary}"
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold text-sm tracking-wide hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 shadow-lg active:scale-95"
                            >
                                {isOpen ? "Hide Breakdown" : "Expand Breakdown"}
                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {research.link && (
                                <a
                                    href={research.link}
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-black/5 text-gray-500 font-bold text-sm tracking-wide hover:border-black hover:text-black transition-all duration-300"
                                >
                                    Scientific Draft <ArrowUpRight className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expandable Details Block */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-gray-100 overflow-hidden"
                    >
                        <div className="p-8 md:p-16 bg-gray-50/50">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">

                                {/* Problem */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                            <Target className="w-5 h-5 text-black" />
                                        </div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight">The Problem</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {research.problem.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-gray-600 font-medium leading-relaxed">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Approach */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                            <Search className="w-5 h-5 text-black" />
                                        </div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight">The Approach</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {research.approach.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-gray-600 font-medium leading-relaxed">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Contributions */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-black" />
                                        </div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight">Contributions</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {research.contributions.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-gray-600 font-medium leading-relaxed">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Results */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-black" />
                                        </div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight">Results</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {research.results.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-gray-600 font-medium leading-relaxed">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

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
                aria-label="Research Publications section"
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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-10 items-start mb-16 md:mb-24">
                        {/* Left: Giant heading */}
                        <div className="lg:col-span-6">
                            <p className="mt-6 text-sm md:text-base lg:text-lg font-bold tracking-[0.2em] uppercase opacity-40 research-stagger-1">
                                Scientific Inquiry & Discovery
                            </p>
                            <h1
                                className="leading-[0.9] font-black tracking-[-0.04em] text-black research-stagger-1"
                                style={{
                                    fontSize: "clamp(52px, 8.5vw, 120px)",
                                }}
                            >
                                Research Publications
                            </h1>
                        </div>

                        {/* Right: Description */}
                        <div className="lg:col-span-6 lg:pt-16">
                            <p
                                className="text-gray-600 leading-[1.4] tracking-tight research-stagger-2 font-medium"
                                style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                            >
                                Systematically documenting explorations in autonomous intelligence, distributed multi-agent systems, and human-AI orchestration frameworks.
                            </p>

                            {/* Tag line */}
                            <div className="mt-10 md:mt-12 research-stagger-3">
                                <div className="flex flex-wrap gap-x-8 gap-y-4 text-gray-400 font-black uppercase tracking-[0.25em] text-[10px] md:text-xs border-t border-gray-100 pt-8">
                                    <span>Peer Reviewed</span>
                                    <span>Technical Drafts</span>
                                    <span>Applied AI</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/5 mb-16 md:mb-24" />

                    {/* Content Area - Modular Research Cards */}
                    <div className="space-y-12 md:space-y-20 research-stagger-3">
                        {researchData.map((research) => (
                            <ResearchCard key={research.id} research={research} />
                        ))}

                        {/* Placeholder for future research items */}
                        <div className="pt-12 text-center border-t border-gray-50 research-stagger-3">
                            <p className="text-gray-300 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                                More research coming soon ⎯ 2026 Exploration cycle
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResearchPapers;
