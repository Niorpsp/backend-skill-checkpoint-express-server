import express from "express";
import connectionPool from "../utils/db.mjs";

const router = express.Router();


// GET ALL QUESTIONS
// ดึงคำถามทั้งหมดจาก Database
// URL: GET /questions

router.get("/", async (req, res) => {
    try {
        const result = await connectionPool.query(
            "SELECT * FROM questions"
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


// GET QUESTION BY ID
// ดึงข้อมูลคำถามตาม id
// URL: GET /questions/:id
// ตัวอย่าง: /questions/203

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await connectionPool.query(
            "SELECT * FROM questions WHERE id = $1",
            [id]
        );


        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }


        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


// CREATE QUESTION
// เพิ่มคำถามใหม่ลง Database
// URL: POST /questions
// รับข้อมูลจาก req.body

router.post("/", async (req, res) => {
    try {
        const { title, description, category } = req.body;


        const result = await connectionPool.query(
            `
            INSERT INTO questions
            (title, description, category)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [title, description, category]
        );


        res.status(201).json(result.rows[0]);


    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// UPDATE QUESTION
// แก้ไขข้อมูลคำถามตาม id
// URL: PUT /questions/:id

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, category } = req.body;


        const result = await connectionPool.query(
            `
            UPDATE questions
            SET title = $1,
                description = $2,
                category = $3
            WHERE id = $4
            RETURNING *
            `,
            [
                title,
                description,
                category,
                id
            ]
        );


        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }


        res.json(result.rows[0]);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
});


// DELETE QUESTION
// ลบคำถามตาม id
// URL: DELETE /questions/:id

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;


        const result = await connectionPool.query(
            `
            DELETE FROM questions
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );


        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }


        res.json({
            message: "Question deleted",
            data: result.rows[0]
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
});


export default router;