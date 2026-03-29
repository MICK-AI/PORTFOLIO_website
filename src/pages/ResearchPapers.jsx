import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ChevronUp,
    FileText,
    Target,
    Zap,
    Search,
    BarChart3,
    Tag,
    BookOpen,
    ArrowUpRight
} from "lucide-react";
import TopBar from "../components/TopBar";

const researchData = [
    {
        id: "01",
        title: "Adaptive Task Allocation in Autonomous AI Workflows",
        type: "Research",
        focusArea: "Autonomous AI Orchestration",
        keywords: ["Multi-Agent Systems", "Distributed Planning", "Affinity Metrics", "Task Decomposition"],
        status: "Published",
        summary: "Exploring distributed task orchestration in autonomous AI workflows. This study introduces affinity-based eviction to optimize the tradeoff between runtime efficiency and compliance, moving away from centralized manager agents to a parallelized, scalable architecture.",
        problem: [
            "Centralized manager agents create significant execution bottlenecks.",
            "Sequential LLM chains suffer from context accumulation and high latency.",
            "Static role assignments fail to adapt to dynamic workflow shifts.",
            "Existing systems struggle with compositional task decomposition and parallel execution."
        ],
        approach: [
            "Implementation of a DRAMA-inspired distributed multi-agent planner.",
            "Adoption of parallel agent execution for independent subtask management.",
            "Integration of semantic affinity metrics to score and prioritize tasks.",
            "Development of affinity-based eviction strategies to reduce overhead during resource pressure."
        ],
        contributions: [
            "Developed a novel distributed planning framework for autonomous systems.",
            "Introduced semantic affinity modeling for intelligent task prioritization.",
            "Proven reduction in runtime during dynamic task shifts.",
            "Enhanced compliance adherence through optimized context recomposition."
        ],
        results: [
            "Evaluated using the AgentBoard multi-agent framework across diverse benchmarks.",
            "Demonstrated significant reduction in average runtime compared to single-thread baselines.",
            "Maintained high compliance scores while lowering semantic context overhead.",
            "Improved resource utilization and replanning latency in high-pressure environments."
        ],
        link: "#"
    },
    {
        id: "02",
        title: "Trade-Off Between Fairness and Efficiency in AI Systems",
        type: "Research",
        focusArea: "AI Ethics & Optimization",
        keywords: ["Fairness", "System Efficiency", "Bias Mitigation", "Multi-objective Optimization"],
        status: "Published",
        summary: "AI is now used in high-impact decisions (e.g., hiring, lending, policing). While fairness is ethically vital, enforcing fairness often affects prediction quality or system efficiency. This paper explores how fairness constraints interact with performance optimization and discusses strategies to balance them responsibly.",
        problem: [
            "Historical bias in data means enforcing fairness may suppress statistically strong signals.",
            "Conflicting optimization goals where fairness constraints add restrictions to the model search space.",
            "Performance degradation as fairness remediation techniques often require extra computational resources.",
            "Mathematical impossibility of satisfying all standard fairness definitions (Parity, Odds, etc.) simultaneously."
        ],
        approach: [
            "Analyzed standard fairness definitions: Demographic Parity, Equalized Odds, and Predictive Parity.",
            "Utilized multi-objective optimization (Pareto Frontiers) to view fairness and accuracy as balancing goals.",
            "Implemented fairness-aware modeling including regularization toward fair representations.",
            "Integrated post-processing adjustments and fairness monitoring using tools like IBM AIF360 and Fairlearn."
        ],
        contributions: [
            "Explored the core nature of the trade-off between algorithmic fairness and system efficiency.",
            "Discussed context-aware strategies to balance these tensions in high-impact AI systems.",
            "Highlighted the limitations of current bias mitigation methods in preserving predictive accuracy.",
            "Proposed embedding human judgment and accountability into technical design choices."
        ],
        results: [
            "Found that no single bias mitigation method preserves accuracy while improving fairness across all tasks.",
            "Quantified the impact of fairness constraints using Pareto Frontiers and multi-objective optimization curves.",
            "Established that healthcare and real-time systems require different fairness vs. performance thresholds.",
            "Recommended transparency and human-in-the-loop governance for responsible AI deployment."
        ],
        link: "#"
    },
    {
        id: "03",
        title: "Regional Dialect Bias in Hindi–English Code-Mixed NLP Systems: A Fairness and Interpretability Study",
        type: "Research",
        focusArea: "Multilingual NLP Fairness",
        keywords: ["Hindi-English code-mixed", "dialect bias", "fairness", "interpretability", "LIME", "mBERT", "IndicBERT"],
        status: "Published",
        summary: "This study evaluates transformer-based multilingual models for dialect bias in Hindi–English code-mixed text, fine‑tuning mBERT and IndicBERT on classification tasks and measuring fairness with Equalized Odds. LIME interpretability reveals token‑level contributions of dialectal features to biased predictions. Mitigation strategies are proposed to improve inclusive AI deployment.",
        problem: [
            "Dialectal variations are under‑represented in training corpora, leading to potential misclassification.",
            "Regional speech may be flagged as spam or toxic disproportionately.",
            "Lack of fairness evaluation for intra‑language dialects."
        ],
        approach: [
            "Fine‑tune mBERT and IndicBERT on Hindi‑English classification tasks.",
            "Compute False Positive and False Negative rates per dialect group using Equalized Odds.",
            "Apply LIME to analyze token‑level influence of dialectal markers.",
            "Propose mitigation via re‑weighting and adversarial training."
        ],
        contributions: [
            "Empirical evidence of dialect bias in multilingual models.",
            "Methodology for fairness assessment of code‑mixed text.",
            "Interpretability analysis linking dialect tokens to biased outcomes.",
            "Mitigation strategies balancing fairness and accuracy."
        ],
        results: [
            "Significant disparity in error rates across dialect groups observed.",
            "Mitigation reduces disparity with minor impact on overall accuracy.",
            "LIME highlights dialect‑specific tokens driving bias.",
            "Recommendations for inclusive dataset collection."
        ],
        link: "#"
    },
    {
        id: "04",
        title: "Emergent Coordination Failures in Decentralized Multi-Agent AI Systems",
        type: "Research",
        focusArea: "Multi-Agent Systems Reliability & Safety",
        keywords: ["Emergence", "Coordination Failure", "Non-Determinism", "Agent Conflict", "System Stability"],
        status: "Published",
        summary: "Decentralized multi-agent AI systems enable scalable and parallel decision-making, but they often exhibit emergent coordination failures due to non-deterministic interactions between agents. This study explores how independent agents, operating without centralized control, can enter unstable states such as cyclic dependencies, conflicting task execution, or inefficient equilibria. The paper analyzes these failure modes through simulated environments and proposes lightweight coordination and conflict-resolution strategies to improve system stability while preserving decentralization and scalability.",
        problem: [
            "Local agent policies optimize for partial objectives without a global view of the workflow.",
            "Non-deterministic scheduling and message ordering amplify race conditions across peers.",
            "Cycles and deadlocks emerge when agents wait on one another without a designated arbiter.",
            "Standard single-agent debugging tools fail to explain cross-agent contention and retries."
        ],
        approach: [
            "Implementation of a modular simulation harness that logs inter-agent messages, locks, and replans.",
            "Adoption of lightweight quorum and tie-breaking rules for contested shared resources.",
            "Integration of conflict-resolution layers that escalate only when local retries exceed a threshold.",
            "Development of stability metrics that track oscillation, thrash rate, and equilibrium drift over episodes."
        ],
        contributions: [
            "Developed a taxonomy of emergent coordination failures specific to decentralized agent stacks.",
            "Introduced reproducible simulation scenarios that surface cyclic dependencies and inefficient equilibria.",
            "Proven reduction in failure episodes when lightweight coordination hooks are applied.",
            "Enhanced observability through traces that link agent decisions to system-wide coordination state."
        ],
        results: [
            "Evaluated across diverse multi-agent simulations with varying topology and load profiles.",
            "Demonstrated improved stability and fewer conflicting executions versus purely independent agents.",
            "Maintained decentralization by avoiding a permanent central coordinator while adding optional mediators.",
            "Improved interpretability of failure cases for operators reviewing coordination traces."
        ],
        link: "#"
    },
    {
        id: "05",
        title: "Transparency Versus Competitive Advantage in Proprietary AI Systems",
        type: "Research",
        focusArea: "AI Ethics & Disclosure Strategy",
        keywords: ["Transparency", "Proprietary Models", "Stakeholder Trust", "Selective Disclosure"],
        status: "Published",
        summary: "Proprietary AI systems are now embedded in products customers rarely inspect end-to-end (e.g., ranking, pricing assistants, internal copilots). While transparency supports trust and safety, detailed disclosure can weaken commercial position or aid misuse. This paper explores how transparency requirements interact with competitive strategy and discusses patterns for responsible, bounded disclosure.",
        problem: [
            "Regulatory and customer pressure for openness conflicts with trade-secret protection.",
            "Full model or data transparency is often infeasible without exposing sensitive assets.",
            "Partial disclosure can be misread as completeness and create false confidence.",
            "Teams lack shared criteria for which artifacts (cards, evals, incident logs) belong in public versus private channels."
        ],
        approach: [
            "Analyzed disclosure tiers used in industry: capability cards, evaluation summaries, and incident reporting.",
            "Utilized stakeholder mapping (users, regulators, partners) to align transparency depth with each audience.",
            "Implemented governance templates that separate verifiable claims from marketing language.",
            "Integrated periodic third-party review hooks where contracts and regulation allow."
        ],
        contributions: [
            "Explored the structural tension between verifiable transparency and legitimate secrecy.",
            "Discussed context-aware disclosure bundles rather than one-size-fits-all openness.",
            "Highlighted failure modes when selective transparency is mistaken for full auditability.",
            "Proposed pairing public summaries with private audit channels under clear scope rules."
        ],
        results: [
            "Found that bounded disclosure with documented evaluation protocols often satisfies regulators better than vague openness.",
            "Quantified communication overhead across tiered transparency using case-style comparisons.",
            "Established that high-risk domains need stronger incident transparency even when model weights stay private.",
            "Recommended explicit labeling of disclosure scope so recipients know what was not shared and why."
        ],
        link: "#"
    },
    {
        id: "06",
        title: "Dynamic Fairness Constraints in Adaptive AI Systems",
        type: "Research",
        focusArea: "AI Ethics & Optimization",
        keywords: ["Dynamic Fairness", "Adaptive Systems", "Bias Drift", "Feedback Loops", "Multi-objective Optimization"],
        status: "Published",
        summary: "Modern AI systems operate in dynamic environments where data distributions and user interactions evolve over time, leading to shifting bias patterns. Traditional fairness approaches rely on static constraints, which may degrade system performance or fail to maintain fairness under changing conditions. This study introduces a dynamic fairness framework that continuously adapts constraints based on real-time feedback, enabling AI systems to balance fairness and efficiency over time. The paper evaluates trade-offs between predictive performance and fairness stability, proposing adaptive mechanisms for responsible and scalable AI deployment.",
        problem: [
            "Static fairness targets become misaligned when incoming data and user behavior drift from the training regime.",
            "Tight fixed constraints can suppress accuracy just when the business needs responsiveness most.",
            "Feedback loops between predictions and future inputs amplify bias unless monitored on a rolling basis.",
            "Teams rarely instrument fairness metrics at the cadence required to catch slow-moving drift."
        ],
        approach: [
            "Analyzed fairness definitions under distribution shift: which constraints remain meaningful when base rates move.",
            "Utilized sliding windows and online monitors to estimate group error rates and disparity in near real time.",
            "Implemented constraint schedulers that relax or tighten fairness penalties based on drift severity and risk tier.",
            "Integrated multi-objective controllers that trade off accuracy, fairness stability, and compute budget per update cycle."
        ],
        contributions: [
            "Explored how static versus dynamic fairness assumptions differ in production-like adaptive pipelines.",
            "Discussed safe update rules so constraint changes do not oscillate or overreact to noisy short-term signals.",
            "Highlighted failure modes when feedback loops hide drift until harms accumulate at the edge.",
            "Proposed governance checkpoints for when to freeze updates, roll back, or escalate human review."
        ],
        results: [
            "Found that adaptive constraints track shifting bias better than one-shot offline fairness tuning alone.",
            "Quantified predictive performance versus fairness stability curves across simulated drift scenarios.",
            "Established that window length and alert thresholds materially affect false alarms versus missed drift.",
            "Recommended pairing dynamic constraints with explicit incident budgets and audit logs for accountability."
        ],
        link: "#"
    },
    {
        id: "07",
        title: "Self-Reflective Critique Loops for Tool-Using LLM Agents",
        type: "Research",
        focusArea: "LLM Orchestration & Agent Reasoning",
        keywords: ["Self-Critique", "Verifier Modules", "Tool-Use Reliability", "Epistemic Calibration", "Multi-Step Reasoning"],
        status: "Published",
        summary: "Autonomous LLM agents that invoke tools can compound early errors because standard decoding interleaves planning and execution without a separable verification stage. Prior self-checking methods are often single-shot and statistically aligned with the same failure modes they aim to catch. This work formalizes an internal critique loop in which a distinct scorer evaluates draft actions and rationales prior to tool calls, with bounded iterations and explicit termination criteria tied to task risk. We study when additional reflection reduces tool and API misuse versus when it increases latency without measurable gain. Experiments span retrieval-augmented QA, code execution, and structured API orchestration; the paper reports protocols for coupling critique strength to error cost and stopping rules that limit runaway self-revision.",
        problem: [
            "Tool-using agents can lock onto incorrect plans before any external signal contradicts them.",
            "Monolithic self-consistency checks reuse the same representation, limiting independent verification.",
            "Unbounded reflection loops waste tokens and can reinforce spurious confidence.",
            "Existing benchmarks rarely separate proposal quality from execution correctness across hops."
        ],
        approach: [
            "Implementation of a dual-head architecture separating action proposal from critique scoring.",
            "Adoption of hard gates on tool arguments using schema checks plus critique thresholds.",
            "Integration of calibrated confidence targets so critique scores map to actionable accept or revise decisions.",
            "Development of episode-level budgets that cap critique rounds by estimated risk and step depth."
        ],
        contributions: [
            "Developed a reproducible critique-loop protocol for multi-step tool-using agents.",
            "Introduced risk-conditioned stopping rules that trade latency for error reduction.",
            "Proven measurable reductions in incorrect tool invocations on curated failure-rich suites.",
            "Enhanced interpretability via structured traces linking critiques to revised actions."
        ],
        results: [
            "Evaluated on retrieval, code, and API tasks with injected error modes and partial observability.",
            "Demonstrated lower serious failure rates versus single-pass baselines at matched average latency budgets.",
            "Maintained stable throughput when critique was restricted to high-stakes steps only.",
            "Improved calibration of stated confidence versus observed success on held-out tool traces."
        ],
        link: "#"
    },
    {
        id: "08",
        title: "Resource-Aware Scheduling for Large-Scale Multi-Agent LLM Workloads",
        type: "Research",
        focusArea: "Distributed Multi-Agent Systems",
        keywords: ["Token Budgeting", "Queueing Discipline", "SLA-Aware Routing", "Tenant Fairness", "Accelerator Heterogeneity"],
        status: "Published",
        summary: "Shared inference clusters now multiplex numerous concurrent agent sessions, yet first-come-first-served policies routinely inflate tail latency for short dependency chains while starving long-horizon jobs of predictable throughput. Classical schedulers seldom co-design token budgets, per-tenant contracts, and accelerator heterogeneity under bursty, non-stationary arrivals. This paper models agent workloads as stochastic DAGs with token demand at each vertex and proposes a weighted scheduling family that co-optimizes completion time, tail quantiles, and energy via admission control and priority aging. We analyze stability conditions under overload and compare against static priority and purely fair-share baselines using trace-driven simulation. The study characterizes when tenant-level fairness conflicts with cluster-wide utilization and gives operational guidance for capacity planning.",
        problem: [
            "Concurrent agent sessions create head-of-line blocking across shared model replicas.",
            "Per-request limits ignore graph depth, fan-out, and cross-tenant contractual SLAs.",
            "Power and thermal caps on GPUs introduce time-varying effective throughput.",
            "Naive fairness can reward chatty low-value sessions at the expense of batch-critical pipelines."
        ],
        approach: [
            "Analyzed arrival and service distributions from production-like agent traces and synthetic DAG generators.",
            "Utilized weighted fair queueing with aging to mitigate starvation while honoring tiered priorities.",
            "Implemented a two-level scheduler separating admission from intra-tenant step placement.",
            "Integrated energy-aware placement across heterogeneous devices with predicted token cost per hop."
        ],
        contributions: [
            "Explored scheduling trade-offs unique to token-metered, graph-structured agent workloads.",
            "Discussed formal stability notions under bounded overload versus open-loop saturation.",
            "Highlighted failure modes when static quotas misalign with episodic agent depth.",
            "Proposed policy knobs that expose explicit latency–fairness–energy trade-offs to operators."
        ],
        results: [
            "Found that SLA-weighted scheduling reduces p95 step latency versus FCFS on mixed traces.",
            "Quantified throughput loss when enforcing strict tenant isolation under peak load.",
            "Established sensitivity of tail latency to batching width and preemption granularity.",
            "Recommended periodic re-tuning of weights using online utilization and backlog signals."
        ],
        link: "#"
    },
    {
        id: "09",
        title: "End-to-End Robustness Analysis for Orchestrated LLM Pipelines Under Adversarial Prompting",
        type: "Research",
        focusArea: "LLM Security & Pipeline Reliability",
        keywords: ["Adversarial Prompts", "Prompt Injection", "Defense in Depth", "Stage Isolation", "Canary Evaluation"],
        status: "Published",
        summary: "Orchestrated systems chain retrievers, LLM calls, and tools such that adversarial content can cross privilege boundaries at inter-stage hand-offs, not only within a single chat turn. Prior defenses emphasize classifier or instruction hardening on one model, leaving ambiguous trust at schema parsing, retrieval fusion, and callback execution. This study maps attack surfaces along the orchestration graph and measures how perturbations propagate when intermediate outputs are lossily summarized or re-encoded. We evaluate layered mitigations combining strict data typing, role-separated prompts, retrieval allowlists, and canary probes inserted between stages. The paper reports precision and recall trade-offs for detectors versus structural constraints and identifies pipeline topologies where isolation yields larger gains than end-to-end monitoring alone.",
        problem: [
            "Untrusted user and document text co-mingle with trusted system instructions across hops.",
            "Intermediate JSON or natural language summaries can strip provenance needed for policy checks.",
            "Single-point filters miss attacks that only succeed after retrieval or tool feedback.",
            "Evaluation suites rarely exercise multi-stage injection with realistic orchestration code paths."
        ],
        approach: [
            "Implementation of explicit trust labels on payloads passed between pipeline stages.",
            "Adoption of schema-first parsing with rejection of ill-typed tool arguments.",
            "Integration of canary tokens and invariant checks after retrieval merge operations.",
            "Development of an adversarial suite spanning injection, exfiltration, and privilege-stretch objectives."
        ],
        contributions: [
            "Developed a graph-centric threat model aligned with deployed orchestration frameworks.",
            "Introduced comparative metrics for cross-stage attack success versus single-model baselines.",
            "Proven that structural constraints reduce certain injection classes without full retraining.",
            "Enhanced reproducibility through open task definitions tied to pipeline topology."
        ],
        results: [
            "Evaluated on multi-stage pipelines with retrieval, code execution, and external API calls.",
            "Demonstrated lower end-to-end success rates for staged attacks when isolation and typing were combined.",
            "Maintained acceptable task accuracy when defenses were scoped to high-risk transitions only.",
            "Improved operator visibility via structured logs of blocked hand-offs and trigger reasons."
        ],
        link: "#"
    },
    {
        id: "10",
        title: "Human-in-the-Loop Optimization for Autonomous Agent Workflows Under Uncertainty",
        type: "Research",
        focusArea: "Human-AI Orchestration & Policy Design",
        keywords: ["Selective Oversight", "Bandit Allocation", "Review Budget", "Workflow KPIs", "Decentralized Execution"],
        status: "Published",
        summary: "Autonomous agents can execute long action sequences with limited supervision, yet underspecified rewards and shifting environments make uniform human review infeasible at scale. Periodic auditing misses rare, high-impact failures, while reviewing every step collapses throughput. This paper treats oversight as a constrained sequential decision problem: allocate a finite review budget to actions whose correction yields the largest downstream utility gain. We combine lightweight automated risk scores with bandit-style selection of review slots and compare against static sampling and threshold-only triggers on simulated agent traces with injected faults. The analysis connects review policies to decentralized execution—humans constrain outcomes without centralizing step-by-step control. Empirical results characterize budget levels at which selective oversight matches full-review safety metrics on key KPIs.",
        problem: [
            "Human bandwidth is fixed while agent action volume scales with model speed.",
            "Risk scores from the same model family can correlate with blind spots in failure modes.",
            "Uniform sampling underweights long-horizon errors that surface only after many steps.",
            "KPIs for business outcomes are misaligned with per-step correctness unless explicitly linked."
        ],
        approach: [
            "Analyzed oversight as a stochastic knapsack and bandit problem with delayed rewards.",
            "Utilized counterfactual estimates of downstream impact from corrective interventions.",
            "Implemented adaptive review policies with exploration for rare failure clusters.",
            "Integrated hard escalation paths for policy violations independent of model-based scores."
        ],
        contributions: [
            "Explored principled trade-offs between review load and outcome-level safety metrics.",
            "Discussed decentralization-preserving oversight that vetoes or revises without micromanaging plans.",
            "Highlighted when bandit methods outperform fixed schedules under non-stationary drift.",
            "Proposed reporting standards tying oversight budgets to auditable KPI improvements."
        ],
        results: [
            "Found that impact-weighted selection reduces serious incidents versus uniform review at equal human cost.",
            "Quantified sensitivity of outcomes to delay between action execution and human feedback.",
            "Established that hybrid policies combining scores and exploration outperform pure thresholding.",
            "Recommended explicit caps and rotation of reviewers to limit correlated acceptance bias."
        ],
        link: "#"
    }
];

const ResearchCard = ({ research }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:border-black/10 transition-all duration-500 shadow-sm hover:shadow-xl group">
            {/* Index and Header Area */}
            <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
                    {/* Index */}
                    <div className="flex-shrink-0 select-none">
                        <span className="text-6xl md:text-7xl font-black text-black/[0.03] group-hover:text-black/[0.06] transition-colors duration-500 font-mono leading-none">
                            {research.id}
                        </span>
                    </div>

                    {/* Main Info */}
                    <div className="flex-grow">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-[0.1em] rounded-full">
                                {research.type}
                            </span>
                            <span className="px-3.5 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-[0.1em] rounded-full border border-gray-100">
                                {research.status}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-[1.1] mb-8 group-hover:text-gray-900 transition-colors">
                            {research.title}
                        </h2>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-10 pt-8 border-t border-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-400">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.15em] mb-0.5">Focus Area</p>
                                    <p className="text-sm md:text-base font-bold text-gray-700">{research.focusArea}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 mt-0.5">
                                    <Tag className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.15em] mb-0.5">Keywords</p>
                                    <p className="text-sm md:text-base font-bold text-gray-700 leading-tight">{research.keywords.join(", ")}</p>
                                </div>
                            </div>
                        </div>

                        {/* Short Summary */}
                        <div className="max-w-3xl mb-10">
                            <p className="text-gray-600 font-medium text-lg md:text-xl leading-relaxed italic">
                                "{research.summary}"
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold text-sm tracking-wide hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 shadow-lg active:scale-95"
                            >
                                {isOpen ? "Hide Breakdown" : "Expand Breakdown"}
                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {research.link && (
                                <a
                                    href={research.link}
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-black/5 text-gray-500 font-bold text-sm tracking-wide hover:border-black hover:text-black transition-all duration-300"
                                >
                                    Scientific Draft <ArrowUpRight className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expandable Details Block */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-gray-100 overflow-hidden"
                    >
                        <div className="p-8 md:p-16 bg-gray-50/50">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">

                                {/* Problem */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                            <Target className="w-5 h-5 text-black" />
                                        </div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight">The Problem</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {research.problem.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-gray-600 font-medium leading-relaxed">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Approach */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                            <Search className="w-5 h-5 text-black" />
                                        </div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight">The Approach</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {research.approach.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-gray-600 font-medium leading-relaxed">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Contributions */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-black" />
                                        </div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight">Contributions</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {research.contributions.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-gray-600 font-medium leading-relaxed">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Results */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-black" />
                                        </div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight">Results</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {research.results.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-gray-600 font-medium leading-relaxed">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ResearchPapers = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("research-visible");
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <>
            <section
                ref={ref}
                className="relative min-h-screen overflow-hidden font-sans bg-white research-animate"
                aria-label="Research Publications section"
            >
                <style>{`
                    .research-animate { 
                        opacity: 0; 
                        transform: translateY(26px); 
                        transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.8,.2,1); 
                    }
                    .research-visible { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                    .research-stagger-1 { transition-delay: 80ms; }
                    .research-stagger-2 { transition-delay: 160ms; }
                    .research-stagger-3 { transition-delay: 260ms; }
                `}</style>

                {/* Top Navigation */}
                <TopBar />

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28">
                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-10 items-start mb-16 md:mb-24">
                        {/* Left: Giant heading */}
                        <div className="lg:col-span-6">
                            <p className="mt-6 text-sm md:text-base lg:text-lg font-bold tracking-[0.2em] uppercase opacity-40 research-stagger-1">
                                Scientific Inquiry & Discovery
                            </p>
                            <h1
                                className="leading-[0.9] font-black tracking-[-0.04em] text-black research-stagger-1"
                                style={{
                                    fontSize: "clamp(52px, 8.5vw, 120px)",
                                }}
                            >
                                Research Publications
                            </h1>
                        </div>

                        {/* Right: Description */}
                        <div className="lg:col-span-6 lg:pt-16">
                            <p
                                className="text-gray-600 leading-[1.4] tracking-tight research-stagger-2 font-medium"
                                style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                            >
                                Systematically documenting explorations in autonomous intelligence, distributed multi-agent systems, and human-AI orchestration frameworks.
                            </p>

                            {/* Tag line */}
                            <div className="mt-10 md:mt-12 research-stagger-3">
                                <div className="flex flex-wrap gap-x-8 gap-y-4 text-gray-400 font-black uppercase tracking-[0.25em] text-[10px] md:text-xs border-t border-gray-100 pt-8">
                                    <span>Peer Reviewed</span>
                                    <span>Technical Drafts</span>
                                    <span>Applied AI</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative h-px w-full bg-black/5 mb-16 md:mb-24" />

                    {/* Content Area - Modular Research Cards */}
                    <div className="space-y-12 md:space-y-20 research-stagger-3">
                        {researchData.map((research) => (
                            <ResearchCard key={research.id} research={research} />
                        ))}

                        {/* Placeholder for future research items */}
                        <div className="pt-12 text-center border-t border-gray-50 research-stagger-3">
                            <p className="text-gray-300 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                                More research coming soon ⎯ 2026 Exploration cycle
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResearchPapers;
