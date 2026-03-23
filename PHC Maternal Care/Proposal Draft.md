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

Maternal healthcare depends heavily on continuity of care before and after delivery. In many government Primary Health Centres (PHCs), appointment reminders and follow-up are still handled manually, while patient records remain paper-based. This can make it difficult for health workers to identify women who are due for antenatal or postnatal visits, or to promptly follow up on missed appointments.

This project proposes the design and implementation of a mobile-first SMS-based maternal care reminder and follow-up system for government PHCs in Effurun. The system will be a responsive web platform that health workers can use on smartphones or PCs to register women, schedule visits, track attendance, and identify missed appointments. On the patient side, women will receive reminders through simple SMS messages rather than a mobile app.

The focus of the project is practical communication and follow-up support in a low-resource environment. The expected result is a simple digital tool that improves appointment attendance, strengthens follow-up, and supports better maternal record management in government PHCs.

## Background Study

Maternal and newborn health remains a major public health issue in Nigeria. A large share of maternal deaths occurs in settings where women do not receive timely and continuous care. Antenatal and postnatal visits are important because they help detect risks early, support healthy pregnancy outcomes, and improve monitoring after delivery.

Primary Health Centres are often the first point of contact for maternal care at community level. However, many PHCs still face challenges related to manual records, weak follow-up procedures, and limited access to standard computing devices. At the same time, many patients rely on basic phones rather than smartphones, which makes app-only solutions less suitable.

Studies on maternal healthcare utilization in Nigeria show uneven attendance, while mobile health research shows that reminders and messaging can improve continuity of care. These findings suggest that a simple, mobile-first platform for PHC staff, combined with SMS reminders for patients, could help address missed visits and weak follow-up practices.

## Problem Statement

In many government PHCs, maternal appointment scheduling and follow-up are not supported by a dedicated digital system. Health workers may struggle to know which women are due for care, which appointments have been missed, and who requires follow-up action. This weakens continuity of care and can contribute to avoidable maternal health risks.

The problem is also shaped by local realities. Many PHC workers depend more on smartphones than desktop systems, and many pregnant women may only have access to basic phones. As a result, systems that depend on desktop-only use or patient smartphone apps may not fit the environment. There is therefore a need for a mobile-first, SMS-based maternal care reminder and follow-up platform tailored to government PHCs in Effurun.

## Aim and Objectives

### Aim

The aim of this project is to design and implement a mobile-first SMS-based maternal care reminder and follow-up platform for government Primary Health Centres in Effurun.

### Objectives

The specific objectives are to:

1. develop a mobile-first web platform for PHC staff to manage maternal appointments and follow-up;
2. support patient registration and recording of antenatal and postnatal visit dates;
3. implement SMS reminders for scheduled visits;
4. provide missed-visit tracking and follow-up support;
5. ensure usability on smartphones as well as PCs; and
6. generate simple reports on due visits, missed visits, and follow-up activities.

## Conceptual Review

### Maternal Care Reminder Systems

Maternal care reminder systems are digital tools used to support attendance at key healthcare visits. Their purpose is not to replace medical care, but to improve continuity by reminding patients of important appointments.

### Mobile-First Health Information Systems

A mobile-first health system is designed first for smartphone use and later adapted to larger screens. This is relevant in PHCs where staff may more easily access smartphones than standard computers.

### SMS-Based Health Communication

SMS-based health communication uses text messages to deliver reminders and follow-up notices. It is especially useful where internet access is limited or many users depend on basic mobile phones.

### Defaulter Tracking and Follow-Up

Defaulter tracking refers to identifying patients who miss scheduled visits and making them visible for follow-up. In maternal care, this helps health workers respond early when continuity of care is interrupted.

## Literature Review

| Author / Title | Contribution | Strength | Gap |
|---|---|---|---|
| Oyinlola et al. (2025) | Examined maternal healthcare service utilization in Nigeria | Shows that maternal care attendance remains uneven | Does not provide a practical PHC reminder system |
| Osanyin et al. (2022) | Tested mHealth voice reminders for antenatal care in Lagos | Demonstrates that mobile reminders can improve care use | Not a full PHC workflow platform |
| Olajubu et al. (2020) | Evaluated a mobile health intervention for postnatal care uptake | Supports the value of mobile messaging in Nigeria | Does not focus on staff dashboard design |
| Okonofua et al. (2023) | Used mobile communication to connect pregnant women to care services | Shows the usefulness of mobile tools in maternal care coordination | Focuses on emergency linkage rather than routine visit follow-up |
| Kante & Malqvist (2025) | Reviewed SMS interventions for antenatal care in developing countries | Provides broad evidence for SMS reminder effectiveness | Not specific to government PHCs in Effurun |

The literature indicates that maternal care utilization, reminder systems, and continuity of care are closely linked. However, few studies combine appointment tracking, missed-visit identification, and SMS follow-up in a simple mobile-first system designed for PHC staff.

## Gap and Proposed Solution

Many existing studies focus either on service utilization patterns or on messaging interventions alone. Fewer works translate these findings into a practical clinic support platform that helps PHC staff manage registration, scheduling, reminders, and follow-up in one place. In addition, patient-facing app assumptions may not fit women with basic phones or limited digital literacy.

This project addresses those gaps by proposing a mobile-first web application for PHC staff, supported by SMS reminders to patients. The system will combine patient registration, visit scheduling, due-date monitoring, missed-visit tracking, and simple reporting in a format suited to low-resource healthcare settings.

## Methodology

The project will adopt an incremental software development methodology. Requirement gathering will focus on PHC maternal workflow, patient scheduling practices, and current follow-up challenges. This will help define the needed user roles, records, and reminder processes.

The design phase will specify the database, dashboard flow, patient registration process, and SMS reminder logic. Implementation will then be carried out using responsive web technologies such as Next.js, React, TypeScript, and a relational database such as SQLite or MySQL, with SMS integration for reminder delivery or simulation.

Testing will assess the correctness of patient registration, visit scheduling, reminder generation, missed-visit identification, and usability on both smartphones and PCs.

## Expected Results

The study is expected to produce:

1. a mobile-first dashboard for PHC maternal appointment management;
2. an SMS reminder module for scheduled antenatal and postnatal visits;
3. a missed-visit and follow-up tracking component; and
4. a practical support tool for improving attendance and continuity of care in government PHCs.

## Work Plan / Time Frame

The project is expected to span three months, from March 2026 to May 2026, and will cover:

1. requirement gathering and workflow study;
2. system analysis and design;
3. implementation of registration, scheduling, and reminder features;
4. testing and evaluation; and
5. documentation and final reporting.

## Budget

| Item | Description | Cost (NGN) |
|---|---|---:|
| Internet/Data | Research, development, testing, and online access | 20,000 |
| Power Support | Electricity and backup power | 20,000 |
| Transportation | Project meetings and logistics | 15,000 |
| Printing and Binding | Draft and final documentation | 20,000 |
| SMS Testing | Reminder simulation and test messages | 10,000 |
| Hosting/Domain (Optional) | Demonstration support | 15,000 |
| Data Backup/Storage | File and record backup | 8,000 |
| Stationery | Project stationery | 5,000 |
| User Testing/Logistics | Coordination expenses | 10,000 |
| Contingency | Unexpected expenses | 12,000 |
| **Total** |  | **135,000** |

## References

Hailemariam, T., Atnafu, A., Gezie, L. D., & Tilahun, B. (2024). Effect of short message service reminders in improving optimal antenatal care, skilled birth attendance and postnatal care in low- and middle-income countries: A systematic review and meta-analysis. *BMC Medical Informatics and Decision Making, 25*, 1. https://doi.org/10.1186/s12911-024-02836-1

Kante, M., & Malqvist, M. (2025). Effectiveness of SMS-based interventions in enhancing antenatal care in developing countries: A systematic review. *BMJ Open, 15*(2), e089671. https://doi.org/10.1136/bmjopen-2024-089671

Okonofua, F., Ntoimo, L., Johnson, E., Sombie, I., Ojuolape, S., Igboin, B., ... & Yaya, S. (2023). Texting for life: A mobile phone application to connect pregnant women with emergency transport and obstetric care in rural Nigeria. *BMC Pregnancy and Childbirth, 23*, 139. https://doi.org/10.1186/s12884-023-05424-9

Olajubu, A. O., Fajemilehin, B. R., Olajubu, T. O., & Afolabi, B. S. (2020). Effectiveness of a mobile health intervention on uptake of recommended postnatal care services in Nigeria. *PLOS ONE, 15*(9), e0238911. https://doi.org/10.1371/journal.pone.0238911

Osanyin, G. E., Banke-Thomas, A., Oluwole, E. O., Odeseye, A. K., & Afolabi, B. B. (2022). Effects of a mHealth voice messaging intervention on antenatal care utilisation at primary care level in Lagos, Nigeria: A cluster randomised trial. *Journal of Public Health in Africa, 13*(3), 2222. https://doi.org/10.4081/jphia.2022.2222

Oyinlola, F. F., Okorafor, K. A., Kupoluyi, J. A., Ogbeye, G. B., Ouedraogo, L., Umar, L., & Shittu, I. O. (2025). Regional variations in prevalence and factors associated with maternal healthcare services utilisation in Nigeria. *BMC Women's Health, 26*, 45. https://doi.org/10.1186/s12905-025-04216-x

UNICEF. (n.d.). *Situation of women and children in Nigeria*. https://www.unicef.org/nigeria/situation-women-and-children-nigeria
