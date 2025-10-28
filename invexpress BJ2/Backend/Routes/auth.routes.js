import express from "express";
import { recoverPasswordController, resetPasswordController } from "../Controller/auth.controller.js";

const router = express.Router();

router.post("/recover", recoverPasswordController);
router.post("/reset/:token", resetPasswordController);

export default router;