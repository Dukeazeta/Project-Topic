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

Computer-Based Testing (CBT) has become a widely accepted examination method because it simplifies test administration, speeds up marking, and improves record management. However, many CBT systems still face two major weaknesses: poor mobile usability and weak protection against examination malpractice. Students may exploit these weaknesses through tab switching, copy-and-paste actions, right-clicking, or leaving the test environment without proper monitoring.

This project proposes the design and implementation of a mobile-first anti-cheat CBT platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun. The platform will operate as a standalone web-based examination system with separate interfaces for administrators and students. Administrators will be able to create exams, manage questions, monitor active sessions, and export results, while students will be able to log in securely, take timed tests, and submit answers through a responsive interface.

The system will include browser-based anti-cheat controls such as fullscreen enforcement, tab-switch detection, copy-and-paste blocking, right-click restriction, violation logging, warning thresholds, and automatic submission or session termination after repeated violations. The expected outcome is a department-focused CBT platform that improves exam integrity while remaining accessible on both smartphones and larger devices.

## Background Study

Digital assessment has become increasingly important in higher education because it reduces the administrative burden of paper-based examinations and allows faster result processing. In Nigeria, CBT has moved beyond national testing bodies into universities and colleges, although implementation quality still varies across institutions. For CBT to be accepted, it must be both technically reliable and fair.

Student perception is an important factor in the success of CBT systems. Studies have shown that students are more likely to accept computer-based examinations when the platform is easy to use, transparent, and trustworthy. At the same time, the widespread use of smartphones among students means that modern educational systems must be designed with mobile access in mind rather than treating phones as secondary devices.

Academic integrity is another major concern. In online or digital exams, students may attempt to switch tabs, search for answers externally, or copy questions where controls are weak. Research on online assessment consistently identifies integrity protection as a major challenge. This project therefore combines mobile-first usability with practical anti-cheat mechanisms in order to better suit departmental examination needs.

## Problem Statement

Many existing CBT systems do not adequately combine mobile accessibility with practical anti-cheat controls. Some platforms are difficult to use on smaller screens, while others lack mechanisms for detecting suspicious exam behavior or restricting common forms of browser-based cheating.

In a department-level setting such as Computer Science at FUPRE, these weaknesses can reduce confidence in digital examinations. If the platform cannot effectively manage time limits, session behavior, warnings, and submissions, the credibility of the exam process may be questioned. There is therefore a need for a focused CBT platform that is mobile-first, easy to administer, and better equipped to discourage malpractice.

## Aim and Objectives

### Aim

The aim of this project is to design and implement a mobile-first anti-cheat CBT platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun.

### Objectives

The specific objectives are to:

1. develop a standalone CBT platform with separate interfaces for administrators and students;
2. provide support for question management, exam setup, and result handling;
3. design a mobile-first exam interface that works effectively across devices;
4. implement browser-based anti-cheat measures such as fullscreen enforcement and violation logging;
5. support timed examinations, secure answer submission, and session monitoring; and
6. generate basic reports for administrative review.

## Conceptual Review

### Computer-Based Testing

Computer-Based Testing is the use of digital systems to deliver, manage, and score examinations. CBT reduces paper use, improves record keeping, and supports quicker grading and result compilation.

### Mobile-First System Design

A mobile-first design approach begins with smartphone usability and then scales upward to tablets and desktops. This is important because many students rely heavily on mobile devices for academic access.

### Academic Integrity in Digital Exams

Academic integrity refers to fairness, honesty, and compliance with examination rules. In CBT environments, integrity can be improved through technical controls that discourage or record suspicious behavior during tests.

### Browser-Based Anti-Cheat Controls

Browser-based anti-cheat controls are restrictions or monitoring features implemented within the exam interface. Examples include fullscreen enforcement, tab visibility detection, copy-and-paste blocking, right-click disabling, and violation counting.

## Literature Review

| Author / Title | Contribution | Strength | Gap |
|---|---|---|---|
| Adamu (2024) | Reviewed CBT implementation in Nigeria | Provides contextual understanding of CBT growth and challenges | Does not focus on a department-level anti-cheat system |
| Tella & Bashorun (2012) | Studied student attitudes toward CBT in Nigeria | Shows acceptance depends on reliability and fairness | Does not address mobile-first anti-cheat design |
| Okocha (2022) | Examined student perception of CBT | Reinforces the role of user trust in adoption | Does not propose a practical platform |
| Holden et al. (2021) | Reviewed academic integrity in online assessment | Identifies integrity as a major online testing challenge | Not specific to a departmental CBT implementation |
| Chouhan (2023) / Griffiths (2022) | Discussed integrity strategies in remote or proctored online exams | Supports the need for realistic anti-cheat mechanisms | Does not center on smartphone-first exam delivery |

The reviewed literature shows that CBT adoption, mobile learning, and exam integrity are important and interrelated. However, there is still a gap in simple, department-focused systems that combine mobile usability with practical anti-cheat controls.

## Gap and Proposed Solution

Current studies and systems often treat usability and security as separate concerns. Some focus on student acceptance, while others focus on proctoring or integrity strategies without presenting a compact department-level CBT platform. In addition, many platforms are optimized for desktops rather than mobile devices.

This project addresses these gaps by proposing a mobile-first CBT platform with responsive test delivery, question and exam management, session monitoring, fullscreen enforcement, activity violation logging, and automatic response to repeated suspicious behavior. The goal is not to guarantee perfect cheating prevention, but to raise the integrity level of department-based digital exams.

## Methodology

An incremental software development methodology will be used. The project will begin with requirement gathering based on departmental examination workflow, question administration needs, student access patterns, and likely integrity concerns. This will guide the definition of user roles, data structures, and security rules.

The design phase will specify system architecture, database structure, exam flow, and anti-cheat logic. This will be followed by implementation of the administrator module, student exam module, and monitoring features using suitable web technologies such as Next.js, React, TypeScript, and a relational database.

Testing will focus on usability, correctness of exam timing and submission, responsiveness across screen sizes, and proper logging of anti-cheat violations. The completed prototype will then be evaluated against the stated objectives.

## Expected Results

The study is expected to produce:

1. a standalone CBT platform for department-level examination management;
2. a responsive student exam interface suited to mobile and desktop devices;
3. anti-cheat features that detect or restrict common browser-based malpractice; and
4. a more credible and efficient digital examination process for the department.

## Work Plan / Time Frame

The project is expected to span three months, from March 2026 to May 2026, across the following stages:

1. requirement gathering and system planning;
2. system analysis and interface design;
3. implementation of exam, admin, and anti-cheat modules;
4. testing and evaluation; and
5. documentation and final reporting.

## Budget

| Item | Description | Cost (NGN) |
|---|---|---:|
| Internet/Data | Research, development, testing, and online access | 25,000 |
| Power/Electricity Support | Electricity and backup power | 30,000 |
| Transportation | Project meetings and logistics | 15,000 |
| Printing and Binding | Draft and final documentation | 20,000 |
| Hosting/Domain (Optional) | Demonstration support | 15,000 |
| Contingency | Miscellaneous expenses | 10,000 |
| **Total** |  | **115,000** |

## References

Adamu, A. D. (2024). *Computer-Based Testing implementation in Nigeria: Successes and challenges from historical perspectives*. UMYU Journal of Educational Research. https://doi.org/10.70886/ujer.24121.013

Cheon, J., Lee, S., Crooks, S. M., & Song, J. (2012). *An investigation of mobile learning readiness in higher education based on the theory of planned behavior*. Computers & Education, 59(3), 1054-1064. https://doi.org/10.1016/j.compedu.2012.04.015

Chouhan, R. (2023). *Strategies for maintaining academic integrity in remote unproctored and proctored online assessments for engineering courses*. Learning: Research and Practice, 10(1), 75-92. https://doi.org/10.1080/23735082.2023.2216198

Griffiths, B. J. (2022). *Mitigating cheating during online proctored exams*. Research on Education and Media, 14(2), 9-14. https://doi.org/10.2478/rem-2022-0016

Holden, O. L., Norris, M. E., & Kuhlmeier, V. A. (2021). *Academic integrity in online assessment: A research review*. Frontiers in Education, 6, 639814. https://doi.org/10.3389/feduc.2021.639814

Naveed, Q. N., Choudhary, H., Ahmad, N., Alqahtani, J., & Qahmash, A. I. (2023). *Mobile learning in higher education: A systematic literature review*. Sustainability, 15(18), 13566. https://doi.org/10.3390/su151813566

Okocha, F. (2022). *Student perception of computer-based testing in Kwara State, Nigeria*. International Journal of Web-Based Learning and Teaching Technologies. https://doi.org/10.4018/IJWLTT.294575

Tella, A., & Bashorun, M. T. (2012). *Attitude of undergraduate students towards computer-based test (CBT): A case study of the University of Ilorin, Nigeria*. International Journal of Information and Communication Technology Education. https://doi.org/10.4018/jicte.2012040103
