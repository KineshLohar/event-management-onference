# Event Management System

A modern full-stack Event Management application built as part of the OnferenceTV Full Stack Assignment. The application enables users to create, manage, update, and delete conference events while leveraging AI to automatically generate professional event descriptions and speaker introductions.

---

## Live Demo

https://event-management-onference.vercel.app/

## GitHub Repository

https://github.com/KineshLohar/event-management-onference

# Features

## Event Management

- Create conference events
- View event details
- Update existing events
- Delete events with confirmation
- Server-side pagination
- Responsive dashboard
- Empty state handling

## AI Powered Content Generation

Automatically generates:

- Professional Event Description (2–3 paragraphs)
- Speaker Introduction (~100 words)

### Fail-safe AI Implementation

The application never depends entirely on AI.

Workflow:

Validate Request
        │
        ▼
Generate AI Content
        │
   ┌────┴────┐
   │         │
Success    Failed
   │         │
   ▼         ▼
Merge AI   Continue
   │         │
   └────┬────┘
        ▼
Save Event
        ▼
Return Response

If AI generation fails:

- Event is still created
- AI fields remain empty
- User receives a successful response with appropriate messaging

This ensures reliability while providing enhanced functionality whenever AI is available.

## PDF Export

Export complete event information as a printable PDF including:

- Event Information
- Speaker Details
- AI Generated Description
- AI Generated Speaker Introduction

# Technology Stack

## Frontend

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Hook Form
- Zod
- Axios

## Backend

- Next.js Route Handlers
- TypeScript

## Database

- PostgreSQL
- Drizzle ORM
- Neon Database

## AI

- OpenAI
- GPT-4.1 Mini
- Structured Outputs
- Zod Response Validation

# Database Schema

Event

id
eventName
eventDate
speakerName
speakerDesignation
description
speakerIntro
createdAt
updatedAt

# API Endpoints

## Events

### Get Events

GET /api/events

Returns paginated events.

### Create Event

POST /api/events

Creates a new event.

Also generates AI content before saving.

### Get Event

GET /api/events/:id

Returns a single event.

### Update Event

PATCH /api/events/:id

Updates an existing event.

### Delete Event

DELETE /api/events/:id

Deletes an event after confirmation.

# Server-side Pagination

Implemented using URL search parameters.

Example

?page=1
?page=2
?page=3

Features

- URL driven
- Server rendered
- Database pagination using LIMIT/OFFSET
- Previous / Next navigation
- Invalid page handling

# Validation

Validation is implemented using Zod.

Validated fields:

- Event Name
- Event Date
- Speaker Name
- Speaker Designation

Validation occurs on both:

- Client
- Server

---

# Error Handling

The application handles:

### Invalid JSON

Returns

400 Bad Request

### Validation Errors

Returns

400 Bad Request
with field level validation.

### Event Not Found

Returns

404 Not Found

---

### Database Failures

Returns

500 Internal Server Error

---

### AI Failures

The application gracefully falls back by:

- Logging the error
- Saving the event
- Returning a successful response

---

# User Experience

- Responsive interface
- Accessible dialogs
- Confirmation before deletion
- Loading indicators
- Toast notifications
- Form validation
- Empty states
- Pagination
- Printable PDF

---

# AI Prompt Engineering

OpenAI is used to generate:

- Event Description
- Speaker Introduction

The prompt is designed to:

- Prevent hallucinations
- Avoid fabricated achievements
- Use only provided event information
- Produce structured outputs
- Return deterministic responses

---

# Environment Variables

Create a `.env`

DATABASE_URL=

OPENAI_API_KEY=

OPENAI_MODEL=gpt-4.1-mini

# Installation

Clone the repository

```bash
git clone https://github.com/KineshLohar/event-management-onference
```

Move into the project

```bash
cd event-management
```

Install dependencies

```bash
npm install
```

Generate database

```bash
npm run db:generate
```

Push schema

```bash
npm run db:push
```

Start development server

```bash
npm run dev
```

---

# Scripts

```bash
npm run dev

npm run build

npm run start

npm run lint

npm run db:generate

npm run db:push

npm run db:studio
```

---

# AI Tools Used

The following AI tools were used during development:

- ChatGPT
- Claude

AI assistance included:

- Architecture discussions
- UI improvements
- Prompt engineering
- Documentation
- Error handling improvements

All generated code was reviewed, modified, tested and integrated manually.

---

# Future Improvements

Given additional time, the following enhancements would be implemented:

- Authentication & Authorization
- Search & Filtering
- Event Categories
- Event Images
- AI Regeneration
- Background AI Processing
- CSV / Excel Export

---

# Assignment Highlights

✔ Full Stack Application

✔ CRUD Operations

✔ AI Integration

✔ Server-side Pagination

✔ PDF Export

✔ Responsive UI

✔ Form Validation

✔ Error Handling

✔ Production-ready Code Structure

✔ Graceful AI Fail-safe

✔ Clean Architecture

✔ Type Safety

✔ Modern React & Next.js Best Practices

