/*
  All the content on the portfolio lives in this file.
  Edit the text here, save, and the page updates. No other file needs to change.
*/
window.SITE = {
  email: "shreyanshimishra7689@gmail.com",
  linkedin: "https://www.linkedin.com/in/shreyanshi-mishra-151508224/",
  github: "https://github.com/Shreyanshi123",

  // Words that rotate in the hero line: "I build ..."
  phrases: ["backend APIs", "search systems", "RAG applications", "document pipelines"],

  // Skills shown in the scrolling strip under the hero
  marquee: ["Python", "TypeScript", "Node.js", ".NET", "FastAPI", "LangChain", "RAG", "Embeddings", "Elasticsearch", "ChromaDB", "PostgreSQL", "Azure AD", "Docker", "React", "Next.js", "Angular", "AI systems"],

  experience: [
    {
      id: "swe",
      tab: "Software Engineer",
      org: "Evalueserve, Gurugram",
      when: "Aug 2025 to present",
      ref: "Software Engineer at Evalueserve",
      summary: "I work on the backend and AI-facing parts of SearchLego and ViSense, two enterprise applications at Evalueserve.",
      points: [
        "Develop and extend SearchLego and ViSense: backend APIs, search, document-processing workflows and authentication.",
        "Build backend services and REST APIs with Node.js, TypeScript and .NET.",
        "Work on document-intelligence features covering ingestion, content extraction, retrieval and LLM-powered processing.",
        "Use Elasticsearch and vector search to give applications context-aware access to enterprise content.",
        "Integrate Azure AD authentication and authorization across applications and services.",
        "Containerize and deploy services with Docker, working across teams."
      ],
      tags: ["Node.js", "TypeScript", ".NET", "Elasticsearch", "Vector search", "Azure AD", "Docker", "REST APIs"],
      skills: ["Node.js", "TypeScript", ".NET", "Elasticsearch", "Vector search", "Azure AD", "Docker", "REST APIs", "LLMs", "Authentication"]
    },
    {
      id: "intern",
      tab: "Software Engineer Intern",
      org: "Evalueserve, Gurugram",
      when: "Feb 2025 to Aug 2025",
      ref: "Software Engineer Intern at Evalueserve",
      summary: "My first role at Evalueserve, where I learned enterprise development on an airline ticket booking application.",
      points: [
        "Built and extended modules of an airline ticket booking application with .NET, REST APIs and database integrations.",
        "Implemented and debugged workflows for user authentication, flight scheduling, passenger information and booking records.",
        "Contributed to API development, database operations and testing in an enterprise environment."
      ],
      tags: [".NET", "REST APIs", "Databases"],
      skills: [".NET", "REST APIs", "Authentication"]
    },
    {
      id: "edu",
      tab: "B.E. Computer Science",
      org: "Chandigarh University",
      when: "2021 to 2025",
      ref: "B.E. at Chandigarh University",
      summary: "Four years of Computer Science Engineering at Chandigarh University in Kharar, Punjab.",
      points: [
        "Bachelor of Engineering in Computer Science Engineering.",
        "CGPA: 8.37/10."
      ],
      tags: [],
      skills: []
    }
  ],

  projects: [
    {
      id: "recruit-ai",
      name: "RecruitAI",
      kind: "AI-powered technical hiring platform",
      when: "2025",
      image: "assets/recruit-ai.svg",
      alt: "AI hiring and assessment platform visual",
      filters: ["AI", "Full-stack"],
      summary: "A full-stack agentic assessment platform that combines AI-powered evaluation, secure coding sandboxing, and recruiter workflows for structured technical hiring.",
      points: [
        "Designed assessment flows that connect JD analysis, candidate scoring, and recruiter review in one system.",
        "Built guardrails and sandboxed evaluation logic to assess candidate submissions safely and consistently.",
        "Developed a modular AI stack with FastAPI, React, and orchestration layers for interviews and analytics."
      ],
      tags: ["Python", "FastAPI", "React", "AI", "Hiring", "LangGraph"],
      skills: ["Python", "FastAPI", "React", "TypeScript", "LangGraph", "AI evaluation", "Security", "Full-stack"],
      repo: "https://github.com/Shreyanshi123/Recruit-AI"
    },
    {
      id: "doc-parsing",
      name: "Doc Parsing Engine",
      kind: "Document intelligence and parser benchmarking",
      when: "2025",
      image: "assets/doc-parsing.svg",
      alt: "Document intelligence and parser comparison visual",
      filters: ["AI", "Backend"],
      summary: "A document parsing system that routes uploads or blob URLs through multiple engines, normalizes output to Markdown, and compares parser quality on the same input.",
      points: [
        "Built a parser router that supports OCR-heavy, PDF, DOCX, PPTX, and spreadsheet workflows across multiple engines.",
        "Created a side-by-side comparison flow to benchmark extraction quality, structure preservation, and downstream usability.",
        "Implemented async job handling, provider checks, and local/cloud output storage for enterprise-style document pipelines."
      ],
      tags: ["Python", "FastAPI", "OCR", "RAG", "Document AI"],
      skills: ["Python", "FastAPI", "OCR", "Document parsing", "Evaluation", "LLMs", "Azure"],
      repo: "https://github.com/Shreyanshi123/doc-parsing"
    },
    {
      id: "omnimemory",
      name: "OmniMemory",
      kind: "AI-powered personal knowledge engine",
      when: "Dec 2025 to Feb 2026",
      image: "assets/omnimemory.webp",
      alt: "A glowing AI brain hovering above an open book in a grand library",
      filters: ["AI", "Full-stack"],
      summary: "A personal knowledge workspace that turns PDFs, word docs, and notes into a searchable, conversational memory layer powered by RAG.",
      points: [
        "Ingested PDFs, DOCX files, and notes for semantic search and conversational querying using embeddings and retrieval.",
        "Added summarization and metadata extraction so documents can be explored by topic, sentiment, and language.",
        "Built the platform with a FastAPI backend and a polished Next.js interface."
      ],
      tags: ["Python", "FastAPI", "LangChain", "ChromaDB", "Groq", "Next.js"],
      skills: ["Python", "FastAPI", "LangChain", "ChromaDB", "Groq", "Next.js", "RAG", "Embeddings", "Hugging Face"],
      repo: null
    },
    {
      id: "persona",
      name: "Persona.AI",
      kind: "AI character chat studio",
      when: "Apr 2026 to May 2026",
      image: "assets/persona.webp",
      alt: "A translucent AI figure beside open books, scales and a gavel",
      filters: ["AI"],
      summary: "A conversational playground for designing AI personalities with consistent behavior, role-based context, and multi-character interaction flows.",
      points: [
        "Built configurable personas with distinct tone, memory, and behavioral context.",
        "Enabled multi-character conversations and debate-style interaction patterns for richer simulations.",
        "Deployed the product using a lightweight Docker-based architecture for fast iteration."
      ],
      tags: ["Python", "Groq", "Streamlit", "Docker"],
      skills: ["Python", "Groq", "Streamlit", "Docker"],
      repo: null
    },
    {
      id: "airline",
      name: "Airline Booking System",
      kind: "Full-stack web application",
      when: "Apr 2025 to Jul 2025",
      image: "assets/airline.svg",
      alt: "Illustration of a flight route between two points next to a boarding pass",
      filters: ["Full-stack", "Backend"],
      summary: "A booking experience for searching flights, managing reservations, and handling user journeys with secure authentication and backend workflows.",
      points: [
        "Implemented user authentication, registration, and secure session management.",
        "Built backend APIs and database integrations for ticketing, booking records, and scheduling flows."
      ],
      tags: [".NET", "C#", "SQL", "REST APIs", "Angular"],
      skills: [".NET", "C#", "SQL", "REST APIs", "Angular", "Authentication"],
      repo: "https://github.com/Shreyanshi123/Airline-Ticket-Booking-Proj"
    }
  ],

  skills: [
    { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "C#", "SQL"] },
    { name: "Backend", items: ["FastAPI", "Node.js", "NestJS", "Express.js", ".NET", "REST APIs", "Microservices", "API design", "Authentication", "Azure AD"] },
    { name: "AI and LLM", items: ["LLMs", "RAG", "Embeddings", "Vector search", "Prompt engineering", "Agentic workflows", "AI evaluation", "LangChain", "LangGraph", "LlamaIndex", "Hugging Face", "Groq"] },
    { name: "Data and search", items: ["Elasticsearch", "PostgreSQL", "pgvector", "ChromaDB", "MongoDB", "Redis", "SQLAlchemy"] },
    { name: "Frontend", items: ["React", "Next.js", "Angular", "Streamlit"] },
    { name: "Tools", items: ["Git", "GitHub", "Docker", "Postman", "Swagger", "Jira", "Azure DevOps", "Linux", "RabbitMQ"] }
  ]
};
