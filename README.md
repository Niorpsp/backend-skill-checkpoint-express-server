# Backend Skill Checkpoint - Express Server

โปรเจกต์นี้เป็นการสร้าง REST API ด้วย **Node.js และ Express.js**
โดยเชื่อมต่อกับ **PostgreSQL Database** เพื่อจัดการข้อมูล Questions และ Answers

โปรเจกต์นี้เป็นส่วนหนึ่งของ Backend Skill Checkpoint เพื่อฝึกการสร้าง Backend API ตั้งแต่การเชื่อมต่อ Database, การสร้าง Route, การเขียน SQL Query และการทำ CRUD Operation (Create, Read, Update, Delete)

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- dotenv
- nodemon

---

# Features

## Questions API

ผู้ใช้งานสามารถ:

- สร้างคำถามใหม่
- ดูคำถามทั้งหมด
- ดูคำถามตาม ID
- แก้ไขคำถาม
- ลบคำถาม
- ค้นหาคำถามจากหัวข้อหรือหมวดหมู่

## Answers API

ผู้ใช้งานสามารถ:

- สร้างคำตอบสำหรับคำถาม
- ดูคำตอบของแต่ละคำถาม
- ลบคำตอบ

---

# API Endpoints

## Questions API

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/questions`        | Get all questions   |
| GET    | `/questions/:id`    | Get question by id  |
| POST   | `/questions`        | Create new question |
| PUT    | `/questions/:id`    | Update question     |
| DELETE | `/questions/:id`    | Delete question     |
| GET    | `/questions/search` | Search questions    |

## Answers API

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| POST   | `/questions/:id/answers` | Create answer           |
| GET    | `/questions/:id/answers` | Get answers by question |
| DELETE | `/answers/:id`           | Delete answer           |

---

# Project Structure
