# Water Tracker

A modern SaaS application for tracking daily water consumption with intuitive logging, progress visualization, and detailed analytics.

## Description

Water Tracker helps users monitor their daily hydration goals through an easy-to-use dashboard. Users can log water intake with quick-add buttons, view progress through interactive charts, and track their hydration history over time.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM
- **UI Components**: Custom React components with Tailwind

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Database (PostgreSQL, MySQL, or SQLite)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd water-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your database connection string and other required variables.

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
water-tracker/
├── prisma/
│   └── schema.prisma          # Database schema definition
├── src/
│   ├── app/
│   │   └── page.tsx           # Main dashboard page
│   ├── components/
│   │   ├── WaterDashboard.tsx     # Main dashboard container
│   │   ├── WaterProgressCard.tsx  # Progress display component
│   │   ├── QuickAddButtons.tsx    # Quick water entry buttons
│   │   ├── WaterChart.tsx         # Water consumption chart
│   │   └── RecentEntries.tsx      # Recent entries list
│   ├── lib/
│   │   └── water-service.ts       # Water data service functions
│   └── types/
│       └── water.ts               # TypeScript type definitions
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
└── package.json              # Project dependencies
```

## Features

- **Quick Water Logging**: Add water intake with predefined amounts
- **Progress Tracking**: Visual progress bars showing daily goal completion
- **Interactive Charts**: Graphical representation of consumption patterns
- **Recent Entries**: List of recent water intake logs
- **Responsive Design**: Optimized for desktop and mobile devices

## License

MIT License - see the LICENSE file for details.