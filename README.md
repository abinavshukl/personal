# 💝 Journey of Love - A Personal Web Experience

Created with love by **Abhinav**, this is a romantic, interactive web experience celebrating a special relationship. This project showcases a beautiful 5-step journey featuring memories, personal touches, and heartfelt messages.

## 🌹 Project Overview

**Journey of Love** is a modern, responsive web application built to create a memorable digital experience. It's a personalized story told through interactive steps, a photo gallery, personality quiz, secret messages, and romantic promises.

### Key Features

- **5-Step Interactive Journey**: A guided experience with smooth transitions and animations
- **Dynamic Photo Gallery**: Rotating memory gallery with click-to-expand lightbox previews
- **Personalized Quiz**: Interactive questions about love languages and relationship preferences
- **Secret Message**: An unveiling letter with heartfelt words
- **2002 Promise**: A personalized promise based on quiz answers
- **Floating Heart Animations**: Beautiful ambient background effects
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Modern Aesthetics**: Rose-themed color palette with glassmorphic UI elements
- **Smooth Interactions**: Curated animations and transitions for delightful UX

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide Icons (via CDN)
- **Design Approach**: Mobile-first, responsive design
- **Language Composition**:
  - JavaScript: 74.3%
  - CSS: 19.2%
  - HTML: 6.5%

## 📂 Project Structure

```
personal/
├── index.html          # Main HTML file with page structure
├── script.js           # JavaScript logic for interactivity (33.5KB)
├── styles.css          # Custom CSS styles and animations (8.7KB)
├── images/             # Photo gallery folder
│   ├── IMG-20230912-WA0026.jpg
│   ├── IMG-20240219-WA0029.jpg
│   ├── IMG-20240219-WA0030.jpg
│   ├── IMG-20260327-WA0015.jpg
│   ├── IMG20230129205236.jpg
│   ├── IMG_20230517_210602.jpg
│   └── ... (25+ photos total)
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/CSS/JavaScript (for customization)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abinavshukl/personal.git
   cd personal
   ```

2. **Open Locally**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8000` (or your server URL)

### Customization Guide

#### Modify Personal Information

Edit the `CONTENT` object in `script.js`:

```javascript
const CONTENT = {
  nickname: "Jaana",           // Your special name for them
  myDob: "20/07/2002",         // Your date of birth (DD/MM/YYYY)
  herDob: "06/08/2002",        // Their date of birth (DD/MM/YYYY)
  imageBasePath: "images/"     // Path to your images folder
};
```

#### Add Your Photos

1. Create an `images/` folder in the root directory
2. Add your photos (JPG, PNG format)
3. Update the `PHOTO_LIBRARY` array in `script.js` with your image URLs and captions:

```javascript
const PHOTO_LIBRARY = [
  {
    url: `${CONTENT.imageBasePath}your-photo.jpg`,
    caption: "Your memorable caption here"
  },
  // ... add more photos
];
```

#### Customize Quiz Questions

Modify the `QUIZ_QUESTIONS` array to add your own questions:

```javascript
const QUIZ_QUESTIONS = [
  {
    id: "customQuestion",
    prompt: "Your question here?",
    options: [
      { label: "Option 1", value: "option_1" },
      { label: "Option 2", value: "option_2" },
      { label: "Option 3", value: "option_3" }
    ]
  }
  // ... add more questions
];
```

#### Update the Secret Message

Find and modify the quote in the `renderOpenedLetter()` function in `script.js`:

```javascript
<p class="text-lg leading-9 text-rose-900/85 sm:text-xl">
  "Your heartfelt message here..."
</p>
```

#### Change Colors

Edit CSS custom properties in `styles.css`:

```css
:root {
  --rose-deep: #9f1239;       /* Darkest rose */
  --rose-main: #e11d48;       /* Primary rose */
  --rose-soft: #ffe4e6;       /* Soft rose background */
  --rose-glass: rgba(255, 255, 255, 0.72);  /* Glass effect */
  --shadow-soft: 0 24px 60px rgba(190, 24, 93, 0.12);  /* Shadows */
}
```

## 📖 How It Works

### Step-by-Step Journey

1. **Step 1 - Welcome**: Introduction with birth year significance
2. **Step 2 - Gallery**: Rotating photo gallery with memories
3. **Step 3 - Quiz**: Interactive personality questions
4. **Step 4 - Secret**: Unveiling an intimate letter
5. **Step 5 - Promise**: Personalized promise based on answers

### Key Functions

- `renderStep()`: Main rendering engine for each step
- `transitionToStep()`: Smooth transitions between steps
- `rotateGalleryPhoto()`: Auto-rotating photo gallery
- `startGalleryRotation()` / `stopGalleryRotation()`: Gallery control
- `seedFloatingHearts()`: Generates floating heart animations
- `restartJourney()`: Resets the experience

## 🎨 Features in Detail

### Animations

- **Floating Hearts**: Ambient background animation with CSS keyframes
- **Smooth Transitions**: Step transitions with cubic-bezier easing
- **Hover Effects**: Interactive button and card hover states
- **Gallery Swap**: Smooth photo replacement animations

### Responsive Design

- Mobile: Stacked layout with fixed bottom buttons
- Tablet: Two-column layouts
- Desktop: Full multi-column layouts with optimal spacing

### Interactive Elements

- Memory lightbox for full-screen photo viewing
- Clickable quiz options with visual feedback
- Floating button interactions
- Keyboard navigation (ESC to close modals)

## 🔧 Browser Compatibility

- Chrome/Chromium: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Edge: ✅ Fully supported
- IE11: ⚠️ Not supported (modern CSS features required)

## 📱 Performance

- Lightweight (no frameworks needed)
- Optimized images recommended
- Lazy loading for images
- CSS transitions for smooth 60fps animations
- Minimal JavaScript bundle

## 🌐 Deployment

### Deploy on GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be available at `https://username.github.io/personal`

### Deploy on Vercel

1. Connect your GitHub repository to Vercel
2. Vercel auto-detects the static site
3. Your site deploys instantly with each push

### Deploy on Netlify

1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository
3. Set build command: (leave empty for static)
4. Deploy directory: (leave empty, uses root)

## 📝 Customization Tips

- **Color Theme**: Change the rose colors in `:root` CSS variables
- **Font Family**: Edit the Dancing Script/Inter font imports in HTML
- **Animation Speed**: Adjust transition durations in CSS
- **Photo Count**: The gallery displays 4 random photos at a time
- **Quiz Answers**: Use different logic by modifying the `renderPromiseStep()` function

## 🎯 Use Cases

- 💍 Marriage proposal
- 💕 Anniversary gift
- 🎂 Birthday surprise
- 💝 Valentine's Day special
- 🌹 Expressing love and appreciation
- 📸 Digital memory collection

## 🚧 Future Enhancement Ideas

- Add music/sound effects
- Video integration
- Timeline view for memories
- Countdown timer
- Share functionality
- Dark mode toggle
- Multi-language support
- Advanced animations with Three.js

## ❤️ Created with Love by Abhinav

This project is a personal creation designed to celebrate love and connection through technology. Every interaction, animation, and word has been carefully crafted to express deep affection.

**Special dedication**: To Jaana, with all my love. ✨

## 📄 License

This project is personal and shared for inspirational purposes. Feel free to customize and use it for your own special someone!

## 💬 Notes

- Make sure all image files are in the `images/` folder
- Images should be optimized for web (compressed JPG/PNG)
- Test on mobile before sharing
- Customize all personal information before sharing with your special one

---

**Made with ❤️ by Abhinav**

*"If 2002 gave us anything truly perfect, it was the chance that one day our hearts would meet."*