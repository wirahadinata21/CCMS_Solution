# CCMS_Solution

Child Care Management Solution

**Status:** 🚧 *In Active Development (Under Construction)*

---

## 🏗️ System & Application Architecture

The **Toffel Care (CCMS)** project is designed with a highly secure, enterprise-grade cloud infrastructure and a decoupled component architecture to handle multi-tenancy and high availability.

### 1. High-Level Application Modules
*<img width="658" height="564" alt="image" src="https://github.com/user-attachments/assets/0bbdc677-6100-453b-aee7-98244e82adb0" />
*

The primary services handling the day-to-day operations include:
* **Enrollment & Attendance:** Real-time tracking of children and staff attendance, alongside onboarding workflows.
* **Billing & Communications:** Handles automated tuition invoicing cycles and secure messaging gateways between care centers and parents.
* **Curriculum & Reporting:** Schedules daily activities and generates child progress insights.
* **Integration Layer:** Connects core services with external platforms like Payment Gateways and ERP/Finance systems (e.g., NetSuite).

---

### 2. Cloud Infrastructure & Security Layout
*<img width="975" height="575" alt="image" src="https://github.com/user-attachments/assets/b7777910-de72-4ec4-be7a-1261e99b3fad" />
*

To ensure maximum security and minimum downtime, the infrastructure is architected with the following enterprise standards:
* **Perimeter Security:** Traffic is guarded by a multi-layered defense system using a **Network Firewall** and a **Web Application Firewall (WAF)** to mitigate web vulnerabilities.
* **Traffic Management:** A **Load Balancer** efficiently distributes user traffic across multiple Application Servers to maintain high performance under peak loads.
* **Identity & Access Management (IAM):** Centralized access control enforcing strict authentication and authorization protocols for administrative tasks.
* **Data Resilience & High Availability:** Powered by a **PostgreSQL** cluster utilizing active data replication coupled with a dedicated **Disaster Recovery (DR)** setup to prevent data loss.

---

### 3. User Access & System Flow
*<img width="833" height="892" alt="image" src="https://github.com/user-attachments/assets/3d5e163d-e44f-4a97-897a-0b3daab97195" />
*

The system provides streamlined access tailored to different user roles through integrated touchpoints:
* **Staff & Educators:** Access daily operational tools via dedicated **Web Portals** and **Mobile Apps**.
* **Headquarter (HQ) Users:** Centralized management via the **HQ Admin** system to oversee multiple child care centers or franchise branches.
* **System Administrators:** Direct management over core platform settings securely isolated behind IAM and security controls.
