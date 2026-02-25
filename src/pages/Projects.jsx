import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

const Projects = () => {
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("projects-visible");
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
                className="relative min-h-screen overflow-hidden font-sans bg-white projects-animate"
                aria-label="Projects section"
            >
                <style>{`
                    .projects-animate { 
                        opacity: 0; 
                        transform: translateY(26px); 
                        transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.8,.2,1); 
                    }
                    .projects-visible { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                    .projects-stagger-1 { transition-delay: 80ms; }
                    .projects-stagger-2 { transition-delay: 160ms; }
                    .projects-stagger-3 { transition-delay: 260ms; }
                `}</style>

                {/* Top Navigation */}
                <TopBar />

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28">
                    {/* Header Section */}
                    <div className="flex flex-col gap-6 md:gap-8 mb-16 md:mb-24 max-w-4xl">
                        <h1
                            className="leading-none font-extrabold tracking-tighter text-black projects-stagger-1"
                            style={{
                                fontSize: "clamp(56px, 10vw, 120px)",
                            }}
                        >
                            Projects
                        </h1>
                        <div className="space-y-6">
                            <p
                                className="text-gray-600 font-medium leading-[1.4] projects-stagger-2 max-w-2xl"
                                style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
                            >
                                A showcase of my work, experiments, and creative projects exploring the intersection of AI, design, and technology.
                            </p>
                            <div className="projects-stagger-3">
                                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">
                                    PORTFOLIO ⎯ CASE STUDIES ⎯ EXPERIMENTS
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/10 mb-16 md:mb-20" />

                    {/* Content Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 projects-stagger-3">
                        {[
                            {
                                title: "EDA",
                                description: "Exploratory Data Analysis projects and deep dives into raw datasets, uncovering hidden patterns and insights.",
                                icon: "📊",
                                gradient: "from-blue-50 to-indigo-50",
                                iconBg: "bg-blue-100 text-blue-600",
                                borderHover: "hover:border-blue-300",
                                shadowHover: "hover:shadow-blue-200/50",
                                link: "/projects/eda"
                            },
                            {
                                title: "Feature Engineering",
                                description: "Crafting robust features and transforming data to maximize the performance of machine learning models.",
                                icon: "⚙️",
                                gradient: "from-emerald-50 to-teal-50",
                                iconBg: "bg-emerald-100 text-emerald-600",
                                borderHover: "hover:border-emerald-300",
                                shadowHover: "hover:shadow-emerald-200/50"
                            },
                            {
                                title: "Gen AI",
                                description: "Cutting-edge generative artificial intelligence projects, exploring large language models and diffusion models.",
                                icon: "🧠",
                                gradient: "from-purple-50 to-fuchsia-50",
                                iconBg: "bg-purple-100 text-purple-600",
                                borderHover: "hover:border-purple-300",
                                shadowHover: "hover:shadow-purple-200/50"
                            },
                            {
                                title: "Vibe Coded",
                                description: "Projects built on pure intuition and flow state. Highly creative and experimental coding sessions.",
                                icon: "✨",
                                gradient: "from-orange-50 to-amber-50",
                                iconBg: "bg-orange-100 text-orange-600",
                                borderHover: "hover:border-orange-300",
                                shadowHover: "hover:shadow-orange-200/50"
                            }
                        ].map((project, idx) => (
                            <div
                                key={idx}
                                onClick={() => project.link && navigate(project.link)}
                                className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} border border-gray-100 ${project.borderHover} hover:shadow-2xl ${project.shadowHover} transition-all duration-500 rounded-3xl p-8 md:p-10 flex flex-col h-full group cursor-pointer`}
                            >
                                {/* Decorative Blur */}
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/40 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 ease-in-out pointer-events-none" />

                                <div className="space-y-6 flex-grow relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-16 h-16 rounded-2xl ${project.iconBg} shadow-inner flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500`}>
                                            <span className="text-3xl">{project.icon}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-black/5 bg-white flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-sm">
                                            <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-base md:text-lg font-medium">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-black/5 flex items-center text-sm font-bold text-gray-800 uppercase tracking-widest group-hover:text-black transition-colors relative z-10">
                                    View Project <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Projects;
