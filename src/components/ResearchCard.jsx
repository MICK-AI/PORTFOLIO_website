import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Tag } from 'lucide-react';

const ResearchCard = ({ title, abstract, date, tags, link, conference, type, focusArea, keywords, status, summary, problem, approach, contributions, results }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300 font-comic md:font-sans"
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>{date}</span>
                        {conference && (
                            <>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span className="text-blue-600">{conference}</span>
                            </>
                        )}
                    </div>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-black transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                </div>

                {/* Content */}
                <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                        {title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                        {abstract}
                    </p>
                    {/* Metadata */}
                    <div className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Type:</span> {type} | <span className="font-medium">Focus:</span> {focusArea} | <span className="font-medium">Status:</span> {status}
                    </div>
                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1 mb-3">
                        {keywords && keywords.map((kw, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-xs rounded">{kw}</span>
                        ))}
                    </div>
                    {/* Summary */}
                    <p className="text-gray-700 italic mb-3">{summary}</p>
                    {/* Expandable sections */}
                    <details className="mb-2">
                        <summary className="cursor-pointer font-medium text-gray-800">Problem</summary>
                        <p className="mt-1 text-gray-600">{problem}</p>
                    </details>
                    <details className="mb-2">
                        <summary className="cursor-pointer font-medium text-gray-800">Approach</summary>
                        <p className="mt-1 text-gray-600">{approach}</p>
                    </details>
                    <details className="mb-2">
                        <summary className="cursor-pointer font-medium text-gray-800">Contributions</summary>
                        <p className="mt-1 text-gray-600">{contributions}</p>
                    </details>
                    <details className="mb-2">
                        <summary className="cursor-pointer font-medium text-gray-800">Results</summary>
                        <p className="mt-1 text-gray-600">{results}</p>
                    </details>
                </div>

                {/* Footer */}
                <div className="mt-auto flex flex-wrap gap-2">
                    {tags && tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100"
                        >
                            <Tag className="w-3 h-3" />
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Link Overlay (for whole card click) */}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`View paper: ${title}`}
                    >
                        <span className="sr-only">View paper</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
};

export default ResearchCard;
