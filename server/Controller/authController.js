import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import {config} from '../config.js'

// Sign Up
export async function signup(req, res) {
    const {username, password} = req.body;
    const found = await userRepository.findByUsername(username)
    if (found) {
        return res.status(409).json({message: `${username}은(는) 존재하는 유저입니다.`})
    }
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds)
    const userId = await userRepository.createUser({username, password: hashedPassword})
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}

// Login
export async function login(req, res) {
    const {username, password} = req.body;
    const user = await userRepository.findByUsername(username);
    if (!user) {
        return res.status(401).json({message: '이름 또는 비밀번호가 잘못되었습니다.'})
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        return res.status(401).json({message: '이름 또는 비밀번호가 잘못되었습니다.'})
    }
    const token = createJwtToken(user.id)
    res.status(200).json({token, username})
}

// Check
export async function me(req, res) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({message: '유저를 찾지 못했습니다.'});
    }
    res.status(200).json({token: req.token, username: user.username})
}

// Create JWT
function createJwtToken(id) {
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresIn})
}
