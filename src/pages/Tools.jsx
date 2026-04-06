import React, { useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";

const workflowsData = [
  {
    id: "research-paper",
    title: "Research Paper Workflow",
    description: "From idea generation to a structured research draft.",
    icon: "📄",
    tools: ["ChatGPT", "Notion AI", "Semantic Scholar"],
    process: {
      input: "Idea / Topic",
      output: "Structured research draft",
      steps: [
        { tool: "ChatGPT", usage: "Ideation, structuring, and early hypothesis testing.", outcome: "Clear research direction" },
        { tool: "Notion AI", usage: "Drafting, organizing content, and synthesizing notes.", outcome: "Cohesive paper sections" },
        { tool: "Semantic Scholar", usage: "Finding relevant research papers and citation graphs.", outcome: "Solid literature foundation" }
      ],
      impact: "Reduces drafting time by 40% and ensures comprehensive literature coverage."
    }
  },
  {
    id: "development",
    title: "Development Workflow",
    description: "Writing clean, optimized, and bug-free code rapidly.",
    icon: "💻",
    tools: ["Cursor", "GitHub Copilot", "VS Code"],
    process: {
      input: "Feature / Bug",
      output: "Clean, optimized code",
      steps: [
        { tool: "Cursor", usage: "AI-first code generation, rapid refactoring, and logic breakdown.", outcome: "Rapid feature implementation" },
        { tool: "GitHub Copilot", usage: "Inline code suggestions, boilerplate writing, and autocompletion.", outcome: "Fewer syntax errors, faster typing" },
        { tool: "VS Code", usage: "Main editing, debugging, and environment orchestration.", outcome: "Stable development setup" }
      ],
      impact: "2x faster feature shipping with significantly fewer bugs."
    }
  },
  {
    id: "ai-ml",
    title: "AI/ML Experimentation",
    description: "Building, training, and validating models efficiently.",
    icon: "🔬",
    tools: ["Python", "PyTorch", "Kaggle"],
    process: {
      input: "Dataset / Problem",
      output: "Trained model / insights",
      steps: [
        { tool: "Python", usage: "Data processing, pipeline scripting, and metric tracking.", outcome: "Robust data pipelines" },
        { tool: "PyTorch", usage: "Model architecture design, training loops, and validation.", outcome: "Optimized model weights" },
        { tool: "Kaggle", usage: "Sourcing datasets, initial EDA, and baseline comparisons.", outcome: "Cleaned, ready-to-use data" }
      ],
      impact: "Streamlines the iteration cycle from raw data to working model."
    }
  },
  {
    id: "learning",
    title: "Learning & Knowledge",
    description: "Deconstructing new concepts into structured understanding.",
    icon: "🧠",
    tools: ["YouTube / Docs", "ChatGPT", "Notion"],
    process: {
      input: "New concept",
      output: "Structured understanding",
      steps: [
        { tool: "YouTube / Docs", usage: "Initial exposure, official documentation, and varied explanations.", outcome: "Broad conceptual grasp" },
        { tool: "ChatGPT", usage: "Simplifying complex ideas, answering specific queries, and Q&A.", outcome: "Deepened comprehension" },
        { tool: "Notion", usage: "Documenting synthesized notes and organizing references.", outcome: "Searchable knowledge base" }
      ],
      impact: "Accelerates learning curve and ensures long-term retention."
    }
  },
  {
    id: "content",
    title: "Content & Writing",
    description: "Transforming raw thoughts into refined copy and posts.",
    icon: "✍️",
    tools: ["ChatGPT", "Notion AI"],
    process: {
      input: "Idea / Thought",
      output: "Refined content / posts",
      steps: [
        { tool: "ChatGPT", usage: "Brainstorming angles, creating outlines, and writing first drafts.", outcome: "Multiple content options" },
        { tool: "Notion AI", usage: "Polishing tone, fixing grammar, and optimizing flow.", outcome: "Publish-ready writing" }
      ],
      impact: "Eliminates writer's block and ensures consistent quality."
    }
  }
];

const Tools = () => {
    const ref = useRef(null);
    const [expandedId, setExpandedId] = useState(null);

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

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (expandedId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [expandedId]);

    const activeWorkflow = workflowsData.find(w => w.id === expandedId);

    return (
        <>
            <section
                ref={ref}
                className="relative min-h-screen overflow-hidden font-sans bg-white tools-animate"
                aria-label="Workflows section"
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
                    
                    /* Custom scrollbar for modal */
                    .modal-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .modal-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .modal-scrollbar::-webkit-scrollbar-thumb {
                        background-color: rgba(0,0,0,0.1);
                        border-radius: 10px;
                    }

                    @keyframes modal-pop {
                        0% { opacity: 0; transform: scale(0.95); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                    .animate-modal-pop {
                        animation: modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>

                {/* Top Navigation */}
                <TopBar />

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28">
                    {/* Header Section */}
                    <div className="flex flex-col gap-6 md:gap-8 mb-16 md:mb-24 max-w-4xl">
                        <h1
                            className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black tools-stagger-1"
                            style={{
                                fontSize: "clamp(48px, 9vw, 140px)",
                            }}
                        >
                            AI Workflows
                        </h1>
                        <div className="space-y-6">
                            <p
                                className="text-gray-600 font-medium leading-[1.35] tools-stagger-2 max-w-2xl"
                                style={{ fontSize: "clamp(18px, 2.1vw, 28px)" }}
                            >
                                A system-driven AI engineer showcasing real workflows, not just tools. Discover how I integrate AI into my daily execution, research, and development.
                            </p>
                            <div className="tools-stagger-3">
                                <p className="text-gray-400 uppercase tracking-widest text-[11px] md:text-xs font-semibold">
                                    PRODUCTIVITY ⎯ AUTOMATION ⎯ EXECUTION
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/10 mb-16 md:mb-20" />

                    {/* Content Area - Workflow Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 tools-stagger-3">
                        {workflowsData.map((workflow) => (
                            <div
                                key={workflow.id}
                                onClick={() => setExpandedId(workflow.id)}
                                className="bg-gray-50 border border-gray-200 rounded-[24px] p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/10 transition-all duration-300 flex flex-col h-full cursor-pointer group"
                            >
                                <div className="space-y-6 flex-grow">
                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                                            <span className="text-xl">{workflow.icon}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-tight">
                                            {workflow.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-500 leading-relaxed font-medium text-[15px]">
                                        {workflow.description}
                                    </p>

                                    {/* Tools List */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {workflow.tools.map((tool, i) => (
                                            <span
                                                key={i}
                                                title={`Used in this workflow`}
                                                className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-800 shadow-sm"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Interaction Indicator */}
                                <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between text-sm font-semibold text-gray-400 group-hover:text-black transition-colors">
                                    <span>Click to explore workflow</span>
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Divider below grid to maintain spacing consistency */}
                    <div className="relative h-px w-full bg-black/10 mt-16 md:mt-20 tools-stagger-3" />
                </div>
            </section>

            {/* Workflow Expand Modal */}
            {activeWorkflow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/20 backdrop-blur-sm transition-opacity duration-300">
                    {/* Backdrop click listener */}
                    <div 
                        className="absolute inset-0 z-0 bg-transparent cursor-pointer" 
                        onClick={() => setExpandedId(null)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative z-10 w-full max-w-3xl bg-white border border-gray-200 shadow-[0_20px_80px_rgb(0,0,0,0.12)] rounded-[32px] overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-modal-pop">
                        {/* Modal Header */}
                        <div className="px-6 sm:px-10 py-6 sm:py-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">{activeWorkflow.icon}</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-black tracking-tight">{activeWorkflow.title}</h2>
                                    <p className="text-gray-500 text-sm font-medium mt-1">{activeWorkflow.description}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setExpandedId(null)}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500 hover:text-black flex-shrink-0"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-6 sm:p-10 overflow-y-auto modal-scrollbar bg-white">
                            
                            {/* 1. Workflow Visualization (Input -> Process -> Output) */}
                            <div className="mb-12">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Workflow Visualization</h3>
                                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-gray-50 p-6 rounded-[24px] border border-gray-100">
                                    <div className="flex-1 text-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Input</span>
                                        <span className="font-bold text-black">{activeWorkflow.process.input}</span>
                                    </div>
                                    <div className="hidden md:flex text-gray-300 font-bold text-xl">→</div>
                                    <div className="flex md:hidden justify-center text-gray-300 font-bold text-xl rotate-90 my-[-10px]">→</div>
                                    <div className="flex-[1.5] flex flex-wrap justify-center gap-2 p-4">
                                        {activeWorkflow.tools.map((t, idx) => (
                                            <span key={idx} className="text-xs font-bold text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="hidden md:flex text-gray-300 font-bold text-xl">→</div>
                                    <div className="flex md:hidden justify-center text-gray-300 font-bold text-xl rotate-90 my-[-10px]">→</div>
                                    <div className="flex-1 text-center bg-black p-4 rounded-xl shadow-md relative text-white">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Output</span>
                                        <span className="font-bold">{activeWorkflow.process.output}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Step-by-step Breakdown */}
                            <div className="mb-12">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Execution Steps</h3>
                                <div className="space-y-4 relative">
                                    <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gray-100 hidden sm:block" />
                                    {activeWorkflow.process.steps.map((step, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 relative z-10">
                                            {/* Step Number */}
                                            <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm mt-1 sm:mt-0">
                                                <span className="text-black font-extrabold text-lg">{idx + 1}</span>
                                            </div>
                                            {/* Step Content */}
                                            <div className="bg-white border border-gray-200 p-5 sm:p-6 rounded-[20px] flex-1 shadow-sm hover:shadow-md hover:border-black/10 transition-all duration-300 w-full">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-3">
                                                    <h4 className="font-bold text-black text-lg inline-flex items-center gap-2">
                                                        {step.tool}
                                                    </h4>
                                                    <span className="inline-flex text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full whitespace-nowrap self-start">
                                                        {step.outcome}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 font-medium leading-relaxed">
                                                    {step.usage}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Outcome / Impact */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Overall Impact</h3>
                                <div className="bg-black text-white p-6 sm:p-8 rounded-[24px] flex items-start sm:items-center gap-5 sm:gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-2">Net Benefit</h4>
                                        <p className="font-medium text-lg leading-snug">{activeWorkflow.process.impact}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Tools;
