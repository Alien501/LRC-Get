# LRC Get - Enhanced Version

A modern React application for fetching synchronized lyrics from Spotify songs, built with NextUI and TanStack Query.

## ✨ Features

- **Modern UI**: Beautiful interface built with NextUI components
- **Smart Caching**: TanStack Query for efficient data fetching and caching
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark Mode Support**: Automatic dark mode detection
- **Real-time Updates**: Live loading states and progress indicators
- **Copy & Download**: Easy lyrics copying and downloading functionality

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **NextUI** - Beautiful and accessible UI components
- **TanStack Query** - Powerful data fetching and caching
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## 🛠️ Key Improvements

### State Management
- Replaced manual state management with TanStack Query
- Automatic caching and background updates
- Optimistic updates and error recovery

### Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Graceful fallbacks for failed requests
- Input validation with real-time feedback

### UI/UX Enhancements
- Modern card-based layout
- Smooth animations and transitions
- Loading states with spinners
- Responsive design for all screen sizes
- Custom scrollbars for lyrics
- Hover effects and micro-interactions

### Performance
- Query caching reduces API calls
- Optimized re-renders
- Lazy loading of components
- Efficient state updates

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🎯 Usage

1. Paste a Spotify song link in the input field
2. Click "Get Lyrics" or press Enter
3. View synchronized and plain lyrics in tabs
4. Copy or download lyrics as needed

## 🔧 Configuration

Make sure to set your backend URL in the environment variables:

```env
VITE_MY_BACKEND_LINK=your_backend_url_here
```

## 📱 Responsive Design

The app is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 Customization

The app uses NextUI's theming system and can be easily customized by:
- Modifying the theme configuration
- Updating CSS custom properties
- Adding new color schemes
- Customizing component variants

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation
