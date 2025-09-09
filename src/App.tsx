import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { MoviesPage } from './components/MoviesPage';
import { SportsPage } from './components/SportsPage';
import { LiveStreamsPage } from './components/LiveStreamsPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { DashboardPage } from './components/DashboardPage';
import { EventDetailsPage } from './components/EventDetailsPage';
import { SeatSelectionPage } from './components/SeatSelectionPage';
import { BookingSummaryPage } from './components/BookingSummaryPage';
import { PaymentPage } from './components/PaymentPage';
import { BookingConfirmationPage } from './components/BookingConfirmationPage';
import { HelpSupportPage } from './components/HelpSupportPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      
      case 'movies':
        return <MoviesPage onNavigate={handleNavigate} />;
      
      case 'sports':
        return <SportsPage onNavigate={handleNavigate} />;
      
      case 'stream':
        return <LiveStreamsPage onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} />;
      
      case 'dashboard':
      case 'profile':
        return <DashboardPage onNavigate={handleNavigate} />;
      
      case 'movie-details':
      case 'event-details':
        return <EventDetailsPage onNavigate={handleNavigate} eventData={pageData} />;
      
      case 'seat-selection':
        return <SeatSelectionPage onNavigate={handleNavigate} eventData={pageData} />;
      
      case 'booking-summary':
        return <BookingSummaryPage onNavigate={handleNavigate} bookingData={pageData} />;
      
      case 'payment':
        return <PaymentPage onNavigate={handleNavigate} bookingData={pageData} />;
      
      case 'booking-confirmation':
        return <BookingConfirmationPage onNavigate={handleNavigate} confirmationData={pageData} />;
      
      case 'help':
      case 'help-support':
      case 'contact':
      case 'support':
        return <HelpSupportPage onNavigate={handleNavigate} />;
      
      case 'booking-history':
        return <DashboardPage onNavigate={handleNavigate} />;
      
      // Placeholder pages for additional navigation items
      case 'terms':
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
              <p className="text-muted-foreground mb-8">Coming soon...</p>
              <button 
                onClick={() => handleNavigate('home')}
                className="vibeverse-btn"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground mb-8">Coming soon...</p>
              <button 
                onClick={() => handleNavigate('home')}
                className="vibeverse-btn"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The page you're looking for doesn't exist or is under construction.
              </p>
              <button 
                onClick={() => handleNavigate('home')}
                className="vibeverse-btn"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
    }
  };

  // Don't show navigation and footer on login/signup pages
  const isAuthPage = currentPage === 'login' || currentPage === 'signup';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!isAuthPage && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      {!isAuthPage && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}