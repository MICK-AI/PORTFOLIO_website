import React, { useEffect, useRef } from "react";


const About = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("about-visible");
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className="w-full bg-[#0a0a0a] text-white about-animate"
            aria-label="About section"
        >
            <style>{`
                /* reveal animation (used with Tailwind utilities) */
                .about-animate { opacity: 0; transform: translateY(26px); transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.8,.2,1); }
                .about-visible { opacity: 1; transform: translateY(0); }

                /* small stagger helpers */
                .about-stagger-1 { transition-delay: 80ms; }
                .about-stagger-2 { transition-delay: 160ms; }
                .about-stagger-3 { transition-delay: 260ms; }
            `}</style>

            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28">
                {/* Top grid: Left giant "About" and right content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-10 items-start">
                    {/* Left: Giant heading */}
                    <div className="lg:col-span-5">
                        <h1
                            className="leading-[0.92] font-extrabold tracking-[-0.02em] text-white about-stagger-1"
                            style={{
                                fontSize:
                                    "clamp(48px, 9vw, 140px)", // fluid like the reference
                            }}
                        >
                            About
                        </h1>
                    </div>

                    {/* Right: Bio text */}
                    <div className="lg:col-span-7">
                        <p
                            className="text-zinc-200 leading-[1.35] tracking-[-0.005em] about-stagger-2"
                            style={{ fontSize: "clamp(18px, 2.1vw, 28px)" }}
                        >
                            <span className="text-white font-semibold">Thamesh (A.K.A Mick)</span>{" "}
                            <span className="text-zinc-400 text-sm align-top ml-1">(HE/HIM)</span>{" "}
                            is an AI and ML enthusiast exploring the intersection of technology, creativity, and human potential. He builds intelligent products and systems that merge innovation with real-world purpose. Using modern frameworks, automation, and emerging tech, Mick turns abstract ideas into scalable, data-driven solutions that live beautifully on the web.

                        </p>

                        {/* Role band */}
                        <div className="mt-10 md:mt-12 about-stagger-3">
                            <p className="text-zinc-300 uppercase tracking-widest text-[11px] md:text-xs">
                                BUILDING INTELLIGENT PRODUCTS AT THE CROSSPATHS OF AI ⎯ ETHICS ⎯ FUTURE TECH.
                            </p>

                            {/* Role card */}
                            <div className="mt-5 flex items-center gap-4">
                                {/* Logo placeholder square */}
                                <div className="h-14 w-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                    <span className="text-xs text-zinc-400">AI/ML</span>
                                </div>

                                <div>
                                    <div className="text-zinc-100 text-base md:text-lg">
                                        AI /ML ENGINEER
                                    </div>
                                    <div className="text-zinc-400 text-sm">Early Career</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optional divider spacing to mimic generous whitespace */}
                <div className="h-10 md:h-16" />
                <div></div>
            </div>
        </section>
    );
};

export default About;
