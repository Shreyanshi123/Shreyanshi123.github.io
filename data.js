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
      id: "omnimemory",
      name: "OmniMemory",
      kind: "AI-powered personal knowledge engine",
      when: "Dec 2025 to Feb 2026",
      image: "assets/omnimemory.webp",
      alt: "A glowing AI brain hovering above an open book in a grand library",
      filters: ["AI", "Full-stack"],
      summary: "Drop in your PDFs, Word files and text notes, then search them by meaning or just ask questions. It answers from your own documents using RAG.",
      points: [
        "Ingests PDF, DOCX and TXT files for semantic search and conversational querying, using RAG, Hugging Face embeddings and ChromaDB.",
        "Summarizes each document and picks out topics, sentiment and language automatically.",
        "FastAPI backend with a Next.js frontend."
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
      summary: "Design AI characters with their own personalities and talk to them. Put several in one room and they chat, and even debate, on their own.",
      points: [
        "Configurable personalities with context-aware conversations and consistent character behavior.",
        "Multi-character conversations, autonomous interactions and debates.",
        "Docker-based deployment."
      ],
      tags: ["Python", "Groq", "Streamlit", "Docker"],
      skills: ["Python", "Groq", "Streamlit", "Docker"],
      repo: null
    },
    {
      id: "recruit-ai",
      name: "RecruitAI",
      kind: "AI-powered technical hiring platform",
      when: "2025",
      image: "assets/recruit-ai.svg",
      alt: "AI hiring and assessment platform visual",
      filters: ["AI", "Full-stack"],
      summary: "A full-stack agentic assessment platform for technical hiring, combining AI evaluation, secure coding sandboxing, and recruiter workflows for candidate screening.",
      points: [
        "Supports job-to-candidate analysis, interview flow generation, and scoring workflows.",
        "Uses secure sandboxed code evaluation and guardrails to assess candidate submissions responsibly.",
        "Built with FastAPI, React, and a modular AI pipeline for interviews and analytics."
      ],
      tags: ["Python", "FastAPI", "React", "AI", "Hiring", "LangGraph"],
      skills: ["Python", "FastAPI", "React", "TypeScript", "LangGraph", "AI evaluation", "Security", "Full-stack"],
      repo: "https://github.com/Shreyanshi123/Recruit-AI"
    },
    {
      id: "doc-parsing",
      name: "Doc Parsing POC",
      kind: "Document intelligence and parser benchmarking",
      when: "2025",
      image: "assets/doc-parsing.svg",
      alt: "Document intelligence and parser comparison visual",
      filters: ["AI", "Backend"],
      summary: "A document parsing platform that routes uploaded files or blob URLs through multiple parser engines, normalizes output to Markdown, and compares engine performance on the same document.",
      points: [
        "Supports multiple document parsers for PDFs, DOCX, PPTX, XLSX and OCR-heavy inputs.",
        "Compares parser quality side by side and surfaces a benchmark-ready evaluation flow.",
        "FastAPI backend with async jobs, provider checks, and cloud/local storage support."
      ],
      tags: ["Python", "FastAPI", "OCR", "RAG", "Document AI"],
      skills: ["Python", "FastAPI", "OCR", "Document parsing", "Evaluation", "LLMs", "Azure"],
      repo: "https://github.com/Shreyanshi123/doc-parsing"
    },
    {
      id: "airline",
      name: "Airline Booking System",
      kind: "Full-stack web application",
      when: "Apr 2025 to Jul 2025",
      image: "assets/airline.svg",
      alt: "Illustration of a flight route between two points next to a boarding pass",
      filters: ["Full-stack", "Backend"],
      summary: "A booking site where you search for flights, book them and manage your reservations, backed by a SQL database and secure sign-in.",
      points: [
        "User authentication, registration and secure session management.",
        "Backend APIs and database operations for flight scheduling, passenger information, booking records and transactions."
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
