import { Router } from "express";
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

const SECRET = process.env.SECRET_KEY


router.post('/signup', async(req, res) => {
  try {
    const { email, username, password } = req.body
    const user = new User({
      email: email,
      username: username,
      password: bcrypt.hashSync(password, 13)
    })
    const newUser = await user.save()

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: '1 day'
    })
    res.status(200).json({
      user: newUser,
      message: 'success',
      token
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

export default router
