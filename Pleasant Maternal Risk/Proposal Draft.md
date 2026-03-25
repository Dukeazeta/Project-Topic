# Project Proposal Draft

## Student Details / Title

- **Name:** Pleasant
- **Matric Number:** __________________
- **Supervisor/Mentor:** __________________
- **Department:** Computer Science
- **Institution:** __________________
- **Academic Session:** 2025/2026
- **Project Title:** **Design and Implementation of a Maternal Health Decision Support System for Primary Health Centre Staff to Flag High-Risk Pregnant Women Using Simple Clinic Records in Ugbomoro**

## Executive Summary

Maternal health remains an important public health issue, especially in low-resource settings where delays in identifying high-risk pregnancies can lead to serious complications for both mother and baby. In many Primary Health Centres (PHCs), risk assessment still depends heavily on manual review of clinic records and the personal judgment of health workers. While health workers play a vital role in antenatal care, they may not always have a simple digital tool that helps them quickly organize patient records and identify women who may need closer attention.

This project focuses on the design and implementation of a maternal health decision support system for Primary Health Centre staff in Ugbomoro. The proposed system will be built as a desktop-first web dashboard for PHC staff. It will allow staff to register pregnant women, record basic clinic information such as age, blood pressure, blood sugar, body temperature, heart rate, gestational stage, symptoms, and visit history, and then generate a simple risk flag of low, medium, or high. The system is meant to support early attention and follow-up, not to replace medical judgment or make final diagnosis decisions.

The proposed system will also provide a flagged-patient dashboard, patient history view, and simple reports that help staff monitor risk trends and focus on women who may need urgent review. The machine learning component will use simple classification methods and public maternal health risk data as the initial model base, while the dashboard will be structured around the real workflow of PHC staff. The expected result is a practical digital support tool that improves record handling, supports faster screening, and makes possible high-risk cases more visible in a PHC setting.

## Background Study

Maternal mortality is still a major global concern. The World Health Organization reported on 7 April 2025 that maternal mortality remains a serious problem and that most maternal deaths are preventable when risks are identified early and quality care is available. This shows the importance of systems that can support earlier attention to danger signs during pregnancy, especially in settings where resources and specialist support may be limited.

In Nigeria, maternal healthcare access and quality still vary strongly across regions and facilities. Oyinlola et al. (2025) found that maternal healthcare service utilisation remains low across Nigeria's regions, which means many women still do not receive timely or complete maternal care. Oluwatola et al. (2025) also showed that the quality of maternal and newborn care in Nigeria's PHC facilities is still unsatisfactory in important areas. These findings suggest that PHC staff need practical tools that can make routine screening and follow-up easier and more consistent.

Risk screening during pregnancy is important because high blood pressure, abnormal blood sugar, unusual temperature, and related indicators can point to possible danger. Salomon et al. (2019) examined antenatal care quality and the detection of hypertensive disorders in pregnancy in Nigeria and showed that early detection and proper management are essential. In a PHC environment, where many decisions are made quickly and with basic available information, a system that organizes simple clinic records and highlights possible risk can be useful.

Recent research in machine learning has shown that maternal risk can be predicted reasonably well even with a small number of basic health measurements. The UCI Maternal Health Risk dataset contains six simple features - age, systolic blood pressure, diastolic blood pressure, blood sugar, body temperature, and heart rate - and is meant for classification tasks. Togunwa et al. (2023), Khadidos et al. (2024), and Malde et al. (2025) all show that machine learning methods can classify maternal risk levels from simple vital-sign-style data. This makes the topic suitable for a BSc project because the AI part can be built with standard tools and still remain meaningful.

Despite these advances, many studies focus mainly on model accuracy and not on building a simple PHC-facing decision support dashboard for local use. This project addresses that gap by combining a practical software system with a simple, explainable AI feature that supports PHC staff in Ugbomoro.

## Problem Statement

In many Primary Health Centres, the review of pregnant women's clinic records is still done manually or with limited digital support. This can make it harder for health workers to quickly notice patterns that suggest higher maternal risk, especially when many patients are seen over time and records are scattered across notebooks, paper files, or simple spreadsheets. As a result, women who need closer observation may not be made visible early enough.

Another challenge is that many available maternal health studies and AI models focus on prediction performance alone without translating the idea into a practical system that PHC staff can use in their day-to-day work. Even where digital records exist, the absence of a simple dashboard for patient registration, clinic record capture, risk flagging, and follow-up visibility limits how useful the information can be in routine care.

The problem this project addresses, therefore, is the absence of a simple maternal health decision support system for PHC staff in Ugbomoro that can use basic clinic records to flag possible high-risk pregnancies for closer attention. Such a system is needed to support earlier screening, better record organization, and clearer visibility of women who may require follow-up or referral.

## Aim/Objectives

### Aim

The aim of this project is to design and implement a maternal health decision support system for Primary Health Centre staff in Ugbomoro that uses simple clinic records to flag possible high-risk pregnancies.

### Objectives

The specific objectives of the study are to:

1. build a desktop-first web dashboard for PHC staff;
2. support the registration of pregnant women and the storage of their clinic records;
3. capture simple maternal health indicators such as age, blood pressure, blood sugar, body temperature, heart rate, gestational stage, symptoms, and visit history;
4. implement a machine learning module that classifies patients into low, medium, or high risk levels;
5. display flagged high-risk cases clearly for closer staff attention;
6. provide patient history and simple report views for monitoring; and
7. present the system as a decision support tool that assists health workers without replacing medical judgment.

## Conceptual Review

### Maternal Health Decision Support Systems

A maternal health decision support system is a digital tool that helps health workers organize maternal records and notice possible risk patterns early. The system does not make final clinical decisions by itself. Instead, it supports staff with clearer information so they can act faster and more consistently.

### Risk Screening in Pregnancy

Risk screening in pregnancy means checking whether a woman may be more likely to face complications during pregnancy or childbirth. This may involve looking at signs such as blood pressure, blood sugar, temperature, heart rate, symptoms, and past visit information. In this project, the system uses simple clinic records to produce a risk flag that helps staff know who may need closer review.

### Primary Health Centre Workflow

Primary Health Centres often serve as the first point of care for pregnant women. In a PHC setting, health workers need quick access to patient records, basic measurements, and clear alerts. A system designed for PHC workflow should therefore focus on easy patient registration, quick data entry, clear dashboards, and simple reports.

### Machine Learning Classification

Machine learning classification is a method where a computer system learns patterns from example data and then places new records into classes. In this project, the classes are low risk, medium risk, and high risk. Because the project is at BSc level, the focus is on simple and explainable models such as logistic regression, decision tree, random forest, and similar standard methods.

### Explainable Clinical Support

Explainable clinical support means that the output of the system should be easy for users to understand. In this project, the goal is not to produce a hidden or confusing result. The goal is to show a clear risk level and make it easy for staff to relate the result to entered clinic values. This is important because health workers must still use their training and judgment in caring for patients.

## Literature Review

| Author / Title | Objective | Methodology Used | Strengths | Gaps / Further Study |
|---|---|---|---|---|
| Salomon et al. (2019), *Detecting and managing hypertensive disorders in pregnancy: a cross-sectional analysis of the quality of antenatal care in Nigeria* | To assess antenatal care quality and the ability of facilities to detect and manage hypertensive disorders in pregnancy | Cross-sectional facility assessment in Nigerian PHCs and hospitals | Gives direct Nigerian evidence that early maternal risk detection in routine care matters | Does not propose a digital decision support system for PHC staff |
| Oyinlola et al. (2025), *Regional variations in prevalence and factors associated with maternal healthcare services utilisation in Nigeria* | To examine regional differences and factors linked to maternal healthcare use in Nigeria | National analytical study using recent survey data | Shows that maternal care use remains low and uneven across Nigeria | Focuses on utilisation patterns, not on staff-facing screening tools |
| Oluwatola et al. (2025), *Assessment of quality of maternal and newborn care and its determinants: a national study of primary health care facilities in Nigeria* | To assess maternal and newborn care quality in PHC facilities across Nigeria | National PHC assessment study | Strongly supports the need for better PHC support tools and monitoring systems | Does not build or test an AI-enabled dashboard for pregnancy risk flagging |
| Togunwa et al. (2023), *Deep hybrid model for maternal health risk classification in pregnancy: synergy of ANN and random forest* | To classify maternal health risk using machine learning and deep learning methods | Hybrid ANN and random forest model on public maternal risk data | Shows that simple maternal health variables can predict risk categories well | Focuses mainly on model performance, not on a practical PHC software system |
| Khadidos et al. (2024), *Ensemble machine learning framework for predicting maternal health risk during pregnancy* | To predict maternal health risk using ensemble machine learning methods | Ensemble machine learning on maternal health risk data | Shows that maternal risk can be predicted from routine-style features and supports early intervention | Does not package the model into a usable PHC dashboard |
| Malde et al. (2025), *A Machine Learning Approach for Predicting Maternal Health Risks in Lower-Middle-Income Countries Using Sparse Data and Vital Signs* | To test whether sparse vital-sign data can support maternal risk prediction in lower-middle-income settings | Comparative ML study using simple vital-sign data | Supports the idea that few, easy-to-collect features can still be useful in low-resource settings | Does not focus on local PHC workflow in Nigeria or system implementation |

The reviewed works show that maternal care in Nigeria still faces gaps in access, quality, and early recognition of complications. They also show that machine learning can work with small sets of simple health variables to classify maternal risk. However, most existing studies stop at analysis or model building. Very few combine maternal risk flagging, patient record storage, dashboard visibility, and PHC-friendly workflow into one practical decision support system.

## Gaps Identified vis-a-vis Technology/Method to Resolve the Identified Gaps

From the reviewed literature, the following gaps can be identified:

1. many Nigerian maternal health studies describe utilisation or quality problems without translating them into a practical digital support tool for PHC staff;
2. many maternal machine learning studies focus on prediction performance instead of system usability in routine care;
3. many available solutions are not designed around simple PHC workflow such as patient registration, clinic record entry, flagged-case review, and report generation; and
4. public datasets exist for maternal risk classification, but there is still a gap in adapting such simple-record models into a local decision support dashboard for Ugbomoro.

To address these gaps, this project proposes a maternal health decision support system that combines:

1. staff login and patient registration;
2. simple clinic record entry using routine maternal indicators;
3. machine learning based risk classification into low, medium, or high;
4. a flagged-patient dashboard for cases that need attention;
5. patient history and record review; and
6. simple monitoring reports.

The project will use public maternal risk data for the first machine learning prototype because open local PHC digital datasets are not readily available. However, the dashboard structure and input fields will be designed to reflect the local PHC workflow so that the system remains practical and defensible as a design and implementation project.

## Proposed System Overview

The proposed system will be a desktop-first web dashboard used mainly by PHC staff. The main modules of the system will include:

1. **Staff Login Module:** allows authorized staff to sign in to the system.
2. **Patient Registration Module:** stores details of pregnant women and creates a patient record.
3. **Clinic Record Entry Module:** captures age, blood pressure, blood sugar, body temperature, heart rate, gestational stage, symptoms, and visit history.
4. **Risk Screening Module:** uses a simple machine learning model to classify each case as low, medium, or high risk.
5. **Flagged Cases Dashboard:** highlights patients with high-risk results so staff can pay closer attention.
6. **Patient History Module:** allows staff to review previous entries for a patient.
7. **Basic Reports Module:** gives simple counts and summaries of screened patients and flagged cases.

The system output will be presented as a **risk flag** or **risk screening result**, not as a final medical diagnosis.

## Methodology

This project will adopt an incremental software development methodology. This is suitable because the system can be built and tested in parts, starting from data structure and interface design, then moving to the machine learning module and dashboard integration.

The first stage will involve requirement gathering and workflow study. At this stage, the project will define the main users, the type of records that PHC staff need to enter, the expected system outputs, and the safe language to use for risk flagging.

The second stage will involve data study and model preparation. A public maternal health risk dataset such as the UCI Maternal Health Risk dataset will be cleaned and explored. Relevant features such as age, systolic blood pressure, diastolic blood pressure, blood sugar, body temperature, and heart rate will be used to train and test simple classification models. Extra interface fields such as gestational stage, symptoms, and visit history can still be stored in the dashboard for record keeping even if the first model does not use all of them.

The third stage will involve system analysis and design. At this stage, the database structure, system flow, dashboard pages, and module interactions will be planned. Use case diagrams, data flow, and database tables can be prepared to guide development.

The fourth stage will involve implementation. The prototype can be developed with Python, Flask, scikit-learn, HTML, CSS, Bootstrap, and SQLite or MySQL. The machine learning model will be trained separately and then connected to the dashboard so that staff can submit patient data and receive a simple risk result.

The final stage will involve testing and evaluation. Testing will confirm that users can register patients, enter clinic records, generate risk flags, view flagged cases, and review reports correctly. Basic model evaluation metrics such as accuracy, precision, recall, and F1-score can be used for the classification part, while usability checks can be used for the dashboard.

## Expected Result / Outcome

The proposed study is expected to deliver the following outcomes:

1. **Maternal Health Dashboard:** a desktop-first web system for PHC staff to register patients and manage maternal clinic records.
2. **Risk Screening Module:** a simple machine learning component that classifies records into low, medium, or high risk.
3. **Flagged Case Visibility:** a dashboard view that makes possible high-risk pregnancies easier to notice.
4. **Patient Record Support:** a structured record history for each registered pregnant woman.
5. **Simple Reporting:** basic summaries that help staff monitor the number of screened patients and flagged cases.
6. **Improved Screening Support:** a practical decision support tool that can help PHC staff pay earlier attention to possible risk cases in Ugbomoro.

## Work-Plan / Time Frame Using Gantt Chart

This research will span for a period of 3 months from March 2026 to May 2026.

The implementation of this project will follow these major stages:

1. **Requirement Gathering and Workflow Study:** review PHC maternal screening workflow and define system requirements.
2. **Dataset Study and Model Preparation:** prepare maternal risk data and train basic classification models.
3. **System Analysis and Design:** design the database, dashboard pages, and module flow.
4. **Implementation:** build the dashboard, record forms, risk screening logic, and reports.
5. **System Testing and Documentation:** test the prototype and prepare screenshots, findings, and final report.

## Budget

| Item | Description | Cost (NGN) |
|---|---|---:|
| Internet/Data | Data for research, coding, dataset download, and online access | 20,000 |
| Power Support | Electricity and backup power during development | 20,000 |
| Transportation | Visits for meetings, printing, and small field checks | 15,000 |
| Printing and Binding | Draft printing, final printing, and binding | 20,000 |
| System Testing | Local testing, demo preparation, and debugging support | 10,000 |
| Hosting/Domain (Optional) | Optional hosting for a live demonstration | 15,000 |
| Data Backup/Storage | Backup support for project files and datasets | 8,000 |
| Stationery | Writing materials and documentation items | 5,000 |
| User Testing/Logistics | Small coordination costs for review and feedback | 10,000 |
| Contingency | Unexpected expenses | 12,000 |
| **Total** |  | **135,000** |

## References

Khadidos, A. O., Saleem, F., Selvarajan, S., Ullah, Z., & Khadidos, A. O. (2024). *Ensemble machine learning framework for predicting maternal health risk during pregnancy*. Scientific Reports, 14, 21483. https://doi.org/10.1038/s41598-024-71934-x

Malde, A., Prabhu, V. G., Banga, D., Hsieh, M., Renduchintala, C., & Pirrallo, R. (2025). *A machine learning approach for predicting maternal health risks in lower-middle-income countries using sparse data and vital signs*. Future Internet, 17(5), 190. https://doi.org/10.3390/fi17050190

Oluwatola, T., Isiaka, S. D., Omeje, O., Oni, F., Samuel, O. W., Sampson, S., Ebinim, H., & Olatunji, O. (2025). *Assessment of quality of maternal and newborn care and its determinants: A national study of primary health care facilities in Nigeria*. BMC Health Services Research, 25, 921. https://doi.org/10.1186/s12913-025-12957-6

Oyinlola, F. F., Okorafor, K. A., Kupoluyi, J. A., Ogbeye, G. B., Ouedraogo, L., Umar, L., & Shittu, I. O. (2025). *Regional variations in prevalence and factors associated with maternal healthcare services utilisation in Nigeria*. BMC Women's Health, 26, 45. https://doi.org/10.1186/s12905-025-04216-x

Salomon, A., Ishaku, S., Kirk, K. R., Warren, C. E., et al. (2019). *Detecting and managing hypertensive disorders in pregnancy: A cross-sectional analysis of the quality of antenatal care in Nigeria*. BMC Health Services Research, 19, 411. https://doi.org/10.1186/s12913-019-4217-8

Togunwa, T. O., Babatunde, A. O., & Abdullah, K. (2023). *Deep hybrid model for maternal health risk classification in pregnancy: Synergy of ANN and random forest*. Frontiers in Artificial Intelligence, 6, 1213436. https://doi.org/10.3389/frai.2023.1213436

UCI Machine Learning Repository. (2023). *Maternal Health Risk* [Dataset]. https://archive.ics.uci.edu/dataset/863/maternal+health+risk

World Health Organization. (2025, April 7). *Maternal mortality*. https://www.who.int/news-room/fact-sheets/maternal-mortality
