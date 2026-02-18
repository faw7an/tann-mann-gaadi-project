'use client';

import React, { useState } from 'react'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { User, Phone, Mail, CheckCircle, Loader2, AlertCircle } from "lucide-react";

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        // Display specific validation errors or generic message
        if (data.errors && data.errors.length > 0) {
          setErrors(data.errors);
        } else {
          setErrors([data.message || 'Registration failed. Please try again.']);
        }
      }
    } catch (err) {
      setErrors(['Unable to connect to server. Please try again later.']);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='border border-border bg-card/80 p-6 rounded-2xl w-full max-w-md backdrop-blur-xl shadow-sunrise'>
      {/* Success Message */}
      {success && (
        <div className='mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center gap-2 text-green-600'>
          <CheckCircle className='h-5 w-5' />
          <span className='text-sm font-medium'>Registration successful! Welcome aboard.</span>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className='mb-4 p-3 rounded-lg bg-destructive/20 border border-destructive/50'>
          <div className='flex items-start gap-2'>
            <AlertCircle className='h-5 w-5 text-destructive mt-0.5 shrink-0' />
            <div className='flex-1'>
              {errors.length === 1 ? (
                <p className='text-sm font-medium text-destructive'>{errors[0]}</p>
              ) : (
                <ul className='list-disc list-inside space-y-1'>
                  {errors.map((err, index) => (
                    <li key={index} className='text-sm font-medium text-destructive'>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <div className='space-y-1.5 mb-4'>
        <Label htmlFor="name" className="text-sm">Full Name</Label>
        <div className='relative'>
          <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'/>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="pl-10 bg-background/60 border-border focus:border-primary"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className='space-y-1.5 mb-4'>
        <Label htmlFor="phone">Phone Number</Label>
        <div className='relative'>
          <Phone className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'/>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="pl-10 bg-background/60 border-border focus:border-primary"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className='space-y-1.5 mb-5'>
        <Label htmlFor="email">Email</Label>
        <div className='relative'>
          <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'/>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="pl-10 bg-background/60 border-border focus:border-primary"
            required
            disabled={loading}
          />
        </div>
      </div>

      <Button 
        type="submit"
        disabled={loading}
        className="w-full gradient-sunrise text-primary-foreground font-semibold h-11 text-base shadow-sunrise hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registering...
          </>
        ) : (
          'Register Now'
        )}
      </Button>
    </form>
  )
}

export default Registration