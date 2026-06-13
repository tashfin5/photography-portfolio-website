"use client";

import { useState, useEffect } from "react";
import { Loader2, Upload, Save } from "lucide-react";

import imageCompression from "browser-image-compression";

export default function EditAboutPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [nameSize, setNameSize] = useState("");
  const [profileText, setProfileText] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const sizeOptions = [
    { label: "Medium", value: "text-4xl lg:text-5xl xl:text-6xl" },
    { label: "Large", value: "text-6xl lg:text-7xl xl:text-8xl" },
    { label: "Extra Large", value: "text-7xl lg:text-8xl xl:text-9xl" },
    { label: "Massive", value: "text-8xl lg:text-9xl xl:text-[10rem]" }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch("/api/about", { cache: "no-store" });
    if (res.ok) {
      const about = await res.json();
      setData(about);
      setName(about.name || "Tonmoy");
      setNameSize(about.nameSize || sizeOptions[1].value);
      setProfileText(about.profileText || "");
      setAboutText(about.aboutText || "");
      setFacebookUrl(about.facebookUrl || "");
      setInstagramUrl(about.instagramUrl || "");
      setEmailAddress(about.emailAddress || "");
      setPreviewUrl(about.photoUrl || "");
    }
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadFile && uploadFile.size > 50 * 1024 * 1024) {
      alert("Image is incredibly large! Please select an image under 50MB.");
      return;
    }

    setIsSaving(true);
    
    let finalFile = uploadFile;
    if (uploadFile && uploadFile.size > 2 * 1024 * 1024) {
      try {
        const options = {
          maxSizeMB: 8, // Safely under Cloudinary 10MB limit
          maxWidthOrHeight: 3000,
          useWebWorker: true,
        };
        finalFile = await imageCompression(uploadFile, options);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("nameSize", nameSize);
    formData.append("profileText", profileText);
    formData.append("aboutText", aboutText);
    formData.append("facebookUrl", facebookUrl);
    formData.append("instagramUrl", instagramUrl);
    formData.append("emailAddress", emailAddress);
    if (finalFile) {
      formData.append("file", finalFile, finalFile.name || "image.jpg");
    }

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("About page updated successfully!");
        setUploadFile(null);
        fetchData(); // Refresh to get exact cloud URLs
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update about page");
      }
    } catch (err) {
      alert("Network error. Failed to update about page.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-brand-200" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-widest uppercase text-white mb-8">Edit About Page</h1>
      
      <form onSubmit={handleSave} className="glass p-8 rounded-2xl border border-white/10 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs text-brand-200 tracking-widest uppercase font-bold">Display Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-200 outline-none transition-colors"
                required
              />
            </div>

            {/* Name Size */}
            <div className="space-y-2">
              <label className="text-xs text-brand-200 tracking-widest uppercase font-bold">Name Text Size</label>
              <select 
                value={nameSize} 
                onChange={e => setNameSize(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-200 outline-none transition-colors appearance-none"
              >
                {sizeOptions.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-[#111] text-white">{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Profile Text */}
            <div className="space-y-2">
              <label className="text-xs text-brand-200 tracking-widest uppercase font-bold">Left Profile Description</label>
              <textarea 
                value={profileText} 
                onChange={e => setProfileText(e.target.value)}
                rows={4}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-200 outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* About Text */}
            <div className="space-y-2">
              <label className="text-xs text-brand-200 tracking-widest uppercase font-bold">Right About Me Text</label>
              <textarea 
                value={aboutText} 
                onChange={e => setAboutText(e.target.value)}
                rows={5}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-200 outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Social Links */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <label className="text-xs text-brand-200 tracking-widest uppercase font-bold">Instagram URL</label>
                <input 
                  type="url" 
                  value={instagramUrl} 
                  onChange={e => setInstagramUrl(e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-200 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-brand-200 tracking-widest uppercase font-bold">Facebook URL</label>
                <input 
                  type="url" 
                  value={facebookUrl} 
                  onChange={e => setFacebookUrl(e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-200 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-brand-200 tracking-widest uppercase font-bold">Email Address</label>
                <input 
                  type="email" 
                  value={emailAddress} 
                  onChange={e => setEmailAddress(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-200 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-xs text-brand-200 tracking-widest uppercase font-bold">Center Portrait Photo</label>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black border border-white/10 group">
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <Upload className="w-8 h-8 text-white/50 mb-2" />
                  <span className="text-sm font-bold uppercase tracking-widest text-white">Upload New</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-xs text-white/40 pt-2 text-center">Click image to upload a new portrait</p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving}
            className="flex items-center gap-2 bg-brand-200 text-dark-100 px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-300 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}
