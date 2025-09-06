# 538andMe.io - Political Analysis Platform 
#### A comprehensive React-based frontend for tracking congressional votes, representatives, and political analysis.

### Version 2.0 COMING SOON!




## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view in browser

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Shared components (Header, AI Assistant)
│   └── dashboard/        # Dashboard-specific components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── styles/              # CSS files
└── App.jsx             # Main application component
```

## 🎯 Features

### Current Implementation
- **Parliament Diagram**: Interactive seating chart with D3.js
- **Map View**: Placeholder for Mapbox integration
- **Responsive Design**: Mobile-friendly across all screen sizes
- **Multiple Pages**: Dashboard, Bills, Representatives, Analysis, Elections
- **Professional UI**: Clean, news-focused design
- **Mock Data**: Functional with sample data for development

### Ready for Integration
- Congressional district boundaries (GeoJSON)
- Real-time voting data (PostgreSQL)
- Representative profiles and voting history
- Bill text and analysis (pgvector)
- AI assistant integration

## 🛠️ Deployment


## 🔧 Development

### Available Scripts
- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=your_api_url_here
```

## 📱 Responsive Breakpoints
- **Desktop**: 1200px+ (3-column layout)
- **Tablet**: 768px-1199px (stacked layout)
- **Mobile**: <768px (single column)

## 🎨 Design System
- **Colors**: Red (#dc2626), Blue (#2563eb), Neutral grays
- **Typography**: Georgia serif for headers, system fonts for body
- **Layout**: Grid-based, newspaper-style
- **Components**: Reusable, accessible, professional
