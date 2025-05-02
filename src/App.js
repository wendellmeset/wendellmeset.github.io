import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaEnvelope, FaPython, FaJava, FaJs, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiDotnet, SiKotlin, SiIntellijidea, SiPycharm } from 'react-icons/si';
import { BsFillMoonFill, BsFillSunFill, BsArrowUpCircle } from 'react-icons/bs';
import './App.css';

// Project data
const projects = [
  {
    id: 1,
    title: "NBTViewer",
    description: "Simple Python PyQt dark themed NBT reader/viewer for small/big endian NBT files",
    tech: ["Python", "PyQt"],
    link: "https://github.com/WendellCraft/NBTViewer",
    org: "WendellCraft"
  },
  {
    id: 2,
    title: "ChatColor-GUI-MC-Plugin",
    description: "A plugin that uses a nice GUI to change chat message colors for Minecraft 1.13+",
    tech: ["Java", "Minecraft API"],
    link: "https://github.com/WendellCraft/ChatColor-GUI-MC-Plugin",
    org: "WendellCraft"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Modern glassmorphic fluent design portfolio website created with React",
    tech: ["React", "CSS3", "JavaScript"],
    link: "https://github.com/wendellmeset/wendellmeset.github.io",
  }
];

const organizations = [
  { name: "catenarytransit", image: "https://avatars.githubusercontent.com/u/155730372?s=64&v=4" },
  { name: "the-solution-database", image: "https://avatars.githubusercontent.com/u/207802474?s=64&v=4" },
  { name: "WendellCraft", image: "https://avatars.githubusercontent.com/u/208373211?s=64&v=4" },
  { name: "WendellTech", image: "https://avatars.githubusercontent.com/u/208396169?s=64&v=4" },
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const particlesRef = useRef(null);

  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Particle animation
  useEffect(() => {
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
        });
      }
    }
    
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = darkMode 
              ? `rgba(255, 255, 255, ${0.2 - distance/500})` 
              : `rgba(0, 0, 0, ${0.2 - distance/500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
    };
    
    animate();
    
    // Update particle colors when theme changes
    if (darkMode) {
      particles.forEach(p => p.color = 'rgba(255, 255, 255, 0.5)');
    } else {
      particles.forEach(p => p.color = 'rgba(0, 0, 0, 0.5)');
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Show/hide scroll-to-top button
      if (scrollPosition > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      const sections = [
        { ref: homeRef, id: 'home' },
        { ref: aboutRef, id: 'about' },
        { ref: skillsRef, id: 'skills' },
        { ref: projectsRef, id: 'projects' },
        { ref: contactRef, id: 'contact' }
      ];
      
      for (const section of sections) {
        if (!section.ref.current) continue;
        
        const element = section.ref.current;
        const rect = element.getBoundingClientRect();
        
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', JSON.stringify(newTheme));
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <canvas ref={particlesRef} className="particle-canvas"></canvas>
      
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <span>WM</span>
        </div>
        <nav>
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''}>
              <button onClick={() => scrollToSection('home')}>Home</button>
            </li>
            <li className={activeSection === 'about' ? 'active' : ''}>
              <button onClick={() => scrollToSection('about')}>About</button>
            </li>
            <li className={activeSection === 'skills' ? 'active' : ''}>
              <button onClick={() => scrollToSection('skills')}>Skills</button>
            </li>
            <li className={activeSection === 'projects' ? 'active' : ''}>
              <button onClick={() => scrollToSection('projects')}>Projects</button>
            </li>
            <li className={activeSection === 'contact' ? 'active' : ''}>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </li>
          </ul>
        </nav>
        <div className="theme-toggle">
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" ref={homeRef} className="hero-section">
          <div className="glass-card hero-content">
            <div className="avatar">
              <img src="https://avatars.githubusercontent.com/u/69725697?v=4" alt="Wendellmeset" />
            </div>
            <h1 className="title-animation">Hi, I'm Wendellmeset</h1>
            <p className="subtitle-animation">Software Developer</p>
            <div className="social-links">
              <a href="https://github.com/wendellmeset" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="mailto:wendellmeset@proton.me" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
            <div className="scroll-indicator">
              <span className="mouse">
                <span className="mouse-wheel"></span>
              </span>
              <p>Scroll down</p>
            </div>
          </div>
        </section>

        <section id="about" ref={aboutRef}>
          <div className="glass-card">
            <h2>About Me</h2>
            <div className="about-content">
              <p>
                I'm a software developer with a passion for building robust applications and contributing to open source. 
                I enjoy tackling challenging problems and continuously expanding my technical skills.
              </p>
              
              <ul className="about-list">
                <li><span>💻</span> Currently working on a lot of things</li>
                <li><span>🌱</span> Always learning about machine learning and cyber security</li>
                <li><span>🤝</span> Open to collaborating on projects related to AI, Web Development, Cybersecurity or Minecraft</li>
                <li><span>💬</span> Ask me about Python, game development, discord bots, cybersec, and web design</li>
                <li><span>😄</span> Pronouns: He/Him</li>
              </ul>
            </div>
            
            <div className="organizations">
              <h3>Organizations</h3>
              <div className="org-list">
                {organizations.map((org, index) => (
                  <a 
                    href={`https://github.com/${org.name}`} 
                    key={index}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="org-item"
                  >
                    <img src={org.image} alt={org.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" ref={skillsRef}>
          <div className="glass-card">
            <h2>Skills</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Languages</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <FaPython />
                    <span>Python</span>
                  </div>
                  <div className="skill-item">
                    <FaJava />
                    <span>Java</span>
                  </div>
                  <div className="skill-item">
                    <FaJs />
                    <span>JavaScript</span>
                  </div>
                  <div className="skill-item">
                    <SiDotnet />
                    <span>C# (.NET)</span>
                  </div>
                  <div className="skill-item">
                    <SiKotlin />
                    <span>Kotlin</span>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Frameworks & Libraries</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <FaReact />
                    <span>React</span>
                  </div>
                  <div className="skill-item">
                    <FaNodeJs />
                    <span>Node.js</span>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Tools</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <FaGithub />
                    <span>Git</span>
                  </div>
                  <div className="skill-item">
                    <SiPycharm />
                    <span>PyCharm</span>
                  </div>
                  <div className="skill-item">
                    <SiIntellijidea />
                    <span>IntelliJ</span>
                  </div>
                  <div className="skill-item">
                    <FaDocker />
                    <span>Docker</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="github-stats">
              <h3>GitHub Stats</h3>
              <div className="stats-cards">
                <div className="stats-card">
                  <iframe 
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=wendellmeset&layout=compact&theme=${darkMode ? 'dark' : 'light'}`} 
                    frameBorder="0"
                    title="Top Languages"
                  ></iframe>
                </div>
                <div className="stats-card">
                  <iframe 
                    src={`https://github-readme-stats.vercel.app/api?username=wendellmeset&show_icons=true&theme=${darkMode ? 'dark' : 'light'}`} 
                    frameBorder="0"
                    title="GitHub Stats"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" ref={projectsRef}>
          <div className="glass-card">
            <h2>Projects</h2>
            <div className="projects-grid">
              {projects.map(project => (
                <div className="project-card" key={project.id}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    {project.org && <span className="project-org">{project.org}</span>}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" ref={contactRef}>
          <div className="glass-card">
            <h2>Contact Me</h2>
            <p>Feel free to reach out to me for collaboration or any inquiries!</p>
            
            <div className="contact-methods">
              <a href="mailto:wendellmeset@proton.me" className="contact-button">
                <FaEnvelope />
                <span>wendellmeset@proton.me</span>
              </a>
              <a href="https://github.com/wendellmeset" target="_blank" rel="noopener noreferrer" className="contact-button">
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Wendellmeset. All rights reserved.</p>
        </div>
      </footer>
      
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
          <BsArrowUpCircle />
        </button>
      )}
    </div>
  );
}

export default App;
