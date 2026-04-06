# Diagram Prompts

These prompts are for regenerating the Chapter Three figures in [figures](C:\Users\azeta\Documents\School\Project Topic\CBT System\drafts\figures) with a more polished academic formal look. Each regenerated image should keep the same filename so it can replace the existing version directly. The image itself should not include the figure caption text because the Word document already adds the caption below the image.

## Figure 3.1

**Filename:** `figure_3_1_system_architecture.png`

**Prompt:**  
Create a professional academic software architecture diagram for a mobile-first anti-cheat computer-based testing platform. Use a white background, soft navy and slate accents, thin clean connector lines, and a polished university-report style. The diagram should look formal, balanced, and high quality, not playful or cartoonish. Show these components clearly with rectangular boxes and consistent spacing: Student, Administrator, Presentation Layer, Application Layer, Data Layer. Inside Presentation Layer include: Mobile/Web Interface, Student Exam Pages, Admin Dashboard. Inside Application Layer include: Authentication, Exam Access Validation, Exam Management, Question Management, Session Control, Result Processing, Anti-Cheat Monitoring. Inside Data Layer include: Students, Exams, Questions, Sessions, Answers, Violations. Show directional arrows from Student and Administrator to Presentation Layer, from Presentation Layer to Application Layer, and from Application Layer to Data Layer. Use clean typography, subtle shadows if needed, and restrained color accents suitable for a final year software engineering project report. Do not place the figure caption inside the image.

**Note:** Output as PNG on a white background. Do not include the figure caption inside the image.

## Figure 3.2

**Filename:** `figure_3_2_use_case_diagram.png`

**Prompt:**  
Create a polished UML use case diagram for a mobile-first anti-cheat CBT platform in a formal academic style. Use a white background, dark gray outlines, muted blue accents, clear legible text, and a neat report-friendly layout. Show two actors: Student and Administrator. Inside a system boundary labeled CBT Platform, include these use cases: Login, Start Exam, Answer Questions, Submit Exam, Receive Warnings, Create Exam, Manage Questions, Manage Students, Monitor Sessions and Results. Connect Student to Login, Start Exam, Answer Questions, Submit Exam, and Receive Warnings. Connect Administrator to Login, Create Exam, Manage Questions, Manage Students, and Monitor Sessions and Results. Keep the UML structure clean and correct, with balanced spacing and a refined professional look suitable for a software engineering project document. Do not place the figure caption inside the image.

**Note:** Output as PNG on a white background. Do not include the figure caption inside the image.

## Figure 3.3

**Filename:** `figure_3_3_system_flowchart.png`

**Prompt:**  
Create a high-quality academic flowchart for the student examination process in a mobile-first anti-cheat CBT platform. Use a white background, formal software-diagram styling, muted professional colors such as navy, gray, and light blue, and standard flowchart shapes with clean alignment. Show these steps in order: Start, Student logs in, System checks exam availability and eligibility, Load questions and start timer, Student answers questions and system monitors violations, Decision: Warning limit reached?, Yes branch to Auto submit or Terminate session, No branch to Manual submit or Time runs out, then both branches lead to Score, store result, and end session. Make the decision node visually clear, keep connectors neat, and ensure the layout is elegant and report-ready. The image should look like a serious software engineering flowchart, not a rough sketch. Do not place the figure caption inside the image.

**Note:** Output as PNG on a white background. Do not include the figure caption inside the image.

## Figure 3.4

**Filename:** `figure_3_4_erd.png`

**Prompt:**  
Create a professional entity relationship diagram for a mobile-first anti-cheat CBT platform in a formal academic software engineering style. Use a white background, subtle blue-gray accents, dark readable text, and clean structured table-style entities. Include these entities with key fields: STUDENTS with student_id PK, matric_no, surname, first_name. EXAMS with exam_id PK, title, course_code, duration. QUESTIONS with question_id PK, exam_id FK, text, correct_option. SESSIONS with session_id PK, student_id FK, exam_id FK, status, warning_count. ANSWERS with answer_id PK, session_id FK, question_id FK, selected_option. VIOLATIONS with violation_id PK, session_id FK, type, timestamp. Show clear relationship lines with proper cardinality markers: one student to many sessions, one exam to many questions, one exam to many sessions, one session to many answers, one session to many violations, and one question linked to many answers. Keep the layout balanced, formal, and visually refined for inclusion in a final year project report. Do not place the figure caption inside the image.

**Note:** Output as PNG on a white background. Do not include the figure caption inside the image.
