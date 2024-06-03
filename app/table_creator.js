// Outline data types for USBLS excel file
const columns = [
    { name: 'jan', type: 'TINYINT' },
    { name: 'feb', type: 'TINYINT' },
    { name: 'mar', type: 'TINYINT' },
    { name: 'apr', type: 'TINYINT' },
    { name: 'may', type: 'TINYINT' },
    { name: 'jun', type: 'TINYINT' },
    { name: 'jul', type: 'TINYINT' },
    { name: 'aug', type: 'TINYINT' },
    { name: 'sep', type: 'TINYINT' },
    { name: 'oct', type: 'TINYINT' },
    { name: 'nov', type: 'TINYINT' },
    { name: 'dec', type: 'TINYINT' },
]

// Example list of user credentials
const users = [
    { username: 'pbruno', password: 'pass1', email: 'pbruno@example.com', name: 'Paul Bruno' },
    { username: 'truniro', password: 'pass2', email: 'truniro@example.com', name: 'Tom Runiro' },
    { username: 'psmith', password: 'pass3', email: 'psmith@example.com', name: 'Peter Smith' },
    { username: 'psimon', password: 'pass4', email: 'psimon@example.com', name: 'Paul Simon' },
    { username: 'ttwilks', password: 'pass5', email: 'ttwilks@example.com', name: 'Tom Wilks' },
    { username: 'cchirim', password: 'pass6', email: 'cchirim@example.com', name: 'Chris Chirim' },
    { username: 'revalator', password: 'pass7', email: 'revalator@example.com', name: 'Renee Valator' }
];

// Outline data types for USBLS excel file
const llm_models_dtype = [  
    { name: 'company', type: 'VARCHAR(50)' },  
    { name: 'model_name', type: 'VARCHAR(50)' },  
    { name: 'context', type: 'VARCHAR(50)' },  
    { name: 'input', type: 'DECIMAL(5,2)' },  
    { name: 'output', type: 'DECIMAL(5,2)' },  
    { name: 'knowledge', type: 'DATE' },  
  ];  

const llm_models = [
    {"company": "Anthropic",  "model_name": "claude-3-opus", "context": "200k", "input": "15", "output": "75", "knowledge": "2023-08-01"},
    {"company": "Anthropic",  "model_name": "claude-3-sonnet", "context": "200k", "input": "3", "output": "15", "knowledge": "2023-08-01"},
    {"company": "Anthropic",  "model_name": "claude-3-haiku", "context": "200k", "input": "0.25", "output": "1.25", "knowledge": "2023-08-01"},
    {"company": "Anthropic",  "model_name": "claude-2.1", "context": "200k", "input": "8.0", "output": "24.0"},
    {"company": "Anthropic",  "model_name": "claude-2.0", "context": "100k", "input": "8.0", "output": "24.0"},
    {"company": "Anthropic",  "model_name": "claude-instant-1.2", "context": "100k", "input": "0.8", "output": "2.4"},
    {"company": "AWS",  "model_name": "jurassic-2-ultra", "context": "32k", "input": "18.8", "output": "18.8"},
    {"company": "AWS",  "model_name": "jurassic-2-mid", "context": "32k", "input": "12.5", "output": "12.5"},
    {"company": "AWS",  "model_name": "titan-text-lite", "context": "32k", "input": "0.3", "output": "0.4"},
    {"company": "AWS",  "model_name": "titan-text-express", "context": "32k", "input": "0.8", "output": "1.6"},
    {"company": "AWS",  "model_name": "claude-instant", "context": "32k", "input": "0.8", "output": "2.40"},
    {"company": "Google",  "model_name": "gemini-pro", "context": "32k", "input": "0.13", "output": "0.38", "knowledge": "2023-04-01"},
    {"company": "Google",  "model_name": "gemini-1.5-pro", "context": "1M", "input": "7", "output": "21", "knowledge": "2023-04-01"},
    {"company": "Google",  "model_name": "gemini-flash-1.5", "context": "2.8M", "input": "0.35", "output": "1.05", "knowledge": "2023-04-01"},
    {"company": "Mistral",    "model_name": "mistral-large", "context": "32k", "input": "8", "output": "24"},
    {"company": "Mistral",    "model_name": "mistral-medium", "context": "32k", "input": "2.7", "output": "8.1"},
    {"company": "Mistral",    "model_name": "mistral-small", "context": "32k", "input": "2", "output": "6"},
    {"company": "Mistral",    "model_name": "mistral-7b", "context": "32k", "input": "0.25", "output": "0.75", "knowledge": "2023-12-01"},
    {"company": "OpenAI",     "model_name": "gpt-4o", "context": "128k", "input": "5.00", "output": "15", "knowledge": "2023-10-01"},
    {"company": "OpenAI",     "model_name": "gpt-4o-2024-05-13", "context": "128k", "input": "5", "output": "15"},
    {"company": "OpenAI",     "model_name": "gpt-4-turbo", "context": "128k", "input": "10", "output": "30"},
    {"company": "OpenAI",     "model_name": "gpt-4-turbo-2024-04-09", "context": "128k", "input": "10", "output": "30", "knowledge": "2023-12-01"},
    {"company": "OpenAI",     "model_name": "gpt-4", "context": "8k", "input": "30", "output": "60", "knowledge": "2021-09-01"},
    {"company": "OpenAI",     "model_name": "gpt-4-32k", "context": "32k", "input": "60", "output": "120", "knowledge": "2021-09-01"}
];

module.exports.llm_models_dtype = llm_models_dtype;
module.exports.llm_models = llm_models;