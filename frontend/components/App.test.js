import React from "react"
import { render, screen } from "@testing-library/react"
import AppClass from "./AppClass"

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('renders without errors', () => {
  render(<AppClass />);
})

test('that a form exist', () => {
  render(<AppClass />);

 const form = screen.findByPlaceholderText(/type email/i);

 expect(form).toBeInTheDocument();
})

test('to have email input', () => {
  render (<AppClass />);

  const emailInput = screen.findByPlaceholderText(/type email/i);

  expect(emailInput).toBeInTheDocument();
})