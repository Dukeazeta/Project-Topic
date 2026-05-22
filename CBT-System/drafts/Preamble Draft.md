# PREAMBLE DRAFT

## i. COVER PAGE

DESIGN AND IMPLEMENTATION OF A MOBILE-FIRST ANTI-CHEAT CBT PLATFORM FOR THE DEPARTMENT OF COMPUTER SCIENCE, FEDERAL UNIVERSITY OF PETROLEUM RESOURCES, EFFURUN

AZETA DUKE

COS/8650/2021

DEPARTMENT OF COMPUTER SCIENCE

COLLEGE OF SCIENCE

FEDERAL UNIVERSITY OF PETROLEUM RESOURCES, EFFURUN, DELTA STATE, NIGERIA

MARCH, 2026

Note:
The university logo should be placed at the centre of this page.
All items on the cover page should appear in upper case.

## ii. TITLE PAGE

DESIGN AND IMPLEMENTATION OF A MOBILE-FIRST ANTI-CHEAT CBT PLATFORM FOR THE DEPARTMENT OF COMPUTER SCIENCE, FEDERAL UNIVERSITY OF PETROLEUM RESOURCES, EFFURUN

BY

AZETA DUKE

COS/8650/2021

A PROJECT SUBMITTED TO THE

DEPARTMENT OF COMPUTER SCIENCE,

COLLEGE OF SCIENCE, FEDERAL UNIVERSITY OF PETROLEUM RESOURCES,

EFFURUN, DELTA STATE

IN PARTIAL FULFILMENT FOR THE AWARD OF A BACHELOR OF

SCIENCE (B.Sc.) DEGREE IN COMPUTER SCIENCE

MARCH, 2026

## iii. DECLARATION

I, Azeta Duke, with matriculation number COS/8650/2021, hereby declare that this project titled, "Design and Implementation of a Mobile-First Anti-Cheat CBT Platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun" was carried out by me under the supervision of Dr Nwozor Blessing, in partial fulfilment of the requirement for the award of B.Sc. Computer Science from the Department of Computer Science, Federal University of Petroleum Resources, Effurun. This project is original and has not been submitted in part or in full for the award of any degree in this or any other institution.

______________________________  
Azeta Duke  
Student  
Date: ______________________

______________________________  
Dr Nwozor Blessing  
Supervisor  
Date: ______________________

## iv. CERTIFICATION

This is to certify that this project titled, "Design and Implementation of a Mobile-First Anti-Cheat CBT Platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun" was carried out by Azeta Duke with matriculation number COS/8650/2021, and has been approved by the undersigned having met the partial requirement for the award of a Bachelor of Science (B.Sc.) degree in Computer Science from the Department of Computer Science, Federal University of Petroleum Resources, Effurun.

______________________________  
Dr Nwozor Blessing  
Project Supervisor  
Date: ______________________

______________________________  
Prof./Dr. ______________________  
Head of Department  
Date: ______________________

______________________________  
External Examiner  
Date: ______________________

## v. DEDICATION

This project is dedicated to God Almighty for His grace, strength, and guidance throughout the course of this study. It is also dedicated to my family for their support, encouragement, and prayers.

## vi. ACKNOWLEDGEMENTS

I give thanks to God Almighty for His mercy, wisdom, and strength throughout the period of this project work and my academic programme.

I sincerely appreciate my supervisor, Dr Nwozor Blessing, for the guidance, correction, encouragement, and support given to me during the course of this work. Your advice and supervision were very helpful to the success of this project.

I also appreciate the lecturers and staff of the Department of Computer Science, Federal University of Petroleum Resources, Effurun, for the knowledge and support they provided during my period of study.

My sincere gratitude goes to my parents, family members, and friends for their encouragement, prayers, and understanding throughout this project.

I am grateful to everyone who contributed in one way or another to the success of this study.

## vii. ABSTRACT

This study focused on the design and implementation of a mobile-first anti-cheat Computer-Based Testing platform for the Department of Computer Science, Federal University of Petroleum Resources, Effurun. The aim of the study was to develop a standalone CBT system that improved examination access on mobile devices and supported practical anti-cheat measures during examinations.

The system was designed as a web-based platform with separate interfaces for administrators and students. The administrator section was used for exam creation, question management, student management, session monitoring, and result handling, while the student section was used for login, timed examination access, answer submission, and result viewing where permitted. Practical anti-cheat features such as fullscreen monitoring, tab switch detection, copy and paste restriction, right-click restriction, question randomization, and violation logging were implemented in the system.

The system was developed to improve examination management, fairness, and usability within the department. The result showed that the platform provided a more organized way to conduct computer-based examinations while also supporting better monitoring of student sessions. It was concluded that a mobile-first anti-cheat CBT platform could improve digital examination practice at the department level.

## viii. TABLE OF CONTENTS

- Declaration
- Certification
- Dedication
- Acknowledgements
- Abstract
- Table of Contents
- List of Figures
- List of Tables
- CHAPTER ONE
- INTRODUCTION
- 1.1 BACKGROUND OF THE STUDY
- 1.2 STATEMENT OF THE PROBLEM
- 1.3 AIM AND OBJECTIVES OF THE STUDY
- 1.4 SIGNIFICANCE OF THE STUDY
- 1.5 SCOPE OF THE STUDY
- 1.6 DEFINITION OF TERMS
- CHAPTER TWO
- LITERATURE REVIEW
- 2.1 THEORETICAL REVIEW OR CONCEPTUAL REVIEW
- 2.2 OTHER LITERATURE ON PREVIOUS APPROACHES, THEORIES, AND TECHNIQUES
- 2.3 REVIEW OF RELATED WORKS
- 2.4 SUMMARY OF LITERATURE REVIEW
- 2.5 GAPS IN RELATED WORKS
- CHAPTER THREE
- CHAPTER FOUR
- CHAPTER FIVE
- References
- Appendices

## ix. LIST OF FIGURES

- Figure 3.1: System Architecture
- Figure 3.2: Use Case Diagram
- Figure 4.1: Admin Dashboard
- Figure 4.2: Student Exam Interface

## x. LIST OF TABLES

- Table 2.1: Summary of Reviewed Literature
- Table 3.1: System Requirements
- Table 4.1: Test Cases and Results
