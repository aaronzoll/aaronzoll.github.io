---
layout: splash
title: CV
permalink: /cv/

header:
  overlay_color: "#fff"
  overlay_filter: "rgba(0, 0, 0, 0.15)"
  overlay_image: "/assets/images/about_banner.png"
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>

---


<style>
  .page__content {
    max-width: 800px;
    margin-inline: auto;
  }

  .bubble { padding: 1.25rem 1.5rem; width: 100%; }

  /* ── Header row: contact info + download button ─────────── */
  .cv-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .cv-contact-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1.5rem;
    font-size: 0.9rem;
  }

  .arxiv-btn {
    flex-shrink: 0;
    display: inline-block;
    padding: 0.3rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: #3a4f63;
    background: #eceff3;
    border: 1px solid #a0aebb;
    border-radius: 4px;
    text-decoration: none;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .arxiv-btn:hover {
    background: #dde3ea;
    border-color: #7a8fa0;
    text-decoration: none;
    color: #3a4f63;
  }

  .arxiv-btn:active {
    background: #c8d2dc;
    border-color: #556b7d;
  }

  /* ── Simple two-column rows (education, courses, awards) ──── */
  .venue-list { display: flex; flex-direction: column; }

  .venue-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 0.32rem 0.5rem;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 1px solid rgba(100, 120, 140, 0.15);
  }

  .venue-item:last-child { border-bottom: none; }
  .venue-name { flex: 1; }

  .venue-date {
    flex-shrink: 0;
    font-size: 0.8rem;
    color: #6b7c8a;
    font-style: italic;
    white-space: nowrap;
  }

  .cv-subsection-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 1rem 0 0.3rem;
  }

  .cv-subsection-label:first-child { margin-top: 0; }

  /* ── Entries with a paragraph body (experience, research) ─── */
  .cv-entry-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cv-entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .cv-entry-title {
    font-weight: 600;
    font-size: 0.98rem;
  }

  .cv-entry-date {
    flex-shrink: 0;
    font-size: 0.82rem;
    color: #6b7c8a;
    font-style: italic;
    white-space: nowrap;
  }

  .cv-entry-subtitle {
    font-size: 0.85rem;
    font-style: italic;
    color: #556b7d;
    margin-top: 0.1rem;
  }

  .cv-entry-body {
    font-size: 0.92rem;
    line-height: 1.5;
    margin-top: 0.35rem;
  }

  /* ── Publications (reuse site-wide paper list pattern) ─────── */
  .paper-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 0;
  }

  .paper-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 0.55rem 0.75rem;
    border-bottom: 1px solid rgba(139, 90, 43, 0.2);
  }

  .paper-row:last-child { border-bottom: none; }

  .paper-title {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.45;
  }

  /* ── Talks: grouped venue lists under a topic heading ──────── */
  .talk-topic { margin-bottom: 1.2rem; }
  .talk-topic:last-child { margin-bottom: 0; }

  .talk-topic-heading {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
  }

  /* ── Skills paragraph list ──────────────────────────────────── */
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    padding-inline-start: 1.1rem;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  /* ── Software row ───────────────────────────────────────────── */
  .software-row {
    text-align: center;
    font-size: 0.95rem;
    color: #3a4f63;
    letter-spacing: 0.02em;
  }

  @media (max-width: 600px) {
    .bubble { padding: 1rem; border-radius: 10px; }
    .cv-header-row { flex-direction: column; align-items: flex-start; }
  }
</style>

<div class="bubble">
  <div class="cv-header-row">
    <div class="cv-contact-list">
      <span>Email: <a href="mailto:azoll1@jhu.edu">azoll1@jhu.edu</a></span>
      <span>Web: <a href="https://aaronzoll.github.io" target="_blank">aaronzoll.github.io</a></span>
    </div>
    <a class="arxiv-btn" href="/assets/cv.pdf" target="_blank">Download PDF</a>
  </div>
</div>

<div class="bubble">
  <h4><strong>Education</strong></h4>
  <div class="venue-list">
    <div class="venue-item">
      <span class="venue-name">Johns Hopkins, Graduate — Ph.D in Applied Mathematics</span>
      <span class="venue-date">August 2023 – Present</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Johns Hopkins, Graduate — M.S in Applied Mathematics</span>
      <span class="venue-date">August 2022 – May 2023</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Johns Hopkins, Undergraduate — B.S in Applied Mathematics</span>
      <span class="venue-date">August 2019 – May 2022</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Johns Hopkins, Undergraduate — B.A in Mathematics</span>
      <span class="venue-date">August 2019 – May 2022</span>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Teaching Experience</strong></h4>
  <div class="cv-entry-list">
  <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Johns Hopkins, Baltimore — Course Instructor</span>
        <span class="cv-entry-date">Summer 2022 -- Present</span>
      </div>
      <p class="cv-entry-body">Developed a complete syllabus, lecture notes, and assignments to facilitate courses ranging from 15 to 80 students. Presented extensive lectures on linear algebra, probability, statistics, data analysis, and differential equations.  Facilitated student engagement and discussion.</p>
    </div>
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Johns Hopkins, Baltimore — Teaching Assistant</span>
        <span class="cv-entry-date">January 2020 – Present</span>
      </div>
      <p class="cv-entry-body">Supported instruction in twenty undergraduate and graduate-level courses through grading, writing lecture notes, designing assignments, leading weekly discussion sections, and providing academic support to students. Collaborated with faculty to reinforce core course concepts and foster a strong learning environment.</p>
    </div>
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Johns Hopkins, Baltimore — Course Developer</span>
        <span class="cv-entry-date">Summer 2021 – 2025</span>
      </div>
      <p class="cv-entry-body">Contributed to the design and development of new mathematics and engineering courses. Authored original lecture material, guided Excel practice problems, engaging problem sets, and instructional resources tailored to enhance pedagogical clarity and student engagement.</p>
    </div>
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Johns Hopkins, Baltimore — MSE Orientation Review Session</span>
        <span class="cv-entry-date">August 2023/2024</span>
      </div>
      <p class="cv-entry-body">Designed and led a series of review sessions for the incoming 120 masters students, covering foundational concepts in linear algebra and matrix analysis. Developed comprehensive lecture notes and facilitated interactive discussions to prepare students for rigorous graduate coursework.</p>
    </div>
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Mathnasium, Baltimore — Math Instructor</span>
        <span class="cv-entry-date">August 2019 – December 2019</span>
      </div>
      <p class="cv-entry-body">Tutored dozens of students ages 6 to 18 in fundamental math topics ranging from multiplication tables to AP calculus. Adapted instruction to individual learning styles, promoting confidence and mastery in mathematical skills.</p>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Instructor of Record</strong></h4>
  <div class="cv-entry-list">
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Data Analysis Workshop (AS.110.100)</span>
        <span class="cv-entry-date">Summer 2023-2026</span>
      </div>
      <p class="cv-entry-body">In this two-week pre-college program, students work in groups to construct and present a data analysis project which collects, organizes, cleanses, and visualizes a dataset of their choosing. Topics include exploratory data analysis, data visualization, probability distributions, data scraping and cleansing, the basics of hypothesis testing, and regression modeling.
</p>
    </div>
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Linear Algebra and Differential Equations (EN.553.291)</span>
        <span class="cv-entry-date">Fall 2026</span>
      </div>
      <p class="cv-entry-body">An introduction to the basic concepts of linear algebra, matrix theory, and differential equations that are used widely in modern engineering and science.</p>
    </div>
  </div>
</div>



<div class="bubble">
  <h4><strong>Course Development</strong></h4>
  <div class="cv-entry-list">
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">College Algebra (AS.110.102) — Complete</span>
        <span class="cv-entry-date">Summer 2021</span>
      </div>
      <div class="cv-entry-subtitle">Course Developer, Johns Hopkins University</div>
      <p class="cv-entry-body">Collaborated with the Director of Online Programs to develop a comprehensive College Algebra course aimed at preparing incoming students for success in higher-level mathematics. Designed instructional content to reinforce key algebraic concepts through accessible and engaging materials.</p>
    </div>
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Data Analysis Workshop (AS.110.100) — Complete</span>
        <span class="cv-entry-date">Summer 2022</span>
      </div>
      <div class="cv-entry-subtitle">Course Developer &amp; Instructor, Johns Hopkins University</div>
      <p class="cv-entry-body">Developed and launched a summer course for high school students introducing the fundamentals of data analysis, probability, and statistics. Encouraged students to master effective presentation skills and collaborative work. Produced a full suite of materials, including lecture videos, online quizzes, interactive assignments, and guided Excel tutorials, delivered to over 50 students annually.</p>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Teaching Assistant</strong></h4>

  <div class="cv-subsection-label">Graduate Teaching Assistant</div>
  <div class="venue-list">
    <div class="venue-item">
      <span class="venue-name">Machine Learning 1 (EN.553.740)</span>
      <span class="venue-date">Fall 2025</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Introduction to Computational Mathematics (EN.553.385)</span>
      <span class="venue-date">Spring 2025, Spring 2026</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Introduction to Convexity (EN.553.665)</span>
      <span class="venue-date">Fall 2024, Spring 2024</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Matrix Analysis and Linear Algebra (EN.553.792)</span>
      <span class="venue-date">Fall 2023</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Mathematical Game Theory (EN.553.653)</span>
      <span class="venue-date">Spring 2023</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Mathematical Modeling and Consulting (EN.553.400)</span>
      <span class="venue-date">Spring 2023</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Optimization in Finance (EN.553.661)</span>
      <span class="venue-date">Fall 2022</span>
    </div>
  </div>

  <div class="cv-subsection-label">Undergraduate Teaching Assistant</div>
  <div class="venue-list">
    <div class="venue-item">
      <span class="venue-name">Real Analysis I (EN.553.405)</span>
      <span class="venue-date">Spring 2022, Summer 2022</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Cryptology and Coding (EN.553.371)</span>
      <span class="venue-date">Spring 2022</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Calculus II (For Biological and Social Science) (AS.110.107)</span>
      <span class="venue-date">Spring 2022</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Honors Discrete Mathematics (EN.553.172)</span>
      <span class="venue-date">Fall 2021</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Differential Equations and Applications (AS.110.302)</span>
      <span class="venue-date">Fall 2021, Spring 2021</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Discrete Mathematics (EN.553.171)</span>
      <span class="venue-date">Spring 2021, Fall 2020</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Calculus III (AS.110.202)</span>
      <span class="venue-date">Fall 2020</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Introduction to Computing (AS.205.205)</span>
      <span class="venue-date">Spring 2020</span>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Research</strong></h4>
  <div class="cv-entry-list">
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Optimization Research</span>
        <span class="cv-entry-date">Ongoing</span>
      </div>
      <div class="cv-entry-subtitle">Dissertation research with Dr. Benjamin Grimmer, Johns Hopkins University</div>
      <p class="cv-entry-body">Conducting theoretical research on algorithm design and analysis to unify the regimes between smooth and nonsmooth convex problem classes (e.g. functions exhibiting Hölder smoothness or uniform convexity). Prior work focused on heterogeneously smooth and convex compositions, calculus results expanding and characterizing dual notions between Hölder smoothness and uniform convexity, interpolation theory for inexactly smooth convex functions, performance estimation over respective problem classes, and universal algorithm design. Future work entails characterizing the class of minimax optimal methods for convex Lipschitz minimization.</p>
    </div>
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">AI Pedagogy Research</span>
        <span class="cv-entry-date">Ongoing</span>
      </div>
      <div class="cv-entry-subtitle">Extracurricular research led by Dr. Sergey Kushnarev, Johns Hopkins University</div>
      <p class="cv-entry-body">Experimentation and implementation of various AI derived course assistants. Herein, we discuss, analyze, and test different methods for embedding the rising LLM tools into the education system. By supplying agents with structured prompts, focused on providing students with motivation and step-by-step guidance instead of direct answers, we aim to improve comprehension and intellectual capability.</p>
    </div>
    <div class="cv-entry">
      <div class="cv-entry-header">
        <span class="cv-entry-title">Signal Processing Research</span>
        <span class="cv-entry-date">Upcoming</span>
      </div>
      <div class="cv-entry-subtitle">Planned collaboration with Dr. Mario Michelli &amp; Kaleigh Rudge, Johns Hopkins University</div>
      <p class="cv-entry-body">Preparing to investigate spectral properties of the Discrete Fourier Transform and its connections to signal representation and harmonic analysis. Further investigation will include advancing understanding of the Fractional Fourier Transform, smoothly interpolating between the signal and frequency domains.</p>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Publications</strong></h4>

  <div class="cv-subsection-label">Accepted Papers</div>
  <div class="paper-list">
    <div class="paper-row">
      <span class="paper-title">A Universally Optimal Primal-Dual Method for Minimizing Heterogeneous Compositions<br><em>(IMA Journal of Numerical Analysis, 2025)</em></span>
      <div style="display:flex;gap:0.4rem;flex-shrink:0;">
        <a class="arxiv-btn" href="https://docs.google.com/presentation/d/1tWwSVU1H9AicJsRl5ckGGWJNYubuAOYnmS248aNhD9s/edit?usp=sharing" target="_blank">slides</a>
        <a class="arxiv-btn" href="https://arxiv.org/abs/2503.07566" target="_blank">arXiv</a>
      </div>
    </div>
  </div>

  <div class="cv-subsection-label">Preprints</div>
  <div class="paper-list">
    <div class="paper-row">
      <span class="paper-title">Inexactly Smooth Performance Estimation and New Optimized Gradient Methods<br><em>(2026)</em></span>
      <div style="display:flex;gap:0.4rem;flex-shrink:0;">
        <a class="arxiv-btn" href="https://docs.google.com/presentation/d/16-uQ_1_5pgzji-R4n-FNhOw6n-XYtm5olD0_tYGngIs/edit?usp=sharing" target="_blank">slides</a>
        <a class="arxiv-btn" href="https://arxiv.org/abs/2606.01505" target="_blank">arXiv</a>
      </div>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Talks</strong></h4>

  <div class="talk-topic">
    <div class="talk-topic-heading">On Interpolation Theory</div>
    <div class="venue-list">
      <div class="venue-item">
        <span class="venue-name">Johns Hopkins <a href="https://sites.google.com/view/ams-grad-seminar" target="_blank">Applied Mathematics and Statistics Student Seminar</a></span>
        <span class="venue-date">Mar. 2026</span>
      </div>
      <div class="venue-item">
        <span class="venue-name"><i>Algebra and Number Theory</i> Guest Lecture, Clayton High School</span>
        <span class="venue-date">Apr. 2026</span>
      </div>
    </div>
  </div>

  <div class="talk-topic">
    <div class="talk-topic-heading">On Inexactly Smooth Performance Estimation</div>
    <div class="venue-list">
      <div class="venue-item">
        <span class="venue-name">Johns Hopkins <a href="https://sites.google.com/view/ams-grad-seminar" target="_blank">Applied Mathematics and Statistics Student Seminar</a></span>
        <span class="venue-date">Sept. 2025</span>
      </div>
      <div class="venue-item">
        <span class="venue-name"><a href="https://meetings.informs.org/wordpress/annual" target="_blank">INFORMS Annual Meeting</a>, Atlanta, Georgia</span>
        <span class="venue-date">Oct. 2025</span>
      </div>
      <div class="venue-item">
        <span class="venue-name"><a href="https://www.minds.jhu.edu/" target="_blank">Junior MINDS Seminar</a>, Johns Hopkins Mathematical Institute for Data Science</span>
        <span class="venue-date">Nov. 2025</span>
      </div>
      <div class="venue-item">
        <span class="venue-name">Modeling and Optimization: Theory and Applications (MOPTA), Lehigh University</span>
        <span class="venue-date">(Upcoming) Aug. 2026</span>
      </div>
    </div>
  </div>

  <div class="talk-topic">
    <div class="talk-topic-heading">On Minimizing Heterogeneous Compositions</div>
    <div class="venue-list">
      <div class="venue-item">
        <span class="venue-name">Johns Hopkins <a href="https://sites.google.com/view/ams-grad-seminar" target="_blank">Applied Mathematics and Statistics Student Seminar</a></span>
        <span class="venue-date">Mar. 2025</span>
      </div>
      <div class="venue-item">
        <span class="venue-name"><a href="https://www.minds.jhu.edu/" target="_blank">Junior MINDS Seminar</a>, Johns Hopkins Mathematical Institute for Data Science</span>
        <span class="venue-date">Apr. 2025</span>
      </div>
      <div class="venue-item">
        <span class="venue-name">International Conference on Continuous Optimization <a href="https://sites.google.com/view/iccopt2025/home" target="_blank">(ICCOPT)</a>, Los Angeles, California</span>
        <span class="venue-date">Aug. 2025</span>
      </div>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Awards</strong></h4>
  <div class="venue-list">
    <div class="venue-item">
      <span class="venue-name">Joel Dean Award for Excellence in Teaching, department of Applied Math and Statistics</span>
      <span class="venue-date">2019–2020</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Joel Dean Award for Excellence in Teaching, department of Mathematics</span>
      <span class="venue-date">2019–2020</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Gordon L. and Beatrice C. Bowles Fellowship</span>
      <span class="venue-date">2022–2023</span>
    </div>
    <div class="venue-item">
      <span class="venue-name">Promotion to Teaching Fellow in the Department of Applied Mathematics and Statistics, Johns Hopkins University</span>
      <span class="venue-date">2025</span>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Skills</strong></h4>
  <ul class="skills-list">
    <li>Expertise in mathematical problem-solving, analytical reasoning, and quantitative analysis, with the adept ability to tackle complex challenges.</li>
    <li>Aptitude for delivering clear, engaging presentations and cultivating a dynamic, intellectually stimulating classroom environment.</li>
    <li>Proficiency in Matlab, Python, and Julia, with extensive experience in optimization algorithms and image analysis techniques.</li>
  </ul>
</div>

<div class="bubble">
  <h4><strong>Software</strong></h4>
  <div class="software-row">Matlab &middot; Python &middot; Julia &middot; LaTeX &middot; Desmos &middot; Excel</div>
</div>
