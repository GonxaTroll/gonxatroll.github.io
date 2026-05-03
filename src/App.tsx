import React, { useEffect, useRef, useState } from 'react'
import {
  BarChart2,
  Brain,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Cpu,
  Database,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Moon,
  Sun,
} from 'lucide-react'

import {
  siApacheairflow,
  siDocker,
  siFastapi,
  siMlflow,
  siNumpy,
  siPandas,
  siPython,
  siScikitlearn,
  siSnowflake,
} from 'simple-icons'

import './App.css'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Experience = {
  id: number
  title: string
  company: string
  period: string
  skills: string[]
  description: string
  tasks: string[]
}

type Project = {
  id: number
  title: string
  shortDesc: string
  fullDesc: string
  image: string
  url: string
  tags: string[]
}

type Contribution = {
  id: number
  title: string
  shortDesc: string
  fullDesc: string
  image: string
  url: string
  tags: string[]
  subItems: {
    name: string
    description: string
    url: string
  }[]
}

type Competition = {
  id: number
  name: string
  date: string
  rank: number | null
  totalParticipants: number | null
  description: string
  approach: string[]
  url: string
  status: 'practice' | 'unfinished' | 'participated' | 'ranked'
}

type CompetitionCategoryGroup = {
  name: string
  competitions: Competition[]
}

type CertificationProvider = {
  provider: string
  logo: string
  certifications: {
    name: string
    url: string
  }[]
}

type SkillSubcategory = {
  label: string
  skills: string[]
}

type SkillCategory = {
  name: string
  icon: React.ComponentType<{ className?: string }>
  subcategories: SkillSubcategory[]
}

const coreStack = [
  { icon: siPython, label: 'Python' },
  { icon: siSnowflake, label: 'Snowflake' },
  { icon: siScikitlearn, label: 'scikit-learn' },
  { icon: siPandas, label: 'pandas' },
  { icon: siNumpy, label: 'NumPy' },
  { icon: siFastapi, label: 'FastAPI' },
  { icon: siApacheairflow, label: 'Airflow' },
  { icon: siMlflow, label: 'MLflow' },
  { icon: siDocker, label: 'Docker' },
]

const skillCategories: SkillCategory[] = [
  {
    name: 'Data Engineering & Architecture',
    icon: Database,
    subcategories: [
      { label: 'Languages', skills: ['Python', 'R', 'SQL'] },
      { label: 'Databases & Warehousing', skills: ['Snowflake', 'MySQL', 'SQL Server'] },
      { label: 'Transformation & Orchestration', skills: ['dbt', 'Airflow'] },
      { label: 'Ingestion', skills: ['Web Scraping'] },
    ],
  },
  {
    name: 'ML & Mathematical Optimization',
    icon: Brain,
    subcategories: [
      { label: 'Frameworks', skills: ['Scikit-learn', 'Keras', 'Nixtla'] },
      { label: 'Experiment Tracking', skills: ['MLflow'] },
      { label: 'Optimization', skills: ['OR-Tools'] },
      { label: 'Scientific Computing', skills: ['Pandas', 'NumPy'] },
    ],
  },
  {
    name: 'Deployment & MLOps',
    icon: Cpu,
    subcategories: [
      { label: 'Backend & APIs', skills: ['FastAPI'] },
      { label: 'Containerization', skills: ['Docker'] },
      { label: 'Version Control', skills: ['Git'] },
    ],
  },
  {
    name: 'Data Visualization & Analytics',
    icon: BarChart2,
    subcategories: [
      { label: 'BI Tools', skills: ['Tableau', 'Power BI'] },
      { label: 'Programmatic Viz', skills: ['Plotly', 'Matplotlib', 'Seaborn'] },
    ],
  },
]

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Data Scientist',
    company: 'New Work SE',
    period: 'Aug 2024 - Jan 2026',
    skills: ['Python', 'Forecasting', 'dbt', 'Snowflake', 'Tableau'],
    description:
      'Owned forecasting and analytics initiatives for job traffic KPIs in support of business planning.',
    tasks: [
      'Developed ML models for KPI forecasting with <15% error and around 8% average error across KPIs.',
      'Built a jobs data mart with dbt and Snowflake as a single source of truth for job traffic.',
      'Delivered business insights through Python analyses and Tableau dashboards.',
    ],
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'Solver Intelligent Analytics',
    period: 'Sep 2022 - Jul 2024',
    skills: ['Forecasting', 'FastAPI', 'MySQL', 'Grafana', 'Prometheus'],
    description:
      'Maintained and expanded demand forecasting solutions for retail clients and built internal data products.',
    tasks: [
      'Improved 4-year-old demand forecasting solutions, targeting 20% lower prediction error across additional sales scenarios.',
      'Built an optimization-based automation tool that saved up to 8 hours per week of manual work.',
      'Implemented backend services (FastAPI) and MySQL databases for two internal customer-facing applications.',
      'Set up centralized observability with Grafana, Prometheus and Loki across four projects.',
    ],
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'FERMAX Holding Investment S.L.',
    period: 'Feb 2022 - May 2022',
    skills: ['Clustering', 'Python', 'Power BI', 'Kibana', 'Analytics'],
    description:
      'Applied machine learning and analytics to user segmentation, forecasting context, and anomaly detection.',
    tasks: [
      'Clustered 15,000+ users from Fermax Cloud Blue to guide paid subscription recommendations. Baseline for upcoming ML-based segmentation projects.',
      'Analyzed correlations between macroeconomic variables and sales for forecasting impact assessment.',
      'Created Kibana and Power BI dashboards, including anomaly detection for unusual access spikes, which helped identify a security breach.',
    ],
  },
  {
    id: 4,
    title: 'Data Science Intern',
    company: 'ITACA - UPV',
    period: 'Apr 2021 - Aug 2021',
    skills: ['Data Cleaning', 'Anonymization', 'ETL', 'Process Mining', 'Healthcare Data'],
    description:
      'Prepared sensitive healthcare datasets for analysis and process mining use cases.',
    tasks: [
      'Performed anonymization, cleaning and transformation on datasets with 22,000+ patients with blood clotting disorders from La Fe Hospital.',
      'Delivered analysis-ready data structures for statistical analysis and process mining workflows.',
    ],
  },
]

const projects: Project[] = [
  {
    id: 7,
    title: 'Fashion Story Optimizer',
    shortDesc:
      'Optimization approach applied to fashion narrative sequencing and story generation.',
    fullDesc:
      'Web application that relies on optimization methods to generate the best-rewarding fashion items to order in the mobile game Fashion Story.',
    image: '/fashion-story-optimizer.jpg',
    url: 'https://github.com/GonxaTroll/fashion-story-optimizer',
    tags: ['Python', 'Optimization', 'MILP', 'Heuristics', 'FastAPI', 'React'],
  },
  {
    id: 9,
    title: 'DS Log 2026',
    shortDesc:
      'Weekly learning log tracking data science and algorithms work throughout 2026.',
    fullDesc:
      'A structured weekly repository covering data science topics, algorithms and miscellaneous learnings throughout 2026.',
    image: '/ds-log-2026.png',
    url: 'https://github.com/GonxaTroll/ds-log-2026',
    tags: ['Python', 'Algorithms', 'ML', 'Jupyter'],
  },
  {
    id: 10,
    title: 'Dimensionality Reduction Utils',
    shortDesc:
      'Python package for PCA analysis, outlier detection, and high-dimensional data visualization.',
    fullDesc:
      'A reusable Python library for dimensionality reduction workflows: PCA with variance/eigenvalue diagnostics, Hotelling\'s T² and SPE (Q-statistic) outlier detection, and publication-quality loading and score plots.',
    image: '/dimensionality-reduction.png',
    url: 'https://github.com/GonxaTroll/dimensionality-reduction',
    tags: ['Python', 'PCA', 'Visualization'],
  },
  {
    id: 11,
    title: 'Team Formation Optimization',
    shortDesc:
      'Exact models and genetic algorithms for automatic team formation — bachelor\'s thesis code.',
    fullDesc:
      'Team formation by exact mathematical programming with ORTools and a genetic algorithm metaheuristic. The research from this codebase led to publications at HAIS 2023 and in Neurocomputing.',
    image: '/team-formation-optimization.png',
    url: 'https://github.com/GonxaTroll/Exact-models-and-metaheuristics-for-team-formation-TFG_Code',
    tags: ['Python', 'Optimization', 'Exact models', 'Genetic Algorithms'],
  },
]

const contributionsDetailed: Contribution[] = [
  {
    id: 1,
    title: 'Research Publications',
    shortDesc:
      'Authored work on optimization methods for automatic team formation.',
    fullDesc:
      'Published research derived from team formation optimization methods, with one paper presented at HAIS 2023 and a follow-up accepted by Neurocomputing.',
    image: '/research-publications.png',
    url: 'https://github.com/GonxaTroll',
    tags: ['Research', 'Optimization', 'Metaheuristics', 'Python'],
    subItems: [
      {
        name: 'Evolutionary Metaheuristic for Team Formation in Classrooms',
        description:
          'Follow-up publication focused on metaheuristic approaches for team formation in classrooms.',
        url: 'https://www.sciencedirect.com/science/article/pii/S0925231225008100',
      },
      {
        name: 'Linear Programming Model for Team Formation in Classrooms',
        description:
          'Paper based on exact optimization methods for team formation in classrooms.',
        url: 'https://link.springer.com/chapter/10.1007/978-3-031-40725-3_34',
      },
    ],
  },
  {
    id: 5,
    title: 'Data Science Competitions',
    shortDesc:
      'Kaggle challenges spanning forecasting, credit risk, and combinatorial optimization.',
    fullDesc:
      'Coding competitions covering time series forecasting, credit risk modeling, optimization problems and more.',
    image: '/competitions.jpeg',
    url: 'https://www.kaggle.com/gonxatroll',
    tags: ['Kaggle', 'Forecasting', 'Optimization', 'ML'],
    subItems: [],
  },
]

const competitionCategories: CompetitionCategoryGroup[] = [
  {
    name: 'Kaggle',
    competitions: [
      {
        id: 6,
        name: 'Predict Customer Churn',
        date: 'Mar 2026',
        rank: 2442,
        totalParticipants: 4142,
        description:
          'Playground competition predicting customer churn. Covered data validation, exploratory analysis, and predictive modeling across structured customer features.',
        approach: ['Classification', 'EDA', 'Feature Engineering'],
        url: 'https://github.com/GonxaTroll/competitions/tree/main/kaggle/202603_predict_customer_churn',
        status: 'ranked',
      },
      {
        id: 5,
        name: 'Santa — Tree Packing',
        date: 'Nov 2025',
        rank: 3009,
        totalParticipants: 3357,
        description:
          'Optimization challenge: pack Christmas trees into containers as efficiently as possible. Implemented a hybrid genetic algorithm.',
        approach: ['Genetic Algorithm', 'Simulated Annealing', 'Optimization'],
        url: 'https://github.com/GonxaTroll/competitions/tree/main/kaggle/202511_santa_tree_packing',
        status: 'ranked',
      },
      {
        id: 4,
        name: 'Forecasting Sticker Sales',
        date: 'Jan 2025',
        rank: null,
        totalParticipants: null,
        description:
          'Playground competition forecasting sticker sales across countries and product lines. Includes EDA and AutoGluon modeling — work left unfinished.',
        approach: ['AutoGluon', 'EDA', 'Time Series'],
        url: 'https://github.com/GonxaTroll/competitions/tree/main/kaggle/202501_forecasting_sticker_sales_plg',
        status: 'unfinished',
      },
      {
        id: 3,
        name: 'Rohlik Orders Forecasting',
        date: 'Jun 2024',
        rank: 877,
        totalParticipants: 1077,
        description:
          'Time series forecasting challenge for grocery delivery order volumes at Rohlik. Made one submission using AutoGluon — limited time investment.',
        approach: ['AutoGluon', 'Time Series', 'Forecasting'],
        url: 'https://github.com/GonxaTroll/competitions/tree/main/kaggle/202406_rohlik_orders_forecasting',
        status: 'ranked',
      },
      {
        id: 2,
        name: 'Home Credit — Credit Risk Model Stability',
        date: 'Feb 2024',
        rank: 2683,
        totalParticipants: 3856,
        description:
          'Predict credit default probability with a focus on model stability over time. Explored credit bureau, person, and static features across multiple notebooks.',
        approach: ['XGBoost', 'Feature Engineering', 'Credit Bureau Data'],
        url: 'https://www.kaggle.com/competitions/home-credit-credit-risk-model-stability',
        status: 'ranked',
      },
      {
        id: 1,
        name: 'Titanic — Machine Learning from Disaster',
        date: 'Jan 2022',
        rank: null,
        totalParticipants: null,
        description:
          'Classic intro competition predicting passenger survival on the Titanic. Started during university as a first hands-on dive into Kaggle — explored several models and basic feature engineering.',
        approach: ['Logistic Regression', 'Random Forest', 'Feature Engineering'],
        url: 'https://github.com/GonxaTroll/competitions/tree/main/kaggle/202201_titanic_ml_from_disaster',
        status: 'practice',
      },
    ],
  },
]

const certificationsByProvider: CertificationProvider[] = [
  {
    provider: 'Microsoft',
    logo: '/microsoft-azure-logo.png',
    certifications: [
      {
        name: 'DP-100',
        url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/',
      },
      {
        name: 'AI-900',
        url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
      },
      {
        name: 'PL-900',
        url: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/',
      },
    ],
  },
  {
    provider: 'Reinforcement Learning',
    logo: '/reinforcement-learning.png',
    certifications: [
      {
        name: 'Beginner to Master - AI in Python',
        url: 'https://www.udemy.com/certificate/UC-fe8abba3-029a-4d99-b95b-20faf1cbc85f/',
      },
    ],
  },
  {
    provider: 'Software Engineering',
    logo: '/software-engineering.png',
    certifications: [
      {
        name: 'Git + GitHub: Todo un sistema de control de versiones desde cero',
        url: 'https://www.udemy.com/certificate/UC-24e96bcb-a6f7-4f2f-81f2-dc80b174b91c/',
      },
      {
        name: 'Docker, de principiante a experto',
        url: 'https://www.udemy.com/certificate/UC-f42d98e9-2f71-46ab-9a3c-d8237dbb9ef9/',
      },
    ],
  },
]

function scrollToId(id: string, onDone?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  if (onDone) {
    window.setTimeout(onDone, 100)
  }
}

function resolveAssetUrl(path: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:')) {
    return path
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

function getStartYear(period: string) {
  const yearMatch = period.match(/\b(19|20)\d{2}\b/)
  return yearMatch?.[0] ?? ''
}

const experienceSkillChipClassName =
  'exp-skill-chip shrink-0 rounded-full border border-primary/45 bg-primary/15 px-2.5 py-1 text-xs font-medium text-slate-100'

type KirbySprite = {
  id: number
  gifUrl: string
  x: number
  y: number
  vx: number
  vy: number
  isDragging: boolean
}

const KIRBY_GIF = 'https://media.tenor.com/JMcX2m_W3owAAAAj/kirby-dancing.gif'

function SectionHeader({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="mb-16 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary/90">{label}</p>
      <h2 className="text-4xl font-bold text-white sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">{description}</p>
    </div>
  )
}

function App() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  const [selectedContribution, setSelectedContribution] =
    useState<Contribution | null>(null)
  const [isDark, setIsDark] = useState(true)
  const [themeAnimating, setThemeAnimating] = useState(false)
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [kirbySprites, setKirbySprites] = useState<KirbySprite[]>([])
  const [showAllExperiences, setShowAllExperiences] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllContributions, setShowAllContributions] = useState(false)
  const [showEducationDialog, setShowEducationDialog] = useState(false)
  const [showCompetitionsDialog, setShowCompetitionsDialog] = useState(false)
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)
  const [competitionSearch, setCompetitionSearch] = useState('')
  const [visibleSkillCountByExp, setVisibleSkillCountByExp] = useState<
    Record<number, number>
  >({})
  const [activeTimelineHeight, setActiveTimelineHeight] = useState(0)
  const aboutRef = useRef<HTMLElement | null>(null)
  const skillRowRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const experienceTimelineRef = useRef<HTMLDivElement | null>(null)
  const experienceCardRefs = useRef<Record<number, HTMLButtonElement | null>>({})
  const kirbyIdRef = useRef(1)
  const kirbyDragRef = useRef<
    Record<
      number,
      {
        pointerId: number
        offsetX: number
        offsetY: number
        lastX: number
        lastY: number
        lastTime: number
        vx: number
        vy: number
      }
    >
  >({})

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const handleThemeToggle = () => {
    if (themeAnimating) return
    setThemeAnimating(true)
    // Icon swaps at the peak of the Gaussian arc (midpoint)
    setTimeout(() => setIsDark((d) => !d), 310)
    setTimeout(() => setThemeAnimating(false), 650)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute('data-index') ?? '0',
              10,
            )
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const items = document.querySelectorAll('.timeline-item')
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [showAllExperiences])

  useEffect(() => {
    const activeExpId = hoveredExp

    if (activeExpId === null) {
      setActiveTimelineHeight(0)
      return
    }

    const timelineContainer = experienceTimelineRef.current
    const activeCard = experienceCardRefs.current[activeExpId]

    if (!timelineContainer || !activeCard) {
      return
    }

    const updateActiveHeight = () => {
      const containerRect = timelineContainer.getBoundingClientRect()
      const cardRect = activeCard.getBoundingClientRect()
      const nextHeight = Math.max(cardRect.bottom - containerRect.top, 0)
      setActiveTimelineHeight(nextHeight)
    }

    updateActiveHeight()
    window.addEventListener('resize', updateActiveHeight)

    return () => window.removeEventListener('resize', updateActiveHeight)
  }, [hoveredExp, showAllExperiences])

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) {
        return
      }

      const rect = aboutRef.current.getBoundingClientRect()
      // Show when 60% of the about section has scrolled past the top
      setShowStickyHeader(rect.bottom < rect.height * 0.4)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const hasActiveKirby = kirbySprites.some(
      (sprite) =>
        sprite.isDragging || Math.abs(sprite.vx) > 0.01 || Math.abs(sprite.vy) > 0.01,
    )

    if (!hasActiveKirby) {
      return
    }

    let animationFrame = 0
    let lastTime = performance.now()
    const spriteSize = 80
    const wallBounce = 0.78
    const floorFriction = 0.92
    const airFrictionPerMs = 0.9993
    const gravity = 0.0022

    const tick = (currentTime: number) => {
      const deltaMs = Math.min(34, Math.max(currentTime - lastTime, 8))
      lastTime = currentTime

      setKirbySprites((currentSprites) => {
        const maxX = Math.max(window.innerWidth - spriteSize, 0)
        const maxY = Math.max(window.innerHeight - spriteSize, 0)

        return currentSprites.map((sprite) => {
          if (sprite.isDragging) {
            return sprite
          }

          let vx = sprite.vx
          let vy = sprite.vy + gravity * deltaMs
          let x = sprite.x + vx * deltaMs
          let y = sprite.y + vy * deltaMs

          const airFriction = Math.pow(airFrictionPerMs, deltaMs)
          vx *= airFriction
          vy *= airFriction

          if (x <= 0) {
            x = 0
            vx = Math.abs(vx) * wallBounce
          } else if (x >= maxX) {
            x = maxX
            vx = -Math.abs(vx) * wallBounce
          }

          if (y <= 0) {
            y = 0
            vy = Math.abs(vy) * wallBounce
          } else if (y >= maxY) {
            y = maxY
            vy = -Math.abs(vy) * wallBounce
            vx *= floorFriction

            if (Math.abs(vy) < 0.05) {
              vy = 0
            }
            if (Math.abs(vx) < 0.01) {
              vx = 0
            }
          }

          return { ...sprite, x, y, vx, vy }
        })
      })

      animationFrame = window.requestAnimationFrame(tick)
    }

    animationFrame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [kirbySprites])

  const spawnKirby = () => {
    if (kirbySprites.length > 0) {
      return
    }

    const spriteSize = 80
    const margin = 16
    const startX = Math.max(window.innerWidth - spriteSize - margin, margin)
    const startY = Math.min(120, window.innerHeight - spriteSize - margin)

    const sprite: KirbySprite = {
      id: kirbyIdRef.current,
      gifUrl: KIRBY_GIF,
      x: startX,
      y: Math.max(startY, margin),
      vx: 0,
      vy: 0,
      isDragging: false,
    }

    kirbyIdRef.current += 1
    setKirbySprites((sprites) => [...sprites, sprite])
  }

  const updateKirbyPosition = (
    spriteId: number,
    clientX: number,
    clientY: number,
    offsetX: number,
    offsetY: number,
  ) => {
    const spriteSize = 80
    const maxX = Math.max(window.innerWidth - spriteSize, 0)
    const maxY = Math.max(window.innerHeight - spriteSize, 0)
    const nextX = Math.min(Math.max(clientX - offsetX, 0), maxX)
    const nextY = Math.min(Math.max(clientY - offsetY, 0), maxY)

    setKirbySprites((sprites) =>
      sprites.map((sprite) =>
        sprite.id === spriteId ? { ...sprite, x: nextX, y: nextY } : sprite,
      ),
    )
  }

  const handleKirbyPointerDown = (
    spriteId: number,
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()

    const rect = event.currentTarget.getBoundingClientRect()
    kirbyDragRef.current[spriteId] = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    setKirbySprites((sprites) =>
      sprites.map((sprite) =>
        sprite.id === spriteId
          ? { ...sprite, isDragging: true, vx: 0, vy: 0 }
          : sprite,
      ),
    )
  }

  const handleKirbyPointerMove = (
    spriteId: number,
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    const dragState = kirbyDragRef.current[spriteId]
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    const now = performance.now()
    const dt = Math.max(now - dragState.lastTime, 8)
    dragState.vx = (event.clientX - dragState.lastX) / dt
    dragState.vy = (event.clientY - dragState.lastY) / dt
    dragState.lastX = event.clientX
    dragState.lastY = event.clientY
    dragState.lastTime = now

    updateKirbyPosition(
      spriteId,
      event.clientX,
      event.clientY,
      dragState.offsetX,
      dragState.offsetY,
    )
  }

  const releaseKirby = (
    spriteId: number,
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    const dragState = kirbyDragRef.current[spriteId]
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    setKirbySprites((sprites) =>
      sprites.map((sprite) =>
        sprite.id === spriteId
          ? {
              ...sprite,
              isDragging: false,
              vx: dragState.vx * 1.2,
              vy: dragState.vy * 1.2,
            }
          : sprite,
      ),
    )

    delete kirbyDragRef.current[spriteId]
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const displayedExperiences = showAllExperiences
    ? experiences
    : experiences.slice(0, 3)
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3)
  const displayedContributions = showAllContributions
    ? contributionsDetailed
    : contributionsDetailed.slice(0, 3)

  useEffect(() => {
    const chipGap = 6
    const widthCache = new Map<string, number>()

    const measureChipWidth = (label: string) => {
      const cached = widthCache.get(label)
      if (cached !== undefined) {
        return cached
      }

      const probe = document.createElement('span')
      probe.className = experienceSkillChipClassName
      probe.textContent = label
      probe.style.position = 'absolute'
      probe.style.visibility = 'hidden'
      probe.style.pointerEvents = 'none'
      probe.style.whiteSpace = 'nowrap'
      document.body.appendChild(probe)
      const width = Math.ceil(probe.getBoundingClientRect().width)
      document.body.removeChild(probe)
      widthCache.set(label, width)

      return width
    }

    const calculateVisibleSkillCount = (skills: string[], containerWidth: number) => {
      if (containerWidth <= 0 || skills.length === 0) {
        return skills.length
      }

      const skillWidths = skills.map((skill) => measureChipWidth(skill))

      for (let visibleCount = skills.length; visibleCount >= 0; visibleCount -= 1) {
        const hiddenCount = skills.length - visibleCount
        const hiddenBadgeWidth =
          hiddenCount > 0 ? measureChipWidth(`+${hiddenCount}`) : 0

        let requiredWidth = 0

        for (let index = 0; index < visibleCount; index += 1) {
          requiredWidth += skillWidths[index]
        }

        if (visibleCount > 1) {
          requiredWidth += chipGap * (visibleCount - 1)
        }

        if (hiddenCount > 0) {
          requiredWidth += hiddenBadgeWidth
          if (visibleCount > 0) {
            requiredWidth += chipGap
          }
        }

        if (requiredWidth <= containerWidth) {
          return visibleCount
        }
      }

      return 0
    }

    const updateVisibleSkillCounts = () => {
      setVisibleSkillCountByExp((current) => {
        let hasChanges = false
        const next: Record<number, number> = { ...current }

        displayedExperiences.forEach((exp) => {
          const skillRow = skillRowRefs.current[exp.id]
          const availableWidth = skillRow?.clientWidth ?? 0
          const fittedSkillCount = calculateVisibleSkillCount(
            exp.skills,
            availableWidth,
          )

          if (next[exp.id] !== fittedSkillCount) {
            next[exp.id] = fittedSkillCount
            hasChanges = true
          }
        })

        return hasChanges ? next : current
      })
    }

    const frame = window.requestAnimationFrame(updateVisibleSkillCounts)
    const observer = new ResizeObserver(updateVisibleSkillCounts)

    displayedExperiences.forEach((exp) => {
      const skillRow = skillRowRefs.current[exp.id]
      if (skillRow) {
        observer.observe(skillRow)
      }
    })

    window.addEventListener('resize', updateVisibleSkillCounts)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', updateVisibleSkillCounts)
    }
  }, [showAllExperiences])

  return (
    <div className="page-bg isolate min-h-screen text-foreground">
      {/* Skip link — keyboard/screen-reader users jump straight to content */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>

      <div aria-hidden="true" className="grid-bg pointer-events-none fixed inset-0 -z-20" />
      <div aria-hidden="true" className="page-glow pointer-events-none fixed inset-0 -z-10" />

      {/* Floating Kirby easter egg */}
      {kirbySprites.map((sprite) => (
        <button
          key={sprite.id}
          type="button"
          style={{ left: sprite.x, top: sprite.y }}
          className="fixed z-[200] cursor-grab active:cursor-grabbing"
          onPointerDown={(event) => handleKirbyPointerDown(sprite.id, event)}
          onPointerMove={(event) => handleKirbyPointerMove(sprite.id, event)}
          onPointerUp={(event) => releaseKirby(sprite.id, event)}
          onPointerCancel={(event) => releaseKirby(sprite.id, event)}
        >
          <img
            src={sprite.gifUrl}
            alt="Floating Kirby"
            className="pointer-events-none w-20 select-none"
            draggable={false}
          />
        </button>
      ))}

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-background/75 shadow-[0_8px_32px_rgba(0,0,0,0.40)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <button
            type="button"
            className={`group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-300 hover:bg-white/5 ${
              showStickyHeader ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            onClick={() => scrollToId('about')}
          >
            <img
              src={resolveAssetUrl('/images/design-mode/about_me_screen.png')}
              alt="Gonzalo Candel"
              className="h-10 w-10 rounded-full border-2 border-primary object-cover transition-transform duration-200 group-hover:scale-105 group-hover:border-primary/80 group-hover:ring-2 group-hover:ring-primary/30"
            />
            <span className="text-left">
              <span className="block text-sm font-bold text-white">
                Gonzalo Candel
              </span>
              <span className="block text-xs text-primary">Data Scientist</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 text-sm md:flex">
            {['skills', 'experience', 'projects', 'contributions', 'education'].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className="relative rounded-md px-3 py-2.5 capitalize text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100"
                  onClick={() => scrollToId(item)}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <div className="flex w-40 items-center justify-end">
            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/40 text-slate-400 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* Gaussian bell curve hint — appears while animating */}
              {themeAnimating && (
                <div className="pointer-events-none absolute -top-[3.75rem] left-1/2 flex -translate-x-1/2 flex-col items-center gap-0.5">
                  <svg
                    width="76"
                    height="28"
                    viewBox="0 0 76 28"
                    fill="none"
                    className="overflow-visible drop-shadow-sm"
                  >
                    {/* x-axis baseline */}
                    <line
                      x1="2"
                      y1="24"
                      x2="74"
                      y2="24"
                      stroke="rgba(17,115,212,0.25)"
                      strokeWidth="0.8"
                    />
                    {/* Bell curve — Gaussian PDF shape */}
                    <path
                      d="M 2,23 C 10,23 14,19 18,13 C 22,7 26,2 38,2 C 50,2 54,7 58,13 C 62,19 66,23 74,23"
                      stroke="rgba(17,115,212,0.8)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Moving dot tracing the curve */}
                    <circle r="2.5" fill="#1173d4">
                      <animateMotion
                        dur="0.65s"
                        repeatCount="1"
                        fill="freeze"
                        path="M 2,23 C 10,23 14,19 18,13 C 22,7 26,2 38,2 C 50,2 54,7 58,13 C 62,19 66,23 74,23"
                      />
                    </circle>
                  </svg>
                  <span className="font-mono text-[9px] tracking-tight text-primary/70">
                    ~N(0,1)
                  </span>
                </div>
              )}

              {/* Icon — hops along the bell curve path */}
              <span
                className={`flex items-center justify-center ${themeAnimating ? 'theme-icon-hop' : ''}`}
              >
                {isDark ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <section
        id="about"
        ref={aboutRef}
        className="section-glow px-4 pb-24 pt-28 sm:px-6 sm:pt-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:items-stretch lg:gap-16">
            {/* Left: photo + name + stats */}
            <div className="flex flex-col items-center gap-6 lg:h-full lg:justify-between">
              {/* Photo frame — click for easter egg */}
              <div className="relative">
                <div aria-hidden="true" className="photo-ring" />
                <button
                  type="button"
                  aria-label="Secret"
                  className="relative z-10 h-56 w-56 overflow-hidden rounded-full border-2 border-primary/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-64 sm:w-64"
                  onClick={spawnKirby}
                >
                  <img
                    src={resolveAssetUrl('/images/design-mode/about_me_screen.png')}
                    alt="Gonzalo Candel"
                    className="h-full w-full object-cover"
                  />
                </button>
              </div>

              {/* Kirby easter egg — click photo to summon */}

              {/* Name + role */}
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Gonzalo Candel
                </h1>
                <p className="mt-1.5 text-lg text-primary">
                  Data Scientist · ML &amp; Optimization
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    Valencia, Spain
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Open to remote
                  </span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid w-full grid-cols-3 gap-2">
                <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-bold text-white">4+</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">Yrs Exp.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-bold text-white">3</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">Companies</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-bold text-white">2</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">Publications</p>
                </div>
              </div>
            </div>

            {/* Right: bio card + core stack + actions */}
            <div className="flex flex-col gap-4">
              {/* Bio in glass card */}
              <div className="flex-1 rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-6 backdrop-blur-sm">
                <p className="text-lg leading-relaxed text-slate-200">
                  Data Scientist with experience in forecasting, optimization, and
                  analytics, working across product and business teams to turn data
                  into measurable outcomes.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">
                  Skilled in Python, SQL, and ML tooling, with hands-on delivery in
                  dbt/Snowflake pipelines, FastAPI services, and observability
                  systems. I enjoy building robust solutions that improve strategic
                  decision-making.
                </p>
                <div className="bio-stack-divider mt-5 border-t border-border/40 pt-5">
                  <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Some of my stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {coreStack.map(({ icon, label }) => (
                      <span
                        key={label}
                        className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card/60 px-3 py-1 text-xs font-medium text-slate-300"
                      >
                        <svg role="img" viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-current opacity-75">
                          <path d={icon.path} />
                        </svg>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connect + Resume — column sized to Connect row natural width */}
              <div className="mt-auto flex w-fit flex-col items-start gap-4">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Connect
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 border border-border/60 bg-card/40 text-foreground backdrop-blur-sm hover:bg-card/60 hover:text-white"
                    onClick={() =>
                      window.open(
                        'https://www.linkedin.com/in/gonzalo-candel-peir%C3%B3/',
                        '_blank',
                      )
                    }
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.09V23h-4v-7.02c0-1.67-.03-3.82-2.33-3.82-2.34 0-2.7 1.82-2.7 3.7V23h-4V8Z" />
                    </svg>
                    LinkedIn
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 border border-border/60 bg-card/40 text-foreground backdrop-blur-sm hover:bg-card/60 hover:text-white"
                    onClick={() =>
                      window.open('https://github.com/GonxaTroll', '_blank')
                    }
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.68 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.5.11-3.12 0 0 .98-.31 3.2 1.19A11.1 11.1 0 0 1 12 6.1c.98 0 1.97.13 2.89.39 2.22-1.5 3.2-1.2 3.2-1.2.64 1.63.24 2.83.12 3.13.75.81 1.2 1.85 1.2 3.11 0 4.42-2.69 5.38-5.25 5.66.41.35.78 1.04.78 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                    GitHub
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 border border-border/60 bg-card/40 text-foreground backdrop-blur-sm hover:bg-card/60 hover:text-white"
                    onClick={() =>
                      window.open('https://www.kaggle.com/gonxatroll', '_blank')
                    }
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336" />
                    </svg>
                    Kaggle
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 border border-border/60 bg-card/40 text-foreground backdrop-blur-sm hover:bg-card/60 hover:text-white"
                    onClick={() => {
                      window.location.href = 'mailto:gonzalo.canpei@gmail.com'
                    }}
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </Button>
                </div>
              </div>

              {/* Download resume */}
              <Button
                size="lg"
                className="group w-full justify-center gap-2 border border-primary/60 bg-primary text-primary-foreground shadow-[0_0_0_rgba(17,115,212,0)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_28px_rgba(17,115,212,0.38)] hover:ring-2 hover:ring-primary/30 active:translate-y-0"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = resolveAssetUrl('/CV_Gonzalo.pdf')
                  link.download = 'CV_Gonzalo.pdf'
                  link.click()
                }}
              >
                <Download className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5" />
                Download Resume
              </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            label="Toolkit"
            title="Skills"
            description="Technologies and methods I use to build data products and solve analytical problems."
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {skillCategories.map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-4 backdrop-blur-sm"
              >
                {/* inner hover glow */}

                <div className="relative mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60">
                    <category.icon className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                    {category.name}
                  </p>
                </div>

                <div className="relative space-y-2.5">
                  {category.subcategories.map((sub) => (
                    <div key={sub.label}>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        {sub.label}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {sub.skills.map((skill) => (
                          <span
                            key={skill}
                            className="skill-chip rounded-full border border-primary/45 bg-primary/15 px-2.5 py-1 text-xs font-medium text-slate-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="experience-shell px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="Professional Experience"
            title="Career Timeline"
            description="Key roles where I built production-ready data products, forecasting systems, and decision intelligence."
          />

          <div className="relative" ref={experienceTimelineRef}>
            <div className="timeline-line absolute bottom-0 left-6 top-0 w-[2px] md:left-1/2 md:-translate-x-1/2" />
            <div
              className="timeline-line-active pointer-events-none absolute left-6 w-[2px] md:left-1/2 md:-translate-x-1/2"
              style={{
                height: `${activeTimelineHeight}px`,
                opacity: activeTimelineHeight > 0 ? 1 : 0,
              }}
            />

            <div className="space-y-8">
              {displayedExperiences.map((exp, index) => {
                const isRight = index % 2 === 1
                const startYear = getStartYear(exp.period)
                const previousStartYear =
                  index > 0
                    ? getStartYear(displayedExperiences[index - 1].period)
                    : ''
                const showYearBadge = Boolean(
                  startYear && (index === 0 || startYear !== previousStartYear),
                )
                const visibleSkillCount =
                  visibleSkillCountByExp[exp.id] ?? exp.skills.length
                const hiddenSkillCount = Math.max(
                  exp.skills.length - visibleSkillCount,
                  0,
                )

                return (
                  <div
                    key={exp.id}
                    data-index={index}
                    className={`timeline-item group/exp relative flex pl-16 transition-all duration-700 md:pl-0 ${
                      isRight ? 'md:justify-end' : 'md:justify-start'
                    } ${
                      index > 0 ? 'md:-mt-7' : ''
                    } ${
                      hoveredExp === exp.id ? 'z-20' : 'z-10'
                    } ${
                      visibleItems.includes(index)
                        ? 'translate-y-0 opacity-100'
                        : isRight
                          ? 'translate-y-4 opacity-0 md:translate-x-10'
                          : 'translate-y-4 opacity-0 md:-translate-x-10'
                    }`}
                  >
                    {showYearBadge && (
                      <div className="timeline-year-guide absolute left-0 right-0 top-12 hidden md:block" />
                    )}
                    {showYearBadge && (
                      <span
                        className={`absolute top-[2.1rem] z-10 hidden rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 md:block ${
                          isRight
                            ? 'left-1/2 -translate-x-[calc(100%+3.4rem)]'
                            : 'left-1/2 translate-x-[3.4rem]'
                        }`}
                      >
                        {startYear}
                      </span>
                    )}

                    <div
                      className={`timeline-connector absolute top-12 hidden h-[2px] w-8 md:block ${
                        isRight ? 'left-1/2 ml-6' : 'right-1/2 mr-6'
                      }`}
                      style={{
                        opacity: hoveredExp === exp.id ? 1 : 0.35,
                        background:
                          hoveredExp === exp.id
                            ? 'linear-gradient(90deg, rgba(120, 193, 255, 0.95), rgba(17, 115, 212, 0.88))'
                            : undefined,
                        boxShadow:
                          hoveredExp === exp.id
                            ? '0 0 16px rgba(69, 161, 242, 0.72)'
                            : '0 0 0 rgba(17, 115, 212, 0)',
                      }}
                    />

                    <div
                      className={`timeline-node-dot absolute left-0 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background shadow-[0_0_0_6px_rgba(16,25,34,0.45)] transition-transform md:left-1/2 md:-translate-x-1/2 ${
                        hoveredExp === exp.id ? 'scale-110' : 'scale-100'
                      } ${index === 0 ? 'timeline-node-current' : ''}`}
                      style={{
                        backgroundColor: index === 0
                          ? '#1173d4'
                          : (isDark ? '#1e2a3a' : '#e2e8f0'),
                      }}
                    >
                      <Briefcase
                        className="h-6 w-6"
                        style={{ color: index === 0 ? '#ffffff' : '#696c73' }}
                      />
                    </div>

                    <button
                      type="button"
                      className="group/card w-full text-left focus-visible:outline-none md:w-[calc(50%-2.25rem)]"
                      ref={(element) => {
                        experienceCardRefs.current[exp.id] = element
                      }}
                      aria-label={`Open details for ${exp.title} at ${exp.company}`}
                      onMouseEnter={() => setHoveredExp(exp.id)}
                      onMouseLeave={() => setHoveredExp(null)}
                      onClick={() => setSelectedExp(exp)}
                    >
                      <div className="experience-card rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-[0_20px_50px_rgba(17,115,212,0.2)] group-focus-visible/card:border-primary/70 group-focus-visible/card:shadow-[0_20px_50px_rgba(17,115,212,0.2)]">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-primary">{exp.company}</p>
                          <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200">
                            {exp.period}
                          </span>
                        </div>

                        <h3 className="mt-3 text-2xl font-bold text-white">
                          {exp.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                          {exp.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div
                            ref={(element) => {
                              skillRowRefs.current[exp.id] = element
                            }}
                            className="flex min-w-0 flex-1 flex-nowrap gap-1.5 overflow-hidden"
                          >
                            {exp.skills.slice(0, visibleSkillCount).map((skill) => (
                              <span
                                key={skill}
                                className={experienceSkillChipClassName}
                              >
                                {skill}
                              </span>
                            ))}
                            {hiddenSkillCount > 0 && (
                              <span className={experienceSkillChipClassName}>
                                +{hiddenSkillCount}
                              </span>
                            )}
                          </div>

                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary transition-all duration-300 group-hover/exp:border-primary/70 group-hover/exp:bg-primary/25"
                            style={{
                              borderColor:
                                hoveredExp === exp.id
                                  ? 'rgba(17, 115, 212, 0.9)'
                                  : undefined,
                              backgroundColor:
                                hoveredExp === exp.id
                                  ? 'rgba(17, 115, 212, 0.28)'
                                  : undefined,
                            }}
                            aria-hidden="true"
                          >
                            <ChevronRight
                              className="h-4 w-4 transition-transform duration-300"
                              style={{
                                transform:
                                  hoveredExp === exp.id
                                    ? 'translateX(3px)'
                                    : 'translateX(0)',
                              }}
                            />
                          </span>
                          <span className="sr-only">View details</span>
                        </div>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {experiences.length > 3 && !showAllExperiences && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowAllExperiences(true)}
                className="gap-2 bg-primary text-white"
              >
                Show Full Timeline
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="projects" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Selected Work"
            title="Projects"
            description="A selection of data science projects spanning forecasting, NLP, segmentation, and decision intelligence."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => (
              <article
                key={project.id}
                className="group relative flex h-80 cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(17,115,212,0.18)]"
                onClick={() => window.open(project.url, '_blank')}
              >
                {/* Image with scale on hover */}
                <img
                  src={resolveAssetUrl(project.image)}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Persistent gradient */}
                <div className="card-img-overlay absolute inset-0" />

                {/* Bottom content: title, tags, description - flex-grow pushes to bottom */}
                <div className="card-img-bottom relative mt-auto flex flex-col rounded-b-2xl p-6 transition-colors duration-500 group-hover:bg-[#0d1620]/80">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="card-chip rounded-full px-2.5 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40 group-hover:mt-3">
                    <p className="text-sm leading-relaxed text-slate-300">{project.fullDesc}</p>
                    <p className="mt-2 text-xs font-medium text-primary">View on GitHub →</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {projects.length > 3 && !showAllProjects && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowAllProjects(true)}
                className="gap-2 bg-primary text-white"
              >
                Show All Projects
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="contributions" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Beyond the Job"
            title="Contributions"
            description="Research, tooling, and work that extends beyond day-to-day responsibilities."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedContributions.map((contribution) => (
              <article
                key={contribution.id}
                className="group relative flex h-80 cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(17,115,212,0.18)]"
                onClick={() => {
                  if (contribution.id === 5) {
                    setShowCompetitionsDialog(true)
                  } else {
                    setSelectedContribution(contribution)
                  }
                }}
              >
                {/* Image with scale on hover */}
                <img
                  src={resolveAssetUrl(contribution.image)}
                  alt={contribution.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Persistent gradient */}
                <div className="card-img-overlay absolute inset-0" />

                {/* Bottom content: title, tags, description - flex-grow pushes to bottom */}
                <div className="card-img-bottom relative mt-auto flex flex-col rounded-b-2xl p-6 transition-colors duration-500 group-hover:bg-[#0d1620]/80">
                  <h3 className="text-xl font-bold text-white">{contribution.title}</h3>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {contribution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="card-chip rounded-full px-2.5 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40 group-hover:mt-3">
                    <p className="text-sm leading-relaxed text-slate-300">{contribution.fullDesc}</p>
                    <p className="mt-2 text-xs font-medium text-primary">See details →</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {contributionsDetailed.length > 3 && !showAllContributions && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowAllContributions(true)}
                className="gap-2 bg-primary text-white"
              >
                Show All Contributions
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="education" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-12">
          <SectionHeader
            label="Background"
            title="Education"
            description="Academic foundations, professional certifications, and languages."
          />

          {/* Academic */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary/90">Academic</p>
            <button
              type="button"
              className="group flex w-full items-center gap-5 rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 px-6 py-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-[0_20px_50px_rgba(17,115,212,0.2)]"
              onClick={() => setShowEducationDialog(true)}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/60">
                <GraduationCap className="h-5 w-5 text-slate-400" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-white">Bachelor's in Data Science</p>
                <p className="mt-0.5 text-xs text-slate-400">UPV · Universitat Politècnica de València</p>
              </div>
              <span className="shrink-0 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-slate-400">
                2018 – 2022
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary/70 group-hover:bg-primary/25">
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>

          {/* Languages */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary/90">Languages</p>
            <div className="flex flex-wrap gap-3">
              {[
                { language: 'Spanish', level: 'Native' },
                { language: 'English', level: 'C2' },
                { language: 'Chinese', level: 'HSK 2' },
              ].map(({ language, level }) => (
                <div
                  key={language}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-5 py-3"
                >
                  <span className="text-sm font-semibold text-white">{language}</span>
                  <span className="text-sm text-primary">{level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary/90">Credentials</p>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
              {certificationsByProvider.map((provider) => (
                <div key={provider.provider} className="cert-card-v2">
                  <div className="mb-3 flex items-center gap-2.5">
                    <img
                      src={resolveAssetUrl(provider.logo)}
                      alt={provider.provider}
                      className="h-7 w-7 object-contain"
                    />
                    <h3 className="text-xs font-semibold text-white">{provider.provider}</h3>
                  </div>
                  {provider.certifications.map((cert) => (
                    <button
                      key={cert.name}
                      type="button"
                      className="cert-item-v2"
                      onClick={() => window.open(cert.url, '_blank')}
                    >
                      <span className="cert-bullet-v2">▸</span>
                      <span className="cert-name-v2">{cert.name}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-white">Gonzalo Candel</span>
              <span className="text-slate-600">·</span>
              <span className="text-sm text-primary">Data Scientist</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="LinkedIn"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 text-slate-400 transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                onClick={() => window.open('https://www.linkedin.com/in/gonzalo-candel-peir%C3%B3/', '_blank')}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.09V23h-4v-7.02c0-1.67-.03-3.82-2.33-3.82-2.34 0-2.7 1.82-2.7 3.7V23h-4V8Z" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="GitHub"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 text-slate-400 transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                onClick={() => window.open('https://github.com/GonxaTroll', '_blank')}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.68 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.5.11-3.12 0 0 .98-.31 3.2 1.19A11.1 11.1 0 0 1 12 6.1c.98 0 1.97.13 2.89.39 2.22-1.5 3.2-1.2 3.2-1.2.64 1.63.24 2.83.12 3.13.75.81 1.2 1.85 1.2 3.11 0 4.42-2.69 5.38-5.25 5.66.41.35.78 1.04.78 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Kaggle"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 text-slate-400 transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                onClick={() => window.open('https://www.kaggle.com/gonxatroll', '_blank')}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Email"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 text-slate-400 transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                onClick={() => { window.location.href = 'mailto:gonzalo.canpei@gmail.com' }}
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-slate-500">© 2026 Gonzalo Candel. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Dialog open={showEducationDialog} onOpenChange={() => setShowEducationDialog(false)}>
        <DialogContent
          className="dialog-panel max-w-3xl border-primary/30 shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
          showCloseButton
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Bachelor's in Data Science</DialogTitle>
            <DialogDescription className="text-slate-300">
              UPV · Universitat Politècnica de València | 2018 – 2022
            </DialogDescription>
          </DialogHeader>
          <div>
            <h4 className="mb-2 font-semibold text-primary">Highlights</h4>
            <ul className="space-y-2">
              {[
                "Awarded Best Academic Record (2018/19)",
                "Achieved 10 Honors in core technical subjects including Linear Algebra, Statistics, and Algorithmic Techniques for Big Data.",
                "Bachelor's thesis on team formation optimization using mathematical programming (ORTools) and a genetic algorithm metaheuristic — research led to publications at HAIS 2023 and in Neurocomputing."
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 text-primary">▸</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedExp} onOpenChange={() => setSelectedExp(null)}>
        <DialogContent
          className="dialog-panel max-w-3xl border-primary/30 shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
          showCloseButton
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              {selectedExp?.title}
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              {selectedExp?.company} | {selectedExp?.period}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-primary">
                Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedExp?.skills.map((skill) => (
                  <span
                    key={skill}
                    className="exp-skill-chip rounded-full border border-primary/35 bg-primary/15 px-3 py-1 text-sm text-slate-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-primary">
                Key Responsibilities & Achievements
              </h4>
              <p className="mb-3 text-slate-300">{selectedExp?.description}</p>
              <ul className="space-y-2">
                {selectedExp?.tasks.map((task) => (
                  <li key={task} className="flex gap-2">
                    <span className="mt-0.5 text-primary">▸</span>
                    <span className="text-slate-300">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedContribution}
        onOpenChange={() => setSelectedContribution(null)}
      >
        <DialogContent className="dialog-panel max-h-[80vh] max-w-3xl overflow-y-auto border-primary/30 shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              {selectedContribution?.title}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedContribution?.fullDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="pub-cards mt-4">
            {selectedContribution?.subItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className="pub-card"
                onClick={() => window.open(item.url, '_blank')}
              >
                <div className="pub-card-title">{item.name}</div>
                <div className="pub-card-desc">{item.description}</div>
                <div className="pub-card-link">Read paper ↗</div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Competitions dialog ── */}
      <Dialog open={showCompetitionsDialog} onOpenChange={() => { setShowCompetitionsDialog(false); setSelectedCompetition(null); setCompetitionSearch('') }}>
        <DialogContent className="dialog-panel max-h-[85vh] w-full max-w-3xl overflow-y-auto border-primary/30 shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Data Science Competitions</DialogTitle>
            <DialogDescription className="text-slate-400">
              Kaggle challenges across forecasting, credit risk, and combinatorial optimization.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            {selectedCompetition ? (
              /* ── Detail view ── */
              <div>
                <button
                  type="button"
                  className="mb-4 flex cursor-pointer items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-200"
                  onClick={() => setSelectedCompetition(null)}
                >
                  ← Back to list
                </button>
                <div className="comp-detail">
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#e6edf3' }}>{selectedCompetition.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#6e7681', border: '1px solid rgba(30, 42, 58, 0.8)', padding: '2px 8px', borderRadius: 5, background: 'var(--card)' }}>{selectedCompetition.date}</span>
                      <span className={`comp-status-${selectedCompetition.status}`}>{selectedCompetition.status}</span>
                      {selectedCompetition.rank !== null && (
                        <>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700, color: '#3fb950' }}>#{selectedCompetition.rank} / {selectedCompetition.totalParticipants}</span>
                          {selectedCompetition.totalParticipants && (
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--primary)', border: '1px solid rgba(17, 115, 212, 0.35)', padding: '2px 8px', borderRadius: 5, background: 'rgba(17, 115, 212, 0.12)' }}>
                              Top {Math.round((selectedCompetition.rank / selectedCompetition.totalParticipants) * 100)}%
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.65, marginBottom: 14 }}>{selectedCompetition.description}</p>
                  <div>
                    <div className="modal-section-label">Approach</div>
                    <div className="modal-skills">
                      {selectedCompetition.approach.map((a) => (
                        <span key={a} className="modal-skill">{a}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#58a6ff', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    onClick={() => window.open(selectedCompetition.url, '_blank')}
                  >
                    View on GitHub ↗
                  </button>
                </div>
              </div>
            ) : (
              /* ── List view ── */
              <div>
                <div style={{ position: 'relative', marginBottom: 14 }}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, fill: 'none', stroke: '#6e7681', strokeWidth: 2, pointerEvents: 'none' }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search competitions…"
                    value={competitionSearch}
                    onChange={(e) => setCompetitionSearch(e.target.value)}
                    className="w-full rounded-lg border border-border/60 bg-background/60 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>
                {(() => {
                  const allComps = competitionCategories.flatMap((cat) => cat.competitions)
                  const q = competitionSearch.toLowerCase().trim()
                  const filtered = q
                    ? allComps.filter(
                        (c) =>
                          c.name.toLowerCase().includes(q) ||
                          c.description.toLowerCase().includes(q) ||
                          c.approach.some((a) => a.toLowerCase().includes(q)) ||
                          c.status.toLowerCase().includes(q) ||
                          c.date.toLowerCase().includes(q),
                      )
                    : allComps
                  if (filtered.length === 0) {
                    return <p style={{ textAlign: 'center', padding: '24px 0', fontSize: 13, color: '#6e7681' }}>No competitions match &ldquo;{competitionSearch}&rdquo;</p>
                  }
                  return (
                    <div className="comp-list">
                      {filtered.map((comp) => (
                        <button
                          key={comp.id}
                          type="button"
                          className="comp-item"
                          onClick={() => setSelectedCompetition(comp)}
                        >
                          <div className="comp-item-head">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span className="comp-item-name">{comp.name}</span>
                              <span className={`comp-status-${comp.status}`}>{comp.status}</span>
                            </div>
                            <span className="comp-item-date">{comp.date}</span>
                          </div>
                          <div className="comp-item-meta">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                              {comp.approach.map((a) => <span key={a} className="comp-tag">{a}</span>)}
                            </div>
                            {comp.rank !== null && <span className="comp-rank">#{comp.rank}/{comp.totalParticipants}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
