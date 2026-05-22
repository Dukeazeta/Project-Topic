# CHAPTER FOUR

## SYSTEM IMPLEMENTATION

### 4.1 Implementation Tools

The proposed CBT platform was implemented as a web-based standalone system using modern software tools that support interactive user interfaces, structured data handling, and smooth operation across different screen sizes. The combination of tools selected for this work made it possible to build a system that is not only functional, but also maintainable and suitable for a departmental examination environment.

The main implementation framework used for the system is **Next.js**. This framework was used because it supports structured page routing, server-side features, and modern web application development. It also provides a good foundation for building a system that contains both student-facing and administrator-facing pages. The user interface layer was developed with **React**, which supports reusable interface components and makes it easier to manage dynamic user interaction during examination sessions.

The main programming language used in the implementation is **TypeScript**. TypeScript was chosen because it helps to reduce programming errors by making application logic more explicit and easier to manage. Since the CBT platform contains student sessions, timer logic, question handling, and administrative controls, using a typed language helps improve code reliability and maintainability.

For database interaction, the system uses **Drizzle ORM**. This tool supports structured communication between the application logic and the database layer. It helps in managing records such as students, examinations, questions, sessions, answers, and violations in a more organized way. The storage layer is based on a lightweight **SQLite/Turso-style database arrangement**, which is suitable for a standalone academic project because it is easier to manage and deploy than heavier enterprise database systems.

The anti-cheat control in the system is handled through **browser-side monitoring logic**. This part of the implementation watches for suspicious user behaviour such as tab switching, fullscreen exit, copy and paste attempts, right-click attempts, and certain keyboard shortcuts linked to developer tools. This monitoring logic works together with the rest of the application to record warnings and apply session control rules when needed.

The interface styling of the platform is supported by **Tailwind CSS and related front-end styling utilities**. These tools help in creating a clean and responsive interface that works properly on smartphones, tablets, laptops, and desktop screens. Since the system is mobile-first, interface tools that support responsive layout are especially important in the implementation.

### 4.2 Systems Requirements

The system requirements describe the minimum resources needed to develop, test, and use the proposed CBT platform effectively. Since the platform is web-based, the requirements are moderate when compared with heavier desktop systems. However, some basic hardware and software conditions are still necessary to ensure that the system runs smoothly during development and during examination use.

#### 4.2.1 Hardware Requirements

The hardware requirements cover the main physical devices needed for development, administration, and user testing. Since the project is designed as a mobile-first web platform, both laptop and smartphone use were considered in defining these requirements.

| Hardware Component | Minimum Requirement | Purpose |
|---|---|---|
| Developer or administrator computer | Core i3 processor or equivalent, 4 GB RAM, 50 GB free storage | Used for development, testing, exam setup, and administrative monitoring |
| Smartphone for mobile testing | Android smartphone or equivalent with modern browser support | Used to test mobile-first student and admin interface behaviour |
| Internet or local network access | Stable connection during development and live use | Needed for system access, testing, and synchronized exam operation |
| Power supply | Reliable electricity or backup power source | Needed to reduce interruption during development and examination sessions |

#### 4.2.2 Software Requirements

The software requirements describe the operating and development environment needed for the proposed system. Because the platform is a web application, the main requirements focus on browser support, runtime support, and development tools.

| Software Component | Minimum Requirement | Purpose |
|---|---|---|
| Operating system | Windows 10 or later, Linux, or macOS | Provides the environment for development and testing |
| Web browser | Recent version of Chrome, Edge, Firefox, or similar browser | Used by students and administrators to access the platform |
| Node.js runtime | Node.js 18 or later | Runs the web application during development and deployment |
| Package manager | npm, pnpm, or equivalent | Used to install and manage project dependencies |
| Database environment | SQLite or Turso-compatible setup | Stores students, exams, questions, answers, sessions, and violations |
| Development tools | Code editor such as Visual Studio Code | Used for writing, testing, and maintaining the application |

### 4.3 Choice of Programming Language / Implementation Platform

The proposed system was implemented as a web-based standalone platform because a web approach provides better flexibility for both students and administrators. A web platform can be accessed through a browser without requiring users to install a separate application. This is especially useful for a departmental CBT system where the goal is to support wider access with minimal setup stress.

The main implementation language used in the project is TypeScript. This language was selected because it improves code clarity and supports better control over application behaviour. Since the system handles multiple connected features such as authentication, examination timing, question navigation, warning management, and result processing, a strongly typed language helps reduce careless coding mistakes.

The interface layer was implemented with React and Next.js. React was selected because it supports reusable user interface components, while Next.js provides the page structure and application framework needed for a complete web system. Together, they make it easier to build a modern interface for both students and administrators.

Database interaction is handled through Drizzle ORM. This platform was selected because it provides a structured method for managing data operations such as storing questions, retrieving student records, updating session states, and saving result information. The underlying database arrangement is lightweight and appropriate for a standalone departmental platform.

Overall, the implementation platform was chosen because it supports modern web development, mobile responsiveness, structured data handling, and easier future maintenance.

#### 4.3.1 Justification for Choice of Programming Language

TypeScript was selected as the main programming language because it helps in producing cleaner and more dependable application logic. Unlike plain JavaScript, TypeScript allows the developer to define clearer data structures and expected values. This becomes useful in a project like the proposed CBT platform, where the system must handle exam settings, session information, question data, answer records, and violation logs without confusion.

Another reason for choosing TypeScript is maintainability. A project of this kind may later need updates such as changes in timing rules, anti-cheat policies, question handling, or user management. TypeScript makes such updates easier because the relationships between different parts of the code are more clearly defined. This reduces the chance of introducing hidden errors during future modifications.

The language is also suitable for modern browser-based systems. Since the interface is built with React and Next.js, TypeScript fits naturally into the selected implementation environment. It supports better integration between the front-end interface, application logic, and database interaction layer.

The choice is further justified by the mobile-first nature of the project. A responsive examination system contains many interactive actions such as timing updates, warning prompts, answer selection, and navigation between questions. TypeScript and the chosen implementation platform make it easier to manage these interactions in a structured and reliable way. For these reasons, TypeScript is an appropriate choice for the proposed standalone CBT platform.

### 4.4 Sample Outputs (Discussion of Components of Implemented Software/Hardware)

This section presents the major components of the implemented system through the main screens that support student examination and administrative control. Real screenshots will be inserted in the final report version. For now, the exact placement of each screenshot is reserved so that the chapter structure remains stable.

**Figure 4.1 Placeholder: Student Login Page**

[Insert Screenshot: Student Login Page]

The student login page is the first screen used by a student before entering the examination environment. It provides access validation and ensures that only authorized users can continue into the exam session. This screen is important because it forms the first layer of examination access control.

**Figure 4.2 Placeholder: Exam Start Screen**

[Insert Screenshot: Exam Start Screen]

The exam start screen presents the examination details before the student begins. It may show information such as the exam title, course code, duration, instructions, and session readiness. This screen is important because it gives the student a clear view of the exam conditions before the timer begins.

**Figure 4.3 Placeholder: Exam-Taking Interface**

[Insert Screenshot: Exam-Taking Interface]

The exam-taking interface is the main working screen of the platform. It displays the questions, answer options, timer, and navigation controls. This screen is central to the whole system because it is where the student interacts directly with the examination.

**Figure 4.4 Placeholder: Warning or Violation Prompt**

[Insert Screenshot: Warning or Violation Prompt]

The warning prompt appears when suspicious activity is detected during the examination. It informs the student that a violation has been recorded and helps enforce the anti-cheat policy of the platform. This screen is important because it represents the practical monitoring strength of the system.

**Figure 4.5 Placeholder: Admin Exam Creation Screen**

[Insert Screenshot: Admin Exam Creation Screen]

The exam creation screen allows the administrator to define the exam title, course code, duration, timing mode, exam window, and anti-cheat settings. This screen is important because it controls the overall behaviour of each examination before students begin.

**Figure 4.6 Placeholder: Question Management Screen**

[Insert Screenshot: Question Management Screen]

The question management screen allows the administrator to add, edit, import, arrange, and review examination questions. This screen is important because good question management directly affects the quality and fairness of the examination.

**Figure 4.7 Placeholder: Student Management Screen**

[Insert Screenshot: Student Management Screen]

The student management screen allows the administrator to create and manage student records. It supports the organization of student access details and helps ensure that only valid students participate in the examination. This screen is important because it supports proper control over exam participation.

**Figure 4.8 Placeholder: Session Monitoring Screen**

[Insert Screenshot: Session Monitoring Screen]

The session monitoring screen allows the administrator to view active sessions, track progress, check violations, and apply actions such as pause, resume, or final submission. This screen is important because it gives the administrator direct oversight during live examinations.

**Figure 4.9 Placeholder: Result or Session Summary Screen**

[Insert Screenshot: Result or Session Summary Screen]

The result or session summary screen shows the outcome of the examination after submission. It may include score information, session state, and related result records. This screen is important because it supports result review and record keeping after the examination has ended.

### 4.5 Systems Evaluation or Comparison with Existing System

The proposed standalone CBT platform improves on the existing examination arrangement in several practical ways. While the existing approach may be manual or only partly computerized, the proposed system introduces organized digital control over exam setup, student access, session handling, suspicious behaviour monitoring, and result processing. This makes the new system more suitable for present departmental needs.

The manual or weakly computerized method depends heavily on printing, physical supervision, manual marking, and physical record handling. This makes the process slower and more stressful when student population is high. In contrast, the proposed system reduces manual effort by storing examination records digitally, supporting automatic objective result processing, and providing one dashboard for major administrative actions.

Another clear difference appears in accessibility. The existing method does not support proper mobile-based examination interaction, while the proposed platform is designed with mobile-first access in mind. This makes it easier for students and administrators to use the system on smaller devices where necessary.

The biggest practical difference, however, is examination control. The proposed system introduces warning logic, session monitoring, and structured anti-cheat checks. These features make the platform stronger and more reliable than a simple examination arrangement that depends only on physical supervision or limited digital support.

#### Table 4.1 Comparison Between Existing System and Proposed System

| Feature Area | Existing Examination Method | Proposed CBT Platform |
|---|---|---|
| Speed of operation | Slower due to printing, manual supervision, and manual marking | Faster due to digital setup, digital session handling, and automatic result processing |
| Record handling | Mostly manual and harder to organize | Digital and easier to store, retrieve, and review |
| Mobile access | Little or no structured mobile support | Mobile-first access for better usability on smartphones |
| Session control | Weak or fully manual | Structured session creation, pause, resume, and final submit control |
| Anti-cheat monitoring | Mostly dependent on human observation | Browser-based warning and violation monitoring |
| Question management | Manual preparation or limited digital support | Structured creation, editing, import, and arrangement of questions |
| Result processing | Manual or partly computerized | More organized and faster for objective examination processing |
| Administrative oversight | Limited during live exam sessions | Centralized dashboard for monitoring and control |
