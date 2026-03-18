# Project Proposal Draft

## Student Details / Title

- **Name:** Azeta Duke
- **Matric Number:** COS/8650/2021
- **Supervisor/Mentor:** Dr Nwozor Blessing
- **Department:** Computer Science
- **Institution:** Federal University of Petroleum Resources, Effurun
- **Academic Session:** 2025/2026
- **Project Title:** **Design and Implementation of a Maternal Care Reminder and Follow-Up System for Primary Health Centres in Effurun**

## Executive Summary

Maternal health remains a serious public health concern in Nigeria, and many pregnant women still miss important antenatal and postnatal visits for different reasons. In many government Primary Health Centres (PHCs), follow-up is still done manually, records may be paper-based, and health workers often have limited access to standard computers. At the same time, many women may not own smartphones or may not be confident using digital applications by themselves. These realities make it necessary to design a system that is simple, inclusive, and practical for the local environment.

This project focuses on the design and implementation of a mobile-first SMS-based maternal care reminder and follow-up platform for government Primary Health Centres in Effurun. The system will be built as a standalone web platform that works well on smartphones and can also be accessed on PCs when available. Health workers will use the system to register pregnant women, record antenatal and postnatal visit dates, track women due for checkups, identify missed visits, and manage follow-up actions. On the patient side, women will not need an app. They will receive simple SMS reminders before scheduled visits and follow-up SMS messages after missed appointments.

The proposed system is designed to fit the realities of government PHCs where staff may depend more on smartphones than desktop systems, and where patients may use either basic phones or smartphones. The expected result is a mobile-first clinic support platform that improves appointment attendance, strengthens follow-up, reduces missed maternal visits, and supports better record handling and monitoring in government PHCs in Effurun.

## Background Study

Maternal and newborn health remains an important issue in Nigeria. UNICEF notes that Nigeria carries a heavy share of global maternal deaths, and this shows the need for stronger support systems that help women stay connected to care before and after delivery (UNICEF, n.d.). Regular antenatal and postnatal visits are important because they help health workers detect risks early, monitor pregnancy progress, and provide support for both mother and child. However, the use of maternal healthcare services is still uneven across the country, and this affects the quality of outcomes for women and babies (Oyinlola et al., 2025).

Government Primary Health Centres are often the first point of contact for maternal care at community level. They play an important role in registration, routine checks, follow-up, and referral when necessary. Even so, the quality of maternal and newborn care in many primary health facilities still needs improvement, especially in the areas of continuity of care, follow-up, and access to timely services (Oluwatola et al., 2025). When women miss scheduled visits and there is no proper follow-up system, the risk of poor maternal outcomes can increase.

Digital health tools have created opportunities to improve communication between health facilities and patients. Mobile health approaches are especially useful in environments where mobile phones are more common than computers. Research has shown that reminder systems based on SMS and voice messaging can improve attendance and continuity of maternal care. For example, Osanyin et al. (2022) reported positive results from a voice messaging intervention for antenatal care in Lagos, while Olajubu et al. (2020) showed that a mobile health intervention improved uptake of postnatal care services in Nigeria. Broader review studies also show that SMS reminders can improve antenatal care and related maternal service use in developing countries (Hailemariam et al., 2024; Kante & Malqvist, 2025).

Despite these opportunities, many women still face barriers such as low digital literacy, limited internet access, and dependence on basic mobile phones. For this reason, a maternal reminder system should not depend only on smartphone apps. It should be simple enough for health workers to operate and flexible enough to reach pregnant women through basic SMS communication. This project addresses that need by proposing a mobile-first web platform for health workers in government PHCs in Effurun, supported by SMS reminders for pregnant women.

## Problem Statement

In many government Primary Health Centres, maternal appointment tracking and follow-up are still handled manually. This can make it difficult for health workers to know which women are due for antenatal or postnatal visits, who has missed appointments, and who needs immediate follow-up. When records are not easy to access or update, continuity of care becomes weaker and important visits may be missed.

Another challenge is that many PHC workers may not always have access to standard computers during their daily work, even though smartphones are more available. Also, many pregnant women may not have smartphones or may not be comfortable using mobile applications directly. Because of this, a system that depends only on desktop computers or patient smartphone apps may not fit the real situation in government PHCs.

The problem this project addresses, therefore, is the absence of a mobile-first and SMS-based maternal care reminder and follow-up platform designed for government Primary Health Centres in Effurun. Such a system is needed to support health workers with easy patient registration and visit tracking on smartphones or PCs, while also helping pregnant women receive timely reminders through simple SMS communication.

## Aim/Objectives

### Aim

The aim of this project is to design and implement a mobile-first SMS-based maternal care reminder and follow-up platform for government Primary Health Centres in Effurun.

### Objectives

The specific objectives of the study are to:

1. build a mobile-first web platform for government PHC staff to manage maternal care appointments and follow-up;
2. provide support for the registration of pregnant women and the recording of antenatal and postnatal visit dates;
3. implement a reminder module that prepares and sends SMS notifications before scheduled visits;
4. provide missed-visit tracking and follow-up support for women who do not attend their appointments;
5. make the system usable on smartphones first, while still allowing access on PCs when available; and
6. provide a simple reporting dashboard for monitoring due visits, missed visits, and follow-up activities.

## Conceptual Review

### Maternal Care Reminder Systems

Maternal care reminder systems are digital tools used to support pregnant women and new mothers by reminding them of important healthcare visits and follow-up actions. These systems are useful because they help reduce missed appointments and improve continuity of care. In this study, the reminder system is not meant to replace medical care. It is meant to support attendance and follow-up.

### Mobile-First Health Information Systems

A mobile-first system is one that is designed first for small screens such as smartphones before being adjusted for larger screens like laptops and desktop computers. In this project, mobile-first design is important because many PHC workers may depend more on smartphones than standard computers during daily service delivery. This makes mobile usability a major part of the system design rather than an afterthought.

### SMS-Based Health Communication

SMS-based health communication involves the use of text messages to share reminders, notices, and follow-up information with patients. It is especially useful in settings where internet access is limited or where many people use basic phones instead of smartphones. In this project, SMS is important because it allows the system to reach women who may not use apps or online services directly.

### Follow-Up and Defaulter Tracking

Follow-up in maternal care means checking on women who are due for care or who have missed scheduled visits. Defaulter tracking means identifying women who did not attend their expected appointments and making them visible for follow-up action. This concept is important in the proposed system because missed visits can weaken continuity of care and reduce timely support for pregnant women.

### Government Primary Health Centres

Government Primary Health Centres are community-level public health facilities that often provide the first level of maternal and child healthcare services. Because they are close to the community, they are suitable settings for a reminder and follow-up platform. In this project, the system is specifically limited to government PHCs in Effurun.

## Literature Review

| Author / Title | Objective | Methodology Used | Strengths | Gaps / Further Study |
|---|---|---|---|---|
| Oyinlola et al. (2025), *Regional variations in prevalence and factors associated with maternal healthcare services utilisation in Nigeria* | To examine maternal healthcare service use and associated factors across Nigeria | National analytical study | Gives strong Nigerian evidence that maternal care use is still uneven and affected by multiple factors | Does not propose a practical digital reminder and follow-up system for PHCs |
| Osanyin et al. (2022), *Effects of a mHealth voice messaging intervention on antenatal care utilisation at primary care level in Lagos, Nigeria* | To examine the effect of voice messaging on antenatal care use | Cluster randomised trial | Shows that mobile messaging can improve maternal care behaviour in a Nigerian setting | Focuses on intervention effect, not on a full clinic management platform |
| Olajubu et al. (2020), *Effectiveness of a mobile health intervention on uptake of recommended postnatal care services in Nigeria* | To evaluate the impact of a mobile health intervention on postnatal care use | Intervention study | Provides Nigerian evidence that mobile health can improve postnatal attendance | Does not focus on a mobile-first staff dashboard for PHCs |
| Okonofua et al. (2023), *Texting for life: a mobile phone application to connect pregnant women with emergency transport and obstetric care in rural Nigeria* | To support pregnant women through mobile phone linkage to maternal care services | Implementation study | Shows that mobile phone tools can support maternal care coordination in Nigeria | Focuses on emergency linkage rather than routine appointment reminders and follow-up |
| Kante and Malqvist (2025), *Effectiveness of SMS-based interventions in enhancing antenatal care in developing countries: a systematic review* | To review the value of SMS interventions for antenatal care | Systematic review | Gives broad support for SMS reminders in low-resource settings | Does not focus specifically on government PHCs in Effurun or staff mobile-first workflow |

The reviewed studies show that maternal healthcare utilisation, appointment adherence, and mobile health communication are closely related. They also show that messaging tools can improve attendance and continuity of care. However, most of the studies focus either on maternal care use, messaging interventions, or emergency communication. Very few combine these ideas into one mobile-first platform that allows PHC staff to register women, track visits, identify missed appointments, and manage SMS-based follow-up from smartphones or PCs.

## Gaps Identified vis-a-vis Technology/Method to Resolve the Identified Gaps

From the reviewed literature, some clear gaps can be identified:

1. many studies discuss maternal healthcare use in Nigeria without translating the findings into a practical digital follow-up tool for PHCs;
2. many mobile health studies focus on reminders or messaging only, but not on a complete staff dashboard for registration, scheduling, and follow-up;
3. many digital health solutions assume smartphone or internet-based access for patients, which may not fit women who use basic phones or have low digital literacy; and
4. many existing works are not specifically focused on government PHCs as the case study environment.

To address these gaps, this project proposes a mobile-first SMS-based maternal care reminder and follow-up platform that combines:

1. smartphone-friendly patient registration for PHC staff;
2. antenatal and postnatal visit scheduling;
3. SMS reminders for pregnant women before expected visits;
4. missed-visit tracking and follow-up support;
5. simple dashboard access on both smartphones and PCs; and
6. basic reports for monitoring due visits, missed visits, and follow-up activities.

This approach makes the proposed system more suitable for the realities of government PHCs in Effurun where staff may depend on smartphones and patients may depend on simple mobile phones.

## Methodology

This project will adopt an incremental software development methodology. This approach is suitable because it allows the system to be developed in stages, tested gradually, and improved as each major part is completed.

The methodology will begin with requirement gathering and study of maternal care workflow in government PHCs. This will involve identifying the main users of the system, the key records needed for maternal appointment tracking, and the reminder and follow-up problems the system is meant to solve.

The next stage will involve system analysis and design. At this point, the system structure, database, interfaces, and reminder workflow will be planned. The proposed system will include a mobile-first dashboard for health workers, patient registration pages, visit scheduling records, a missed-visit tracking section, and an SMS reminder module.

The implementation stage will focus on building the responsive web application and connecting it to a database for storing patient and appointment records. The prototype can be developed using tools such as Next.js, React, TypeScript, a relational database such as SQLite or MySQL, and an SMS gateway or test SMS integration environment for reminder delivery.

The final stage will be testing and evaluation. The system will be tested to confirm that health workers can register women with smartphones, scheduled visits are stored correctly, reminder messages are generated properly, missed visits are flagged clearly, and the dashboard remains easy to use on both phones and PCs.

## Expected Result / Outcome

The proposed study is expected to deliver the following key outcomes:

1. **Mobile-First PHC Dashboard:** A mobile-first web platform for government PHC staff to register pregnant women, manage maternal visit schedules, and track follow-up actions.
2. **SMS Reminder Module:** A system component that prepares and sends reminder messages before antenatal and postnatal visits.
3. **Missed-Visit and Follow-Up Tracking:** A simple dashboard for identifying women due for visits, women who missed appointments, and women who need follow-up.
4. **Improved Maternal Care Support:** A practical digital tool that can help improve attendance, strengthen follow-up, and support better record management in government PHCs in Effurun.

## Work-Plan / Time Frame Using Gantt Chart

This research will span for a period of 3 months spanning from March 2026 to May 2026.

The implementation of this project will follow a structured workflow consisting of the following stages:

1. **Requirement Gathering and PHC Workflow Study:** Review of maternal care appointment process, follow-up practices, and reminder needs in government PHCs.
2. **System Analysis and Design:** Design of the database, mobile-first interface, reminder workflow, and dashboard structure.
3. **Implementation:** Development of the staff dashboard, patient registration module, appointment tracking features, and SMS reminder functions.
4. **System Testing:** Evaluation of registration flow, reminder generation, follow-up tracking, and mobile usability.
5. **Documentation and Reporting:** Preparation of final report, screenshots, findings, and recommendations.

## Budget

| Item | Description | Cost (NGN) |
|---|---|---:|
| Internet/Data | Data for research, development, testing, and online access | 20,000 |
| Power Support | Electricity and backup power during development | 20,000 |
| Transportation | Visits for project meetings, logistics, and printing | 15,000 |
| Printing and Binding | Draft printing, final printing, and binding | 20,000 |
| SMS Testing | Test message charges and reminder simulation costs | 10,000 |
| Hosting/Domain (Optional) | Optional hosting or domain for demonstration | 15,000 |
| Data Backup/Storage | Backup support for project files and records | 8,000 |
| Stationery | Project stationery and related materials | 5,000 |
| User Testing/Logistics | Small expenses for local testing and coordination | 10,000 |
| Contingency | Unexpected expenses | 12,000 |
| **Total** |  | **135,000** |

## References

Hailemariam, T., Atnafu, A., Gezie, L. D., & Tilahun, B. (2024). Effect of short message service reminders in improving optimal antenatal care, skilled birth attendance and postnatal care in low- and middle-income countries: A systematic review and meta-analysis. *BMC Medical Informatics and Decision Making, 25*, 1. https://doi.org/10.1186/s12911-024-02836-1

Kante, M., & Malqvist, M. (2025). Effectiveness of SMS-based interventions in enhancing antenatal care in developing countries: A systematic review. *BMJ Open, 15*(2), e089671. https://doi.org/10.1136/bmjopen-2024-089671

Okonofua, F., Ntoimo, L., Johnson, E., Sombie, I., Ojuolape, S., Igboin, B., ... & Yaya, S. (2023). Texting for life: A mobile phone application to connect pregnant women with emergency transport and obstetric care in rural Nigeria. *BMC Pregnancy and Childbirth, 23*, 139. https://doi.org/10.1186/s12884-023-05424-9

Olajubu, A. O., Fajemilehin, B. R., Olajubu, T. O., & Afolabi, B. S. (2020). Effectiveness of a mobile health intervention on uptake of recommended postnatal care services in Nigeria. *PLOS ONE, 15*(9), e0238911. https://doi.org/10.1371/journal.pone.0238911

Oluwatola, T., Isiaka, S. D., Omeje, O., Oni, F., Samuel, O. W., Sampson, S., Ebinim, H., & Olatunji, O. (2025). Assessment of quality of maternal and newborn care and its determinants: A national study of primary health care facilities in Nigeria. *BMC Health Services Research, 25*, 921. https://doi.org/10.1186/s12913-025-12957-6

Osanyin, G. E., Banke-Thomas, A., Oluwole, E. O., Odeseye, A. K., & Afolabi, B. B. (2022). Effects of a mHealth voice messaging intervention on antenatal care utilisation at primary care level in Lagos, Nigeria: A cluster randomised trial. *Journal of Public Health in Africa, 13*(3), 2222. https://doi.org/10.4081/jphia.2022.2222

Oyinlola, F. F., Okorafor, K. A., Kupoluyi, J. A., Ogbeye, G. B., Ouedraogo, L., Umar, L., & Shittu, I. O. (2025). Regional variations in prevalence and factors associated with maternal healthcare services utilisation in Nigeria. *BMC Women's Health, 26*, 45. https://doi.org/10.1186/s12905-025-04216-x

Rahman, S., Okolie, A., Bryant, D., Ameyaw, E. K., & Ezezika, O. (2025). Barriers and facilitators of messaging platforms as a means of maternal support and care in rural communities: A systematic review. *PLOS ONE, 20*(12), e0336168. https://doi.org/10.1371/journal.pone.0336168

UNICEF. (n.d.). *Situation of women and children in Nigeria*. https://www.unicef.org/nigeria/situation-women-and-children-nigeria
