// Research data array
// Add new entries following the same structure.
export const researchData = [
    {
        id: "01",
        title: "Adaptive Task Allocation in Autonomous AI Workflows",
        abstract: "This research explores distributed task orchestration in autonomous AI workflows using affinity-based eviction to optimize runtime–compliance tradeoffs.",
        type: "Research",
        focusArea: "Autonomous AI Systems",
        keywords: ["task allocation", "affinity eviction", "distributed planning"],
        status: "Published",
        summary: "We propose a DRAMA-inspired distributed planner that evicts low‑affinity tasks under dynamic constraints, improving runtime while preserving compliance.",
        problem: "Dynamic task allocation in human‑AI workflows often fails under sudden changes due to centralized control and long LLM chains.",
        approach: "Implement a multi‑agent planner with semantic affinity scoring; low‑affinity tasks are evicted or reassigned, and context chains are recomposed.",
        contributions: "Introduces affinity‑based eviction, reduces runtime overhead, maintains compliance, and enables parallel task execution.",
        results: "Significant runtime reduction and higher task‑completion rates across benchmark scenarios.",
        date: "2023‑09",
        tags: ["AI", "Planning", "DRAMA"],
        link: "#",
        conference: null
    }
    // Add more entries as needed
];
