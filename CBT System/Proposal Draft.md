# Project Proposal Draft

## Student Details / Title

- **Name:** Azeta Duke
- **Matric Number:** COS/8650/2021
- **Supervisor/Mentor:** Dr Nwozor Blessing
- **Department:** Computer Science
- **Institution:** Federal University of Petroleum Resources, Effurun
- **Academic Session:** 2025/2026
- **Project Title:** **Design and Implementation of a Mobile-First Anti-Cheat CBT Platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun**

## Executive Summary

Computer-Based Testing (CBT) has become a common way of conducting examinations in many schools because it makes exams easier to organize, faster to mark, and simpler to manage. Even with these benefits, many CBT systems still have important weaknesses. Some are not convenient to use on mobile phones, while others do not have enough protection against common examination malpractice such as tab switching, copy and paste attempts, right-clicking, and poor session monitoring. Because of these weaknesses, many students and lecturers may still have doubts about the fairness of digital examinations.

This project is focused on the design and implementation of a mobile-first anti-cheat CBT platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun. The system will be built as a standalone web platform that is meant mainly for CBT activities. It will give administrators the ability to create examinations, manage students, import questions, monitor sessions, and export results. It will also give students a simple interface for secure login, timed exam access, answer submission, and result viewing where allowed.

The proposed system will include practical anti-cheat controls such as fullscreen enforcement, tab and app switch detection, copy and paste blocking, right-click blocking, developer tools shortcut detection, violation logging, warning thresholds, and automatic session termination after repeated violations. This project is not starting fully from scratch. It is based on an existing CBT module that has already been studied from an earlier portal implementation, but it will be adapted, improved, and repackaged into a more focused standalone platform that fits this final year project.

At the end of the study, the expected result is a mobile-friendly CBT platform that can improve exam integrity, make administration easier, and give both lecturers and students a better digital examination experience in the Department of Computer Science, FUPRE.

## Background Study

Digital technology has changed the way teaching, learning, and assessment are done in higher institutions. One clear example of this is the use of Computer-Based Testing. CBT has become more popular because it reduces the stress of manual marking, improves record keeping, and helps schools handle examinations for many students at the same time. In Nigeria, the use of CBT has moved from large external examinations into universities and other tertiary institutions, although the success of implementation still differs from one institution to another (Adamu, 2024).

Students are gradually becoming more comfortable with CBT because it can be faster, cleaner, and easier to manage than paper-based examinations. Tella and Bashorun (2012) reported that students in the Nigerian university environment can show a positive attitude toward CBT when the system is reliable and fair. Okocha (2022) also showed that student perception has a strong effect on whether CBT is accepted or not. This means that a good CBT platform should not only work well technically, but should also be simple to use and easy to trust.

Another important issue is access to devices. In many Nigerian higher institutions, students depend heavily on smartphones to access online resources. Because of this, a modern CBT system should not be designed only for laptops and desktop computers. A mobile-first approach is important because it makes sure the system works well on smaller screens from the beginning instead of treating phone users as secondary users. Studies on mobile learning in higher education show that students are more willing to use mobile educational systems when the system is easy to use and matches their learning habits (Cheon et al., 2012; Naveed et al., 2023).

Even with the advantages of CBT, exam integrity is still a major concern. Online assessments can be weakened by poor monitoring, weak session control, and limited anti-cheat enforcement. Students may try to switch tabs, copy questions, use outside help, or take advantage of weak invigilation. Holden et al. (2021) explained that academic integrity is one of the biggest concerns in online assessment environments. This shows that a useful CBT platform must combine usability with realistic integrity controls.

In the Department of Computer Science, Federal University of Petroleum Resources, Effurun, there is a need for a CBT system that is department-focused, easy to access on mobile devices, and equipped with practical anti-cheat measures. This project addresses that need by proposing a standalone CBT platform tailored to the department's likely examination workflow.

## Problem Statement

Although CBT systems are now widely used in educational environments, many of them still do not properly combine mobile accessibility with practical anti-cheat controls. Some systems are hard to use on phones, while others do not provide enough monitoring for student sessions during examinations. Because of this, digital examinations may still be exposed to malpractice through tab switching, leaving fullscreen mode, copy and paste behavior, right-clicking, weak answer tracking, and poor administrative control over live exam sessions.

In a department-level setting such as the Department of Computer Science, FUPRE, this creates a serious challenge. A system may allow students to take examinations digitally, but if it cannot properly manage exam time windows, session behavior, warnings, and submission control, the fairness and credibility of the assessment process become questionable. Also, since many students depend on mobile devices, a CBT platform that is not mobile-friendly may reduce usability and create access problems.

The problem this project addresses, therefore, is the absence of a focused department-level CBT platform that is both mobile-first and supported by practical browser-based anti-cheat features for better examination integrity and administrative control.

## Aim/Objectives

### Aim

The aim of this project is to design and implement a mobile-first anti-cheat CBT platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun.

### Objectives

The specific objectives of the study are to:

1. build a standalone CBT platform with separate interfaces for administrators and students;
2. provide support for exam creation, question management, and student management;
3. implement secure exam access with student login and session tracking;
4. implement browser-based anti-cheat controls such as fullscreen monitoring, tab switch detection, copy and paste blocking, right-click blocking, and warning logging;
5. support timed examinations, automatic submission, and violation-based session termination; and
6. provide result handling, session monitoring, and administrative control tools such as pause, resume, and final submit.

## Conceptual Review

### Computer-Based Testing

Computer-Based Testing is an examination method in which questions are delivered and answered through a digital system instead of paper. CBT improves speed, record keeping, and automatic grading for objective questions. It also helps institutions manage exam data more efficiently. However, for CBT to truly support fair academic assessment, the platform used must be dependable, secure, and easy to use.

### Mobile-First Web Systems

A mobile-first system is designed with phone users in mind from the beginning. This means the layout, navigation, controls, and content are first planned for smaller screens before being expanded for bigger screens. In this project, mobile-first design is important because it supports better access for students who rely on phones as their main digital device. Han and Shin (2016) and Naveed et al. (2023) show that mobile learning systems can improve access and engagement when they are designed in a user-friendly way.

### Academic Integrity in Online Examinations

Academic integrity means fairness, honesty, and trust in the assessment process. In online examinations, this means making sure that students take tests under acceptable conditions and that their results reflect their real performance. Holden et al. (2021) noted that online testing creates new integrity concerns because students are no longer always under the same physical supervision found in traditional examination halls.

### Session Control in CBT Systems

Session control refers to the ability of the system to track and manage each student's exam attempt from start to finish. This includes recording when the session starts, how long it lasts, whether it is paused, whether it has been submitted, and whether suspicious actions occur during the attempt. Good session control helps administrators monitor ongoing exams and respond quickly when problems come up.

### Browser-Based Anti-Cheat Monitoring

Browser-based anti-cheat monitoring uses the web browser to detect suspicious actions during an exam. Examples include detecting when a student leaves the exam tab, exits fullscreen mode, tries to copy or paste content, right-clicks, or attempts to open developer tools. These actions do not make cheating impossible, but they can discourage it and improve monitoring. In this project, anti-cheat is treated as practical prevention and detection, not as a claim that cheating can be removed completely.

## Literature Review

| Author / Title | Objective | Methodology Used | Strengths | Gaps / Further Study |
|---|---|---|---|---|
| Adamu (2024), *Computer-Based Testing Implementation in Nigeria: Successes and Challenges from Historical Perspectives* | To examine the growth and challenges of CBT implementation in Nigeria | Historical and analytical review of CBT implementation trends | Gives useful Nigerian context and shows practical implementation challenges | Does not focus on mobile-first delivery or detailed anti-cheat controls |
| Tella and Bashorun (2012), *Attitude of Undergraduate Students Towards Computer-Based Test (CBT): A Case Study of the University of Ilorin, Nigeria* | To examine student attitude toward CBT | Case study using student responses | Helps explain student acceptance and usability factors in Nigerian universities | Does not address modern anti-cheat controls or mobile-first design |
| Okocha (2022), *Student Perception of Computer-Based Testing in Kwara State, Nigeria* | To study how students perceive CBT systems | Student perception study | Useful for understanding usability and trust from the student's side | Limited emphasis on technical design and session security |
| Holden, Norris, and Kuhlmeier (2021), *Academic Integrity in Online Assessment: A Research Review* | To review academic integrity issues in online assessment | Research review | Strong foundation for explaining integrity concerns in online exams | Broad review; not centered on a department-level CBT solution |
| Dendir and Maxwell (2020), *Cheating in online courses: Evidence from online proctoring* | To study the effect of online proctoring on cheating behavior | Empirical analysis | Useful for justifying monitoring and anti-cheat measures | Focus is on proctoring generally, not mobile-first CBT design |
| Griffiths (2022), *Mitigating cheating during online proctored exams* | To discuss ways of reducing cheating in online exams | Analytical discussion | Supports the need for practical controls and monitoring | Does not provide a complete standalone CBT platform design |
| Chouhan (2023), *Strategies for maintaining academic integrity in remote unproctored and proctored online assessments for engineering courses* | To identify practical integrity strategies for online assessment | Strategy and practice review | Helps justify realistic anti-cheat and monitoring policies | Focuses on broad online assessment strategy rather than implementation of a focused CBT product |
| Han and Shin (2016), *The Use of a Mobile Learning Management System and Academic Achievement of Online Students* | To examine the role of mobile systems in online learning performance | Study of mobile LMS use and academic performance | Supports mobile-first educational platform design | Not specifically about CBT or anti-cheat |
| Naveed et al. (2023), *Mobile Learning in Higher Education: A Systematic Literature Review* | To review mobile learning in higher education | Systematic literature review | Gives strong support for mobile accessibility in higher education systems | Broad review; not focused on exam integrity |
| Akçapınar (2025), *Detecting AI-Assisted Cheating in Online Exams through Behavior Analytics* | To explore behavior-based detection of cheating in online exams | Behavior analytics approach | Shows that exam monitoring is moving toward behavior analysis and event logging | Newer work; more focused on AI-assisted cheating than a full CBT platform |

The reviewed studies show that CBT adoption, online assessment integrity, and mobile learning are all important areas in educational technology. However, most of these works focus on only one part of the problem. Some focus on student perception of CBT, some focus on academic integrity in a broad sense, while others focus on proctoring strategies or mobile learning adoption. Very few bring these concerns together into one department-level, mobile-first CBT system with built-in practical anti-cheat monitoring and live administrative control.

## Gaps Identified vis-a-vis Technology/Method to Resolve the Identified Gaps

From the reviewed literature, several gaps can be identified clearly:

1. many CBT studies in the Nigerian context focus on adoption and student attitude, but not on the technical design of anti-cheat controls;
2. many academic integrity studies discuss cheating broadly without presenting a focused department-level CBT implementation;
3. many mobile learning studies support mobile access, but they do not address examination-specific integrity controls; and
4. many proctoring discussions focus on broad monitoring practices rather than a lightweight web-based anti-cheat model suitable for a university department.

To address these gaps, this project proposes a standalone CBT platform that combines the following in one system:

1. mobile-first web access for students;
2. structured exam and question management for administrators;
3. secure timed session management;
4. browser-based anti-cheat monitoring through fullscreen enforcement, tab switch detection, copy and paste blocking, right-click blocking, and developer tools detection;
5. warning count tracking and automatic session termination after repeated violations; and
6. session-level administrative controls such as pause, resume, and final submit.

This approach addresses the identified gap by combining usability, exam control, and practical anti-cheat behavior monitoring in one department-focused CBT solution.

## Methodology

This project will adopt an incremental software development methodology. This approach is suitable because it allows the system to be developed and improved in stages. Each stage will focus on a clear part of the work, starting from understanding the problem and ending with testing and evaluation of the completed platform.

The project is also an adapted standalone system. This means that the work will not begin from a completely empty idea. Instead, useful CBT features reviewed from an earlier portal implementation will be studied, restructured, and improved into a focused standalone platform. This makes the project more realistic and gives it a strong technical foundation while still allowing the student to design, refine, and document a clear academic solution.

The methodology will follow these stages:

### 1. Requirement Identification

The key requirements of the system will be identified from the problem the project is trying to solve. These include student login, exam creation, question management, timing, result handling, session control, and anti-cheat behavior monitoring.

### 2. Analysis of the Existing System

The existing CBT workflow and common examination challenges will be studied. Attention will be given to weak mobile usability, weak monitoring, and limited administrative control in many CBT setups. The reviewed existing portal CBT module will also be analyzed as a technical baseline because it already shows useful features such as exam creation, question import, session tracking, and violation logging.

### 3. System Design

The standalone platform will be designed as a web-based system with two main user groups:

- administrators, who manage exams, students, questions, sessions, and results; and
- students, who log in and take examinations.

The system will use a mobile-first interface so that students can use phones conveniently. The architecture will also support timed sessions, warning tracking, and result management.

### 4. Implementation

The system implementation will use the following stack:

- Next.js for the web application structure;
- React for the user interface;
- TypeScript for strongly typed development;
- SQLite/Turso for data storage; and
- Drizzle ORM for database operations.

The implementation will focus on adapting and improving the already reviewed CBT features into a cleaner standalone product. Confirmed features from the technical baseline include exam activation windows, question creation and Excel import, student management, session tracking, question and option shuffling, violation logging, fullscreen enforcement, tab switch detection, copy and paste blocking, right-click blocking, developer tools attempt detection, pause and resume control, and result export.

### 5. Testing and Evaluation

The completed system will be tested to make sure that:

- students can log in and take exams correctly;
- admin users can create and manage exams successfully;
- timers and session controls work correctly;
- anti-cheat events are logged as expected; and
- the system remains usable on mobile devices.

Evaluation will also compare the proposed standalone system with weaker or less focused CBT approaches in terms of accessibility, monitoring, and administrative control.

## Expected Result / Outcome

The proposed study is expected to produce the following results:

1. a standalone mobile-first CBT platform for the Department of Computer Science, FUPRE;
2. an admin dashboard for exam setup, student management, question import, session monitoring, and result export;
3. a student exam interface that supports login, timed testing, answer submission, and result access where permitted;
4. practical anti-cheat controls such as warning logs, session monitoring, fullscreen enforcement, and violation-based termination; and
5. a system that improves exam fairness, supports easier departmental administration, and provides better usability for students who rely on mobile devices.

The project is also expected to provide a useful foundation for future improvement into a wider institutional CBT solution if the department or university decides to expand it later.

## Work-Plan / Time Frame Using Gantt Chart

This research is expected to span a period of three months.

| Activity | Month 1 | Month 2 | Month 3 |
|---|---|---|---|
| Study of existing system and requirement gathering | X |  |  |
| Proposal refinement and literature review | X |  |  |
| System analysis and design | X |  |  |
| Standalone feature adaptation and development |  | X |  |
| Anti-cheat integration and interface refinement |  | X |  |
| Testing and evaluation |  |  | X |
| Documentation and final report writing |  |  | X |

The workflow will move from understanding the problem, to building the standalone platform, and then to testing, evaluation, and final documentation.

## Budget

| Item | Description | Cost (NGN) |
|---|---|---:|
| Internet/Data | Research, development, testing, and online resource access | 25,000 |
| Power/Electricity Support | Electricity and backup power for development work | 30,000 |
| Transportation | Movement for project-related meetings, printing, and other logistics | 15,000 |
| Printing and Binding | Draft printing, final report printing, and binding | 20,000 |
| Hosting/Domain (Optional) | Optional hosting or domain for demonstration | 15,000 |
| Contingency | Miscellaneous and unexpected expenses | 10,000 |
| **Total** |  | **115,000** |

The budget is intentionally kept modest because the project is student-driven and based mainly on software development rather than expensive hardware or large-scale deployment.

## References

Adamu, A. D. (2024). *Computer-Based Testing implementation in Nigeria: Successes and challenges from historical perspectives*. UMYU Journal of Educational Research. [https://doi.org/10.70886/ujer.24121.013](https://doi.org/10.70886/ujer.24121.013)

Akçapınar, G. (2025). *Detecting AI-assisted cheating in online exams through behavior analytics*. arXiv / CELDA 2025. [https://doi.org/10.48550/arXiv.2510.18881](https://doi.org/10.48550/arXiv.2510.18881)

Alessio, H. M., Messinger, J. D., et al. (2021). *Faculty and student perceptions of academic integrity in technology-assisted learning and testing*. Frontiers in Education, 6. [https://doi.org/10.3389/feduc.2021.629220](https://doi.org/10.3389/feduc.2021.629220)

Cheon, J., Lee, S., Crooks, S. M., & Song, J. (2012). *An investigation of mobile learning readiness in higher education based on the theory of planned behavior*. Computers & Education, 59(3), 1054-1064. [https://doi.org/10.1016/j.compedu.2012.04.015](https://doi.org/10.1016/j.compedu.2012.04.015)

Chouhan, R. (2023). *Strategies for maintaining academic integrity in remote unproctored and proctored online assessments for engineering courses*. Learning: Research and Practice, 10(1), 75-92. [https://doi.org/10.1080/23735082.2023.2216198](https://doi.org/10.1080/23735082.2023.2216198)

Dendir, S., & Maxwell, R. S. (2020). *Cheating in online courses: Evidence from online proctoring*. Computers in Human Behavior Reports, 2, 100033. [https://doi.org/10.1016/j.chbr.2020.100033](https://doi.org/10.1016/j.chbr.2020.100033)

Griffiths, B. J. (2022). *Mitigating cheating during online proctored exams*. Research on Education and Media, 14(2), 9-14. [https://doi.org/10.2478/rem-2022-0016](https://doi.org/10.2478/rem-2022-0016)

Han, I., & Shin, W. S. (2016). *The use of a mobile learning management system and academic achievement of online students*. Computers & Education, 102, 79-89. [https://doi.org/10.1016/j.compedu.2016.07.003](https://doi.org/10.1016/j.compedu.2016.07.003)

Holden, O. L., Norris, M. E., & Kuhlmeier, V. A. (2021). *Academic integrity in online assessment: A research review*. Frontiers in Education, 6, 639814. [https://doi.org/10.3389/feduc.2021.639814](https://doi.org/10.3389/feduc.2021.639814)

Naveed, Q. N., Choudhary, H., Ahmad, N., Alqahtani, J., & Qahmash, A. I. (2023). *Mobile learning in higher education: A systematic literature review*. Sustainability, 15(18), 13566. [https://doi.org/10.3390/su151813566](https://doi.org/10.3390/su151813566)

Okocha, F. (2022). *Student perception of computer-based testing in Kwara State, Nigeria*. International Journal of Web-Based Learning and Teaching Technologies. [https://doi.org/10.4018/IJWLTT.294575](https://doi.org/10.4018/IJWLTT.294575)

Tella, A., & Bashorun, M. T. (2012). *Attitude of undergraduate students towards computer-based test (CBT): A case study of the University of Ilorin, Nigeria*. International Journal of Information and Communication Technology Education. [https://doi.org/10.4018/jicte.2012040103](https://doi.org/10.4018/jicte.2012040103)
