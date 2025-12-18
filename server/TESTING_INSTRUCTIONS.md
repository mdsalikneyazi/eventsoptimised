# Testing the Upload Route

## Step 1: Start the Server

Make sure your server is running:
```bash
cd college-clubs-app/server
npm run dev
```

You should see:
- ✅ MongoDB Connected
- 🚀 Server running on port 5000

## Step 2: Get a Fresh JWT Token

First, login to get a token:

**POST** `http://localhost:5000/api/auth/login`

**Body (JSON):**
```json
{
  "email": "admin@college.edu",
  "password": "password123"
}
```

Copy the `token` from the response.

## Step 3: Test the Upload Route

### Option A: Using Postman

1. **Method:** POST
2. **URL:** `http://localhost:5000/api/posts/create`
3. **Headers:**
   - Key: `x-auth-token`
   - Value: `<your_jwt_token>`
4. **Body:**
   - Select **form-data**
   - Add field `file` (type: File) - select an image
   - Add field `caption` (type: Text) - optional caption text

### Option B: Using Thunder Client (VS Code Extension)

1. Create new request
2. Method: POST
3. URL: `http://localhost:5000/api/posts/create`
4. Headers:
   - `x-auth-token`: `<your_jwt_token>`
5. Body: Form Data
   - `file`: [Select file]
   - `caption`: "Test post"

### Option C: Using the Test Script

```bash
cd college-clubs-app/server
node test-upload.js
```

**Note:** Make sure to update the `TOKEN` variable in `test-upload.js` with your current token if it expired.

## Expected Response

```json
{
  "_id": "...",
  "clubId": "...",
  "mediaUrl": "https://res.cloudinary.com/...",
  "mediaType": "image",
  "caption": "Test post",
  "createdAt": "..."
}
```

## Troubleshooting

### Issue: Cloudinary Cloud Name
Your `.env` file has `CLOUDINARY_CLOUD_NAME=JIIT clubs` (with a space). Cloudinary cloud names typically don't have spaces. If you get Cloudinary errors, check your dashboard and use the exact cloud name (usually lowercase, no spaces).

### Issue: Token Expired
If you get "Token is not valid", login again to get a new token.

### Issue: No file uploaded
Make sure you're using `form-data` (not JSON) and the field name is exactly `file`.

