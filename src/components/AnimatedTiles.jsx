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
    { id: "cloneables", title: "Manifesto", subtitle: "CLONE THOSE AND HAVE FUN ↗", tag: "Webflow", bg: "bg-lemon", colSpan: "md:col-span-2", rowSpan: "md:row-span-2", route: "/manifesto" },
    { id: "youtube", title: "Projects", subtitle: "USE AI IN YOUR WEBDESIGN WORKFLOW↗", bg: "bg-coral", colSpan: "md:col-span-3", rowSpan: "md:row-span-2", route: "/projects" },
    { id: "vacations", title: "Research Papers ↗", tag: "#SOLOPRENEUR", bg: "bg-moss", colSpan: "md:col-span-2", route: "/research-papers" },
    { id: "designer", title: "AI Videos/Tutorials ↗", tag: "#DESIGN", bg: "bg-blush", colSpan: "md:col-span-2", route: "/ai-videos" },
    { id: "awards", title: "Tools ↗", tag: "1X HONORABLE MENTION", bg: "bg-ocean", route: "/tools" },
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
            style={{
                rotateX: srx,
                rotateY: sry,
                transformStyle: "preserve-3d",
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
                                    "relative rounded-2xl p-2 md:p-8 shadow-xl transition-all duration-500 cursor-pointer group overflow-hidden",
                                    "ring-1 ring-black/10 hover:ring-4 hover:ring-white/30",
                                    t.colSpan ?? "md:col-span-1",
                                    t.rowSpan ?? "md:row-span-1",
                                ].join(" ")}
                            >
                                <TiltWrapper>
                                    <div className="pointer-events-none select-none h-full flex flex-col justify-between">
                                        <div className="space-y-3">
                                            {t.subtitle && (
                                                <motion.p
                                                    className="text-xs md:text-sm tracking-widest uppercase opacity-80"
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 200 }}
                                                >
                                                    {t.subtitle}
                                                </motion.p>
                                            )}
                                            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight drop-shadow-sm">
                                                {t.title}
                                            </h3>
                                        </div>
                                        {t.tag && (
                                            <span className="inline-flex items-center rounded-full bg-black/20 backdrop-blur-sm text-xs md:text-sm font-medium px-3 py-1">
                                                {t.tag}
                                            </span>
                                        )}
                                    </div>
                                </TiltWrapper>

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
