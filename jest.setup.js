import "@testing-library/jest-dom";
import dotenv from "dotenv";

const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, ".env.test");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn(".env.test file not found, skipping dotenv config");
}

// Mock next/font/google
jest.mock("next/font/google", () => ({
  Geist: jest.fn(() => ({
    className: "mock-geist-sans",
    variable: "--font-geist-sans",
  })),
  Geist_Mono: jest.fn(() => ({
    className: "mock-geist-mono",
    variable: "--font-geist-mono",
  })),
}));
