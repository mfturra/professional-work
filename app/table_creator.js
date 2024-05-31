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
    { name: 'Company', type: 'VARCHAR(50)' },  
    { name: 'Model_Name', type: 'VARCHAR(50)' },  
    { name: 'Context', type: 'VARCHAR(50)' },  
    { name: 'Input', type: 'DECIMAL(10,2)' },  
    { name: 'Output', type: 'DECIMAL(10,2)' },  
    { name: 'Knowledge', type: 'DATE' },  
  ];  

const llm_models = [
    {"Company": "Anthropic",  "model_name": "claude-3-opus", "Context": "200k", "Input": "$15", "Output": "$75", "Knowledge": "2023-08"},
    {"Company": "Anthropic",  "model_name": "claude-3-sonnet", "Context": "200k", "Input": "$3", "Output": "$15", "Knowledge": "2023-08"},
    {"Company": "Anthropic",  "model_name": "claude-3-haiku", "Context": "200k", "Input": "$0.25", "Output": "$1.25", "Knowledge": "2023-08"},
    {"Company": "Anthropic",  "model_name": "claude-2.1", "Context": "200k", "Input": "$8.0", "Output": "24.0"},
    {"Company": "Anthropic",  "model_name": "claude-2.0", "Context": "100k", "Input": "$8.0", "Output": "24.0"},
    {"Company": "Anthropic",  "model_name": "claude-instant-1.2", "Context": "100k", "Input": "$0.8", "Output": "$2.4"},
    {"Company": "AWS",  "model_name": "jurassic-2-ultra", "Context": "32k", "Input": "$18.8", "Output": "$18.8"},
    {"Company": "AWS",  "model_name": "jurassic-2-mid", "Context": "32k", "Input": "$12.5", "Output": "$12.5"},
    {"Company": "AWS",  "model_name": "titan-text-lite", "Context": "32k", "Input": "$0.3", "Output": "$0.4"},
    {"Company": "AWS",  "model_name": "titan-text-express", "Context": "32k", "Input": "$0.8", "Output": "$1.6"},
    {"Company": "AWS",  "model_name": "claude-instant", "Context": "32k", "Input": "$0.8", "Output": "$2.40"},
    {"Company": "Google",  "model_name": "gemini-pro", "Context": "32k", "Input": "$0.13", "Output": "$0.38", "Knowledge": "2023-04"},
    {"Company": "Google",  "model_name": "gemini-1.5-pro", "Context": "1M", "Input": "$7", "Output": "$21", "Knowledge": "2023-04"},
    {"Company": "Google",  "model_name": "gemini-flash-1.5", "Context": "2.8M", "Input": "$0.35", "Output": "$1.05", "Knowledge": "2023-04"},
    {"Company": "Mistral",    "model_name": "mistral-large", "Context": "32k", "Input": "$8", "Output": "$24"},
    {"Company": "Mistral",    "model_name": "mistral-medium", "Context": "32k", "Input": "$2.7", "Output": "$8.1"},
    {"Company": "Mistral",    "model_name": "mistral-small", "Context": "32k", "Input": "$2", "Output": "$6"},
    {"Company": "Mistral",    "model_name": "mistral-7b", "Context": "32k", "Input": "$0.25", "Output": "$0.75"},
    {"Company": "OpenAI",     "model_name": "gpt-4o", "Context": "128k", "Input": "$5.00", "Output": "$15"},
    {"Company": "OpenAI",     "model_name": "gpt-4o-2024-05-13", "Context": "128k", "Input": "$5", "Output": "$15"},
    {"Company": "OpenAI",     "model_name": "gpt-4-turbo", "Context": "128k", "Input": "$10", "Output": "$30"},
    {"Company": "OpenAI",     "model_name": "gpt-4-turbo-2024-04-09", "Context": "128k", "Input": "$10", "Output": "$30"},
    {"Company": "OpenAI",     "model_name": "gpt-4", "Context": "8k", "Input": "$30", "Output": "$60"},
    {"Company": "OpenAI",     "model_name": "gpt-4-32k", "Context": "32k", "Input": "$60", "Output": "$120"}
];

module.exports.llm_models_dtype = llm_models_dtype;
module.exports.llm_models = llm_models;