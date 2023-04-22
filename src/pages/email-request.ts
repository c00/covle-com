import type { APIRoute } from "astro";
import { sendEmail } from "../util/sendEmail";
import { validateEmailFormData } from "../util/validateEmailFormData";

export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const validationResult = validateEmailFormData(data);

  if (!validationResult.valid) {
    return new Response(JSON.stringify(validationResult), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const name = String(data.get('name'));
  const email = String(data.get('email'));
  const message = String(data.get('message'));
  const subject = `Covle-com request from ${name}`;

  try {
    await sendEmail(name, email, subject, message);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({'error': String(err)}), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
  
  return {
    body: JSON.stringify({
      status: 'ok'
    })
  }
}