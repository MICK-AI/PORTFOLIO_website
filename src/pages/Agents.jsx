import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const bookModules = import.meta.glob("../../books/*.pdf", {
    eager: true,
    import: "default",
});

const booksFromFolder = Object.entries(bookModules)
    .map(([path, fileUrl]) => {
        const fileName = path.split("/").pop() || "Untitled";
        const cleanName = fileName
            .replace(/\.pdf$/i, "")
            .replace(/[~_]+/g, " ")
            .replace(/\s{2,}/g, " ")
            .trim();
        const title = cleanName
            .replace(/^\d+\.\-?/g, "")
            .replace(/\b(author)\b/gi, "")
            .replace(/[-]+/g, " ")
            .replace(/\s{2,}/g, " ")
            .trim();

        const [mainTitle, ...rest] = title.split(/\sby\s|~/i);
        const author = rest.join(" ").trim();

        return {
            id: cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            title: mainTitle?.trim() || cleanName,
            author: author || "Classic Literature",
            quote: "Reading expands perspective and sharpens judgment.",
            fileUrl,
        };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

const Agents = () => {
    const ref = useRef(null);
    const [selectedBookId, setSelectedBookId] = useState(booksFromFolder[0]?.id || "");
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("agents-visible");
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const books = useMemo(
        () =>
            booksFromFolder.map((book, index) => ({
                ...book,
                tone:
                    index % 3 === 0
                        ? "rgba(15, 23, 42, 0.92)"
                        : index % 3 === 1
                            ? "rgba(30, 41, 59, 0.9)"
                            : "rgba(51, 65, 85, 0.88)",
            })),
        []
    );

    const selectedBook = books.find((book) => book.id === selectedBookId) || books[0];

    return (
        <>
            <section
                ref={ref}
                className="relative min-h-screen overflow-hidden font-sans bg-white agents-animate"
                aria-label="Reading Stack section"
            >
                <style>{`
                    .agents-animate { 
                        opacity: 0; 
                        transform: translateY(26px); 
                        transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.8,.2,1); 
                    }
                    .agents-visible { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                    .agents-stagger-1 { transition-delay: 80ms; }
                    .agents-stagger-2 { transition-delay: 160ms; }
                    .agents-stagger-3 { transition-delay: 260ms; }
                    .reading-stack-wrap {
                        perspective: 1200px;
                    }
                    .reading-stack {
                        display: flex;
                        align-items: flex-end;
                        gap: 0.75rem;
                        overflow-x: auto;
                        padding: 0.5rem 0.25rem 0.25rem;
                    }
                    .stack-book {
                        min-width: 176px;
                        width: 176px;
                        height: 260px;
                        border-radius: 14px;
                        border: 1px solid rgba(255,255,255,0.28);
                        box-shadow: 0 14px 26px rgba(15, 23, 42, 0.14);
                        transform-origin: center bottom;
                        transition: transform 280ms ease, box-shadow 280ms ease;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        color: #f8fafc;
                    }
                    .stack-book:hover {
                        transform: translateY(-6px) rotateX(3deg) rotateY(-2deg);
                        box-shadow: 0 22px 36px rgba(15, 23, 42, 0.2);
                    }
                    .stack-book.active-book {
                        outline: 2px solid rgba(255,255,255,0.5);
                        transform: translateY(-4px);
                    }
                    .flipbook-frame {
                        border-radius: 16px;
                        border: 1px solid rgba(15, 23, 42, 0.1);
                        background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                        box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
                    }
                    .flip-page {
                        background: #ffffff;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    @media (min-width: 768px) {
                        .reading-stack {
                            overflow: visible;
                            gap: 0;
                        }
                        .stack-book + .stack-book {
                            margin-left: -30px;
                        }
                        .stack-book:nth-child(2) {
                            transform: translateY(6px);
                        }
                        .stack-book:nth-child(3) {
                            transform: translateY(12px);
                        }
                    }
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
                                className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black agents-stagger-1"
                                style={{
                                    fontSize: "clamp(48px, 9vw, 140px)",
                                }}
                            >
                                Reading Stack
                            </h1>
                        </div>

                        {/* Right: Description */}
                        <div className="lg:col-span-7">
                            <p
                                className="text-gray-600 leading-[1.35] tracking-[-0.005em] agents-stagger-2"
                                style={{ fontSize: "clamp(18px, 2.1vw, 28px)" }}
                            >
                                Curated books that sharpen how I build, think, and execute. Practical insight over noise.
                            </p>

                            {/* Tag line */}
                            <div className="mt-10 md:mt-12 agents-stagger-3">
                                <p className="text-gray-400 uppercase tracking-widest text-[11px] md:text-xs">
                                    READING ⎯ INSIGHT ⎯ EXECUTION
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/10 mb-16 md:mb-20" />

                    {/* Content Area */}
                    <div className="space-y-8 agents-stagger-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 font-comic md:font-sans">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center">
                                        <span className="text-2xl">📚</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-black">
                                            Reading Stack
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Books that shape strategy and craft
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-500 leading-relaxed max-w-2xl">
                                    A concise shelf of high-signal books on product thinking, systems, and execution.
                                    Each title contributes practical frameworks I apply directly in projects and research.
                                </p>
                                <div className="reading-stack-wrap pt-3">
                                    <div className="reading-stack" aria-label="Book stack">
                                        {books.map((book) => (
                                            <button
                                                key={book.title}
                                                type="button"
                                                onClick={() => setSelectedBookId(book.id)}
                                                className={`stack-book p-4 md:p-5 text-left ${selectedBook?.id === book.id ? "active-book" : ""}`}
                                                style={{ backgroundColor: book.tone }}
                                            >
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                                                        {book.author}
                                                    </p>
                                                    <h4 className="mt-2 text-base md:text-lg font-semibold leading-snug text-white">
                                                        {book.title}
                                                    </h4>
                                                </div>
                                                <p className="text-xs md:text-sm leading-relaxed text-white/80">
                                                    "{book.quote}"
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {selectedBook && (
                                    <div className="flipbook-frame mt-6 p-4 md:p-6">
                                        <div className="mb-4 flex items-center justify-between gap-4">
                                            <div>
                                                <h4 className="text-base md:text-lg font-semibold text-slate-900">
                                                    {selectedBook.title}
                                                </h4>
                                                <p className="text-xs md:text-sm text-slate-500">{selectedBook.author}</p>
                                            </div>
                                            <p className="text-[11px] md:text-xs uppercase tracking-widest text-slate-400">
                                                Tap / Click pages to flip
                                            </p>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <Document
                                                file={selectedBook.fileUrl}
                                                onLoadSuccess={({ numPages }) => setPageCount(numPages)}
                                                loading={<p className="text-sm text-slate-500">Loading book...</p>}
                                            >
                                                {pageCount > 0 && (
                                                    <HTMLFlipBook
                                                        width={270}
                                                        height={390}
                                                        minWidth={220}
                                                        maxWidth={360}
                                                        minHeight={300}
                                                        maxHeight={500}
                                                        maxShadowOpacity={0.22}
                                                        showCover
                                                        drawShadow
                                                        size="stretch"
                                                        mobileScrollSupport
                                                        className="mx-auto"
                                                    >
                                                        {Array.from({ length: pageCount }, (_, idx) => idx + 1).map((pageNo) => (
                                                            <div key={`${selectedBook.id}-p-${pageNo}`} className="flip-page">
                                                                <Page
                                                                    pageNumber={pageNo}
                                                                    width={340}
                                                                    renderAnnotationLayer={false}
                                                                    renderTextLayer={false}
                                                                />
                                                            </div>
                                                        ))}
                                                    </HTMLFlipBook>
                                                )}
                                            </Document>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Agents;
