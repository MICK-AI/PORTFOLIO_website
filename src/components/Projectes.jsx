import React, { useEffect, useRef } from "react";

const tagList = [
    "#TECH",
    "#CONSUMER",
    "#FINTECH",
    "#CRYPTO",
    "#NOCODE",
    "#SAAS",
    "#WEBAPP",
];

const Projects = () => {
    const sectionRef = useRef(null);
    const colsRef = useRef([]);
    const tagsRef = useRef([]);
    const ruleRef = useRef(null);
    const arrowRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const animateIn = () => {
            const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

            arrowRef.current?.animate(
                [
                    { opacity: 0, transform: "translateY(-8px) rotate(-8deg)" },
                    { opacity: 1, transform: "translateY(0) rotate(0)" },
                ],
                { duration: 800, easing: ease, fill: "forwards" }
            );

            titleRef.current?.animate(
                [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
                { duration: 750, delay: 80, easing: ease, fill: "forwards" }
            );

            if (ruleRef.current) {
                const el = ruleRef.current;
                el.style.transformOrigin = "left center";
                el.animate(
                    [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
                    { duration: 800, delay: 120, easing: ease, fill: "forwards" }
                );
            }

            colsRef.current.forEach((el, i) => {
                el?.animate(
                    [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }],
                    { duration: 650, delay: 180 + i * 120, easing: ease, fill: "forwards" }
                );
            });

            tagsRef.current.forEach((el, i) => {
                el?.animate(
                    [
                        { opacity: 0, transform: "scale(0.85) translateY(8px)" },
                        { opacity: 1, transform: "scale(1) translateY(0)" },
                    ],
                    {
                        duration: 520,
                        delay: 520 + i * 80,
                        easing: "cubic-bezier(.2,.8,.2,1)",
                        fill: "forwards",
                    }
                );
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateIn();
                    }
                });
            },
            { threshold: 0.3 } // triggers when 30% of section visible
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full bg-white text-black overflow-hidden">
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 -z-10"></div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28">
                {/* Title Row */}
                <div className="relative z-10 flex items-end gap-4">
                    <div className="flex items-center gap-3">
                        <span
                            ref={arrowRef}
                            aria-hidden
                            className="inline-block text-[40px] md:text-[48px] lg:text-[54px] leading-none select-none opacity-0"
                        >
                            ↳
                        </span>
                        <h2
                            ref={titleRef}
                            className="text-[44px] md:text-[72px] lg:text-[96px] font-semibold tracking-[-0.02em] leading-[0.95] opacity-0"
                        >
                            Projects
                        </h2>
                    </div>
                </div>

                {/* Divider */}
                <div
                    ref={ruleRef}
                    className="relative z-10 mt-4 md:mt-5 h-px w-full bg-black/80"
                    style={{ transform: "scaleX(0)" }}
                />

                {/* Spacer */}
                <div aria-hidden className="md:hidden h-6" />
                <div aria-hidden className="hidden md:block lg:hidden h-8" />
                <div aria-hidden className="hidden lg:block h-10" />

                {/* Content Grid */}
                <div className="relative z-10 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* TIMEFRAME */}
                    <div ref={(el) => (colsRef.current[0] = el)} className="opacity-0">
                        <div className="text-[12px] uppercase tracking-widest text-black/60">Timeframe</div>
                        <div className="mt-4 text-[18px] md:text-[20px]">YEAR 2022-23</div>
                    </div>

                    {/* DISCIPLINE */}
                    <div ref={(el) => (colsRef.current[1] = el)} className="opacity-0">
                        <div className="text-[12px] uppercase tracking-widest text-black/60">Discipline</div>
                        <ul className="mt-4 space-y-2 text-[16px] md:text-[18px]">
                            <li>No code development</li>
                            <li>UI design</li>
                            <li>UX research</li>
                            <li>Art Direction</li>
                        </ul>
                    </div>

                    {/* TOOLS */}
                    <div ref={(el) => (colsRef.current[2] = el)} className="opacity-0">
                        <div className="text-[12px] uppercase tracking-widest text-black/60">Tools</div>
                        <ul className="mt-4 space-y-2 text-[16px] md:text-[18px]">
                            <li>Webflow</li>
                            <li>After Effect</li>
                            <li>Webflow</li>
                            <li>Wized</li>
                        </ul>
                    </div>

                    {/* INDUSTRY + TAGS */}
                    <div ref={(el) => (colsRef.current[3] = el)} className="opacity-0">
                        <div className="text-[12px] uppercase tracking-widest text-black/60">Industry</div>
                        <div className="mt-4 flex flex-wrap gap-3 ">
                            {tagList.map((tag, i) => (
                                <span
                                    key={tag}
                                    ref={(el) => (tagsRef.current[i] = el)}
                                    className="inline-flex shrink-0 items-center rounded-md border border-black/80 px-3 py-1.5 text-[13px] md:text-[14px] tracking-wide bg-white transition-transform opacity-0 hover:bg-black hover:text-white "
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="h-8 md:h-12" />

                <div className="relative z-10 mt-10 space-y-8 md:space-y-12">
                    {[
                        { name: "Barrett Plastic Surgery", desc: "Branding, Website" },
                        { name: "MyStudio", desc: "Branding, Website, Art Direction" },
                        { name: "MyStudio", desc: "Branding, Website, Art Direction" },
                        { name: "MyStudio", desc: "Branding, Website, Art Direction" },
                        { name: "MyStudio", desc: "Branding, Website, Art Direction" },
                    ].map((proj, i) => (
                        <div
                            key={i}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-black/10 pt-6  transition-transform "
                        >
                            <div className="flex items-center gap-3  ">
                                <span className="text-[18px] md:text-[20px]">🗎</span>
                                <h3 className="text-[18px] md:text-[22px] font-medium ">
                                    {proj.name} <span className="mx-2 ">—</span> {proj.desc}
                                </h3>
                            </div>
                            <button className="mt-3 md:mt-0 border border-black px-4 py-2 rounded-md text-[13px] md:text-[14px] hover:bg-black hover:text-white transition">
                                🔒 Contact for details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
