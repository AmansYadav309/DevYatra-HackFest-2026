import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopNavBar } from '../components/TopNavBar';
import { Footer } from '../components/Footer';
import { GravityStarsBackground } from '../components/ui/GravityStarsBackground';
import { AUTHORIZED_EMAILS } from '../data/authorizedEmails';
import { PROBLEM_STATEMENTS } from '../data/problemStatements';
import { uploadToCloudinary } from '../utils/cloudinary';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { AdminDashboard } from '../components/AdminDashboard'; // We'll import the new Admin Dashboard

export const ProjectSubmissionPage: React.FC = () => {
    // Auth State
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [authError, setAuthError] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close custom dropdown on outside click
    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    // Form State
    const [teamName, setTeamName] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [problemStatement, setProblemStatement] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [demoLink, setDemoLink] = useState('');
    const [pptFile, setPptFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    // Flow State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formError, setFormError] = useState('');

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedEmail = emailInput.trim().toLowerCase();

        if (trimmedEmail === 'amansyadav309@gmail.com') {
            setShowPasswordPrompt(true);
            setAuthError('');
            return;
        }

        // Check if dynamic admin
        try {
            const adminDocRef = doc(db, 'admins', trimmedEmail);
            const adminDoc = await getDoc(adminDocRef);
            if (adminDoc.exists()) {
                setShowPasswordPrompt(true);
                setAuthError('');
                return;
            }
        } catch (error) {
            console.error('Error checking admin:', error);
        }

        if (AUTHORIZED_EMAILS.includes(trimmedEmail)) {
            setIsVerified(true);
            setAuthError('');
            return;
        }

        // Check dynamic authorized emails
        try {
            const emailDocRef = doc(db, 'authorizedEmails', trimmedEmail);
            const emailDoc = await getDoc(emailDocRef);
            if (emailDoc.exists()) {
                setIsVerified(true);
                setAuthError('');
                return;
            }
        } catch (error) {
            console.error('Error checking authorized email:', error);
        }

        setAuthError('NOT_FOUND');
    };

    const handleVerifyAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedEmail = emailInput.trim().toLowerCase();

        if (trimmedEmail === 'amansyadav309@gmail.com' && passwordInput === 'Arpita@309') {
            setIsAdminMode(true);
            setIsVerified(true); // Treat admin as verified to clear auth screen
            return;
        }

        // Check dynamic admin password
        try {
            const adminDocRef = doc(db, 'admins', trimmedEmail);
            const adminDoc = await getDoc(adminDocRef);
            if (adminDoc.exists() && adminDoc.data().password === passwordInput) {
                setIsAdminMode(true);
                setIsVerified(true);
                return;
            }
        } catch (error) {
            console.error('Error checking dynamic admin:', error);
        }

        setAuthError('Incorrect admin password.');
    };

    const handlePptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPptFile(e.target.files[0]);
            setFormError('');
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const maxSizeInBytes = 200 * 1024 * 1024; // 200 MB

            if (file.size > maxSizeInBytes) {
                setFormError('Video file exceeds the 200MB limit. Please compress or upload a smaller video.');
                setVideoFile(null); // Reject the file visually and in state
                // Reset the input value
                e.target.value = '';
            } else {
                setVideoFile(file);
                setFormError('');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');

        if (!teamName || !collegeName || !problemStatement || !githubLink || !pptFile || !videoFile) {
            setFormError('Please fill all mandatory fields and upload both files.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Upload files to Cloudinary
            const pptUrl = await uploadToCloudinary(pptFile);
            const videoUrl = await uploadToCloudinary(videoFile);

            // Save to Firestore
            await addDoc(collection(db, 'submissions'), {
                teamName,
                collegeName,
                teamLeaderEmail: emailInput.trim().toLowerCase(),
                problemStatement,
                githubLink,
                demoLink: demoLink || null,
                pptUrl,
                videoUrl,
                submittedAt: serverTimestamp(),
                score: 0,
                status: 'pending',
                checkedFields: {}
            });

            setIsSuccess(true);
        } catch (error: any) {
            console.error('Submission error:', error);
            setFormError(error.message || 'An error occurred during submission. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="dark min-h-[120vh] text-on-surface bg-[#020617] flex flex-col relative overflow-hidden font-body">
            <TopNavBar />

            <GravityStarsBackground
                starColor="#fdbf1f"
                count={250}
                className="absolute inset-0 z-0 opacity-80"
            />

            {/* Atmospheric Background Elements Matching Hero */}
            <motion.div
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ opacity: 0.8, scale: 1.3 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/40 rounded-full blur-[100px] z-0 pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0.1, scale: 1 }}
                animate={{ opacity: 0.7, scale: 1.5 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] z-0 pointer-events-none"
            />

            {isAdminMode ? (
                <AdminDashboard />
            ) : (
                <main className="flex-1 flex flex-col items-center justify-start relative z-10 pt-32 pb-16 px-4 sm:px-6 w-full">

                    {!isVerified && !isSuccess && (
                        <div className="text-center mb-10 w-full max-w-3xl">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-primary/40 mb-6 shadow-[0_0_30px_rgba(253,191,31,0.2)]"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_20px_#fdbf1f]"></span>
                                <span className="text-xs font-label font-bold tracking-[0.2em] text-primary uppercase">Project Submission Portal</span>
                            </motion.div>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-tight"
                            >
                                Submit Your <span className="text-gradient">Project</span>
                            </motion.h1>
                        </div>
                    )}

                    <div className="w-full max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="glass-card p-10 rounded-[2rem] text-center border-primary/40 shadow-[0_0_50px_rgba(253,191,31,0.2)] bg-black/40 backdrop-blur-xl mt-10 w-full max-w-2xl mx-auto"
                                >
                                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 text-primary material-symbols-outlined text-5xl shadow-[0_0_30px_rgba(253,191,31,0.5)]">
                                        check_circle
                                    </div>
                                    <h2 className="text-4xl font-black mb-4">Submission Successful!</h2>
                                    <p className="text-on-surface-variant font-medium text-lg mb-10 max-w-md mx-auto">
                                        Your project has been securely stored. Our judges will review it shortly. Best of luck!
                                    </p>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="bg-gradient-to-r from-primary to-primary-container text-black px-10 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(253,191,31,0.4)] hover:scale-105 active:scale-95 transition-all text-lg"
                                    >
                                        Return to Home
                                    </button>
                                </motion.div>

                            ) : !isVerified ? (

                                <motion.div
                                    key="auth"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-card p-8 md:p-12 rounded-[2rem] border-primary/20 bg-black/40 backdrop-blur-2xl w-full max-w-md mx-auto"
                                >
                                    <h2 className="text-2xl font-bold mb-2">Authentication required</h2>
                                    <p className="text-on-surface-variant text-sm mb-8">
                                        Only registered team leaders can access the submission form.
                                    </p>

                                    {!showPasswordPrompt ? (
                                        <form onSubmit={handleVerifyEmail} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-bold text-on-surface-variant mb-2">Team Leader Email</label>
                                                <input
                                                    type="email"
                                                    value={emailInput}
                                                    onChange={(e) => setEmailInput(e.target.value)}
                                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/70 transition-all font-medium placeholder:text-white/20"
                                                    placeholder="Enter registered email..."
                                                    required
                                                />
                                            </div>
                                            {authError && authError !== 'NOT_FOUND' && (
                                                <p className="text-red-400 text-sm">{authError}</p>
                                            )}
                                            {authError === 'NOT_FOUND' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-red-500/10 border border-red-500/25 rounded-xl p-4"
                                                >
                                                    <p className="text-red-400 font-bold text-sm mb-1 flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-sm">error</span>
                                                        Email not recognized
                                                    </p>
                                                    <p className="text-on-surface-variant text-xs leading-relaxed mb-2">
                                                        This email was not found in the registered team leaders list. Please make sure you're using the exact email used during registration.
                                                    </p>
                                                    <p className="text-xs text-on-surface-variant">
                                                        Having trouble?{' '}
                                                        <a href="/#contact" className="text-primary font-bold hover:underline">
                                                            Contact the organizer (Aman Yadav)
                                                        </a>{' '}for assistance.
                                                    </p>
                                                </motion.div>
                                            )}
                                            <button
                                                type="submit"
                                                className="w-full bg-primary text-black py-4 rounded-xl font-black text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(253,191,31,0.3)] hover:shadow-[0_0_30px_rgba(253,191,31,0.6)]"
                                            >
                                                Verify & Continue
                                            </button>
                                        </form>
                                    ) : (
                                        <motion.form
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            onSubmit={handleVerifyAdmin} className="space-y-6"
                                        >
                                            <div className="flex items-center gap-2 mb-4 bg-primary/10 text-primary px-4 py-2 rounded-lg border border-primary/20">
                                                <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                                                <span className="text-sm font-bold">Admin Login Detected</span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-on-surface-variant mb-2">Admin Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordInput}
                                                    onChange={(e) => setPasswordInput(e.target.value)}
                                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/70 transition-all font-medium"
                                                    placeholder="Enter admin password..."
                                                    required
                                                />
                                            </div>
                                            {authError && <p className="text-red-400 text-sm">{authError}</p>}
                                            <button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-xl font-black text-lg hover:opacity-90 transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                                            >
                                                Unlock Dashboard
                                            </button>
                                        </motion.form>
                                    )}
                                </motion.div>

                            ) : (

                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full"
                                >
                                    {/* Header after logging in */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-6 gap-4">
                                        <div>
                                            <h2 className="text-3xl font-black mb-1">Final Submission</h2>
                                            <p className="text-on-surface-variant text-sm flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                Verified as: <b className="text-white">{emailInput}</b>
                                            </p>
                                        </div>
                                        <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg text-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">schedule</span> Due 5th April
                                        </div>
                                    </div>

                                    {formError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl mb-8 flex items-start gap-3 backdrop-blur-md"
                                        >
                                            <span className="material-symbols-outlined shrink-0 mt-0.5">error</span>
                                            <div className="text-sm font-medium leading-relaxed">{formError}</div>
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-8">

                                        {/* SECTION: Team Details */}
                                        <div className="glass-card rounded-2xl border-white/5 bg-black/30 p-6 md:p-8 backdrop-blur-xl relative z-20">
                                            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                                                <span className="material-symbols-outlined">group</span> 1. Team Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">Team Name *</label>
                                                    <input
                                                        type="text"
                                                        value={teamName}
                                                        onChange={(e) => setTeamName(e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm"
                                                        placeholder="e.g. Code Ninjas"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">College Name *</label>
                                                    <input
                                                        type="text"
                                                        value={collegeName}
                                                        onChange={(e) => setCollegeName(e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm"
                                                        placeholder="e.g. KDK College of Engineering"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">Problem Statement *</label>
                                                    {/* Custom dark dropdown - native <select> options can't be styled across browsers */}
                                                    <div ref={dropdownRef} className="relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => setDropdownOpen(o => !o)}
                                                            className={`w-full bg-black/40 border rounded-xl px-4 py-3.5 text-left transition-all text-sm flex items-center justify-between ${
                                                                dropdownOpen ? 'border-primary/50 bg-primary/5 ring-1 ring-primary/30' : 'border-white/10 hover:border-white/25'
                                                            } ${!problemStatement ? 'text-white/30' : 'text-white'}`}
                                                        >
                                                            <span className="truncate pr-2">{problemStatement || 'Select your chosen problem statement...'}</span>
                                                            <span className={`material-symbols-outlined text-xl shrink-0 text-white/40 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-primary' : ''}`}>
                                                                expand_more
                                                            </span>
                                                        </button>
                                                        <AnimatePresence>
                                                            {dropdownOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                                                                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                                                    exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                                                                    transition={{ duration: 0.15 }}
                                                                    style={{ transformOrigin: 'top' }}
                                                                    className="absolute z-50 w-full mt-2 bg-[#0d1526] border border-white/15 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                                                                >
                                                                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                                                        {PROBLEM_STATEMENTS.map(ps => (
                                                                            <button
                                                                                key={ps.id}
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setProblemStatement(`${ps.id} - ${ps.title}`);
                                                                                    setDropdownOpen(false);
                                                                                }}
                                                                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-start gap-3 border-b border-white/5 last:border-b-0 ${
                                                                                    problemStatement === `${ps.id} - ${ps.title}`
                                                                                        ? 'bg-primary/15 text-primary'
                                                                                        : 'text-white/80 hover:bg-white/[0.06] hover:text-white'
                                                                                }`}
                                                                            >
                                                                                <span className="font-black text-primary/70 shrink-0 w-12 text-xs mt-0.5">{ps.id}</span>
                                                                                <span className="leading-snug">{ps.title}</span>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                        {/* Hidden for native form validation */}
                                                        <input type="hidden" value={problemStatement} required />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* SECTION: Links */}
                                        <div className="glass-card rounded-2xl border-white/5 bg-black/30 p-6 md:p-8 backdrop-blur-xl">
                                            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                                                <span className="material-symbols-outlined">link</span> 2. Project Links
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1 flex justify-between">
                                                        <span>GitHub Repository *</span>
                                                    </label>
                                                    <div className="relative">
                                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">code</span>
                                                        <input
                                                            type="url"
                                                            value={githubLink}
                                                            onChange={(e) => setGithubLink(e.target.value)}
                                                            placeholder="https://github.com/your-repo"
                                                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1 flex justify-between">
                                                        <span>Live Demo URL <span className="opacity-50 lowercase tracking-normal font-medium">(optional)</span></span>
                                                    </label>
                                                    <div className="relative">
                                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">public</span>
                                                        <input
                                                            type="url"
                                                            value={demoLink}
                                                            onChange={(e) => setDemoLink(e.target.value)}
                                                            placeholder="https://your-demo-link.vercel.app"
                                                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SECTION: Uploads */}
                                        <div className="glass-card rounded-2xl border-white/5 bg-black/30 p-6 md:p-8 backdrop-blur-xl">
                                            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                                                <span className="material-symbols-outlined">cloud_upload</span> 3. File Uploads
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                                {/* PPT Upload */}
                                                <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-primary/40 hover:bg-primary/5 transition-all group text-center">
                                                    <input
                                                        type="file"
                                                        accept=".ppt,.pptx,.pdf"
                                                        onChange={handlePptChange}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        required
                                                    />
                                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                                        <span className={`material-symbols-outlined text-4xl mb-3 transition-colors ${pptFile ? 'text-primary' : 'text-white/20 group-hover:text-primary/60'}`}>
                                                            {pptFile ? 'task' : 'draft'}
                                                        </span>
                                                        <span className="text-sm font-bold text-white mb-1">
                                                            {pptFile ? pptFile.name : 'Upload Presentation'}
                                                        </span>
                                                        <span className="text-xs text-on-surface-variant font-medium max-w-xs">
                                                            {pptFile ? `${(pptFile.size / 1024 / 1024).toFixed(2)} MB` : 'Drag & drop or click to browse'}
                                                        </span>
                                                        {!pptFile && <span className="text-[10px] uppercase font-bold text-primary/50 mt-4 tracking-widest bg-primary/10 px-3 py-1 rounded-full">Required • PPT/PDF</span>}
                                                    </div>
                                                </div>

                                                {/* Video Upload */}
                                                <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-primary/40 hover:bg-primary/5 transition-all group text-center">
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={handleVideoChange}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        required
                                                    />
                                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                                        <span className={`material-symbols-outlined text-4xl mb-3 transition-colors ${videoFile ? 'text-primary' : 'text-white/20 group-hover:text-primary/60'}`}>
                                                            {videoFile ? 'movie' : 'video_file'}
                                                        </span>
                                                        <span className="text-sm font-bold text-white mb-1">
                                                            {videoFile ? videoFile.name : 'Upload Video Demo'}
                                                        </span>
                                                        <span className={`text-xs font-medium max-w-xs ${videoFile && videoFile.size > 200 * 1024 * 1024 ? 'text-red-400 font-bold' : 'text-on-surface-variant'}`}>
                                                            {videoFile ? `${(videoFile.size / 1024 / 1024).toFixed(2)} MB` : 'Drag & drop or click to browse'}
                                                        </span>
                                                        {!videoFile && <span className="text-[10px] uppercase font-bold text-primary/50 mt-4 tracking-widest bg-primary/10 px-3 py-1 rounded-full">Required • Max 200MB</span>}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="pt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full md:w-auto px-12 relative overflow-hidden group bg-gradient-to-br from-primary to-primary-container text-black py-4.5 rounded-xl font-black text-lg transition-all duration-300 shadow-[0_0_20px_rgba(253,191,31,0.3)] hover:shadow-[0_0_40px_rgba(253,191,31,0.6)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-3">
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="animate-spin material-symbols-outlined font-black">progress_activity</span>
                                                            Uploading securely...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="material-symbols-outlined font-black">cloud_upload</span> Final Submit
                                                        </>
                                                    )}
                                                </span>
                                                {!isSubmitting && <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 rounded-xl" />}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            )}

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};
