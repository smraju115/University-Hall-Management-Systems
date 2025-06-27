##  🎓  University Hall Management System
The University Hall Management System is a comprehensive web-based solution developed using ASP.NET Core 8.0 with Entity Framework (Code-First approach) and Angular 17 for front-end development. The system is designed to streamline and digitize the management of university residential halls by facilitating communication between hall administrators (teachers) and students.

This system follows a Role-Based Authentication and Authorization mechanism implemented using JWT (JSON Web Token). Two primary user roles are defined:

### Admin (Hall Teacher): Responsible for overseeing student requests, monitoring hall-related issues, and performing administrative actions.

### User (Student): Can log in to the system and submit complaints or applications such as room change requests online.

#  🚀  Key Features:
 * Role-Based Login System:
  Secure login for Admins and Students with different access levels.

 * Online Complaint Submission:
  Students can lodge complaints related to hall facilities directly through the system.

  * Room Change Application: 
    Students can apply for room changes digitally without needing to approach the office in person.

  * Admin Dashboard: 
   Admins can view, filter, and take action on all student complaints and applications from a centralized interface.

  * Status Tracking: 
   Each complaint or request has a dynamic status (e.g., Pending, In Progress, Done), updated by the admin.

  * Frontend Framework: 
   Developed using Angular 17 with Angular Material, offering responsive UI components including tables, forms, dialogs, and data grids.

  * Backend API: 
   ASP.NET Core Web API ensures fast and secure communication between the front-end and the database.

#  🛠️ Technologies Used:
* Frontend: Angular 17, Angular Material

* Backend: ASP.NET Core 8.0 Web API

* Database: SQL Server (via Entity Framework Core - Code First)

* Security: JWT-based Authentication and Authorization
 
# 📷 Screenshot

**Admin Dashboard**
![Admin Dashboard](PrjoectScreenshot/AdminDashboard.jpg)

**Student Dashboard**
 (PrjoectScreenshot/StudentDashboard.jpg)
 
## ⚙️ How to Run

1. Clone this repo
2. Run the ASP.NET backend project
3. Run `npm install` & `ng serve` inside Angular project
4. Configure connection string and JWT secret in `appsettings.json`


## 🙌 Developed By

- **Name:** S. M. SHAHAJALAL RAJU
- **GitHub:** https://github.com/smraju115



*** This system offers a modern, efficient, and user-friendly platform for hall administration and student services, reducing paperwork and improving response times for common hall-related issues.
