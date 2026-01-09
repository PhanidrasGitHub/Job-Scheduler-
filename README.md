# Dotix - Job Scheduler & Automation System

A robust full-stack implementation of a mini-automation engine designed to create, track, and simulate background job execution with real-time feedback and outbound webhook integration.

# Tech Stack

Frontend: React (Vite), Tailwind CSS (UI/UX), Lucide Icons.

Backend: Node.js, Express.js.

Database: SQLite (local persistence) with an asynchronous driver.

Communication: RESTful API & Outbound Webhooks (Fetch API).

 Repository Structure

job-scheduler/
├── backend/
│   ├── controllers/      # Route logic
│   ├── database/         # SQLite connection & initialization
│   ├── routes/            # API endpoint definitions
│   ├── services/          # Webhook trigger logic
│   ├── app.js             # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI pieces (JobTable, etc.)
│   │   ├── services/      # Frontend API service (jobService.js)
│   │   └── App.jsx        # Main Dashboard
│   └── package.json
└── README.md              # Project documentation


# Architecture Explanation

The system follows a Decoupled Full-Stack Architecture composed of three main layers:

Client Layer (React): A responsive dashboard that manages local UI state (filtering, searching, and selection) and polls the server every 5 seconds to provide real-time status updates on running jobs.

API Layer (Express): Acts as the orchestrator. It handles job validation, interacts with the database, and manages the simulation logic for job execution.

Persistence Layer (SQLite): Stores job metadata, payloads, and timestamps. Using SQLite ensures the project is portable while maintaining relational data integrity.

Data Flow

User submits a job → API creates a record (pending).

User triggers execution → API updates record (running) and starts a 3-second timer.

Timer expires → API updates record (completed) and triggers the Webhook Service.

# Schema Design (ER Diagram)

The system revolves around a single primary entity: Jobs.

Field

Type

Description

id

INTEGER

Primary Key (Auto-increment)

taskName

TEXT

Human-readable alias for the job

payload

TEXT (JSON)

Execution data stored as a JSON string

priority

TEXT

'Low', 'Medium', or 'High'

status

TEXT

'pending', 'running', 'completed', or 'failed'

createdAt

DATETIME

Timestamp of creation

updatedAt

DATETIME

Last modification timestamp

completedAt

DATETIME

Timestamp of successful execution

# API Documentation

Method

Endpoint

Description

GET

/jobs

Retrieves all jobs. Supports query params status and priority.

POST

/jobs

Creates a new job. Expects taskName, priority, and payload.

GET

/jobs/:id

Returns detailed metadata and payload for a specific job.

POST

/run-job/:id

Initiates the 3-second simulation and subsequent webhook.

POST

/webhook-test

Internal endpoint to log and verify outbound webhook triggers.

# How Webhooks Work

The Dotix Webhook Service follows the "Event-Driven" model:

Completion Trigger: Once the 3-second background simulation completes, the backend generates a job.completed event.

Payload Assembly: The service gathers the jobId, the original payload, and the completedAt timestamp.

Outbound Request: The system performs an asynchronous POST request to the configured WEBHOOK_URL.

Verification: The system logs the success or failure of the delivery in the server console. This allows external systems (like Slack or CRM tools) to react immediately to the finished task.

# Setup Instructions

1. Backend Setup

cd job-scheduler/backend
npm install
npm run dev


The server will initialize jobs.sqlite automatically and listen on port 5000.

2. Frontend Setup

cd job-scheduler/frontend
npm install
npm run dev


Access the dashboard at the local URL provided by Vite (usually localhost:5173).

# AI Usage Log

This project was developed with assistance from Google's Gemini.

AI Tools Used: Gemini (Canvas Interface).

Model Name: gemini-2.5-flash-preview-09-2025.

Parts of the project AI helped with:

UI Design: Generating the high-fidelity Tailwind CSS dashboard and responsive layout.

Backend Logic: Writing the asynchronous simulation logic for the job runner and the Webhook service.

Debugging: Troubleshooting module resolution errors (e.g., pathing issues during refactoring).

Documentation: Generating the structure and technical content of the README.

Key Prompts Used:

"split the dashboard code into 3 three files they are Header , jobs and jobDetails"

"give fake data for db"

"how add a real webhook"

"explain this project"

"now write readme file as README should include: 1. Setup instructions 2. Tech stack..."

Note: Meaningful commit messages were used throughout the development of this repository to track feature progression.