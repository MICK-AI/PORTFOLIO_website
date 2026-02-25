import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LinkTree = ({ isOpen, onClose, buttonRef }) => {
    const popoverRef = useRef(null);
    const emailLinkRef = useRef(null);
    const [isEmailHovered, setIsEmailHovered] = useState(false);

    // Links data - customize these with your actual links
    const links = [
        {
            id: "github",
            label: "GitHub",
            url: "https://github.com/MICK-AI",
            icon: "🔗",
            description: "Code repositories"
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            url: "https://linkedin.com",
            icon: "💼",
            description: "Professional network"
        },
        {
            id: "twitter",
            label: "Twitter/X",
            url: "https://twitter.com",
            icon: "🐦",
            description: "Thoughts & updates"
        },
        {
            id: "instagram",
            label: "Instagram",
            url: "https://instagram.com",
            icon: "📷",
            description: "Visual stories"
        },
        {
            id: "email",
            label: "Email",
            url: "mailto:electronforwork@gmail.com",
            icon: "✉️",
            description: "Get in touch",
            email: "electronforwork@gmail.com"
        },
    ];

    // Calculate position relative to button
    const [position, setPosition] = useState({ top: 0, right: 0 });

    // Close on ESC key press and click outside
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        const handleClickOutside = (e) => {
            if (
                isOpen &&
                popoverRef.current &&
                buttonRef?.current &&
                !popoverRef.current.contains(e.target) &&
                !buttonRef.current.contains(e.target)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose, buttonRef]);

    useEffect(() => {
        if (isOpen && buttonRef?.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: buttonRect.bottom + 8,
                right: window.innerWidth - buttonRect.right,
            });
        }
    }, [isOpen, buttonRef]);


    const popoverVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: -10,
            filter: "blur(4px)"
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
                staggerChildren: 0.03,
                delayChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: -10,
            filter: "blur(4px)",
            transition: {
                duration: 0.15
            }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.03,
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        })
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={popoverRef}
                    variants={popoverVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                        position: "fixed",
                        top: `${position.top}px`,
                        right: `${position.right}px`,
                        zIndex: 9999,
                    }}
                    className="origin-top-right"
                >
                    <div
                        className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[360px] border border-[#e8e8ef] overflow-visible"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-[#e8e8ef] bg-white">
                            <div className="flex items-center gap-3">
                                <div className="w-[34px] h-[34px] flex-shrink-0 rounded-lg grid place-items-center font-bold tracking-[0.5px] bg-[#0b0b0e] text-white text-[12px]">
                                    MV
                                </div>
                                <h2 className="text-[18px] font-semibold text-[#0a0a0b]">Link Tree</h2>
                            </div>
                        </div>

                        {/* Links List */}
                        <div className="p-4 space-y-2">
                            {links.map((link, index) => (
                                <motion.a
                                    key={link.id}
                                    ref={link.id === "email" ? emailLinkRef : null}
                                    href={link.url}
                                    target={link.url.startsWith('http') ? "_blank" : undefined}
                                    rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                                    custom={index}
                                    variants={linkVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onMouseEnter={() => link.id === "email" && setIsEmailHovered(true)}
                                    onMouseLeave={() => link.id === "email" && setIsEmailHovered(false)}
                                    className="flex items-center gap-4 p-4 rounded-[12px] border border-[#e7e7ee] bg-white hover:bg-gray-50 hover:border-[#d0d0d8] transition-all group cursor-pointer relative overflow-visible"
                                >
                                    <span className="text-2xl">{link.icon}</span>
                                    <div className="flex-1 min-w-0 relative">
                                        <div className="font-semibold text-[#0a0a0b] text-[15px] group-hover:text-[#0b0b0e] transition-colors">
                                            {link.label}
                                        </div>
                                        {link.description && (
                                            <div className="text-[12px] text-[#666] mt-0.5">
                                                {link.description}
                                            </div>
                                        )}

                                        {/* Email Tooltip - Inside the email section */}
                                        {link.id === "email" && (
                                            <AnimatePresence>
                                                {isEmailHovered && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.5,
                                                            y: -10,
                                                            rotate: -5,
                                                            filter: "blur(8px)"
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            y: 0,
                                                            rotate: 0,
                                                            filter: "blur(0px)"
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            scale: 0.5,
                                                            y: -10,
                                                            rotate: 5,
                                                            filter: "blur(8px)"
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 500,
                                                            damping: 30,
                                                            mass: 0.5
                                                        }}
                                                        className="absolute top-full left-0 mt-2 z-50 pointer-events-none"
                                                    >
                                                        <div className="bg-gradient-to-r from-[#0b0b0e] to-[#1a1a1f] text-white px-4 py-2.5 rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-[#2a2a2f] whitespace-nowrap relative">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-lg">✉️</span>
                                                                <span className="font-semibold text-[14px] tracking-wide">
                                                                    electronforwork@gmail.com
                                                                </span>
                                                            </div>
                                                            {/* Arrow pointing up to the email link */}
                                                            <div
                                                                className="absolute left-4 top-0 -translate-y-full"
                                                                style={{
                                                                    borderBottom: "8px solid #0b0b0e",
                                                                    borderLeft: "6px solid transparent",
                                                                    borderRight: "6px solid transparent"
                                                                }}
                                                            />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </div>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#666]"
                                    >
                                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-[#e8e8ef] bg-white text-center">
                            <p className="text-[12px] text-[#666]">
                                Connect with me
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LinkTree;

