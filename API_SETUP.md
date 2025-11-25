# API Ninjas Setup Instructions

## How to Add Your API Key

### Step 1: Get Your API Key
1. Go to https://api-ninjas.com/register
2. Sign up for a free account
3. Once logged in, go to https://api-ninjas.com/api
4. Copy your API key

### Step 2: Create .env File
1. In the `QuoteSpace` folder, create a new file named `.env`
2. Add the following line (replace with your actual API key):
   ```
   EXPO_PUBLIC_API_NINJAS_KEY=your_actual_api_key_here
   ```

   **⚠️ IMPORTANT:** The API key should be just the key string (like `abc123xyz456`), NOT the URL!
   - ❌ WRONG: `EXPO_PUBLIC_API_NINJAS_KEY=https://api.api-ninjas.com/v1/quotes?category=happiness`
   - ✅ CORRECT: `EXPO_PUBLIC_API_NINJAS_KEY=abc123xyz456yourkey789`

### Step 3: Restart Expo
After creating the `.env` file:
1. Stop the Expo server (Ctrl+C)
2. Restart it with `npm start`
3. The app will now use your API key to fetch quotes

## Example .env file:
```
EXPO_PUBLIC_API_NINJAS_KEY=abc123xyz456yourkey789
```

## Common Issues:

### "Unable to load a fresh quote" Error
- **Problem:** You might have set the API key to the URL instead of the actual key
- **Solution:** Make sure your `.env` file contains only the API key string, not a URL
- The API endpoint URL is already configured in the code

## Notes:
- The `.env` file is already in `.gitignore` so it won't be committed to git
- Never share your API key publicly
- The API key is free and has rate limits (check api-ninjas.com for details)

