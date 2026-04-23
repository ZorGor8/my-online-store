PixelPulse Online Store 🎸
A modern, high-performance e-commerce application built with React. This project demonstrates professional front-end architecture, focusing on state management, responsive UI, and automated testing.

🚀 Tech Stack
Framework: React 18

Build Tool: Vite (optimized for M4/Apple Silicon)

Routing: React Router DOM

State Management: Context API (with LocalStorage persistence)

Testing: Vitest + Playwright

Environment: Node.js + JSDOM

✨ Key Features
🔍 Smart Search & Filtering: Real-time product search and category filtering using optimized useMemo hooks.

🛒 Advanced Cart Logic: Full cart lifecycle management, including quantity adjustments and automated total price calculation.

⚡ Professional UX: Implementation of Skeleton Screens to prevent layout shift and improve perceived performance during data loading.

✅ Automated Testing: Comprehensive unit tests for business logic and E2E journeys (Playwright) ensuring a bug-free user experience.

📱 Fully Responsive: Mobile-first design approach using modern CSS Grid and Flexbox layouts.

✅ Automated Testing
The project implements a multi-layered testing strategy:

Unit Testing: Powered by Vitest to ensure core business logic and individual components work correctly.

E2E Testing: Powered by Playwright to simulate real user journeys, including product selection and cart workflows.

🛠 Installation & Setup
Clone the repository:


git clone https://github.com/ZorGor8/my-online-store.git
cd my-online-store
Install dependencies:


npm install
Install Playwright Browsers:


npx playwright install
Run the application:


npm run dev
Run tests:

Run Unit Tests: npm run test

Run E2E Tests: npx playwright test

Open Test Report: npx playwright show-report
