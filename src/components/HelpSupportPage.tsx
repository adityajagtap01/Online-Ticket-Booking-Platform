import React, { useState } from 'react';
import { Search, Phone, Mail, MessageCircle, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface HelpSupportPageProps {
  onNavigate: (page: string) => void;
}

export function HelpSupportPage({ onNavigate }: HelpSupportPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const faqs = [
    {
      id: 1,
      question: "How do I cancel or modify my booking?",
      answer: "You can cancel or modify your booking up to 2 hours before the event start time. Go to 'My Bookings' in your dashboard, select the booking you want to modify, and choose the appropriate option. Cancellation fees may apply.",
      category: "Bookings"
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI payments, net banking, and digital wallets like PayPal, Apple Pay, and Google Pay.",
      category: "Payment"
    },
    {
      id: 3,
      question: "How will I receive my tickets?",
      answer: "After successful payment, your tickets will be sent to your registered email address and phone number via SMS. You can also download them from your Vibeverse dashboard.",
      category: "Tickets"
    },
    {
      id: 4,
      question: "Can I get a refund if I can't attend?",
      answer: "Refunds are available for cancellations made at least 24 hours before the event. Processing fees may apply. For events cancelled by the organizer, full refunds will be provided within 5-7 business days.",
      category: "Refunds"
    },
    {
      id: 5,
      question: "What if I lose my tickets?",
      answer: "Don't worry! You can always access your tickets from your Vibeverse account. Login to your dashboard and go to 'My Bookings' to view and download your tickets again.",
      category: "Tickets"
    },
    {
      id: 6,
      question: "Are there any age restrictions for events?",
      answer: "Age restrictions vary by event. Check the event details page for specific age requirements. Some events may require ID verification at the venue.",
      category: "General"
    },
    {
      id: 7,
      question: "How early should I arrive at the venue?",
      answer: "We recommend arriving at least 15-30 minutes before the event start time to allow for security checks and finding your seats.",
      category: "Venue"
    },
    {
      id: 8,
      question: "Can I transfer my tickets to someone else?",
      answer: "Most tickets are non-transferable. However, some events may allow ticket transfers. Check your booking details or contact support for specific transfer policies.",
      category: "Tickets"
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our support team",
      contact: "+1-800-VIBEVERSE",
      availability: "24/7 Available",
      action: () => window.open('tel:+18008423837')
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your queries",
      contact: "support@vibeverse.com",
      availability: "Response within 24 hours",
      action: () => window.open('mailto:support@vibeverse.com')
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us instantly",
      contact: "Available on website",
      availability: "9 AM - 9 PM EST",
      action: () => alert('Live chat feature would open here')
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for contacting us! We\'ll get back to you within 24 hours.');
    setContactForm({
      name: '', email: '', subject: '', category: '', message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Help & Support</h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're here to help you with any questions or issues
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for help articles, FAQs, or topics..."
              className="pl-12 pr-4 py-4 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Help */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="vibeverse-card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('booking-history')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">My Bookings</h3>
                    <p className="text-sm text-muted-foreground">View, modify, or cancel your bookings</p>
                  </CardContent>
                </Card>
                
                <Card className="vibeverse-card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('profile')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Account Settings</h3>
                    <p className="text-sm text-muted-foreground">Update your profile and preferences</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions
                {searchQuery && (
                  <span className="text-base font-normal text-muted-foreground ml-2">
                    ({filteredFAQs.length} results)
                  </span>
                )}
              </h2>
              
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <Card key={faq.id} className="vibeverse-card">
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <CardContent className="p-4 flex items-center justify-between hover:bg-accent/5 transition-colors">
                          <div className="text-left">
                            <h3 className="font-semibold text-foreground">{faq.question}</h3>
                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded mt-2 inline-block">
                              {faq.category}
                            </span>
                          </div>
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 pb-4 px-4">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>

              {filteredFAQs.length === 0 && searchQuery && (
                <Card className="vibeverse-card">
                  <CardContent className="p-8 text-center">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any FAQs matching "{searchQuery}"
                    </p>
                    <Button variant="outline" onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Options */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactOptions.map((option, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={option.action}
                  >
                    <div className="flex items-start space-x-3">
                      <option.icon className="h-5 w-5 text-primary mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{option.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{option.description}</p>
                        <p className="text-sm font-medium text-primary">{option.contact}</p>
                        <p className="text-xs text-muted-foreground">{option.availability}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={contactForm.category} onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking Issues</SelectItem>
                        <SelectItem value="payment">Payment Problems</SelectItem>
                        <SelectItem value="refund">Refund Request</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue in detail..."
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('terms')}>
                  Terms & Conditions
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('privacy')}>
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('refund')}>
                  Refund Policy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}