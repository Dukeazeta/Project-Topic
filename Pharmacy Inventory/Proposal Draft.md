# Project Proposal Draft

## Student Details / Title

- **Name:** Azeta Duke
- **Matric Number:** COS/8650/2021
- **Supervisor/Mentor:** Dr Nwozor Blessing
- **Department:** Computer Science
- **Institution:** Federal University of Petroleum Resources, Effurun
- **Academic Session:** 2025/2026
- **Project Title:** **Design and Implementation of a Mobile Pharmacy Inventory and Expiry Tracking System for Community Pharmacies in Ugbomoro**

## Executive Summary

Community pharmacies depend on accurate stock records to avoid shortages, reduce waste, and maintain safe medicine handling. In many small pharmacies, inventory is still managed manually, making it difficult to track quantities, monitor batch details, and identify products close to expiry. These weaknesses can lead to stockouts, expired medicines remaining on shelves, delayed restocking, and poor service delivery.

This project proposes the design and implementation of a mobile-first pharmacy inventory and expiry tracking system for community pharmacies in Ugbomoro. The system will be developed as a responsive web application that works well on smartphones and can also be used on laptops where available. It will support medicine registration, batch entry, stock-in and stock-out recording, low-stock monitoring, expiry tracking, and simple dashboard reporting.

The system is not intended to serve as a full pharmacy point-of-sale solution. Its focus is inventory visibility and expiry control. The expected outcome is a practical digital tool that improves day-to-day stock management, reduces losses from expired medicines, and supports better inventory decisions in community pharmacies.

## Background Study

Medicine availability is central to effective healthcare delivery. When stock records are incomplete or outdated, pharmacy staff may not know which drugs are available, which are running low, or which batches are nearing expiry. This can affect both patient care and internal pharmacy operations. Recent policy attention in Nigeria, including digital inventory initiatives by the Federal Ministry of Health and Social Welfare, shows that medicine stock visibility is an important health-sector concern.

Community pharmacies are often the most accessible source of medicines in many localities. However, many still use notebooks, spreadsheets, or other weak manual systems that do not support real-time stock visibility. Since the same medicine may exist in multiple batches with different expiry dates, quantity counting alone is not enough; pharmacies also need batch-level control and expiry awareness.

Existing studies support the relevance of this problem. Research in Nigeria has shown that expired medicine handling remains a challenge in pharmacy practice, while broader studies on inventory control emphasize the importance of structured stock management. These findings justify the development of a simple digital system that helps community pharmacies monitor stock levels, batch details, and expiry status more effectively.

## Problem Statement

Many community pharmacies in Ugbomoro still rely on manual inventory practices that do not provide a clear and timely view of medicine stock. As a result, staff may find it difficult to know available quantities, identify low-stock items, monitor batch-specific expiry dates, or respond quickly to products at risk of expiring.

This problem is made worse when inventory updates must be recorded during daily movement around the shop floor. A system that is not easy to use on mobile devices may discourage prompt updates and reduce record accuracy. The absence of a mobile-friendly inventory and expiry tracking system therefore contributes to weak stock control, avoidable waste, and poor restocking decisions.

## Aim and Objectives

### Aim

The aim of this project is to design and implement a mobile pharmacy inventory and expiry tracking system for community pharmacies in Ugbomoro.

### Objectives

The specific objectives are to:

1. develop a mobile-first web system for pharmacy inventory management;
2. support medicine registration, batch entry, and quantity tracking;
3. implement batch-based expiry date monitoring;
4. provide low-stock and near-expiry alerts through a dashboard;
5. support stock-in and stock-out recording; and
6. generate simple reports to aid inventory decisions.

## Conceptual Review

### Pharmacy Inventory Management

Pharmacy inventory management involves recording, monitoring, and controlling medicine movement within a pharmacy. Effective inventory management helps ensure medicine availability, improves record accuracy, and reduces losses caused by overstocking or poor monitoring.

### Batch and Expiry Tracking

Batch tracking is the separate recording of each medicine batch with details such as quantity, batch number, and expiry date. Expiry tracking uses this information to identify products that are close to expiry or already expired. These functions are important because safe dispensing depends on accurate batch-level visibility.

### Low-Stock Alerts

Low-stock alert systems notify staff when product quantities fall below a defined threshold. In a pharmacy setting, such alerts support timely replenishment and reduce the chance of stockouts.

### Mobile-First Workflow Support

A mobile-first system is designed first for smartphones and then adapted to larger screens. This approach is important in small pharmacies where staff may need to update records quickly while moving around the store rather than sitting at a desktop computer.

## Literature Review

| Author / Title | Contribution | Strength | Gap |
|---|---|---|---|
| Iweh et al. (2019) | Studied disposal practices of expired and unused medicines in community pharmacies in southeast Nigeria | Provides local evidence that expired medicine management is a practical problem | Focuses on disposal, not preventive digital tracking |
| Akande-Sholabi et al. (2025) | Examined unused and expired medication practices among healthcare practitioners in Ibadan | Shows that expired medicine management remains relevant in Nigeria | Does not propose a community pharmacy inventory system |
| Watson et al. (2014) | Compared inventory control methods in a pharmacy setting | Demonstrates the value of structured inventory control | Not focused on mobile systems or Nigerian community pharmacies |
| Sukendar et al. (2020) | Considered medicine inventory control alongside expiry periods and returns | Highlights the importance of expiry-aware inventory practices | Not tailored to local pharmacy workflow in Nigeria |
| Federal Ministry of Health and Social Welfare (2025) | Introduced a digital inventory model to reduce drug stockouts | Shows policy relevance of digital stock control in Nigeria | Policy direction rather than a focused pharmacy software solution |

The reviewed works show that medicine stock control and expiry management remain significant issues. However, they do not provide a simple, mobile-first system tailored to community pharmacy operations in Ugbomoro.

## Gap and Proposed Solution

The literature reveals three major gaps. First, many studies focus on expired medicine disposal after losses have occurred instead of preventing the problem through timely inventory tracking. Second, several inventory studies are not designed for the Nigerian community pharmacy environment. Third, few solutions combine stock levels, batch details, and expiry monitoring in a single mobile-friendly interface.

To address these gaps, this project proposes a responsive pharmacy inventory platform with medicine registration, batch-based stock tracking, stock movement records, low-stock alerts, near-expiry alerts, and summary reporting. This combination is intended to make inventory monitoring more practical and effective for community pharmacies in Ugbomoro.

## Methodology

This study will adopt an incremental software development methodology. The project will begin with requirement gathering focused on community pharmacy workflow, stock record needs, and expiry management challenges. Information from this stage will guide the identification of system users, data fields, and reporting needs.

The next phase will involve system analysis and design. At this stage, the database structure, user interface, dashboard components, and alert logic will be defined. The design will focus on medicine registration, batch entry, stock movement, and visual identification of low-stock and near-expiry items.

Implementation will then be carried out using a mobile-first web development approach. Suitable technologies may include Next.js, React, TypeScript, and a relational database such as SQLite or MySQL. The system will be tested to confirm correct stock updates, proper alert generation, and usability across both smartphones and laptops.

## Expected Results

The study is expected to produce:

1. a mobile-first dashboard for pharmacy inventory management;
2. a batch and expiry tracking module for medicines;
3. low-stock and near-expiry alerts that improve stock visibility; and
4. a practical tool that helps reduce waste and improve stock control in community pharmacies.

## Work Plan / Time Frame

The project is expected to span three months, from March 2026 to May 2026, and will follow these stages:

1. requirement gathering and workflow study;
2. system analysis and design;
3. implementation of core inventory and expiry features;
4. testing and evaluation; and
5. documentation and final reporting.

## Budget

| Item | Description | Cost (NGN) |
|---|---|---:|
| Internet/Data | Research, development, testing, and online access | 20,000 |
| Power Support | Electricity and backup power during development | 20,000 |
| Transportation | Meetings, logistics, and printing | 15,000 |
| Printing and Binding | Draft and final documentation | 20,000 |
| Local Testing/Field Visits | Workflow observation and user feedback | 10,000 |
| Hosting/Domain (Optional) | Demonstration support | 15,000 |
| Data Backup/Storage | File and record backup | 8,000 |
| Stationery | Project stationery | 5,000 |
| User Testing/Logistics | Small coordination expenses | 10,000 |
| Contingency | Unexpected expenses | 12,000 |
| **Total** |  | **135,000** |

## References

Akande-Sholabi, W., Abdul-Azeez, I. A., Adebisi, Y. A., Odukoya, T. O., & Ilori, T. (2025). Disposal practices of unused and expired medications among healthcare practitioners in Ibadan, Nigeria: Results from a cross-sectional survey. *BMC Health Services Research, 25*, 1262. https://doi.org/10.1186/s12913-025-13492-0

Federal Ministry of Health and Social Welfare. (2025). *FG moves to eliminate drug stockouts, launches digital inventory model for essential medicines*. https://health.gov.ng/fg-moves-to-eliminate-drug-stockouts-launches-digital-inventory-model-for-essential-medicines/

Iweh, M., Ogbonna, B., Sunday, N., Anetoh, M., & Okonta, M. (2019). Assessment of disposal practices of expired and unused medications among community pharmacies in Anambra State southeast Nigeria: A mixed study design. *Journal of Pharmaceutical Policy and Practice, 12*, 12. https://doi.org/10.1186/s40545-019-0174-1

Sukendar, I., Sugiyono, A., & Munfiqotusshifa. (2020). Medicine inventory control by considering expiry periods and product returns using the always better control (ABC) analysis and the Handley within model of economic order quality (EOQ) at pharmacies in Indonesia. *Journal of Technology and Operations Management, 15*(2), 20-30. https://doi.org/10.32890/jtom2020.15.2.3

Watson, J. W., Moliver, N., & Gossett, K. (2014). Inventory control methods in a long-term care pharmacy: Comparisons and time-series analyses. *Journal of Pharmacy Technology, 30*(5), 151-162. https://doi.org/10.1177/8755122514534073
