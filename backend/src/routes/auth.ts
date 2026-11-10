import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: "Email and password are required."
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      res.status(400).json({
        error: error.message
      });
      return;
    }

    res.status(201).json({
      message: "Registration successful.",
      user: data.user
    });

  } catch (error) {
    res.status(500).json({
      error: "Internal server error."
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: "Email and password are required."
      });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      res.status(400).json({
        error: error.message
      });
      return;
    }

    res.status(200).json({
      message: "Login successful.",
      user: data.user
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error."
    });
  }
});

export default router;