# Notification Service

## Overview
The Notification Service is a core microservice of the Learning Management System (LMS), responsible for handling all email and listener for payment webhook and video transcoder webhook. It ensures seamless communication between the system and its users by sending welcome emails, password reset links, and other updates.

## Features
- Send email notifications (e.g., welcome emails, password resets).
- Real-time event handling using Apache Kafka.
- Stripe payment webhook listener
- Elastic video transcoder webhook listener.

## Tech Stack
- **Node.js**: Backend runtime for building scalable services.
- **Express.js**: Lightweight framework for RESTful APIs.
- **MongoDB**: For storing webhook event to make sure the events are idempotent.
- **Apache Kafka**: For event-driven communication.