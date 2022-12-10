import express from 'express';
import { check, validationResult } from 'express-validator';

import User from '../models/user.model.js';

const router = express.Router();

router.route(`/`)
    .post(
        [
            check(`name`).exists().isLength({ min: 2 }),
            check(`username`).exists().isLength({ min: 2 }),
            check(`email`).exists().isEmail().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
            check(`password`).exists().isLength({ min: 5 })
        ],
        (req, res) => {
            const { email } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send(`Invalid register data`);
            };
            User.findOne({ email }, (err, user) => {
                if (user) {
                    res.send({ message: `User already exists` });
                } else {
                    const user = new User(req.body);
                    user.save(err => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({ message: `Registration successful` })
                        }
                    })
                }
            })
        })

export { router as register };