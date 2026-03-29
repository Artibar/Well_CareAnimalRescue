WellCare — Animal Rescue & Adoption Platform
A platform where any user can raise concerns for animal rescue and adoption requests.

The Story Behind It
This was a freelance project. The client wanted a form-based approach where users fill out a form to request animal rescue or adoption. But when I looked at it, I noticed that could be slow and unreliable — especially in areas with poor internet connectivity, like forests where rescue situations actually happen.
So I suggested a different approach: instead of relying on a form, the organization should share their contact details directly on the website so users can just call them. It is faster, more reliable, and works even with bad internet.
The organization was still in the planning stage and had not officially opened by the time I completed the website, so the contact details section is ready but pending their information.

Features

Role-based authentication — separate access for admin, volunteer, and general users
Admin module — manage users, rescue requests, adoption listings, and donations
Volunteer module — view and respond to assigned rescue cases
Rescue module — users can raise a concern for an animal that needs help
Adoption module — users can browse animals available for adoption and submit requests
Donation module — users can contribute to support the organization
JWT authentication — secure login and protected routes across all roles


Tech Stack
Layer Technology FrontendReact, JavaScript, Tailwind CSSState Management Zustand, Backend Node.js, Express Database MongoDB Authentication JWT (JSON Web Tokens)

Project Structure
wellcare/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level pages
│   │   ├── store/           # Zustand state management
│   │   └── utils/           # Helper functions
├── server/                  # Node.js + Express backend
│   ├── controllers/         # Request handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route definitions
│   ├── middleware/          # JWT auth middleware
│   └── config/              # DB connection, env config
└── .env                     # Environment variables

Getting Started
Prerequisites

Node.js installed
MongoDB connection (local or Atlas)

Installation

Clone the repository

bashgit clone https://github.com/your-username/wellcare.git
cd wellcare

Install dependencies for both client and server

bash# Server
cd server
npm install

# Client
cd ../client
npm install

Set up your .env file in the server folder

envMONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

Run the app

bash# Run server
cd server
npm run dev

# Run client (in a new terminal)
cd client
npm run dev

Roles & Access
Role What they can do AdminFull access — manage all users, requests, donations, and listingsVolunteer View and update assigned rescue cases UserSubmit rescue concerns, browse adoptions, make donations

Why I Built It This Way
I chose Zustand for state management instead of Redux because it is simpler to set up and works well for a project of this size without unnecessary boilerplate. JWT handles authentication across all three roles through protected middleware on the backend, so every route checks the token and role before allowing access.
The form suggestion from the client was understandable, but after thinking about the actual use case — someone spotting an injured animal in a remote area — waiting for a form to submit over a weak connection does not make sense. A direct phone number is always faster in that situation.

Status
The website is complete. The organization is in the planning stage and has not officially opened yet, so some content sections are pending their details.

Author
Arti Yashwant Barsagade
GitHub: [your-github-link]
Live:  https://well-careanimalrescue.onrender.com/<img width="1906" height="1016" alt="Screenshot 2026-03-29 163622" src="https://github.com/user-attachments/assets/c329ca3c-cdfd-48cf-aaa8-f55c3f6e3256" />
<img width="1884" height="909" alt="Screenshot 2026-03-29 163601" src="https://github.com/user-attachments/assets/e074a76a-f6e9-4410-9424-b66886719659" />
<img width="1883" height="975" alt="Screenshot 2026-03-29 163520" src="https://github.com/user-attachments/assets/1609222e-6e21-41e4-a130-f55b33221d80" />
<img width="1911" height="1047" alt="Screenshot 2026-03-29 163435" src="https://github.com/user-attachments/assets/0dc94343-af7b-4959-b3d4-582ae9c48ea6" />
