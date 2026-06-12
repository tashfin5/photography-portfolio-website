"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Mail, Globe } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent default and reset to simulate successful submission
    setTimeout(() => {
      setFormState({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    }, 500);
  };

  return (
    <section id="contact" className="py-32 bg-dark-100 relative overflow-hidden">
      {/* Animated Light Gradients Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-400/20 via-brand-500/5 to-transparent blur-[100px] pointer-events-none" 
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left: Heading & Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Let's Create <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-brand-400">
                  Something Extraordinary
                </span>
              </h2>
              <p className="text-xl text-white/60 font-light max-w-md mb-12">
                Available for commercial projects, editorial assignments, and creative direction worldwide.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <p className="text-sm tracking-widest text-white/40 uppercase mb-2">Email</p>
                <a href="mailto:hello@example.com" className="text-2xl hover:text-brand-200 transition-colors hover-target">
                  hello@example.com
                </a>
              </div>
              <div>
                <p className="text-sm tracking-widest text-white/40 uppercase mb-2">Socials</p>
                <div className="flex gap-6">
                  <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-200 hover:text-brand-200 transition-all hover-target group">
                    <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-200 hover:text-brand-200 transition-all hover-target group">
                    <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-200 hover:text-brand-200 transition-all hover-target group">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="glass-dark p-8 md:p-12 rounded-3xl flex flex-col gap-8 border border-white/10">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm tracking-widest text-white/50 uppercase ml-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-4 text-white focus:outline-none focus:border-brand-200 transition-colors hover-target"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm tracking-widest text-white/50 uppercase ml-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-4 text-white focus:outline-none focus:border-brand-200 transition-colors hover-target"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm tracking-widest text-white/50 uppercase ml-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-4 text-white focus:outline-none focus:border-brand-200 transition-colors resize-none hover-target"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => setIsHoveringSubmit(true)}
                onMouseLeave={() => setIsHoveringSubmit(false)}
                className="mt-4 group relative w-full overflow-hidden rounded-full bg-white text-dark-100 py-5 font-bold uppercase tracking-widest hover-target"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-brand-200 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
