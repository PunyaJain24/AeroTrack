AeroTrack – Airline Management System
AeroTrack is a production-level, microservices-based airline management system built to simulate real-world backend architecture. It handles core functionalities such as flight booking, flight search, authentication, email notifications, and admin controls – all built using Node.js, Express, MySQL, Sequelize, and RabbitMQ.

🔧 Tech Stack
Backend: Node.js, Express.js

Database: MySQL (with Sequelize ORM)

Message Broker: RabbitMQ

Architecture: Microservices, MVC pattern

Authentication: JWT-based auth with Role-Based Access Control

Other: API Gateway, Rate Limiting, Concurrency Control, CI/CD Ready

🧠 Core Features
Microservices Architecture – Independent, scalable services with clear separation of concerns

Auth Service – JWT-based login, signup, and role-based authorization (admin/user)

Flight & Search Service – Flight creation, airplane and airport management, city mapping, search by location/date

Booking Service – Handles booking with concurrency-safe seat allocation and user tracking

Reminder Service – Sends pre-flight reminder emails using RabbitMQ for async processing

NotificationTicket System – Stores reminders with scheduled timestamps for later dispatch

API Gateway – Single entry point for all services with routing and token validation

Rate Limiter – Restricts abuse by limiting requests to 5 per 2 minutes per user

CI/CD Friendly – Modular and deployable services for modern cloud workflows

🧱 Database Schema Overview

Table	Description
City	Stores city names; each linked to one or more airports
Airport	Belongs to a city; uniquely identified by code
Airplane	Stores aircraft details like name and capacity
Flight	Links airplanes and airports with schedule and seat info
Booking	Stores user flight bookings and number of seats
NotificationTicket	Logs reminders scheduled for email dispatch

🔁 RabbitMQ Message Flow (Booking & Reminder Services)
After a successful booking, Booking Service publishes flight/user data to a RabbitMQ queue.

Reminder Service consumes the message and stores a NotificationTicket.

An email is sent to the user as a reminder before the flight.

This design keeps services decoupled and scalable without blocking the booking flow.

🧠 Concurrency Control in Booking Logic
To avoid overbooking and race conditions:

The Booking Service directly sends the requested seat count to the Flight Service.

The Flight Service atomically validates and updates the seat availability.

This prevents booking based on stale data during concurrent requests.

🚦 Rate Limiting
Added at the API Gateway level

Restricts a client from calling any service more than 5 times in 2 minutes

🚀 How to Run Locally
Make sure RabbitMQ and MySQL are installed and running.

Clone the repo:

bash
Copy
Edit
git clone https://github.com/PunyaJain24/AeroTrack.git
cd AeroTrack
Set up .env for each service with DB and RabbitMQ credentials

Install dependencies and run each service individually:

bash
Copy
Edit
cd <service-name>
npm install
npm start
Access via API Gateway: http://localhost:<gateway-port>/api/v1/...

📌 Final Thoughts
AeroTrack is more than a backend project – it's a demonstration of production-level backend architecture, covering:

Microservices decomposition

Event-driven design

Concurrency handling

Scalable and secure service integration
