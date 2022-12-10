import express from 'express';
import { check, validationResult } from 'express-validator';

import User from '../models/user.model.js';

const router = express.Router();

router.route(`/`)
    .post(
        [
            check(`username`).exists().isLength({ min: 2 }),
            check(`password`).exists().isLength({ min: 5 })
        ],
        (req, res) => {
            const { username, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send(`Invalid login data`);
            };
            User.findOne({ username }, (err, user) => {
                if (user && password === user.password) {
                    res.send({ message: `Login success`, user });
                } else {
                    res.status(404).send({ message: `Details not found` });
                }
            })
        })

export { router as login };