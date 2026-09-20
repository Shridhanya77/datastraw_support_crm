\# Datastraw Support CRM



A full-stack customer support ticket management system built with \*\*React.js, Flask, and PostgreSQL\*\*. The application allows support teams to create, manage, search, filter, update, add notes to, and delete customer support tickets.



\## 🚀 Live Demo



\*\*Frontend:\*\*  

https://datastraw-support-crm-delta.vercel.app/



\*\*Backend API:\*\*  

https://datastraw-support-crm-2.onrender.com/



\## 📸 Application Preview



\### Dashboard



!\[Datastraw Support CRM Dashboard](Screenshots/dashboard.png)



\### Create Ticket



!\[Creating a Ticket Form](Screenshots/create\_ticket.png)



\### Ticket Details



!\[Ticket Details](Screenshots/ticket\_details.png)





\## 📌 Features



\- Create customer support tickets

\- View detailed ticket information

\- Update ticket status

&#x20; - Open

&#x20; - In Progress

&#x20; - Closed

\- Add notes to tickets

\- Search tickets by customer, ticket ID, email, subject, or description

\- Filter tickets by status

\- Delete tickets

\- Dashboard with ticket statistics

\- Persistent PostgreSQL database

\- REST API architecture

\- Responsive React frontend

\- Production deployment



\## 🛠️ Technology Stack



\### Frontend

\- React.js

\- Vite

\- JavaScript

\- Tailwind CSS



\### Backend

\- Python

\- Flask

\- Flask-CORS

\- Gunicorn

\- REST APIs



\### Database

\- PostgreSQL

\- Supabase



\### Development \& Deployment

\- Git

\- GitHub

\- Vercel

\- Render



\## 🏗️ System Architecture



```text

┌─────────────────────────┐

│       React Frontend    │

│      Vite + Tailwind    │

└────────────┬────────────┘

&#x20;            │

&#x20;            │ REST API

&#x20;            ▼

┌─────────────────────────┐

│      Flask Backend      │

│      Python + API       │

└────────────┬────────────┘

&#x20;            │

&#x20;            │ PostgreSQL

&#x20;            ▼

┌─────────────────────────┐

│   Supabase PostgreSQL   │

│     Tickets + Notes     │

└─────────────────────────┘



Frontend → Vercel

Backend  → Render

Database → Supabase

```



\## 📂 Project Structure



```text

datastraw\_support\_crm/

│

├── backend/

│   ├── app.py

│   ├── database.py

│   ├── requirements.txt

│   └── ...

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── services/

│   │   ├── App.jsx

│   │   └── ...

│   ├── package.json

│   └── ...

│

└── README.md

```



\## 🔌 API Endpoints



\### Tickets



| Method | Endpoint | Description |

|---|---|---|

| GET | `/api/tickets` | Retrieve all tickets |

| GET | `/api/tickets/<ticket\_id>` | Retrieve a specific ticket |

| POST | `/api/tickets` | Create a new ticket |

| PUT | `/api/tickets/<ticket\_id>` | Update ticket status or add notes |

| DELETE | `/api/tickets/<ticket\_id>` | Delete a ticket |



\### Example Ticket



```json

{

&#x20; "customer\_name": "rahul",

&#x20; "customer\_email": "rahul@gmail.com",

&#x20; "subject": "Unable to login",

&#x20; "description": "Customer is unable to access their account."

}

```



\## 🗄️ Database



The application uses PostgreSQL through Supabase.



\### Main tables



\*\*tickets\*\*

\- ticket\_id

\- customer\_name

\- customer\_email

\- subject

\- description

\- status

\- created\_at

\- updated\_at



\*\*notes\*\*

\- id

\- ticket\_id

\- note\_text

\- created\_at



\## 💻 Running Locally



\### 1. Clone the repository



```bash

git clone https://github.com/Shridhanya77/datastraw\_support\_crm.git

cd datastraw\_support\_crm

```



\### 2. Run the backend



```bash

cd backend



python -m venv venv

```



Activate the virtual environment.



\*\*Windows PowerShell:\*\*



```powershell

.\\venv\\Scripts\\Activate.ps1

```



Install dependencies:



```bash

pip install -r requirements.txt

```



Run Flask:



```bash

python app.py

```



The backend will run at:



```text

http://127.0.0.1:5000

```



\### 3. Run the frontend



Open another terminal:



```bash

cd frontend

npm install

npm run dev

```



The frontend will run at the Vite development URL shown in the terminal.



\## 🔐 Environment Variables



For production, the backend uses:



```text

DATABASE\_URL

```



The database connection string should be configured through the deployment platform and should \*\*not\*\* be committed to GitHub.



\## 🎯 Learning Outcomes



This project provided practical experience with:



\- Full-stack web application development

\- React component-based development

\- REST API development using Flask

\- PostgreSQL database integration

\- CRUD operations

\- Frontend-backend communication

\- API error handling

\- Git and GitHub

\- Production deployment

\- Cloud database integration

\- Debugging deployment issues



\## 👩‍💻 Author



\*\*Shridhanya\*\*



B.E. Computer Science Engineering  

IoT, Cybersecurity \& Blockchain Technology



GitHub:  

https://github.com/Shridhanya77



\---



