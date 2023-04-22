import { isValidEmail } from "./isValidEmail";

export function validateEmailFormData(data: FormData) {
  const errors = { name: "", email: "", message: "" };
  let anyError = false;

  const name = String(data.get("name"));
  const email = String(data.get("email"));
  const message = String(data.get("message"));

  if (typeof name !== "string" || name.length < 1) {
    errors.name += "Don't forget to enter your name!";
    anyError = true;
  }
  if (typeof email !== "string" || !isValidEmail(email)) {
    errors.email += "That doesn't look like a valid email address!";
    anyError = true;
  }
  if (typeof message !== "string" || message.length < 1) {
    errors.message += "I'm sure you have more to say than that!";
    anyError = true;
  }

  return { valid: !anyError, errors };
}