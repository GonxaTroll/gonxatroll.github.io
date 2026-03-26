"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Linkedin, Github, Mail, Briefcase, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const experiences = [
  {
    id: 1,
    title: "Data Scientist",
    company: "Tech Innovators Inc.",
    period: "2021 - Present",
    skills: ["Python", "TensorFlow", "SQL", "AWS", "Data Visualization"],
    description:
      "Leading data science initiatives and developing machine learning models for predictive analytics. Key responsibilities include:",
    tasks: [
      "Designed and deployed ML models that improved customer retention by 25%",
      "Built automated data pipelines processing 10M+ records daily",
      "Led a team of 3 junior data scientists on various projects",
      "Collaborated with product teams to integrate AI features into core products",
    ],
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    company: "Data Dynamics Corp.",
    period: "2019 - 2021",
    skills: ["PyTorch", "Docker", "Kubernetes", "MLOps", "NLP"],
    description: "Developed and maintained production ML systems serving millions of users. Main achievements include:",
    tasks: [
      "Implemented recommendation engine increasing user engagement by 40%",
      "Optimized model inference reducing latency by 60%",
      "Created CI/CD pipelines for automated model deployment",
      "Conducted A/B tests to validate model improvements",
    ],
  },
  {
    id: 3,
    title: "Research Assistant",
    company: "University of Science",
    period: "2017 - 2019",
    skills: ["R", "Statistical Analysis", "Research Design", "Academic Writing"],
    description: "Conducted research in machine learning and statistical modeling. Research contributions:",
    tasks: [
      "Published 3 papers in peer-reviewed conferences",
      "Developed novel algorithms for time-series forecasting",
      "Assisted in teaching undergraduate statistics courses",
      "Collaborated on interdisciplinary research projects",
    ],
  },
]

const projects = [
  {
    id: 1,
    title: "Customer Segmentation",
    shortDesc: "Analyzed customer data to identify distinct segments for tailored marketing strategies.",
    fullDesc:
      "Utilized K-means clustering and RFM analysis to segment customers into distinct groups, enabling personalized marketing campaigns that increased conversion rates by 35%.",
    image: "/data-dashboard.png",
    url: "https://github.com/sophiachen/customer-segmentation",
    tags: ["Python", "Scikit-learn", "Pandas"],
  },
  {
    id: 2,
    title: "Sales Forecasting",
    shortDesc: "Developed a model to predict future sales, improving inventory management.",
    fullDesc:
      "Built ARIMA and LSTM models to forecast sales with 92% accuracy, reducing inventory costs by 20% and preventing stockouts during peak seasons.",
    image: "/sales-forecasting-chart-with-trend-lines.jpg",
    url: "https://github.com/sophiachen/sales-forecasting",
    tags: ["Time Series", "TensorFlow", "Prophet"],
  },
  {
    id: 3,
    title: "Sentiment Analysis",
    shortDesc: "Gauged public opinion from social media data to inform product development.",
    fullDesc:
      "Implemented NLP techniques using BERT to analyze 500K+ social media posts, providing actionable insights that shaped product roadmap decisions.",
    image: "/sentiment-analysis-visualization.png",
    url: "https://github.com/sophiachen/sentiment-analysis",
    tags: ["NLP", "BERT", "PyTorch"],
  },
  {
    id: 4,
    title: "Fraud Detection",
    shortDesc: "Built a system to identify and prevent fraudulent financial transactions.",
    fullDesc:
      "Developed an ensemble model combining Random Forest and XGBoost that detected fraudulent transactions with 98% precision, saving the company $2M annually.",
    image: "/coffee-cup-on-desk-workspace.jpg",
    url: "https://github.com/sophiachen/fraud-detection",
    tags: ["XGBoost", "Anomaly Detection", "SQL"],
  },
  {
    id: 5,
    title: "Healthcare Data Analysis",
    shortDesc: "Analyzed healthcare data to identify factors influencing patient outcomes.",
    fullDesc:
      "Performed statistical analysis on 100K+ patient records to identify key factors affecting recovery times, leading to improved treatment protocols.",
    image: "/healthcare-data-visualization.png",
    url: "https://github.com/sophiachen/healthcare-analysis",
    tags: ["R", "Statistical Modeling", "Tableau"],
  },
  {
    id: 6,
    title: "Recommendation System",
    shortDesc: "Designed a product recommendation system for an e-commerce platform.",
    fullDesc:
      "Created a collaborative filtering system that increased average order value by 28% and improved user engagement metrics across the platform.",
    image: "/product-recommendation-system.jpg",
    url: "https://github.com/sophiachen/recommendation-system",
    tags: ["Collaborative Filtering", "Spark", "AWS"],
  },
]

const contributionsDetailed = [
  {
    id: 1,
    title: "Open Source Contributions",
    shortDesc: "Contributed to various open-source projects, enhancing functionalities and fixing bugs.",
    fullDesc:
      "Active contributor to scikit-learn, pandas, and matplotlib. Submitted 50+ pull requests including feature enhancements and bug fixes.",
    image: "/laptop-with-code.png",
    url: "https://github.com/sophiachen",
    tags: ["Python", "Open Source", "Git"],
    subItems: [
      {
        name: "Scikit-learn Feature Enhancement",
        description: "Added new preprocessing functionality for handling missing data",
        url: "https://github.com/scikit-learn/scikit-learn/pull/12345",
      },
      {
        name: "Pandas Performance Optimization",
        description: "Optimized DataFrame operations reducing memory usage by 30%",
        url: "https://github.com/pandas-dev/pandas/pull/23456",
      },
      {
        name: "Matplotlib Visualization Bug Fix",
        description: "Fixed rendering issues in 3D plots for large datasets",
        url: "https://github.com/matplotlib/matplotlib/pull/34567",
      },
    ],
  },
  {
    id: 2,
    title: "Community Engagement",
    shortDesc: "Active participant in data science communities, providing mentorship and sharing knowledge.",
    fullDesc:
      "Mentored 20+ aspiring data scientists through online communities, hosted monthly meetups, and organized hackathons with 200+ participants.",
    image: "/community-building-icon.jpg",
    url: "https://www.meetup.com/data-science-community",
    tags: ["Mentorship", "Community Building", "Public Speaking"],
    subItems: [
      {
        name: "Monthly Data Science Meetup",
        description: "Organized and hosted monthly meetups with 50+ attendees",
        url: "https://www.meetup.com/data-science-community",
      },
      {
        name: "Online Mentorship Program",
        description: "Mentored 20+ aspiring data scientists through career transitions",
        url: "https://www.mentorship.com/sophiachen",
      },
      {
        name: "Annual Data Hackathon",
        description: "Organized hackathon with 200+ participants and $10K in prizes",
        url: "https://www.datahackathon.com",
      },
    ],
  },
  {
    id: 3,
    title: "Research Publications",
    shortDesc: "Authored and co-authored research papers in peer-reviewed journals and conferences.",
    fullDesc:
      "Published 8 papers in top-tier conferences including NeurIPS and ICML, focusing on novel approaches to time-series forecasting and anomaly detection.",
    image: "/plant-and-open-book.jpg",
    url: "https://scholar.google.com/citations?user=sophiachen",
    tags: ["Research", "Academic Writing", "Machine Learning"],
    subItems: [
      {
        name: "NeurIPS 2023: Novel Time-Series Forecasting",
        description: "Introduced a new architecture for multi-variate time-series prediction",
        url: "https://papers.nips.cc/paper/2023/sophiachen",
      },
      {
        name: "ICML 2022: Anomaly Detection in Streaming Data",
        description: "Developed real-time anomaly detection algorithm with 99% accuracy",
        url: "https://icml.cc/2022/sophiachen",
      },
      {
        name: "KDD 2021: Deep Learning for Healthcare",
        description: "Applied deep learning to predict patient outcomes",
        url: "https://kdd.org/2021/sophiachen",
      },
    ],
  },
  {
    id: 4,
    title: "Technical Blog Posts",
    shortDesc: "Published articles on data science topics, sharing insights and tutorials.",
    fullDesc:
      "Authored 50+ technical articles on Medium and personal blog, reaching 100K+ readers monthly with tutorials on ML algorithms and best practices.",
    image: "/blog-post-document.jpg",
    url: "https://medium.com/@sophiachen",
    tags: ["Technical Writing", "Education", "Content Creation"],
    subItems: [
      {
        name: "Understanding Transformer Architecture",
        description: "Deep dive into attention mechanisms and transformer models",
        url: "https://medium.com/@sophiachen/transformers",
      },
      {
        name: "MLOps Best Practices",
        description: "Guide to deploying and monitoring ML models in production",
        url: "https://medium.com/@sophiachen/mlops",
      },
      {
        name: "Data Visualization with Python",
        description: "Comprehensive tutorial on creating impactful visualizations",
        url: "https://medium.com/@sophiachen/dataviz",
      },
    ],
  },
  {
    id: 5,
    title: "Data Science Competitions",
    shortDesc: "Participated in data science competitions, achieving top rankings in several challenges.",
    fullDesc:
      "Kaggle Competitions Master with 3 gold medals and 5 silver medals. Ranked in top 1% globally with expertise in computer vision and NLP challenges.",
    image: "/data-science-competition.jpg",
    url: "https://www.kaggle.com/sophiachen",
    tags: ["Kaggle", "Competitions", "Problem Solving"],
    subItems: [
      {
        name: "Image Classification Challenge - 1st Place",
        description: "Won gold medal with 98.5% accuracy on medical image classification",
        url: "https://www.kaggle.com/competitions/image-classification",
      },
      {
        name: "NLP Sentiment Analysis - 2nd Place",
        description: "Silver medal for sentiment analysis on social media data",
        url: "https://www.kaggle.com/competitions/sentiment-analysis",
      },
      {
        name: "Time Series Forecasting - 1st Place",
        description: "Gold medal for predicting sales across multiple stores",
        url: "https://www.kaggle.com/competitions/time-series",
      },
      {
        name: "Computer Vision Object Detection - 3rd Place",
        description: "Bronze medal for detecting objects in autonomous driving scenarios",
        url: "https://www.kaggle.com/competitions/object-detection",
      },
    ],
  },
  {
    id: 6,
    title: "Workshop Facilitation",
    shortDesc: "Designed and led workshops on advanced data visualization techniques for professionals.",
    fullDesc:
      "Conducted 15+ workshops for Fortune 500 companies on data visualization, storytelling with data, and dashboard design, training 500+ professionals.",
    image: "/workshop-presentation.png",
    url: "https://www.sophiachen.com/workshops",
    tags: ["Training", "Data Visualization", "Tableau"],
    subItems: [
      {
        name: "Data Storytelling Workshop",
        description: "2-day workshop on creating compelling data narratives",
        url: "https://www.sophiachen.com/workshops/storytelling",
      },
      {
        name: "Advanced Tableau Training",
        description: "Hands-on training for creating interactive dashboards",
        url: "https://www.sophiachen.com/workshops/tableau",
      },
      {
        name: "Python for Data Visualization",
        description: "Workshop covering matplotlib, seaborn, and plotly",
        url: "https://www.sophiachen.com/workshops/python-viz",
      },
    ],
  },
]

const certificationsByProvider = [
  {
    provider: "Google",
    logo: "/partners/google-cloud.png",
    certifications: [
      { name: "Google Cloud Professional Data Engineer", url: "https://cloud.google.com/certification/data-engineer" },
      {
        name: "Google Cloud Professional Machine Learning Engineer",
        url: "https://cloud.google.com/certification/machine-learning-engineer",
      },
    ],
  },
  {
    provider: "Amazon Web Services",
    logo: "/aws-certification-logo.png",
    certifications: [
      {
        name: "AWS Certified Machine Learning - Specialty",
        url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
      },
      {
        name: "AWS Certified Data Analytics - Specialty",
        url: "https://aws.amazon.com/certification/certified-data-analytics-specialty/",
      },
    ],
  },
  {
    provider: "Microsoft",
    logo: "/microsoft-azure-logo.png",
    certifications: [
      {
        name: "Azure Data Scientist Associate",
        url: "https://learn.microsoft.com/en-us/certifications/azure-data-scientist/",
      },
      {
        name: "Azure AI Engineer Associate",
        url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/",
      },
    ],
  },
  {
    provider: "TensorFlow",
    logo: "/tensorflow-logo.png",
    certifications: [{ name: "TensorFlow Developer Certificate", url: "https://www.tensorflow.org/certificate" }],
  },
  {
    provider: "Coursera",
    logo: "/coursera-logo.png",
    certifications: [
      { name: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning" },
      {
        name: "Machine Learning Specialization",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
      },
    ],
  },
  {
    provider: "Tableau",
    logo: "/tableau-logo.png",
    certifications: [
      { name: "Tableau Desktop Specialist", url: "https://www.tableau.com/learn/certification/desktop-specialist" },
    ],
  },
]

export default function HomePage() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)
  const [selectedExp, setSelectedExp] = useState<(typeof experiences)[0] | null>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [hoveredContribution, setHoveredContribution] = useState<number | null>(null)
  const [selectedContribution, setSelectedContribution] = useState<(typeof contributionsDetailed)[0] | null>(null)
  const [hoveredSubItem, setHoveredSubItem] = useState<number | null>(null)
  const [certificationIndex, setCertificationIndex] = useState(0)
  const [hoveredCertIndex, setHoveredCertIndex] = useState<string | null>(null)
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [showAllExperiences, setShowAllExperiences] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllContributions, setShowAllContributions] = useState(false)
  const [selectedProviderCerts, setSelectedProviderCerts] = useState<(typeof certificationsByProvider)[0] | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const items = document.querySelectorAll(".timeline-item")
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [showAllExperiences])

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const aboutBottom = aboutRef.current.getBoundingClientRect().bottom
        setShowStickyHeader(aboutBottom < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const checkStickyHeaderAfterScroll = () => {
    setTimeout(() => {
      if (aboutRef.current) {
        const aboutBottom = aboutRef.current.getBoundingClientRect().bottom
        setShowStickyHeader(aboutBottom < 0)
      }
    }, 100)
  }

  const nextCertifications = () => {
    if (certificationIndex + 5 < certificationsByProvider.length) {
      setCertificationIndex(certificationIndex + 1)
    }
  }

  const prevCertifications = () => {
    if (certificationIndex > 0) {
      setCertificationIndex(certificationIndex - 1)
    }
  }

  const visibleCertifications = certificationsByProvider.slice(certificationIndex, certificationIndex + 5)

  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 3)
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3)
  const displayedContributions = showAllContributions ? contributionsDetailed : contributionsDetailed.slice(0, 3)

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#101922" }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b"
        style={{ backgroundColor: "rgba(16, 25, 34, 0.8)", borderColor: "#1e2a3a" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Sticky profile */}
            <div
              className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                showStickyHeader ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: "#1173d4" }}>
                <Image
                  src="/images/design-mode/about_me_screen.png"
                  alt="Gonzalo Candel"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#ffffff" }}>
                  Gonzalo Candel
                </p>
                <p className="text-xs" style={{ color: "#1173d4" }}>
                  Data Scientist
                </p>
              </div>
            </div>

            {/* Center - Navigation links */}
            <div className="flex items-center justify-center gap-8">
              <Link
                href="#about"
                className="transition-colors hover:text-white"
                style={{ color: "#696c73" }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                About
              </Link>
              <Link
                href="#experience"
                className="transition-colors hover:text-white"
                style={{ color: "#696c73" }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                  checkStickyHeaderAfterScroll()
                }}
              >
                Experience
              </Link>
              <Link
                href="#projects"
                className="transition-colors hover:text-white"
                style={{ color: "#696c73" }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  checkStickyHeaderAfterScroll()
                }}
              >
                Projects
              </Link>
              <Link
                href="#contributions"
                className="transition-colors hover:text-white"
                style={{ color: "#696c73" }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("contributions")?.scrollIntoView({ behavior: "smooth" })
                  checkStickyHeaderAfterScroll()
                }}
              >
                Contributions
              </Link>
              <Link
                href="#certifications"
                className="transition-colors hover:text-white"
                style={{ color: "#696c73" }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" })
                  checkStickyHeaderAfterScroll()
                }}
              >
                Certifications
              </Link>
            </div>

            {/* Right side - Empty spacer for balance */}
            <div className="w-40"></div>
          </div>
        </div>
      </nav>

      <section id="about" ref={aboutRef} className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex gap-16 items-start">
            {/* Left Column - Profile (centered in its space) */}
            <div className="flex-shrink-0 w-80 flex flex-col items-center">
              <div
                className="w-64 h-64 rounded-full overflow-hidden border-4 mb-6 shadow-2xl"
                style={{ borderColor: "#1173d4" }}
              >
                <Image
                  src="/images/design-mode/about_me_screen.png"
                  alt="Gonzalo Candel"
                  width={256}
                  height={256}
                  className="object-cover"
                />
              </div>
              <h1 className="text-5xl font-bold mb-2 text-center" style={{ color: "#ffffff" }}>
                Gonzalo Candel
              </h1>
              <p className="text-2xl mb-8 text-center" style={{ color: "#1173d4" }}>
                Data Scientist
              </p>
            </div>

            {/* Right Column - Bio */}
            <div className="flex-1 space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: "#696c73" }}>
                I'm a data scientist with a passion for uncovering insights from complex datasets. My expertise lies in
                machine learning, statistical modeling, and data visualization.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "#696c73" }}>
                I thrive on solving challenging problems and transforming data into actionable strategies. Let's connect
                and explore how we can collaborate on innovative projects.
              </p>
              <Button
                size="lg"
                className="gap-2 transition-all hover:brightness-110 hover:shadow-lg"
                style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "/resume.pdf"
                  link.download = "Sophia_Chen_Resume.pdf"
                  link.click()
                }}
              >
                <Download className="w-5 h-5" />
                Download Resume
              </Button>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#ffffff" }}>
                  Connect with me
                </h3>
                <div className="flex gap-3 flex-wrap">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 transition-all hover:brightness-125 hover:shadow-lg"
                    style={{ backgroundColor: "#1e2a3a", color: "#696c73" }}
                    onClick={() => window.open("https://www.linkedin.com/in/gonzalo-candel-peir%C3%B3/", "_blank")}
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 transition-all hover:brightness-125 hover:shadow-lg"
                    style={{ backgroundColor: "#1e2a3a", color: "#696c73" }}
                    onClick={() => window.open("https://github.com/GonxaTroll", "_blank")}
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 transition-all hover:brightness-125 hover:shadow-lg"
                    style={{ backgroundColor: "#1e2a3a", color: "#696c73" }}
                    onClick={() => window.open("https://www.kaggle.com/gonxatroll", "_blank")}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-17v2h2V5h-2zm0 4v8h2V9h-2z" />
                    </svg>
                    Kaggle
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 transition-all hover:brightness-125 hover:shadow-lg"
                    style={{ backgroundColor: "#1e2a3a", color: "#696c73" }}
                    onClick={() => (window.location.href = "mailto:gonzalo.canpei@gmail.com")}
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ color: "#ffffff" }}>
              My Journey
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "#696c73" }}>
              An interactive timeline of my professional experience.
            </p>
          </div>

          <div className="relative" ref={timelineRef}>
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: "#1e2a3a" }}></div>

            <div className="space-y-12">
              {displayedExperiences.map((exp, index) => (
                <div
                  key={exp.id}
                  data-index={index}
                  className={`timeline-item relative pl-20 flex items-start gap-6 cursor-pointer transition-all duration-700 ${
                    visibleItems.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  onMouseEnter={() => setHoveredExp(exp.id)}
                  onMouseLeave={() => setHoveredExp(null)}
                  onClick={() => setSelectedExp(exp)}
                >
                  <div
                    className="absolute left-2 top-2 w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: index === 0 ? "#1173d4" : "#1e2a3a",
                      borderColor: "#101922",
                      transform: hoveredExp === exp.id ? "scale(1.2)" : "scale(1)",
                    }}
                  >
                    <Briefcase className="w-6 h-6" style={{ color: index === 0 ? "#ffffff" : "#696c73" }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1" style={{ color: "#ffffff" }}>
                      {exp.title}
                    </h3>
                    <p style={{ color: "#696c73" }}>
                      {exp.company} | {exp.period}
                    </p>

                    {hoveredExp === exp.id && (
                      <div className="mt-3 flex flex-wrap gap-2 animate-in fade-in duration-300">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {experiences.length > 3 && !showAllExperiences && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setShowAllExperiences(true)}
                  className="gap-2"
                  style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
                >
                  Show All Experiences
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ color: "#ffffff" }}>
              Projects
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "#696c73" }}>
              Explore a selection of my data science projects, showcasing my skills and experience in various domains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="relative rounded-xl overflow-hidden border transition-all cursor-pointer hover:scale-105 hover:shadow-2xl group h-80"
                style={{ borderColor: "#1e2a3a" }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => window.open(project.url, "_blank")}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, rgba(16, 25, 34, 0.95) 0%, rgba(16, 25, 34, 0.7) 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500"
                  style={{
                    transform: hoveredProject === project.id ? "translateY(-20px)" : "translateY(0)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#ffffff" }}>
                    {project.title}
                  </h3>
                  <p className="mb-3 text-sm" style={{ color: "#e0e0e0" }}>
                    {hoveredProject === project.id ? project.fullDesc : project.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projects.length > 3 && !showAllProjects && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setShowAllProjects(true)}
                className="gap-2"
                style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
              >
                Show All Projects
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="contributions" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ color: "#ffffff" }}>
              Contributions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedContributions.map((contribution) => (
              <div
                key={contribution.id}
                className="relative rounded-xl overflow-hidden border transition-all cursor-pointer hover:scale-105 hover:shadow-2xl group h-80"
                style={{ borderColor: "#1e2a3a" }}
                onMouseEnter={() => setHoveredContribution(contribution.id)}
                onMouseLeave={() => setHoveredContribution(null)}
                onClick={() => setSelectedContribution(contribution)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={contribution.image || "/placeholder.svg"}
                    alt={contribution.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, rgba(16, 25, 34, 0.95) 0%, rgba(16, 25, 34, 0.7) 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500"
                  style={{
                    transform: hoveredContribution === contribution.id ? "translateY(-20px)" : "translateY(0)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#ffffff" }}>
                    {contribution.title}
                  </h3>
                  <p className="mb-3 text-sm" style={{ color: "#e0e0e0" }}>
                    {hoveredContribution === contribution.id ? contribution.fullDesc : contribution.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contribution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {contributionsDetailed.length > 3 && !showAllContributions && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setShowAllContributions(true)}
                className="gap-2"
                style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
              >
                Show All Contributions
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="certifications" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ color: "#ffffff" }}>
              Certifications
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "#696c73" }}>
              Professional certifications demonstrating expertise across various data science platforms and
              technologies.
            </p>
          </div>

          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={prevCertifications}
              disabled={certificationIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
              style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextCertifications}
              disabled={certificationIndex + 5 >= certificationsByProvider.length}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
              style={{ backgroundColor: "#1173d4", color: "#ffffff" }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-5 gap-4 transition-all duration-500 ease-in-out">
              {visibleCertifications.map((provider) => (
                <div
                  key={provider.provider}
                  className="p-4 rounded-xl border transition-all"
                  style={{ backgroundColor: "#1a2332", borderColor: "#1e2a3a" }}
                >
                  <div className="flex flex-col items-center mb-3">
                    <div className="w-20 h-20 mb-2 flex items-center justify-center">
                      <Image
                        src={provider.logo || "/placeholder.svg"}
                        alt={provider.provider}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-center" style={{ color: "#ffffff" }}>
                      {provider.provider}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {provider.certifications.slice(0, 2).map((cert, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg transition-all cursor-pointer"
                        style={{
                          backgroundColor: hoveredCertIndex === `${provider.provider}-${idx}` ? "#1173d4" : "#101922",
                        }}
                        onMouseEnter={() => setHoveredCertIndex(`${provider.provider}-${idx}`)}
                        onMouseLeave={() => setHoveredCertIndex(null)}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(cert.url, "_blank")
                        }}
                      >
                        <p className="text-xs line-clamp-2" style={{ color: "#ffffff" }}>
                          {cert.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  {provider.certifications.length > 2 && (
                    <button
                      className="mt-2 text-xs text-right w-full transition-colors hover:underline"
                      style={{ color: "#1173d4" }}
                      onClick={() => setSelectedProviderCerts(provider)}
                    >
                      See more →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t" style={{ borderColor: "#1e2a3a" }}>
        <div className="container mx-auto max-w-6xl text-center">
          <p style={{ color: "#696c73" }}>© 2025 Sophia Chen. All rights reserved.</p>
        </div>
      </footer>

      {/* Experience Dialog */}
      <Dialog open={!!selectedExp} onOpenChange={() => setSelectedExp(null)}>
        <DialogContent className="max-w-2xl" style={{ backgroundColor: "#1a2332", borderColor: "#1e2a3a" }}>
          <DialogHeader>
            <DialogTitle className="text-2xl" style={{ color: "#ffffff" }}>
              {selectedExp?.title}
            </DialogTitle>
            <DialogDescription style={{ color: "#696c73" }}>
              {selectedExp?.company} | {selectedExp?.period}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: "#1173d4" }}>
                Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedExp?.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: "#1e2a3a", color: "#ffffff" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2" style={{ color: "#1173d4" }}>
                Key Responsibilities & Achievements
              </h4>
              <p className="mb-3" style={{ color: "#696c73" }}>
                {selectedExp?.description}
              </p>
              <ul className="space-y-2">
                {selectedExp?.tasks.map((task, idx) => (
                  <li key={idx} className="flex gap-2" style={{ color: "#696c73" }}>
                    <span style={{ color: "#1173d4" }}>•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedContribution} onOpenChange={() => setSelectedContribution(null)}>
        <DialogContent
          className="max-w-4xl max-h-[80vh] overflow-y-auto"
          style={{ backgroundColor: "#1a2332", borderColor: "#1e2a3a" }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl" style={{ color: "#ffffff" }}>
              {selectedContribution?.title}
            </DialogTitle>
            <DialogDescription style={{ color: "#696c73" }}>{selectedContribution?.fullDesc}</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {selectedContribution?.subItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border transition-all cursor-pointer hover:scale-105"
                style={{
                  backgroundColor: hoveredSubItem === idx ? "#1e2a3a" : "#101922",
                  borderColor: "#1e2a3a",
                }}
                onMouseEnter={() => setHoveredSubItem(idx)}
                onMouseLeave={() => setHoveredSubItem(null)}
                onClick={() => window.open(item.url, "_blank")}
              >
                <h4 className="font-semibold mb-2" style={{ color: "#ffffff" }}>
                  {item.name}
                </h4>
                <p className="text-sm" style={{ color: "#696c73" }}>
                  {item.description}
                </p>
                {hoveredSubItem === idx && (
                  <p className="text-xs mt-2" style={{ color: "#1173d4" }}>
                    Click to view →
                  </p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedProviderCerts} onOpenChange={() => setSelectedProviderCerts(null)}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] overflow-y-auto"
          style={{ backgroundColor: "#1a2332", borderColor: "#1e2a3a" }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3" style={{ color: "#ffffff" }}>
              {selectedProviderCerts && (
                <>
                  <Image
                    src={selectedProviderCerts.logo || "/placeholder.svg"}
                    alt={selectedProviderCerts.provider}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  {selectedProviderCerts.provider} Certifications
                </>
              )}
            </DialogTitle>
            <DialogDescription style={{ color: "#696c73" }}>
              All certifications from {selectedProviderCerts?.provider}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {selectedProviderCerts?.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border transition-all cursor-pointer hover:scale-102"
                style={{
                  backgroundColor: hoveredCertIndex === `modal-${idx}` ? "#1e2a3a" : "#101922",
                  borderColor: "#1e2a3a",
                }}
                onMouseEnter={() => setHoveredCertIndex(`modal-${idx}`)}
                onMouseLeave={() => setHoveredCertIndex(null)}
                onClick={() => window.open(cert.url, "_blank")}
              >
                <p className="font-semibold" style={{ color: "#ffffff" }}>
                  {cert.name}
                </p>
                {hoveredCertIndex === `modal-${idx}` && (
                  <p className="text-xs mt-2" style={{ color: "#1173d4" }}>
                    Click to view certification →
                  </p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
