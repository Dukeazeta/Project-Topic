# Project Proposal Draft

## Student Details / Title

- **Name:** Azeta Duke
- **Matric Number:** COS/8650/2021
- **Supervisor/Mentor:** Dr Abere
- **Department:** Computer Science
- **Institution:** Federal University of Petroleum Resources, Effurun
- **Academic Session:** 2025/2026
- **Project Title:** **Design and Implementation of a Mobile-First Anti-Cheat CBT Platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun**

## Executive Summary

Computer-Based Testing (CBT) is now a common part of higher education assessment because it reduces manual marking, supports faster result processing, and makes examination records easier to manage. Recent studies still show that CBT adoption is more than a technical matter. Students and lecturers must trust the system, understand how it works, and believe that the examination process is fair (Zakariya et al., 2026; Zakariya, 2026).

This project focuses on the design and implementation of a mobile-first anti-cheat CBT platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun. The system will be a standalone web platform for departmental examinations. It will allow administrators to create examinations, manage questions, import students, monitor exam sessions, control active attempts, and export results. Students will use a simple examination interface for secure login, timed question answering, submission, and result viewing where permitted.

The proposed system will include practical browser-based anti-cheat controls such as fullscreen monitoring, tab or app switch detection, copy and paste blocking, right-click blocking, developer tools shortcut detection, violation logging, warning counts, and automatic submission or termination after repeated violations. These controls are not presented as a perfect way to eliminate examination malpractice. They are meant to improve deterrence, visibility, session control, and administrative response during CBT examinations (Holden et al., 2021; Garg & Goel, 2022).

At the end of the project, the expected result is a mobile-friendly CBT platform that improves examination organization, supports better monitoring, and provides a more controlled digital assessment experience for the Department of Computer Science, FUPRE.

## Background Study

Digital assessment is now common in higher education because institutions need faster and better organized ways to conduct examinations. CBT supports this by delivering questions electronically, storing answers directly, and reducing delays in marking objective tests. In Nigeria, CBT has moved from large public examinations into tertiary institutions, although implementation still depends on infrastructure, user readiness, reliability, and security (Adamu, 2024).

Recent studies show that CBT acceptance depends on the experience of both students and lecturers. Students are more likely to accept CBT when it is useful, simple to use, and not stressful, while lecturers also need confidence in the system before it can support regular assessment (Zakariya et al., 2026; Zakariya, 2026). Okocha (2022) also shows that Nigerian students pay attention to convenience, fairness, and the suitability of CBT for their learning environment.

Mobile access is a practical concern because many students depend on smartphones for regular digital access. A mobile-first CBT system therefore reduces access barriers by making the examination interface usable on smaller screens from the start. This agrees with mobile learning research which shows that educational systems work better when they reflect the real access conditions of students (Naveed et al., 2023).

Examination integrity is still a serious issue in computer-based and online assessment. Studies on online assessment security and proctoring show that dishonest behaviour can be reduced when systems combine clear rules, monitoring, authentication, and reliable event records (Dendir & Maxwell, 2020; Holden et al., 2021; Garg & Goel, 2022; Han et al., 2023).

This project is therefore positioned as a practical department-level solution. It does not attempt to build a large commercial proctoring system. Instead, it proposes a standalone CBT platform for the Department of Computer Science, FUPRE, with mobile-first access, exam management, session tracking, warning logs, and browser-based anti-cheat controls.

## Problem Statement

Although CBT systems are now widely used in educational settings, many platforms still do not combine mobile usability with practical examination integrity controls. Some CBT systems are difficult to use on phones, while others provide weak monitoring of student behaviour during examinations. This can expose digital examinations to issues such as tab switching, leaving fullscreen mode, copying questions, pasting external content, right-clicking, weak session tracking, poor timing control, and limited administrative visibility during active examinations.

In a department-level setting such as the Department of Computer Science, FUPRE, these weaknesses can affect the credibility of assessment. A system may allow students to take a test digitally, but if it cannot manage examination windows, track live sessions, detect suspicious behaviour, warn students, and give administrators control over active attempts, the fairness of the examination process may still be questioned.

The problem this project addresses is the absence of a focused department-level CBT platform that is mobile-first, simple to manage, and supported by practical browser-based anti-cheat controls for better examination integrity and administrative control.

## Aim/Objectives

### Aim

The aim of this project is to design and implement a mobile-first anti-cheat CBT platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun.

### Objectives

The specific objectives of the study are to:

1. build a standalone CBT platform with separate interfaces for administrators and students;
2. provide support for exam creation, question management, and student management;
3. implement secure exam access with student login and session tracking;
4. implement browser-based anti-cheat controls such as fullscreen monitoring, tab switch detection, copy and paste blocking, right-click blocking, developer tools detection, and warning logging;
5. support timed examinations, automatic submission, and violation-based session termination; and
6. provide result handling, session monitoring, and administrative control tools such as pause, resume, and final submit.

## Conceptual Review

Computer-Based Testing is an assessment method where examination questions are delivered and answered through a computer or web system. It reduces paper use, improves record keeping, and supports faster result processing. A mobile-first CBT system extends this benefit by making login, question display, timers, navigation, warnings, and submission controls usable on smartphones as well as larger screens (Zakariya et al., 2026; Naveed et al., 2023).

Academic integrity in online examinations means that students complete assessments honestly and under approved conditions. In CBT, this includes reducing impersonation, unauthorized assistance, copying, and other forms of malpractice. Session control supports this goal by tracking each student attempt from login to submission, including time, answers, status, warnings, violations, and administrative actions (Holden et al., 2021).

Browser-based anti-cheat monitoring detects suspicious actions such as leaving the exam tab, exiting fullscreen mode, copying or pasting content, right-clicking, and attempting developer tools shortcuts. These controls cannot remove cheating completely, but they can discourage common malpractice and provide useful records for review (Garg & Goel, 2022; Han et al., 2023).

## Literature Review

| Author / Title | Objective | Methodology Used | Strengths | Gaps / Further Study |
|---|---|---|---|---|
| Zakariya et al. (2026), *Computer-based testing in higher education: A phenomenology investigation into undergraduate students' perspectives through the technology acceptance model* | To study undergraduate students' experiences and acceptance of CBT in higher education | Phenomenological study using the Technology Acceptance Model | Shows how student acceptance is affected by usefulness, ease of use, anxiety, and confidence | Does not design a standalone CBT platform with anti-cheat controls |
| Zakariya (2026), *A Phenomenological Inquiry into Lecturers' Acceptance of Computer-Based Testing in Higher Education Through the Lens of the Technology Acceptance Model* | To examine lecturers' acceptance of CBT in higher education | Phenomenological inquiry based on the Technology Acceptance Model | Shows that lecturers' experience and acceptance are important in CBT adoption | Does not provide a department-level implementation model |
| Okeke et al. (2025), *Convolutional Neural Network Approach for Identity Verification in Computer-Based Testing Exams in Nigeria* | To apply CNN-based facial biometric verification to Nigerian CBT exams | Model development using convolutional neural networks | Gives a Nigerian technical angle on CBT integrity and identity verification | Focuses on biometric verification rather than full CBT workflow and mobile-first usability |
| Akcapinar (2025), *Detecting AI-Assisted Cheating in Online Exams through Behavior Analytics* | To explore behaviour analytics for detecting AI-assisted cheating | Behaviour analytics approach | Supports the use of event patterns and behaviour logs in online exam monitoring | Focuses on AI-assisted cheating and analytics, not a complete departmental CBT system |
| Adamu (2024), *Computer-Based Testing Implementation in Nigeria: Successes and Challenges from Historical Perspectives* | To examine the growth and challenges of CBT implementation in Nigeria | Historical and analytical review | Provides Nigerian context and identifies implementation challenges | Does not focus on mobile-first delivery or browser-based anti-cheat controls |
| Han et al. (2023), *Digital proctoring in higher education: A systematic literature review* | To review digital proctoring practice in higher education | Systematic literature review using PRISMA and topic modelling | Identifies key themes such as authentication, cheating detection, adoption, and student concerns | Broad proctoring review; does not provide a focused CBT product for a department |
| Naveed et al. (2023), *Mobile Learning in Higher Education: A Systematic Literature Review* | To review mobile learning research in higher education | Systematic literature review | Supports the need for mobile access and user-centred educational technology | Focuses on mobile learning generally, not examination integrity |
| Garg and Goel (2022), *A systematic literature review on online assessment security: Current challenges and integrity strategies* | To review security challenges and integrity strategies in online assessment | Systematic literature review | Strong security foundation for online assessment design | Does not narrow the solution to a mobile-first departmental CBT system |
| Okocha (2022), *Student Perception of Computer-Based Testing in Kwara State, Nigeria* | To study undergraduate students' perception of CBT in Nigeria | Student perception study | Useful Nigerian evidence on CBT acceptance and user concerns | Limited focus on anti-cheat design and live session control |
| Holden et al. (2021), *Academic Integrity in Online Assessment: A Research Review* | To review academic integrity issues in online assessment | Research review | Explains why academic dishonesty occurs and how integrity can be supported | Broad review; does not provide a technical CBT implementation |
| Dendir and Maxwell (2020), *Cheating in online courses: Evidence from online proctoring* | To study the effect of online proctoring on cheating behaviour | Quasi-experimental study | Provides evidence that monitoring can affect cheating behaviour | Focuses on proctoring impact, not system design |

The reviewed works show that recent research has addressed CBT adoption, online examination security, proctoring, student and lecturer acceptance, mobile access, and behaviour monitoring. However, most of these studies treat the issues separately. This project addresses the gap by combining mobile-first access, exam administration, session control, browser-based anti-cheat monitoring, and result handling in one standalone departmental CBT system.

## Gaps Identified vis-a-vis Technology/Method to Resolve the Identified Gaps

From the reviewed literature, the following gaps can be identified:

1. recent CBT adoption studies explain student and lecturer acceptance, but they do not provide a complete standalone CBT implementation for a department;
2. Nigerian CBT studies provide useful local context, but they give limited attention to browser-based anti-cheat controls and live session management;
3. online assessment security and digital proctoring studies discuss monitoring and cheating reduction, but many of them are broader or heavier than what a lean departmental CBT system needs; and
4. mobile learning studies support mobile access, but they do not address examination-specific timing, warning counts, violation logs, and submission control.

To address these gaps, this project proposes a standalone CBT platform that combines mobile-first access, admin exam management, question management, student management, timed sessions, answer tracking, warning logs, violation records, browser-based anti-cheat controls, and result export.

## Methodology

This project will adopt an incremental software development methodology. The system will be developed in stages so that each module can be designed, implemented, tested, and improved before the next one is completed. This is suitable because the platform contains connected parts such as authentication, exam management, question management, student management, exam-taking, session control, anti-cheat monitoring, and result processing.

The work will begin with requirement identification. The main users are administrators and students. Administrators need tools to create exams, manage questions, import students, monitor sessions, control active attempts, and export results. Students need a simple interface to log in, start an exam, answer questions, receive warnings, submit answers, and view results where allowed.

The system design stage will define the standalone web architecture, database structure, user flow, examination process, anti-cheat process, result-processing flow, and session-control logic. The interface will be planned with a mobile-first approach so that both the student exam screen and admin dashboard remain usable on smartphones and larger screens.

Implementation will use Next.js, React, TypeScript, Drizzle ORM, and SQLite/Turso-style database storage. The anti-cheat module will monitor fullscreen exit, tab or app switching, copy and paste attempts, right-click actions, and developer tools shortcut attempts. Each violation will be recorded against the student session and used to update warning counts.

Testing will check whether administrators can create exams, manage questions, import students, monitor sessions, control attempts, and export results. Student-side testing will cover login, exam start, timer behaviour, answer saving, warning prompts, violation logging, submission, result viewing, and mobile usability.

## Expected Result / Outcome

The proposed study is expected to produce the following results:

1. a standalone mobile-first CBT platform for the Department of Computer Science, FUPRE;
2. an admin dashboard for exam setup, student management, question import, session monitoring, session control, and result export;
3. a student exam interface that supports login, timed testing, answer submission, warning prompts, and result access where permitted;
4. practical browser-based anti-cheat controls such as fullscreen monitoring, tab switch detection, copy and paste blocking, right-click blocking, developer tools detection, warning logs, and violation-based termination; and
5. a system that improves examination organization, supports better administrative control, and provides a clearer record of student activity during CBT examinations.

The project is also expected to serve as a foundation for future improvement into a wider institutional CBT platform if the department or university decides to expand the system later.

## Work-Plan / Time Frame Using Gantt Chart

This research is expected to span a period of three months, from May 2026 to July 2026.

| Activity | May 2026 | June 2026 | July 2026 |
|---|---|---|---|
| Study of existing CBT processes and requirement gathering | X |  |  |
| Proposal refinement and literature review | X |  |  |
| System analysis and design | X |  |  |
| Standalone CBT development |  | X |  |
| Anti-cheat integration and interface refinement |  | X |  |
| Testing and evaluation |  |  | X |
| Documentation and final report writing |  |  | X |

The workflow will move from understanding the problem and reviewing recent literature, to designing and implementing the standalone platform, and then to testing, evaluation, and final documentation.

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

Zakariya, Y. F., Alotaibi, S. B., Alrashood, J. S., & Alrosaa, T. M. (2026). *Computer-based testing in higher education: A phenomenology investigation into undergraduate students' perspectives through the technology acceptance model*. Frontiers in Psychology, 17, 1602964. [https://doi.org/10.3389/fpsyg.2026.1602964](https://doi.org/10.3389/fpsyg.2026.1602964)

Zakariya, Y. F. (2026). *A phenomenological inquiry into lecturers' acceptance of computer-based testing in higher education through the lens of the technology acceptance model*. Trends in Higher Education, 5(1), 23. [https://doi.org/10.3390/higheredu5010023](https://doi.org/10.3390/higheredu5010023)

Okeke, O. C., Umerah, A. T., Mgbeafulike, I. J., & Nwakeze, O. M. (2025). *Convolutional neural network approach for identity verification in computer-based testing exams in Nigeria*. International Journal of Mathematical Sciences and Computing, 11(4), 50-65. [https://doi.org/10.5815/ijmsc.2025.04.05](https://doi.org/10.5815/ijmsc.2025.04.05)

Akcapinar, G. (2025). *Detecting AI-assisted cheating in online exams through behavior analytics*. arXiv / CELDA 2025. [https://doi.org/10.48550/arXiv.2510.18881](https://doi.org/10.48550/arXiv.2510.18881)

Adamu, A. D. (2024). *Computer-Based Testing implementation in Nigeria: Successes and challenges from historical perspectives*. UMYU Journal of Educational Research, 12(1), 116-129. [https://doi.org/10.70886/ujer.24121.012](https://doi.org/10.70886/ujer.24121.012)

Han, S., Nikou, S., & Ayele, W. Y. (2023). *Digital proctoring in higher education: A systematic literature review*. International Journal of Educational Management, 38(1), 265-285. [https://doi.org/10.1108/IJEM-12-2022-0522](https://doi.org/10.1108/IJEM-12-2022-0522)

Naveed, Q. N., Choudhary, H., Ahmad, N., Alqahtani, J., & Qahmash, A. I. (2023). *Mobile learning in higher education: A systematic literature review*. Sustainability, 15(18), 13566. [https://doi.org/10.3390/su151813566](https://doi.org/10.3390/su151813566)

Garg, M., & Goel, A. (2022). *A systematic literature review on online assessment security: Current challenges and integrity strategies*. Computers & Security, 113, 102544. [https://doi.org/10.1016/j.cose.2021.102544](https://doi.org/10.1016/j.cose.2021.102544)

Okocha, F. (2022). *Student perception of computer-based testing in Kwara State, Nigeria*. International Journal of Web-Based Learning and Teaching Technologies, 17(1), 1-11. [https://doi.org/10.4018/IJWLTT.294575](https://doi.org/10.4018/IJWLTT.294575)

Holden, O. L., Norris, M. E., & Kuhlmeier, V. A. (2021). *Academic integrity in online assessment: A research review*. Frontiers in Education, 6, 639814. [https://doi.org/10.3389/feduc.2021.639814](https://doi.org/10.3389/feduc.2021.639814)

Dendir, S., & Maxwell, R. S. (2020). *Cheating in online courses: Evidence from online proctoring*. Computers in Human Behavior Reports, 2, 100033. [https://doi.org/10.1016/j.chbr.2020.100033](https://doi.org/10.1016/j.chbr.2020.100033)
