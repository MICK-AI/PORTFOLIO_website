import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

const EDA = () => {
    const navigate = useNavigate();

    const edaProjects = [
        {
            id: 1,
            title: "E-Commerce Sales Analysis",
            description: "An in-depth exploratory data analysis of e-commerce sales data, uncovering trends, customer behavior, and actionable business insights.",
            date: "January 2026",
            tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
            link: "/e-commerce-sales.html",
            type: "Notebook"
        },
        {
            id: 2,
            title: "Airbnb NYC Analysis",
            description: "Exploratory data analysis of Airbnb listings in New York City, discovering pricing trends, neighborhood insights, and property types.",
            date: "February 2026",
            tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
            link: "/airbnb_analysis.html",
            type: "Notebook"
        }
        // Future EDA projects can be added here
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans cursor-default">
            <TopBar />

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                <div className="mb-16">
                    <button
                        onClick={() => navigate('/projects')}
                        className="flex items-center text-sm font-semibold text-gray-500 hover:text-black transition-colors mb-8 group"
                    >
                        <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
                        Back to Projects
                    </button>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-tight mb-6">
                        Exploratory Data Analysis
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        A collection of deep dives into raw datasets, where I uncover hidden patterns, clean messy data, and extract meaningful insights.
                    </p>
                </div>

                <div className="space-y-6">
                    {edaProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6 font-comic md:font-sans"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                                        {project.type}
                                    </span>
                                    <span className="text-sm text-gray-400 font-medium">
                                        {project.date}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h2>
                                <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-3xl">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="md:pl-8 md:border-l border-gray-100 flex flex-col items-start md:items-end flex-shrink-0">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 hover:scale-105 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-gray-200"
                                >
                                    View NoteBook
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}

                    {edaProjects.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-500 font-medium">More projects coming soon...</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EDA;
