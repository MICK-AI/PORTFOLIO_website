import React from 'react'

const Footer = () => {
    return (
        <section className="bg-black text-white py-16 px-6 md:px-8 lg:px-12 relative scroll-smooth">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Side - Quote */}
                    <div className="lg:pr-8">
                        <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
                            A system does not endure by controlling everything around it, but by aligning with what already exists.
                            Sustainability is the highest expression of intelligence in motion.
                        </blockquote>
                        <cite className="block mt-8 text-lg text-gray-300 not-italic">
                            — Baruch Spinoza
                        </cite>
                    </div>

                    {/* Right Side - Testimonials */}
                    <div className="space-y-8">

                        {/* Testimonial 1 */}
                        <div className="border-b border-gray-800 pb-8">
                            <p className="text-gray-300 mb-4 leading-relaxed">
                                This work represents a long-term vision of artificial intelligence, shaped by philosophy, ethical restraint, and an understanding of its impact on the future.
                            </p>
                            <div>
                                <p className="text-sm text-gray-400 italic">— Personal AI Philosophy</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="border-b border-gray-800 pb-8">
                            <p className="text-gray-300 mb-4 leading-relaxed">
                                Mick brought a clear and thoughtful approach to this project, combining technical understanding with a strong sense of direction. He was quick to grasp the core objectives and worked iteratively to refine both structure and intent. The final outcome reflects not only solid AI and ML fundamentals, but also a rare consideration for long-term impact and responsibility.
                            </p>
                            <div>
                                <h4 className="font-semibold text-white">Independent Technical Reviewer</h4>
                                <p className="text-sm text-gray-500">AI & Systems</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="pb-8">
                            <p className="text-gray-300 mb-4 leading-relaxed">
                                Mick demonstrates strong technical ability paired with an uncommon level of creative and philosophical thinking. His work reflects originality, discipline, and a clear vision for intelligent systems. He consistently brings meaningful ideas to the table.
                            </p>
                            <div>
                                <h4 className="font-semibold text-white">Peer Reviewer</h4>
                                <p className="text-sm text-gray-500">Artificial Intelligence</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Full-width text at bottom */}
                <div className="mt-12 pt-8">
                    <p className="text-gray-400 text-sm leading-relaxed">
                        I see this work as an inquiry rather than an output — a way of understanding how intelligence, intention, and responsibility intersect.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer
