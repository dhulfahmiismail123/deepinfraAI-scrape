// src/index.js
import { Impit } from "impit";

const deepinfraAIOptionsDefault = {
	model: "Qwen/Qwen3-30B-A3B", //
	response_format: {
		type: "none" // or json_object
	}
};

const impitOptionsDefault = {
	browser: "chrome"
};

const deepinfraAI = async (messageSender, deepinfraAIOptions, impitOptions) => {
	deepinfraAIOptions = deepinfraAIOptions || deepinfraAIOptionsDefault;
	impitOptions = impitOptions || impitOptionsDefault;

	const impit = new Impit({ timeout: 9999999, ...impitOptions });

	const response = await impit.fetch(
		"https://api.deepinfra.com/v1/openai/chat/completions",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
			},
			body: JSON.stringify({
				messages: [{ role: "user", content: messageSender }],
				stream: true,
				...deepinfraAIOptions
			})
		}
	);

	if (!response.body) throw new Error("Response stream not available");
	
	const reader = response.body.getReader();
	const decoder = new TextDecoder();

	let buffer = "";
	let fullContent = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });

		const lines = buffer.split("\n");
		buffer = lines.pop();

		for (const line of lines) {
			const clean = line.trim();
			if (!clean || !clean.startsWith("data:")) continue;

			const payload = clean.slice(5).trim();
			if (payload === "[DONE]") break;

			try {
				const data = JSON.parse(payload);
				for (const choice of data.choices || []) {
					if (choice.delta?.content) {
						fullContent += choice.delta.content;
						// process.stdout.write(choice.delta.content);
					}
				}
			} catch (e) {
				console.error(e);
			}
		}
	}
	
	if (deepinfraAIOptions.response_format.type === "json_object") {
		return JSON.parse(fullContent, null, 2)}
	return fullContent;
};

export default deepinfraAI;
