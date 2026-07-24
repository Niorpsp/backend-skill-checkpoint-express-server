import express from "express";
import connectionPool from "../utils/db.mjs";

const router = express.Router();


// CREATE ANSWER
// สร้างคำตอบให้กับคำถาม
// POST /questions/:id/answers

router.post("/questions/:id/answers", async (req, res) => {

    try {

        const { id } = req.params;

        const { answer } = req.body;


        const result = await connectionPool.query(
            `
            INSERT INTO answers
            (question_id, content)
            VALUES ($1, $2)
            RETURNING *
            `,
            [
                id,
                answer
            ]
        );


        res.status(201).json(result.rows[0]);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

});




// GET ANSWERS BY QUESTION ID
// ดูคำตอบของคำถาม
// GET /questions/:id/answers

router.get("/questions/:id/answers", async (req, res) => {

    try {

        const { id } = req.params;


        const result = await connectionPool.query(
            `
            SELECT *
            FROM answers
            WHERE question_id = $1
            `,
            [
                id
            ]
        );


        res.json(result.rows);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

});




// DELETE ANSWER
// ลบคำตอบ
// DELETE /answers/:id

router.delete("/answers/:id", async (req, res) => {


    try {

        const { id } = req.params;


        const result = await connectionPool.query(
            `
            DELETE FROM answers
            WHERE id = $1
            RETURNING *
            `,
            [
                id
            ]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Answer not found"
            });

        }


        res.json({
            message: "Answer deleted",
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