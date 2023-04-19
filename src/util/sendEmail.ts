export async function sendEmail(name: string, email: string, subject: string, message: string) {
  // const api = new SendInBlue.TransactionalEmailsApi();
	// api.setApiKey(SendInBlue.TransactionalEmailsApiApiKeys.apiKey, import.meta.env.PRIVATE_SIB_KEY);

	const content = [
		`Covle contact form - ${subject}`,
		'',
		`From: ${name} - ${email}`,
		`Message:`,
		message
	];

  //todo sanitize this
	const clean = content.join('\n');

	const emailData = {
		to: [{ name: import.meta.env.PRIVATE_TO_NAME, email: import.meta.env.PRIVATE_TO_EMAIL }],
		sender: { name: import.meta.env.PRIVATE_FROM_NAME, email: import.meta.env.PRIVATE_FROM_EMAIL },
    replyTo: { name, email },
		subject: `New Message from ${name} - Covle.com`,
		textContent: clean
	};

	if (import.meta.env.PRIVATE_MOCK_EMAIL === '1') {
		console.log('Mocking Email', emailData);
		await new Promise<void>((res) => setTimeout(() => res(), 2000));
	} else {
    await fetch('https://api.sendinblue.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': import.meta.env.PRIVATE_SIB_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })
	}
}