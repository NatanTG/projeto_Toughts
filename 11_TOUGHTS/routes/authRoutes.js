import express from 'express';
import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const router = Router();

router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.post('/register', AuthController.registerPost);
router.get('/logout', AuthController.logout);
router.post('/login', AuthController.loginPost);

export default router;