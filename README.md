# SECURES-CS258-G11-Online-Campus-Security-Management-System-IIT-Indore
Team Members : Neha, Kanchi Pardhi, Khushi Verma, Shruti Modi

# Security Management System

The Online Campus Security Management System (Secures) provides an interface for both manager and workers to track their tasks on daily basis. IIT Indore has more than thousand security persons, who are instructed to give duties at different places within the campus. Thus, the objective is to build a secure system through which the entire security system within the campus can be managed in an efficient manner. This system will assist the security manager to control security efficiently as manual calculation/operation is a heavy task for the security manager.

## Technology Stack Used :

- Backend : NodeJS,
- Database : Mongodb
- FrontEnd : Javascript, HTML, CSS, Bootstrap
- Framework : Express

## Usage

1. Clone and navigate to this project directory

2. Install the dependencies

   ```bash
   npm install
   ```

3. Run the node/express http server
   ```bash
   node app.js
   ```
4. Open the url `http://localhost:3005` in browser for seeing the result

## Home Page
On the home page we can get some insights into the security department of the IIT Indore through photos and videos.  
From here, the manager can register new Employees, it is secured by the password system which only he knows.  
There are two logins provided under the login tab in the navbar, one for the security manager and one for the employees.  

##  After login in
The navbar will display the site name i.e. **SECURES** , and the **Logout** buttton.  

## Security Manager Side Interface
This is the home page of the manager side.  
He can view and edit his profile as required.  
On the left side there are various functions which he can control.  
First is **Leave**   
From here he can view all the leave requests that an employee has made and has the right to accept and deny it.  
Second is **Time Table**  
From this button he will be redirected to the timetable excel sheet, from there he can make timetables for every week.  
Third is **Employees Data**  
From here he can view all the information regarding the employees i.e. their name, emailid, phone number and salary.  
Fourth is **Monthly Salary**  
This button will redirect to the page where manager has to enter month number to see the receivable salaries of that particular month. There are two reserve holidays. From here at the end of the month when the department has credited salaries into the employees's accounts, he can send a mail to all the employees at once that they can check and inform in case there is any discrepancy.  
Fifth and last one is **Extra Employee**  
Since the most important feature of this site is that not any place should be without a security guard, so in case id any employee is on leave then we can appoint other person in his place from the extra employee list. Their salary will be calculated separately.  


## Employee Side Interface
This is the homepage of the employee side.  
He can view and edit his profile as and when required.  
On the left side there are various functions which an employee can perform.  
First is **TIme Table**  
He can see the weekly timetable from here and can go the place where his duty has been assigned.  
Second is **Apply for Leave**  
From her the employee can apply for leave, he has to provide the duration and reason for leave.  
Third is **Track Leave**  
From here the employee can view the status of the leaves which he has applied and act accordingly.  
Fouth is **Monthly Leaves**   
From here the employee can view the entire year's leaves.  
Fifth is **Monthly Salary**  
This button will redirect to the page where he has to enter month number to see the receivable salaries of that particular month along the the approved leaves.







