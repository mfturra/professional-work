let llmModelsObject = {
  "models": [
    {"Company": "Anthropic",  "Model Name": "claude-3-opus", "Context": "200k", "Input": "$15", "Output": "$75", "Knowledge": "2023-08"},
    {"Company": "Anthropic",  "Model Name": "claude-3-sonnet", "Context": "200k", "Input": "$3", "Output": "$15", "Knowledge": "2023-08"},
    {"Company": "Anthropic",  "Model Name": "claude-3-haiku", "Context": "200k", "Input": "$0.25", "Output": "$1.25", "Knowledge": "2023-08"},
    {"Company": "Anthropic",  "Model Name": "claude-2.1", "Context": "200k", "Input": "$8.0", "Output": "24.0"},
    {"Company": "Anthropic",  "Model Name": "claude-2.0", "Context": "100k", "Input": "$8.0", "Output": "24.0"},
    {"Company": "Anthropic",  "Model Name": "claude-instant-1.2", "Context": "100k", "Input": "$0.8", "Output": "$2.4"},
    {"Company": "AWS",  "Model Name": "jurassic-2-ultra", "Context": "32k", "Input": "$18.8", "Output": "$18.8"},
    {"Company": "AWS",  "Model Name": "jurassic-2-mid", "Context": "32k", "Input": "$12.5", "Output": "$12.5"},
    {"Company": "AWS",  "Model Name": "titan-text-lite", "Context": "32k", "Input": "$0.3", "Output": "$0.4"},
    {"Company": "AWS",  "Model Name": "titan-text-express", "Context": "32k", "Input": "$0.8", "Output": "$1.6"},
    {"Company": "AWS",  "Model Name": "claude-instant", "Context": "32k", "Input": "$0.8", "Output": "$2.40"},
    {"Company": "Google",  "Model Name": "gemini-pro", "Context": "32k", "Input": "$0.13", "Output": "$0.38", "Knowledge": "2023-04"},
    {"Company": "Google",  "Model Name": "gemini-1.5-pro", "Context": "1M", "Input": "$7", "Output": "$21", "Knowledge": "2023-04"},
    {"Company": "Google",  "Model Name": "gemini-flash-1.5", "Context": "2.8M", "Input": "$0.35", "Output": "$1.05", "Knowledge": "2023-04"},
    {"Company": "Mistral",    "Model Name": "mistral-large", "Context": "32k", "Input": "$8", "Output": "$24"},
    {"Company": "Mistral",    "Model Name": "mistral-medium", "Context": "32k", "Input": "$2.7", "Output": "$8.1"},
    {"Company": "Mistral",    "Model Name": "mistral-small", "Context": "32k", "Input": "$2", "Output": "$6"},
    {"Company": "Mistral",    "Model Name": "mistral-7b", "Context": "32k", "Input": "$0.25", "Output": "$0.75"},
    {"Company": "OpenAI",     "Model Name": "gpt-4o", "Context": "128k", "Input": "$5.00", "Output": "$15"},
    {"Company": "OpenAI",     "Model Name": "gpt-4o-2024-05-13", "Context": "128k", "Input": "$5", "Output": "$15"},
    {"Company": "OpenAI",     "Model Name": "gpt-4-turbo", "Context": "128k", "Input": "$10", "Output": "$30"},
    {"Company": "OpenAI",     "Model Name": "gpt-4-turbo-2024-04-09", "Context": "128k", "Input": "$10", "Output": "$30"},
    {"Company": "OpenAI",     "Model Name": "gpt-4", "Context": "8k", "Input": "$30", "Output": "$60"},
    {"Company": "OpenAI",     "Model Name": "gpt-4-32k", "Context": "32k", "Input": "$60", "Output": "$120"}
  ]
};

let llmModelsJson = JSON.stringify(llmModelsObject, null, 2); 
console.log(llmModelsJson);
