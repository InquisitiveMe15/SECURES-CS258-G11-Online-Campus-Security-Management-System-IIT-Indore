# SECURES-CS258-G11-Online-Campus-Security-Management-System-IIT-Indore
Team Members : Neha, Kanchi Pardhi, Khushi Verma, Shruti Modi

# Security Management System

The Online Campus Security Management System (Secures) provides an interface for both manager and workers to track their tasks on daily basis. IIT Indore has more than thousand security persons, who are instructed to give duties at different places within the campus. Thus, the objective is to build a secure system through which the entire security system within the campus can be managed in an efficient manner. This system will assist the security manager to control security efficiently as manual calculation/operation is a heavy task for the security manager.

## Technology Stack Used :

- Backend : NodeJS,
- Database : MongoDB
- FrontEnd : JavaScript, HTML, CSS, Bootstrap
- Framework : Express.js

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

<img width="948" alt="1" src="https://user-images.githubusercontent.com/85685489/163394741-6631b8ef-c20b-49ec-aff7-d9bc82195731.png">
<img width="947" alt="2" src="https://user-images.githubusercontent.com/85685489/163394767-a9054e27-d9a5-4d59-8d6c-7a87883319e6.png">
<img width="946" alt="3" src="https://user-images.githubusercontent.com/85685489/163394809-fb0069c3-5fe6-4bf4-8ad5-cbf4577b13fb.png">


##  After login in
The navbar will display the site name i.e. **SECURES** , and the **Logout** buttton.  

## Security Manager Side Interface
This is the home page of the manager side. 

<img width="949" alt="4" src="https://user-images.githubusercontent.com/85685489/163273453-ed8cb45f-1c96-4bca-b470-cde88df3be9b.png">

<img width="944" alt="5" src="https://user-images.githubusercontent.com/85685489/163273773-3e0156b7-a4cf-452d-83b3-59a850693e78.png">


He can view and edit his profile as required.  
On the left side there are various functions which he can control. 

First is **Leave**   
From here he can view all the leave requests that an employee has made and has the right to accept and deny it. 

<img width="947" alt="6" src="https://user-images.githubusercontent.com/85685489/163273898-171d65a6-1e9b-4409-95e7-7bab91a3fca8.png">
<img width="947" alt="7" src="https://user-images.githubusercontent.com/85685489/163273965-cfcde5d5-e46a-4658-a992-77d6699b5708.png">

<img width="948" alt="8" src="https://user-images.githubusercontent.com/85685489/163274083-cf37c198-1c2e-467b-b8b3-2d6e2c8f915e.png">

Second is **Time Table**  
From this button he will be redirected to the timetable excel sheet, from there he can make timetables for every week.  
<img width="960" alt="9" src="https://user-images.githubusercontent.com/85685489/163274325-ff7c748b-64c0-47a9-a6eb-e6e905cd9041.png">

Third is **Employees Data**  
From here he can view all the information regarding the employees i.e. their name, emailid, phone number and salary.  
<img width="946" alt="10" src="https://user-images.githubusercontent.com/85685489/163274419-ea78dd58-ec19-4d35-8e8e-77a1df56aa56.png">

Fourth is **Monthly Salary**  
This button will redirect to the page where manager has to enter month number to see the receivable salaries of that particular month. There are two reserve holidays. From here at the end of the month when the department has credited salaries into the employees's accounts, he can send a mail to all the employees at once that they can check and inform in case there is any discrepancy.  
<img width="960" alt="11" src="https://user-images.githubusercontent.com/85685489/163274528-78c6eef3-8fbb-4de3-a62d-8dd861522f4c.png">
<img width="947" alt="12" src="https://user-images.githubusercontent.com/85685489/163274639-263b8862-f4b3-47fa-b789-489b3c32a525.png">

Fifth and last one is **Extra Employee**  
Since the most important feature of this site is that not any place should be without a security guard, so in case id any employee is on leave then we can appoint other person in his place from the extra employee list. Their salary will be calculated separately.  
<img width="948" alt="13" src="https://user-images.githubusercontent.com/85685489/163274729-a9b74723-6508-4eb1-beb6-d744bdf9ebc3.png">



## Employee Side Interface
This is the homepage of the employee side.  
He can view and edit his profile as and when required. 
<img width="947" alt="14" src="https://user-images.githubusercontent.com/85685489/163275031-1236e3e8-1295-41ce-95d0-3340b24cd082.png">
<img width="945" alt="15" src="https://user-images.githubusercontent.com/85685489/163275114-73589c25-2e39-4d7a-9961-18c64a77ab42.png">

On the left side there are various functions which an employee can perform.  
First is **TIme Table**  
He can see the weekly timetable from here and can go the place where his duty has been assigned.
<img width="960" alt="9" src="https://user-images.githubusercontent.com/85685489/163275272-8232d6ca-3e71-4ba1-a468-7b98d2f10aac.png">

Second is **Apply for Leave**  
From her the employee can apply for leave, he has to provide the duration and reason for leave. 
<img width="960" alt="16" src="https://user-images.githubusercontent.com/85685489/163275354-7cbe9295-0967-4f0b-8bcc-e54e99d6936d.png">



Third is **Track Leave**  
From here the employee can view the status of the leaves which he has applied and act accordingly.  
<img width="949" alt="17" src="https://user-images.githubusercontent.com/85685489/163275445-9736537a-d937-4285-b689-7fc76ac5a588.png">

Fouth is **Monthly Leaves**   
From here the employee can view the entire year's leaves.  
<img width="960" alt="18" src="https://user-images.githubusercontent.com/85685489/163275521-fcab0c8d-aa28-42f5-a067-bd3f02943c50.png">
Fifth is **Monthly Salary**  
This button will redirect to the page where he has to enter month number to see the receivable salaries of that particular month along the the approved leaves.
<img width="960" alt="19" src="https://user-images.githubusercontent.com/85685489/163275655-2fd76b18-fc7e-48bc-9a21-b849b5cefed4.png">
<img width="944" alt="20" src="https://user-images.githubusercontent.com/85685489/163275716-8b8d2dd2-5abe-4200-a02b-2c306cfd33e3.png">

## Online Campus Security Management System provides an interface for both manager and workers to track their duties on daily basis through role-based access and helps them with the salary calculation.







