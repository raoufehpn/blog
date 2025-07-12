import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with us.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline tracking-tighter">Contact Me</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
          Have a question or want to work together? Fill out the form below.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-bold font-headline mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            I'm happy to hear from you. Whether you have a project in mind, a question about my work, or just want to say hello, feel free to reach out.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:contact@example.com" className="hover:text-primary transition-colors">
                contact@example.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
