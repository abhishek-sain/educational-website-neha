/* =========================================================
   EduSphere — Local datasets (acts as the "backend")
   Exposed on window.EDU_DATA for use across pages.
   ========================================================= */

(function () {
  const IMG = {
    course: (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=600&q=80`,
    person: (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=200&q=80`,
  };

  const instructors = [
    { id: "ins-1", name: "Dr. Ayesha Khan", title: "Lead Data Science Instructor", bio: "12+ years in applied machine learning, formerly at a Fortune 500 analytics team. Passionate about making statistics intuitive.", photo: IMG.person("photo-1580489944761-15a19d654956"), social: { linkedin: "#", twitter: "#" } },
    { id: "ins-2", name: "Rahul Mehta", title: "Senior Full-Stack Engineer", bio: "Full-stack architect who has shipped production React and Node systems for a decade. Loves clean API design.", photo: IMG.person("photo-1507003211169-0a1dd7228f2d"), social: { linkedin: "#", github: "#" } },
    { id: "ins-3", name: "Sofia Alvarez", title: "UI/UX & Frontend Mentor", bio: "Design-engineer hybrid focused on accessible, delightful interfaces. Ex-startup design lead.", photo: IMG.person("photo-1494790108377-be9c29b29330"), social: { linkedin: "#", dribbble: "#" } },
    { id: "ins-4", name: "James Carter", title: "AI & Machine Learning Researcher", bio: "PhD in Computer Science, published researcher in deep learning, now teaching practitioners how to ship ML models.", photo: IMG.person("photo-1472099645785-5658abf4ff4e"), social: { linkedin: "#", twitter: "#" } },
    { id: "ins-5", name: "Priya Nair", title: "Business & Management Coach", bio: "Former operations director turned educator, specializing in leadership and strategic management training.", photo: IMG.person("photo-1573496359142-b8d87734a5a2"), social: { linkedin: "#" } },
    { id: "ins-6", name: "Daniel Osei", title: "Mathematics & Competitive Exam Coach", bio: "Award-winning math educator who has coached over 5,000 students through competitive exams.", photo: IMG.person("photo-1500648767791-00dcc994a43e"), social: { linkedin: "#" } },
  ];

  const courses = [
    { id: "c1", title: "Complete Web Development Bootcamp", category: "Web Development", instructorId: "ins-2", level: "Beginner", duration: "42 hours", rating: 4.8, reviews: 1240, students: 18500, price: 49.99, free: false, popular: 98, newDate: "2026-09-10", thumb: IMG.course("photo-1498050108023-c5249f4df085"), description: "Go from zero to deploying full-stack web applications using HTML, CSS, JavaScript, and Node.js.", tags: ["HTML", "CSS", "JavaScript", "Node.js"] },
    { id: "c2", title: "Python for Data Science & Analytics", category: "Data Science", instructorId: "ins-1", level: "Beginner", duration: "36 hours", rating: 4.9, reviews: 2110, students: 24300, price: 0, free: true, popular: 100, newDate: "2026-08-02", thumb: IMG.course("photo-1551288049-bebda4e38f71"), description: "Master Python, Pandas, NumPy, and visualization libraries to analyze real-world datasets.", tags: ["Python", "Pandas", "NumPy"] },
    { id: "c3", title: "Machine Learning A-Z", category: "Artificial Intelligence", instructorId: "ins-4", level: "Intermediate", duration: "50 hours", rating: 4.7, reviews: 1860, students: 15200, price: 59.99, free: false, popular: 90, newDate: "2026-07-15", thumb: IMG.course("photo-1485827404703-89b55fcc595e"), description: "Build and deploy supervised and unsupervised machine learning models using Python and scikit-learn.", tags: ["ML", "Python", "scikit-learn"] },
    { id: "c4", title: "React.js — Modern Frontend Development", category: "Web Development", instructorId: "ins-3", level: "Intermediate", duration: "28 hours", rating: 4.8, reviews: 980, students: 11200, price: 44.99, free: false, popular: 85, newDate: "2026-10-01", thumb: IMG.course("photo-1633356122544-f134324a6cee"), description: "Learn component architecture, hooks, state management, and build production-ready React apps.", tags: ["React", "JavaScript", "Hooks"] },
    { id: "c5", title: "JavaScript Fundamentals", category: "Programming", instructorId: "ins-2", level: "Beginner", duration: "20 hours", rating: 4.6, reviews: 2210, students: 30100, price: 0, free: true, popular: 95, newDate: "2026-05-20", thumb: IMG.course("photo-1579468118864-1b9ea3c0db4a"), description: "A rock-solid foundation in JavaScript syntax, logic, DOM manipulation, and ES6+ features.", tags: ["JavaScript", "ES6", "DOM"] },
    { id: "c6", title: "Deep Learning with Neural Networks", category: "Artificial Intelligence", instructorId: "ins-4", level: "Advanced", duration: "55 hours", rating: 4.9, reviews: 760, students: 7400, price: 69.99, free: false, popular: 80, newDate: "2026-06-11", thumb: IMG.course("photo-1555255707-c07966088b7b"), description: "Dive deep into CNNs, RNNs, and transformer architectures using TensorFlow and PyTorch.", tags: ["Deep Learning", "TensorFlow", "PyTorch"] },
    { id: "c7", title: "Business Management Essentials", category: "Business & Management", instructorId: "ins-5", level: "Beginner", duration: "18 hours", rating: 4.5, reviews: 540, students: 9800, price: 29.99, free: false, popular: 60, newDate: "2026-04-14", thumb: IMG.course("photo-1552664730-d307ca884978"), description: "Core principles of leadership, operations, and strategy for new and aspiring managers.", tags: ["Leadership", "Strategy"] },
    { id: "c8", title: "Advanced Calculus & Linear Algebra", category: "Mathematics", instructorId: "ins-6", level: "Advanced", duration: "32 hours", rating: 4.7, reviews: 410, students: 5200, price: 24.99, free: false, popular: 55, newDate: "2026-03-02", thumb: IMG.course("photo-1509228468518-180dd4864904"), description: "Rigorous coverage of calculus and linear algebra concepts needed for engineering and data science.", tags: ["Calculus", "Linear Algebra"] },
    { id: "c9", title: "Physics for Competitive Exams", category: "Science", instructorId: "ins-6", level: "Intermediate", duration: "40 hours", rating: 4.6, reviews: 690, students: 8900, price: 0, free: true, popular: 70, newDate: "2026-09-28", thumb: IMG.course("photo-1532094349884-543bc11b234d"), description: "Comprehensive physics preparation tailored for national-level competitive entrance exams.", tags: ["Physics", "Exam Prep"] },
    { id: "c10", title: "Node.js & Express — Backend Mastery", category: "Web Development", instructorId: "ins-2", level: "Intermediate", duration: "30 hours", rating: 4.8, reviews: 870, students: 10100, price: 39.99, free: false, popular: 82, newDate: "2026-02-18", thumb: IMG.course("photo-1555066931-4365d14bab8c"), description: "Build secure, scalable REST APIs with Node.js, Express, and MongoDB.", tags: ["Node.js", "Express", "MongoDB"] },
    { id: "c11", title: "UI/UX Design Principles", category: "Web Development", instructorId: "ins-3", level: "Beginner", duration: "22 hours", rating: 4.9, reviews: 1320, students: 16700, price: 34.99, free: false, popular: 88, newDate: "2026-10-20", thumb: IMG.course("photo-1559028006-448665bd7c7f"), description: "Learn user research, wireframing, prototyping, and visual design fundamentals.", tags: ["UI", "UX", "Figma"] },
    { id: "c12", title: "Competitive Programming Bootcamp", category: "Programming", instructorId: "ins-6", level: "Advanced", duration: "45 hours", rating: 4.7, reviews: 390, students: 4600, price: 54.99, free: false, popular: 65, newDate: "2026-01-09", thumb: IMG.course("photo-1515879218367-8466d910aaa4"), description: "Master data structures, algorithms, and problem-solving strategies for coding contests.", tags: ["DSA", "Algorithms"] },
  ];

  const curriculumFor = (course) => ([
    { title: "Getting Started", lessons: ["Course Introduction & Setup", "Tools You'll Need", "How This Course Works"] },
    { title: `Core ${course.category} Concepts`, lessons: ["Foundational Theory", "Hands-on Walkthrough", "Common Pitfalls"] },
    { title: "Building a Real Project", lessons: ["Project Planning", "Implementation", "Testing & Debugging"] },
    { title: "Wrapping Up", lessons: ["Best Practices", "Next Steps & Resources", "Final Assessment"] },
  ]);

  const reviewsFor = () => ([
    { name: "Liam Thompson", photo: IMG.person("photo-1500648767791-00dcc994a43e"), rating: 5, date: "2026-09-02", text: "Extremely clear explanations and well-paced lessons. The projects really solidified my understanding." },
    { name: "Grace Kim", photo: IMG.person("photo-1438761681033-6461ffad8d80"), rating: 5, date: "2026-08-21", text: "Best course I've taken on this topic. The instructor anticipates every question you might have." },
    { name: "Mohammed Farouk", photo: IMG.person("photo-1472099645785-5658abf4ff4e"), rating: 4, date: "2026-07-30", text: "Great content overall. Would love a bit more advanced material toward the end." },
  ]);

  const programs = [
    { id: "p1", title: "Full Stack Web Development Program", duration: "6 months", level: "Beginner to Advanced", image: IMG.course("photo-1461749280684-dccba630e2f6"), description: "A complete path from HTML fundamentals to deploying full-stack JavaScript applications.", outcomes: ["Build responsive websites", "Develop REST APIs with Node.js", "Deploy production apps", "Collaborate using Git"] },
    { id: "p2", title: "Data Science Career Program", duration: "8 months", level: "Intermediate", image: IMG.course("photo-1551288049-bebda4e38f71"), description: "Hands-on training in statistics, Python, and machine learning for aspiring data scientists.", outcomes: ["Analyze real datasets", "Build ML models", "Visualize insights", "Prepare for data roles"] },
    { id: "p3", title: "AI & Machine Learning Program", duration: "7 months", level: "Advanced", image: IMG.course("photo-1485827404703-89b55fcc595e"), description: "Deep dive into neural networks, computer vision, and NLP with production deployment.", outcomes: ["Design neural networks", "Work with TensorFlow/PyTorch", "Ship ML APIs", "Understand model ethics"] },
    { id: "p4", title: "Python Programming Program", duration: "4 months", level: "Beginner", image: IMG.course("photo-1526379095098-d400fd0bf935"), description: "Build a strong foundation in Python for automation, scripting, and backend development.", outcomes: ["Write clean Python code", "Automate workflows", "Build small applications", "Understand OOP"] },
    { id: "p5", title: "Digital Marketing Program", duration: "3 months", level: "Beginner", image: IMG.course("photo-1557838923-2985c318be48"), description: "Learn SEO, social media, content, and paid advertising strategy for modern brands.", outcomes: ["Plan marketing campaigns", "Optimize for SEO", "Analyze marketing data", "Manage ad budgets"] },
    { id: "p6", title: "Career Development Accelerator", duration: "2 months", level: "All Levels", image: IMG.course("photo-1552664730-d307ca884978"), description: "Resume building, interview prep, and professional branding to land your next role.", outcomes: ["Build a standout resume", "Ace technical interviews", "Grow your network", "Negotiate offers"] },
  ];

  const blogs = [
    { id: "b1", title: "10 Habits of Highly Effective Online Learners", category: "Study Tips", author: "Sofia Alvarez", date: "2026-10-12", readTime: "6 min read", thumb: IMG.course("photo-1434030216411-0b793f4b4173"), excerpt: "Discover the daily habits that separate learners who finish courses from those who don't.", content: `
      <p>Online learning offers incredible flexibility, but that same freedom can make it easy to lose momentum. After studying thousands of learner profiles, a handful of habits consistently show up among students who complete their courses and retain what they learn.</p>
      <h2>1. Set a fixed study window</h2>
      <p>Treat your learning time like an unmissable appointment. Learners who study at the same time each day report significantly higher completion rates than those who "find time when they can."</p>
      <h2>2. Take notes by hand or in your own words</h2>
      <p>Transcribing a lecture word-for-word doesn't build understanding. Paraphrasing forces your brain to actually process the material.</p>
      <h2>3. Apply concepts immediately</h2>
      <p>Pause after each lesson and try to use what you just learned, even in a tiny project. Active recall beats passive watching every time.</p>
      <h2>4. Join a community</h2>
      <p>Accountability from peers — even strangers in a forum — dramatically increases follow-through.</p>
      <h2>5. Review before moving on</h2>
      <p>Spend five minutes at the start of each session reviewing the previous one. Spaced repetition is one of the most well-evidenced learning techniques we have.</p>
    ` },
    { id: "b2", title: "How to Choose the Right Programming Language to Learn First", category: "Programming", author: "Rahul Mehta", date: "2026-09-28", readTime: "8 min read", thumb: IMG.course("photo-1555066931-4365d14bab8c"), excerpt: "Python? JavaScript? Java? Here's a practical framework for picking your first language.", content: `
      <p>New developers often get stuck before they even start — paralyzed by which language to learn first. The truth is less dramatic than forum debates suggest: most popular languages can get you to a job. What matters is matching the language to your goal.</p>
      <h2>If you want to build websites</h2>
      <p>Start with JavaScript. It runs in the browser natively and is the backbone of modern frontend and backend (Node.js) development.</p>
      <h2>If you want to work with data</h2>
      <p>Python's readable syntax and massive ecosystem (Pandas, NumPy, scikit-learn) make it the default choice for data science and machine learning.</p>
      <h2>If you want to build mobile or enterprise apps</h2>
      <p>Consider Java or Kotlin for Android, Swift for iOS, or C# if you're targeting enterprise software.</p>
      <h2>The real answer</h2>
      <p>Pick one, commit for 90 days, and build real projects. Language-hopping before you've built anything substantial is the actual productivity killer.</p>
    ` },
    { id: "b3", title: "Breaking Into Data Science: A Realistic Roadmap", category: "Data Science", author: "Dr. Ayesha Khan", date: "2026-09-15", readTime: "10 min read", thumb: IMG.course("photo-1551288049-bebda4e38f71"), excerpt: "Skip the hype — here's what actually matters when transitioning into a data science career.", content: `
      <p>Data science job postings often list an overwhelming set of requirements. In practice, hiring managers care about a much smaller set of core competencies.</p>
      <h2>Step 1: Statistics before algorithms</h2>
      <p>Understanding distributions, hypothesis testing, and bias will serve you longer than memorizing model names.</p>
      <h2>Step 2: Get fluent in Python and SQL</h2>
      <p>These two skills alone cover the majority of day-to-day data work across most companies.</p>
      <h2>Step 3: Build a portfolio with real messy data</h2>
      <p>Kaggle datasets are fine for practice, but a project using scraped or public government data stands out far more in interviews.</p>
      <h2>Step 4: Learn to communicate findings</h2>
      <p>The best model in the world is worthless if you can't explain its implications to a non-technical stakeholder.</p>
    ` },
    { id: "b4", title: "Understanding Neural Networks Without the Math Overload", category: "Artificial Intelligence", author: "James Carter", date: "2026-08-30", readTime: "9 min read", thumb: IMG.course("photo-1555255707-c07966088b7b"), excerpt: "A gentle, intuition-first explanation of how neural networks actually learn.", content: `
      <p>Neural networks are often introduced through dense notation that obscures a fairly intuitive idea: adjusting many small knobs until predictions get better.</p>
      <h2>The building block: a neuron</h2>
      <p>Each neuron takes inputs, multiplies them by weights, adds a bias, and passes the result through an activation function. That's it.</p>
      <h2>Why layers matter</h2>
      <p>Stacking neurons in layers lets the network combine simple patterns into increasingly abstract ones — edges into shapes into objects, for example.</p>
      <h2>How learning happens</h2>
      <p>Backpropagation calculates how much each weight contributed to an error, and gradient descent nudges weights in the direction that reduces that error.</p>
      <h2>You don't need to memorize the calculus</h2>
      <p>Frameworks like TensorFlow and PyTorch compute gradients for you. Understanding the intuition is what helps you debug and design better architectures.</p>
    ` },
    { id: "b5", title: "Remote Learning vs Traditional Classrooms: What the Data Shows", category: "Education Trends", author: "Priya Nair", date: "2026-08-05", readTime: "7 min read", thumb: IMG.course("photo-1498050108023-c5249f4df085"), excerpt: "A balanced look at outcomes, engagement, and flexibility across both learning formats.", content: `
      <p>The shift toward online education sparked years of debate about whether it can truly match in-person instruction. The honest answer: it depends heavily on the learner and the subject.</p>
      <h2>Where online learning wins</h2>
      <p>Flexibility, self-paced review, and access to specialized instructors regardless of geography are clear advantages.</p>
      <h2>Where classrooms still shine</h2>
      <p>Immediate feedback, peer pressure as motivation, and hands-on lab work remain harder to fully replicate online.</p>
      <h2>The hybrid future</h2>
      <p>Most effective modern programs blend recorded lessons with live sessions, mentorship, and community — capturing the best of both formats.</p>
    ` },
    { id: "b6", title: "Acing Technical Interviews: What Interviewers Actually Look For", category: "Career", author: "Rahul Mehta", date: "2026-07-22", readTime: "8 min read", thumb: IMG.course("photo-1552664730-d307ca884978"), excerpt: "It's rarely about the perfect answer. Here's what really moves the needle in interviews.", content: `
      <p>Having sat on both sides of the technical interview table, one pattern stands out: candidates overestimate the value of a "correct" answer and underestimate the value of clear thinking.</p>
      <h2>Narrate your thought process</h2>
      <p>Interviewers are evaluating how you approach unfamiliar problems, not just whether you reach the solution.</p>
      <h2>Ask clarifying questions</h2>
      <p>Jumping straight into code without confirming requirements is one of the most common mistakes.</p>
      <h2>It's fine to get stuck</h2>
      <p>How you recover from being stuck — breaking the problem down, trying a smaller case — often matters more than getting it right immediately.</p>
      <h2>Practice communicating, not just solving</h2>
      <p>Mock interviews with another person reveal communication gaps that solo practice never will.</p>
    ` },
  ];

  const resources = [
    { id: "r1", title: "JavaScript Cheat Sheet (PDF)", subject: "Programming", type: "PDF", size: "1.2 MB", downloads: 4820, file: "assets/downloads/sample-resources/javascript-cheatsheet.pdf" },
    { id: "r2", title: "Data Structures & Algorithms Notes", subject: "Programming", type: "Notes", size: "850 KB", downloads: 3190, file: "assets/downloads/sample-resources/dsa-notes.pdf" },
    { id: "r3", title: "Python for Data Analysis — Practice Set", subject: "Data Science", type: "Practice Questions", size: "640 KB", downloads: 2710, file: "assets/downloads/sample-resources/python-practice-set.pdf" },
    { id: "r4", title: "Machine Learning Interview Questions", subject: "Artificial Intelligence", type: "Interview Prep", size: "980 KB", downloads: 3980, file: "assets/downloads/sample-resources/ml-interview-questions.pdf" },
    { id: "r5", title: "Calculus Formula Handbook", subject: "Mathematics", type: "Notes", size: "710 KB", downloads: 2150, file: "assets/downloads/sample-resources/calculus-handbook.pdf" },
    { id: "r6", title: "Physics Previous Year Papers (2020–2025)", subject: "Science", type: "Previous Papers", size: "2.4 MB", downloads: 5230, file: "assets/downloads/sample-resources/physics-previous-papers.pdf" },
    { id: "r7", title: "React Hooks Quick Reference", subject: "Web Development", type: "Tutorial", size: "540 KB", downloads: 2890, file: "assets/downloads/sample-resources/react-hooks-reference.pdf" },
    { id: "r8", title: "SQL Practice Exercises", subject: "Data Science", type: "Coding Exercises", size: "430 KB", downloads: 3310, file: "assets/downloads/sample-resources/sql-practice-exercises.pdf" },
    { id: "r9", title: "Business Case Study Collection", subject: "Business & Management", type: "Notes", size: "1.5 MB", downloads: 1760, file: "assets/downloads/sample-resources/business-case-studies.pdf" },
  ];

  const testimonials = [
    { name: "Olivia Bennett", role: "Frontend Developer @ a startup", photo: IMG.person("photo-1438761681033-6461ffad8d80"), rating: 5, text: "EduSphere's Web Development Bootcamp took me from knowing nothing to landing my first developer job in six months. The project-based structure made all the difference." },
    { name: "Carlos Rivera", role: "Data Analyst", photo: IMG.person("photo-1500648767791-00dcc994a43e"), rating: 5, text: "The Data Science program is unbelievably thorough. I went in with zero statistics background and came out confident building real models." },
    { name: "Fatima Al-Sayed", role: "Graduate Student", photo: IMG.person("photo-1494790108377-be9c29b29330"), rating: 5, text: "The competitive exam courses are exactly what I needed — focused, well-paced, and taught by instructors who clearly know how exams are structured." },
  ];

  const faqs = [
    { q: "Do I get a certificate after completing a course?", a: "Yes. Every course and program on EduSphere includes a shareable completion certificate once you finish all required modules and assessments." },
    { q: "Can I learn at my own pace?", a: "Absolutely. All our courses are self-paced with lifetime access, so you can revisit lessons anytime that fits your schedule." },
    { q: "Are there any prerequisites for beginner courses?", a: "No prior experience is required for courses marked 'Beginner'. We start from the fundamentals and build up gradually." },
    { q: "What if I'm not satisfied with a paid course?", a: "We offer a 14-day satisfaction window on all paid courses — reach out to our support team and we'll make it right." },
    { q: "Do you offer mentorship or live support?", a: "Our Programs include scheduled live sessions and mentor office hours. Individual courses include community Q&A access." },
    { q: "How do I access downloaded study resources?", a: "All study resources are available directly from the Study Resources page — no account required for sample materials." },
  ];

  window.EDU_DATA = { courses, programs, blogs, resources, instructors, testimonials, faqs, curriculumFor, reviewsFor };
})();
