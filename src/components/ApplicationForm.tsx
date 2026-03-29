import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { OperationType } from '../types';

export default function ApplicationForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleId = searchParams.get('role');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleTitle = roleId === 'cs-intern' 
    ? 'Computer Science Intern' 
    : roleId === 'marketing-intern' 
      ? 'Marketing Intern' 
      : 'Internship Program';

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
        tenantId: auth.currentUser?.tenantId,
        providerInfo: auth.currentUser?.providerData.map(provider => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const applicationData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      linkedinUrl: formData.get('linkedinUrl') as string || null,
      portfolioUrl: formData.get('portfolioUrl') as string || null,
      hobbies: formData.get('hobbies') as string || null,
      nationBuilding: formData.get('nationBuilding') as string || null,
      whySvamarga: formData.get('whySvamarga') as string || null,
      roleId: roleId || 'general',
      roleTitle: roleTitle,
      submittedAt: serverTimestamp(),
      status: 'pending'
    };

    const path = 'applications';
    try {
      await addDoc(collection(db, path), applicationData);
      setSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] text-center max-w-md shadow-xl"
        >
          <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="serif text-4xl font-medium mb-4">Application Received</h2>
          <p className="text-gray-500 mb-8">
            Thank you for your interest in Svamarga. Our team will review your application and get back to you soon.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-brand-olive text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-olive mb-12 transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-olive font-bold mb-2 block">Application Form</span>
        <h1 className="serif text-5xl font-medium mb-4">{roleTitle}</h1>
        <p className="text-gray-500">Please provide your details and we'll reach out to you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-[2.5rem] shadow-sm border border-black/5">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Full Name</label>
            <input 
              required
              name="fullName"
              type="text" 
              placeholder="Arjun Sharma"
              className="w-full bg-brand-cream/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-olive/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
            <input 
              required
              name="email"
              type="email" 
              placeholder="arjun@example.com"
              className="w-full bg-brand-cream/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-olive/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">LinkedIn Profile</label>
            <div className="relative">
              <LinkIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                name="linkedinUrl"
                type="url" 
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-brand-cream/50 border-none rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-brand-olive/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Portfolio / Work Links</label>
            <div className="relative">
              <LinkIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                name="portfolioUrl"
                type="url" 
                placeholder="https://github.com/username or your website"
                className="w-full bg-brand-cream/50 border-none rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-brand-olive/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Hobbies and Interests</label>
          <textarea 
            name="hobbies"
            rows={3}
            placeholder="Tell us what you enjoy doing in your free time..."
            className="w-full bg-brand-cream/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-olive/20 outline-none transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Nation Building</label>
          <p className="text-[10px] text-gray-400 ml-1 mb-2 italic">What does 'Nation Building' mean to you in the context of a 'Developed' India?</p>
          <textarea 
            name="nationBuilding"
            rows={4}
            placeholder="Share your thoughts on how we can contribute to India's growth..."
            className="w-full bg-brand-cream/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-olive/20 outline-none transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">Why Svamarga?</label>
          <textarea 
            name="whySvamarga"
            rows={4}
            placeholder="Tell us why you want to join our mission..."
            className="w-full bg-brand-cream/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-olive/20 outline-none transition-all resize-none"
          />
        </div>

        <button 
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-brand-olive text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-opacity shadow-lg shadow-brand-olive/20 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  );
}
