import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import User from "../models/User";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exists." });
    }

    const checkPassword = await argon2.verify(existingUser.password, password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "replaceItWithSecret",
      { expiresIn: 1000 * 60 * 60 * 24 * 365 }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, confirmedPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    if (password !== confirmedPassword) {
      return res.status(400).json({ message: "Passwords don't match." });
    }

    const hashedPassword = await argon2.hash(password);

    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "replaceItWithSecret",
      { expiresIn: 1000 * 60 * 60 * 24 * 365 }
    );

    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
