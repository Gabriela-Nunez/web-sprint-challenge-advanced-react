import React from "react"
import { render, screen } from "@testing-library/react"
import AppClass from "./AppClass"
import '@testing-library/jest-dom/extend-expect'

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('renders without errors', () => {
  render(<AppClass />);
})

test('that a form exist', async() => {
  render(<AppClass />);

 const form = await screen.findByPlaceholderText(/type email/i);

 expect(form).toBeInTheDocument();
})

test('to have email input', async() => {
  render (<AppClass />);

  const emailInput = await screen.findByPlaceholderText(/type email/i);

  expect(emailInput).toBeInTheDocument();
})

