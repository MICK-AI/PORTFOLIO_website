import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";

// 🎨 Custom colors for each tile
const customColorMap = {
    'bg-lemon': { backgroundColor: '#DFFF00', color: '#000000' },
    'bg-coral': { backgroundColor: '#FF7F50', color: '#FFFFFF' },
    'bg-moss': { backgroundColor: '#6B8E23', color: '#FFFFFF' },
    'bg-blush': { backgroundColor: '#FFC0CB', color: '#000000' },
    'bg-ocean': { backgroundColor: '#00BFFF', color: '#FFFFFF' },
};

// 🧩 Data for tiles
const tiles = [
    { id: "cloneables", title: "Agents", subtitle: "intelligence in motion ↗", tag: "AUTONOMOUS SYSTEMS", bg: "bg-lemon", colSpan: "md:col-span-2", rowSpan: "md:row-span-2", route: "/agents" },
    { id: "youtube", title: "Projects", subtitle: "AI, applied with intent", tag: "#PORTFOLIO", bg: "bg-coral", colSpan: "md:col-span-3", rowSpan: "md:row-span-2", route: "/projects" },
    { id: "vacations", title: "Research Papers", subtitle: "Where intelligence begins.", tag: "#SOLOPRENEUR", bg: "bg-moss", colSpan: "md:col-span-2", route: "/research-papers" },
    { id: "designer", title: "Tutorials", subtitle: "Explaining complex ideas in simple steps", tag: "#DESIGN", bg: "bg-blush", colSpan: "md:col-span-2", route: "/ai-videos" },
    { id: "awards", title: "Tools", tag: "1X HONORABLE MENTION", bg: "bg-ocean", route: "/tools" },
];

// 🌀 Parent animation container
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

// 🎬 Tile entry animation with subtle rotation
const item = {
    hidden: {
        opacity: 0,
        y: 30,
        rotateZ: Math.random() * 10 - 5,
        scale: 0.95,
    },
    show: {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 250, damping: 25 },
    },
};

// 💫 Tilt + Hover effects
function TiltWrapper({ children }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rx = useTransform(y, [-100, 100], [6, -6]);
    const ry = useTransform(x, [-100, 100], [-6, 6]);
    const srx = useSpring(rx, { stiffness: 160, damping: 15 });
    const sry = useSpring(ry, { stiffness: 160, damping: 15 });

    const onPointerMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
        const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
        x.set(clientX - rect.left - rect.width / 2);
        y.set(clientY - rect.top - rect.height / 2);
    };

    const onPointerLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            className="h-full"
            style={{
                rotateX: srx,
                rotateY: sry,
                transformStyle: "preserve-3d",
                height: "100%",
            }}
            whileHover={{
                scale: 1.06,
                y: -6,
                boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
            {children}
        </motion.div>
    );
}

export default function AnimatedTilesSection() {
    const controls = useAnimation();
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    return (
        <section
            ref={sectionRef}
            className="bg-white min-h-screen pt-24 pb-24 font-inter relative overflow-hidden"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                .tile-flip-scene { perspective: 1200px; height: 100%; }
                .tile-flip-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; }
                .tile-flip-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                .tile-flip-back { transform: rotateY(180deg); }
            `}} />

            {/* ✨ Floating gradient background */}
            <motion.div
                className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-r from-[#ff007f] to-[#00bfff] rounded-full blur-3xl opacity-20"
                animate={{
                    x: [0, 100, -100, 0],
                    y: [0, 50, -50, 0],
                }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            />

            <motion.section
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mx-auto max-w-7xl px-4 md:px-6 lg:px-6 relative z-10"
            >
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-5 auto-rows-[320px] md:auto-rows-[280px] gap-5"
                >
                    {tiles.map((t) => {
                        const style = customColorMap[t.bg] || { backgroundColor: '#FFFFFF', color: '#000000' };
                        const isSmallerDesktopTitle =
                            t.id === "vacations" || t.id === "designer" || t.id === "awards";

                        return (
                            <motion.article
                                key={t.id}
                                variants={item}
                                layout
                                style={style}
                                onClick={() => {
                                    if (t.route) {
                                        navigate(t.route);
                                    }
                                }}
                                className={[
                                    "relative rounded-2xl shadow-xl transition-all duration-500 cursor-pointer group overflow-hidden",
                                    "ring-1 ring-black/10 hover:ring-4 hover:ring-white/30",
                                    t.id === "vacations" ? "p-2 md:p-4" : "p-2 md:p-8",
                                    t.colSpan ?? "md:col-span-1",
                                    t.rowSpan ?? "md:row-span-1",
                                ].join(" ")}
                            >
                                <div className="tile-flip-scene">
                                    <motion.div
                                        className="tile-flip-inner"
                                        whileHover={{ rotateY: 180 }}
                                        transition={{ type: "spring", stiffness: 120, damping: 14 }}
                                    >
                                        {/* Front face (existing card content) */}
                                        <div className="tile-flip-face">
                                            <TiltWrapper>
                                                <div className={`pointer-events-none select-none h-full flex flex-col justify-center items-center text-center ${t.id === 'vacations' ? 'gap-2 md:gap-3' : 'gap-6 md:gap-8'}`}>
                                                    {t.subtitle && (
                                                        <motion.p
                                                            className={[
                                                                t.id === "vacations" ? "mt-8" : "",
                                                                "font-comic font-bold text-base md:text-base lg:text-lg tracking-widest uppercase opacity-80 text-center",
                                                            ].join(" ")}
                                                            whileHover={{ x: 5 }}
                                                            transition={{ type: "spring", stiffness: 200 }}
                                                        >
                                                            {t.subtitle}
                                                        </motion.p>
                                                    )}
                                                    <h3
                                                        className={[
                                                            "font-comic font-black tracking-tighter leading-tight drop-shadow-sm text-center",
                                                            isSmallerDesktopTitle
                                                                ? "text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
                                                                : "text-6xl md:text-6xl lg:text-7xl xl:text-8xl",
                                                        ].join(" ")}
                                                    >
                                                        {t.title}
                                                    </h3>
                                                    {t.tag && (
                                                        <span className="font-comic font-bold inline-flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-base md:text-base px-4 py-2 min-h-[2.5rem] leading-none">
                                                            {t.tag}
                                                        </span>
                                                    )}
                                                </div>
                                            </TiltWrapper>
                                        </div>

                                        {/* Back face */}
                                        <div className="tile-flip-face tile-flip-back">
                                            <div className="h-full w-full flex flex-col items-center justify-center text-center px-6">
                                                <div className="font-comic font-bold text-xs md:text-sm tracking-widest uppercase opacity-80">
                                                    Open
                                                </div>
                                                <div
                                                    className={[
                                                        "font-comic mt-4 font-black tracking-tighter drop-shadow-sm",
                                                        isSmallerDesktopTitle ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl",
                                                    ].join(" ")}
                                                >
                                                    {t.title}
                                                </div>
                                                {t.route && (
                                                    <div className="font-comic font-bold mt-6 inline-flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-base px-5 py-2.5 min-h-[2.75rem] leading-none">
                                                        View ↗
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* 🌟 Shimmer effect */}
                                <motion.span
                                    className="absolute inset-0 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    whileHover={{
                                        opacity: 0.25,
                                        background:
                                            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                                        backgroundSize: "200% 200%",
                                    }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    animate={{
                                        backgroundPosition: ["200% 0%", "-200% 0%"],
                                    }}
                                />

                                {/* ✨ Glow pulse on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl border border-white/30 opacity-0 group-hover:opacity-100"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.article>
                        );
                    })}
                </motion.div>
            </motion.section>
        </section>
    );
}
