import express from "express";
import { check, validationResult } from 'express-validator'

import Peep from '../models/peep.model.js';

const router = express.Router();

router.route(`/`)
    .post(
        [
            check(`name`).exists(),
            check(`username`).exists(),
            check(`peepMessage`).exists(),
            check(`date`).exists().isISO8601()
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send(`Posting new peep failed`);
            }

            const peep = new Peep(req.body);
            try {
                await peep.save();
                res.status(201).json({ "peep": "Peep added successfully" });
            } catch (error) {
                res.status(400).send(`Posting new peep failed`);
            }
        })
    .get(async (req, res) => {
        try {
            const allPeeps = await Peep.find({});
            res.json(allPeeps)
        } catch (error) {
            res.status(404).send(`Peep not found`);
        }
    });

export { router as peeps }