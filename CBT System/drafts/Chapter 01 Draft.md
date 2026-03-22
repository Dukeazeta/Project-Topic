# CHAPTER ONE

## INTRODUCTION

### 1.1 Background of the Study

Assessment is a very important part of education because it helps lecturers know whether students have understood what they were taught. In the past, most examinations in universities were done manually with printed question papers, answer booklets, and manual marking. Although this method has been used for a long time, it usually comes with many problems such as delay in marking, stress in handling scripts, errors in record keeping, and difficulty in managing large numbers of students.

With the growth of technology, many schools now use computer-based systems for teaching, learning, and assessment. One of these is Computer-Based Testing, which is commonly known as CBT. CBT is a method of conducting examinations with the use of a computer or any digital device. Instead of writing answers on paper, students read questions on a screen and submit their answers through the system. This makes the examination process faster and easier to manage, especially when there are many students.

Computer-Based Testing has become more common because it has many advantages. It can reduce the time used for marking objective questions, improve record storage, and make exam administration easier. It also helps institutions organize tests in a more modern and structured way. In Nigeria, CBT is already used in many large examinations, and tertiary institutions are also adopting it more often (Adamu, 2024).

Even though CBT has many benefits, it still comes with some challenges. One major challenge is that not every CBT system is easy to use. Some platforms are designed mainly for desktop computers and may not work well on mobile phones. This is a problem because many students now use smartphones more than laptops. If a CBT platform is not easy to use on a phone, students may face difficulty during the examination. Studies on student use of mobile learning systems show that ease of use and access on mobile devices matter greatly in digital learning environments (Cheon et al., 2012; Han & Shin, 2016; Naveed et al., 2023).

Another challenge is examination malpractice. In a digital exam environment, some students may try to switch tabs, leave the exam page, copy questions, paste answers, or use outside help during the test. When a CBT system does not have proper controls, it becomes harder to maintain fairness during examinations. For this reason, a good CBT platform should not only be easy to use, but should also include practical measures that can help reduce suspicious behaviour. This concern is consistent with studies that identify academic integrity as a major issue in online assessment environments (Holden et al., 2021; Griffiths, 2022).

In the Department of Computer Science, Federal University of Petroleum Resources, Effurun, there is a need for a CBT platform that is simple to use on mobile devices and also supports practical anti-cheat features. A system like this can help the department conduct examinations in a more organized, fair, and reliable way. This study is therefore focused on the design and implementation of a new standalone mobile-first anti-cheat CBT platform for the department.

### 1.2 Statement of the Problem

Many traditional examination methods still come with problems such as delay in marking, poor handling of records, and stress in managing examinations for a large number of students. Although Computer-Based Testing helps to solve some of these problems, many available CBT platforms still have weaknesses.

Some CBT systems are not properly designed for mobile devices, even though many students depend on smartphones for digital access. This can make the exam interface difficult to use and may affect the student's experience during the test. In the same way, some systems do not have enough control features to properly monitor examination sessions. Research on student attitude and perception toward CBT also shows that acceptance of the system is strongly linked to how reliable and user-friendly it is (Tella & Bashorun, 2012; Okocha, 2022).

Another problem is that some platforms do not properly handle common suspicious actions during exams. Actions such as tab switching, repeated exit from fullscreen mode, copy and paste attempts, and weak session tracking can reduce trust in the examination process. If such actions are not monitored, it becomes difficult to maintain fairness and credibility in the conduct of computer-based examinations. This agrees with findings that online assessment systems need stronger integrity controls and monitoring mechanisms to discourage dishonest behaviour (Holden et al., 2021; Dendir & Maxwell, 2020; Chouhan, 2023).

There is therefore a need for a focused standalone CBT platform that is mobile-first and also supports practical anti-cheat measures for better exam control. This study is aimed at addressing that need in the Department of Computer Science, Federal University of Petroleum Resources, Effurun.

### 1.3 Aim and Objectives of the Study

#### Aim

The aim of this study is to design and implement a mobile-first anti-cheat CBT platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun.

#### Objectives of the Study

The specific objectives of the study are to:

1. develop a standalone CBT platform for departmental examinations;
2. design separate interfaces for administrators and students;
3. provide features for exam creation, question management, and student management;
4. implement timed examination sessions with automatic submission;
5. incorporate practical anti-cheat features such as fullscreen monitoring, tab switch detection, copy and paste restriction, and violation logging;
6. support question and answer option randomization; and
7. provide tools for result handling and session monitoring.

### 1.4 Significance of the Study

This study will be useful to the Department of Computer Science because it will provide a focused standalone system for conducting computer-based examinations. It can help improve the way exams are organized and managed within the department.

The study will also be useful to lecturers and administrators. It can make exam setup easier by supporting question management, student management, session monitoring, and result handling. This can reduce some of the stress involved in manual exam administration and improve control during examinations.

Students will also benefit from the study because the proposed system is mobile-first. This means that students who depend on smartphones will find the system easier to access and use. The anti-cheat features will also help make the exam process fairer for everyone.

Finally, this study will be useful for future researchers and developers who may want to improve on the work or develop related academic systems in the future.

### 1.5 Scope of the Study

This study is limited to the design and implementation of a standalone mobile-first anti-cheat CBT platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun. The system is meant for departmental use only and not for the whole university.

The study covers features such as administrator and student login, exam creation, question management, student management, timed examination sessions, answer submission, question randomization, option shuffling, result handling, and practical anti-cheat measures such as fullscreen monitoring, tab switch detection, copy and paste restriction, right-click restriction, and violation logging.

The study does not cover a university-wide CBT platform, biometric verification, webcam-based invigilation, or advanced artificial intelligence proctoring. It is also limited to a web-based standalone system that is optimized for mobile use.

### 1.6 Definition of Terms

**Computer-Based Testing (CBT):** A method of conducting examinations through a computer or digital device instead of paper.

**Mobile-First Design:** A design approach where a system is first built for mobile devices before larger screens are considered.

**Anti-Cheat Features:** Practical system controls used to reduce or monitor suspicious behaviour during an examination.

**Fullscreen Monitoring:** A feature that checks whether a student remains in fullscreen mode during an examination.

**Violation Logging:** The recording of suspicious actions made by a student during an exam session.

**Session Monitoring:** The process of tracking a student's exam session from start to submission.

**Question Randomization:** Presenting questions in different order to different students to reduce answer sharing.

**Standalone System:** A self-contained system developed to perform its own function independently without being part of a larger portal.
