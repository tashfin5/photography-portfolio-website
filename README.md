# Cinematic Photography Portfolio

A visually stunning, ultra-premium photography portfolio built for the modern web. Designed with a dark, cinematic aesthetic, fluid animations, and a seamless user experience. 

It includes a fully custom, secure backend moderator panel that allows the photographer to dynamically upload, reorder, and manage their portfolio using a beautiful drag-and-drop interface.

## ✨ Features

- **Cinematic Aesthetic**: Dark mode by default, featuring deep copper accents, subtle noise textures, and glowing ambient backgrounds.
- **Fluid Animations**: High-performance scroll tracking, staggered text reveals, and magnetic hover physics powered by Framer Motion.
- **Dynamic Horizontal Slider**: A highly custom horizontal scrolling track for featured works that intelligently transforms based on the device width.
- **Advanced Lightbox**: A native, highly responsive image viewing experience that locks the background and elegantly transitions photos.
- **Custom Backend Moderator Panel**: A secure `/moderator` dashboard allowing the owner to:
  - Upload raw images directly to Cloudinary.
  - Create and manage photography categories.
  - Drag-and-drop photos to reorder how they appear on the live site.
  - Instantly feature/unfeature specific works.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components, API Routes)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tashfin5/photography-portfolio-website.git
   cd photography-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root of the project and add the following keys:
   ```env
   # MongoDB Connection String
   MONGODB_URI=your_mongodb_uri

   # Cloudinary Credentials
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Moderator Login (Optional overrides)
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit `http://localhost:3000` in your browser. To access the admin panel, navigate to `http://localhost:3000/moderator`.

## 🌐 Deployment

This application is fully optimized for immediate deployment on **Vercel**. 
1. Import the repository into Vercel.
2. Add your 4 Environment Variables to the Vercel project settings.
3. Deploy! Vercel will automatically handle all Next.js server components and image optimization.

---
*Designed & Engineered for visual perfection.*
