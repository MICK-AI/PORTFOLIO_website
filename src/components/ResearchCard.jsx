import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, ExternalLink, Tag } from 'lucide-react';

const ResearchCard = ({ title, abstract, date, tags, link, conference }) => {
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
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {abstract}
                    </p>
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
