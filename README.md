<div ali<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>متجر المغرب الإلكتروني</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Tajawal', 'sans-serif'],
            },
            colors: {
              primary: '#059669', // Emerald 600
              secondary: '#1e293b', // Slate 800
            }
          },
        },
      }
    </script>
  <script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^19.2.3",
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
    "react/": "https://esm.sh/react@^19.2.3/",
    "react-router-dom": "https://esm.sh/react-router-dom@^7.10.1",
    "lucide-react": "https://esm.sh/lucide-react@^0.561.0"
  }
}
</script>
</head>
  <body class="bg-gray-50 text-slate-800 font-sans antialiased">
    <div id="root"></div>
  </body>
</html>gn="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1UO7glHMVpX-5MKr-lcSzcTcWUcuLlaP2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
