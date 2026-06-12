const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/5 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-center items-center gap-8">
        <a 
          href="https://www.facebook.com/tonmoypaul01" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-brand-200 transition-colors duration-300 hover:scale-110 transform"
          aria-label="Facebook"
        >
          <FacebookIcon className="w-6 h-6" />
        </a>
        <a 
          href="https://www.instagram.com/tonmoyphoto.graphy/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-brand-200 transition-colors duration-300 hover:scale-110 transform"
          aria-label="Instagram"
        >
          <InstagramIcon className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
