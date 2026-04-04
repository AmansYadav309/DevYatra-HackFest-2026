import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../config/firebase';
import { collection, getDocs, doc, updateDoc, query, orderBy, setDoc } from 'firebase/firestore';

interface Submission {
    id: string;
    teamName: string;
    teamLeaderEmail: string;
    collegeName?: string;
    problemStatement: string;
    githubLink: string;
    demoLink?: string;
    pptUrl: string;
    videoUrl: string;
    submittedAt?: any;
    score?: number;
    status?: 'pending' | 'selected' | 'rejected';
    ratings?: Record<string, number>; // field key → 1-5 star rating
}

// Fields to grade, each worth 1-5 points
const GRADE_FIELDS = [
    { key: 'ppt',    label: 'PPT Presentation', icon: 'co_present',    urlKey: 'pptUrl' },
    { key: 'video',  label: 'Video Demo',        icon: 'smart_display', urlKey: 'videoUrl' },
    { key: 'github', label: 'GitHub Repo',       icon: 'code',          urlKey: 'githubLink' },
    { key: 'demo',   label: 'Live Demo',         icon: 'language',      urlKey: 'demoLink' },
];

// ==========================================================
// Star Rating Row — interactive 1-5 star rating per field
// ==========================================================
const StarRatingRow: React.FC<{
    sub: Submission;
    field: typeof GRADE_FIELDS[0];
    onRate: (fieldKey: string, rating: number) => void;
}> = ({ sub, field, onRate }) => {
    const url = (sub as any)[field.urlKey];
    const currentRating = sub.ratings?.[field.key] ?? 0;
    const [hovered, setHovered] = useState(0);

    if (!url) return null;

    return (
        <div className="p-3 rounded-xl bg-white/[0.035] border border-white/5 hover:bg-white/[0.06] transition-colors">
            {/* Link row */}
            <div className="flex items-center gap-3 mb-3 min-w-0">
                <span className="material-symbols-outlined text-primary text-xl shrink-0">{field.icon}</span>
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider">{field.label}</span>
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 hover:underline truncate"
                    >
                        {url}
                    </a>
                </div>
                {/* Current score badge */}
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg transition-all ${
                    currentRating > 0
                        ? 'bg-primary/20 text-primary shadow-[0_0_15px_rgba(253,191,31,0.2)]'
                        : 'bg-white/5 text-white/20'
                }`}>
                    {currentRating > 0 ? currentRating : '—'}
                </div>
            </div>

            {/* Star buttons */}
            <div className="flex items-center gap-1.5 pl-8">
                <span className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider mr-1">Rate</span>
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onRate(field.key, star === currentRating ? 0 : star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        title={`${star} out of 5`}
                        className="transition-all duration-100 hover:scale-110 active:scale-95"
                    >
                        <span
                            className={`material-symbols-outlined text-2xl transition-all duration-100 ${
                                star <= (hovered || currentRating)
                                    ? 'text-primary drop-shadow-[0_0_8px_rgba(253,191,31,0.8)]'
                                    : 'text-white/15'
                            }`}
                            style={{
                                fontVariationSettings: star <= (hovered || currentRating) ? "'FILL' 1" : "'FILL' 0"
                            }}
                        >
                            star
                        </span>
                    </button>
                ))}
                <span className="text-[10px] text-on-surface-variant/30 ml-1">/5</span>
            </div>
        </div>
    );
};

// ==========================================================
// Admin Dashboard
// ==========================================================
export const AdminDashboard: React.FC = () => {
    // Top-level View State
    const [activeTab, setActiveTab] = useState<'submissions' | 'accessControl'>('submissions');
    
    // Submissions State
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'selected' | 'rejected'>('all');

    // Access Control State
    const [newAuthEmail, setNewAuthEmail] = useState('');
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [accessMsg, setAccessMsg] = useState('');
    const [accessError, setAccessError] = useState('');

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(db, 'submissions'), orderBy('submittedAt', 'desc'));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(d => ({
                id: d.id,
                ...d.data(),
                score:   d.data().score   ?? 0,
                status:  d.data().status  ?? 'pending',
                ratings: d.data().ratings ?? {},
            })) as Submission[];
            setSubmissions(data);
        } catch (err) {
            console.error('Error fetching submissions:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchSubmissions(); }, []);

    const calcScore = (ratings: Record<string, number> = {}) =>
        Object.values(ratings).reduce((sum, v) => sum + v, 0);

    const handleRate = async (submissionId: string, fieldKey: string, newRating: number, currentRatings: Record<string, number>) => {
        const updatedRatings = { ...currentRatings, [fieldKey]: newRating };
        const newScore = calcScore(updatedRatings);

        setSubmissions(prev => prev.map(s =>
            s.id === submissionId ? { ...s, ratings: updatedRatings, score: newScore } : s
        ));
        try {
            await updateDoc(doc(db, 'submissions', submissionId), { ratings: updatedRatings, score: newScore });
        } catch (err) {
            console.error('Error saving rating:', err);
        }
    };

    const handleUpdateStatus = async (submissionId: string, newStatus: 'pending' | 'selected' | 'rejected') => {
        setSubmissions(prev => prev.map(s =>
            s.id === submissionId ? { ...s, status: newStatus } : s
        ));
        try {
            await updateDoc(doc(db, 'submissions', submissionId), { status: newStatus });
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const handleAddAuthEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setAccessMsg(''); setAccessError('');
        try {
            const trimmed = newAuthEmail.trim().toLowerCase();
            if(!trimmed) return;
            await setDoc(doc(db, 'authorizedEmails', trimmed), { addedAt: new Date().toISOString() });
            setAccessMsg(`Successfully authorized team leader: ${trimmed}`);
            setNewAuthEmail('');
        } catch (err) {
            console.error(err);
            setAccessError('Error authorizing email. Check console.');
        }
    };

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAccessMsg(''); setAccessError('');
        try {
            const trimmed = newAdminEmail.trim().toLowerCase();
            if(!trimmed || !newAdminPassword) return;
            await setDoc(doc(db, 'admins', trimmed), { password: newAdminPassword, addedAt: new Date().toISOString() });
            setAccessMsg(`Successfully added new Admin: ${trimmed}`);
            setNewAdminEmail('');
            setNewAdminPassword('');
        } catch (err) {
            console.error(err);
            setAccessError('Error adding Admin. Check console.');
        }
    };

    const counts = {
        all:      submissions.length,
        pending:  submissions.filter(s => s.status === 'pending').length,
        selected: submissions.filter(s => s.status === 'selected').length,
        rejected: submissions.filter(s => s.status === 'rejected').length,
    };

    const filtered = filter === 'all' ? submissions : submissions.filter(s => s.status === filter);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined animate-spin text-5xl text-primary">progress_activity</span>
                    <span className="text-on-surface-variant text-sm font-medium">Loading submissions...</span>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-screen-xl mx-auto pt-24 pb-20 px-4 md:px-8 z-10 relative"
        >
            {/* Header & Main Nav Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-red-400 text-sm">admin_panel_settings</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Admin Only</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tight mb-4">
                        Admin <span className="text-gradient">Dashboard</span>
                    </h2>
                    {/* View Switcher */}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => { setActiveTab('submissions'); setAccessMsg(''); setAccessError(''); }}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'submissions' ? 'bg-primary text-black shadow-[0_0_15px_rgba(253,191,31,0.3)]' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'}`}
                        >
                            <span className="material-symbols-outlined text-sm">view_list</span>
                            Submissions
                        </button>
                        <button 
                            onClick={() => { setActiveTab('accessControl'); setAccessMsg(''); setAccessError(''); }}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'accessControl' ? 'bg-primary text-black shadow-[0_0_15px_rgba(253,191,31,0.3)]' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'}`}
                        >
                            <span className="material-symbols-outlined text-sm">shield_person</span>
                            Access Control
                        </button>
                    </div>
                </div>
                {activeTab === 'submissions' && (
                    <button
                        onClick={fetchSubmissions}
                        className="flex items-center gap-2 text-sm font-bold text-on-surface-variant bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/10"
                    >
                        <span className="material-symbols-outlined text-sm">refresh</span> Refresh
                    </button>
                )}
            </div>

            {/* TAB: Access Control */}
            {activeTab === 'accessControl' && (
                <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
                    <div className="mb-6">
                        <h3 className="text-2xl font-black mb-2">Access Management</h3>
                        <p className="text-on-surface-variant text-sm">Add database-backed authorization for new team leaders or secondary admins. Changes reflect instantly.</p>
                    </div>

                    {(accessMsg || accessError) && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 font-medium text-sm border ${accessError ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                            <span className="material-symbols-outlined shrink-0">{accessError ? 'error' : 'check_circle'}</span>
                            {accessError || accessMsg}
                        </div>
                    )}

                    {/* Add Authorized Email */}
                    <div className="glass-card rounded-[1.75rem] p-6 lg:p-8 border border-white/10 backdrop-blur-md">
                        <h4 className="text-lg font-bold text-primary mb-1 flex items-center gap-2">
                            <span className="material-symbols-outlined">how_to_reg</span>
                            Authorize Team Leader
                        </h4>
                        <p className="text-on-surface-variant text-sm mb-6">If a student entered their email wrong during registration, authorize their new email here.</p>
                        
                        <form onSubmit={handleAddAuthEmail} className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Student's Email Address"
                                value={newAuthEmail}
                                onChange={e => setNewAuthEmail(e.target.value)}
                                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 text-sm"
                                required
                            />
                            <button 
                                type="submit"
                                className="bg-primary hover:bg-primary/90 text-black px-6 py-4 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(253,191,31,0.2)] whitespace-nowrap"
                            >
                                Authorize Email
                            </button>
                        </form>
                    </div>

                    {/* Add New Admin */}
                    <div className="glass-card rounded-[1.75rem] p-6 lg:p-8 border border-red-500/20 bg-[#2a0e13]/40 backdrop-blur-md">
                        <h4 className="text-lg font-bold text-red-400 mb-1 flex items-center gap-2">
                            <span className="material-symbols-outlined">admin_panel_settings</span>
                            Create Sub-Admin
                        </h4>
                        <p className="text-on-surface-variant text-sm mb-6">Grant another user access to this Admin Dashboard to grade projects.</p>
                        
                        <form onSubmit={handleAddAdmin} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-red-400/70 mb-2 ml-1">Admin Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="Add email address"
                                        value={newAdminEmail}
                                        onChange={e => setNewAdminEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-400/50 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-red-400/70 mb-2 ml-1">Set Password</label>
                                    <input 
                                        type="text" 
                                        placeholder="Set password"
                                        value={newAdminPassword}
                                        onChange={e => setNewAdminPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-400/50 text-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] mt-2 sm:w-auto self-start sm:self-end"
                            >
                                Create Admin Access
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TAB: Submissions */}
            {activeTab === 'submissions' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {([
                            { key: 'all',      label: 'Total',    color: 'text-white',      bg: 'bg-white/5',       border: 'border-white/10' },
                            { key: 'pending',  label: 'Pending',  color: 'text-yellow-400', bg: 'bg-yellow-500/5',  border: 'border-yellow-500/20' },
                            { key: 'selected', label: 'Selected', color: 'text-green-400',  bg: 'bg-green-500/5',   border: 'border-green-500/20' },
                            { key: 'rejected', label: 'Rejected', color: 'text-red-400',    bg: 'bg-red-500/5',     border: 'border-red-500/20' },
                        ] as const).map(({ key, label, color, bg, border }) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`${bg} border ${border} rounded-2xl p-4 text-left transition-all hover:scale-[1.02] ${filter === key ? 'ring-1 ring-inset ring-white/20 shadow-lg' : ''}`}
                            >
                                <div className={`text-3xl font-black ${color}`}>{counts[key]}</div>
                                <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1">{label}</div>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((sub, i) => (
                                <motion.div
                                    key={sub.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.04 }}
                                    className={`glass-card rounded-[1.75rem] p-6 lg:p-8 flex flex-col relative overflow-hidden transition-colors duration-500
                                        ${sub.status === 'selected' ? 'border-green-500/40 shadow-[0_0_50px_rgba(34,197,94,0.07)]' : ''}
                                        ${sub.status === 'rejected' ? 'border-red-500/20 opacity-60' : ''}
                                        ${sub.status === 'pending'  ? 'border-white/10' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-5 pb-5 border-b border-white/5">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-black text-white mb-1 truncate">{sub.teamName}</h3>
                                            <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mb-0.5">
                                                <span className="material-symbols-outlined text-xs opacity-40">mail</span> {sub.teamLeaderEmail}
                                            </p>
                                            <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-xs opacity-40">school</span> {sub.collegeName || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end shrink-0 ml-4">
                                            <div className="text-4xl font-black text-primary leading-none drop-shadow-[0_0_15px_rgba(253,191,31,0.5)]">
                                                {sub.score ?? 0}
                                            </div>
                                            <div className="text-[9px] uppercase tracking-widest text-primary/40 font-black mt-1">/ 20 pts</div>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <div className="text-[9px] uppercase tracking-widest text-on-surface-variant/40 mb-1.5">Problem Statement</div>
                                        <div className="bg-primary/5 border border-primary/15 text-primary/90 px-4 py-2.5 rounded-xl text-xs font-bold line-clamp-2">
                                            {sub.problemStatement}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2.5 mb-6 flex-grow">
                                        <div className="text-[9px] uppercase tracking-widest text-on-surface-variant/40 mb-1 flex items-center justify-between">
                                            <span>Grade each deliverable (1–5 ★)</span>
                                            <span className="text-primary font-black">{sub.score ?? 0} / 20 pts</span>
                                        </div>
                                        {GRADE_FIELDS.map(field => (
                                            <StarRatingRow
                                                key={field.key}
                                                sub={sub}
                                                field={field}
                                                onRate={(fKey, rating) => handleRate(sub.id, fKey, rating, sub.ratings || {})}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex gap-3 pt-4 border-t border-white/5">
                                        <button
                                            onClick={() => handleUpdateStatus(sub.id, sub.status === 'selected' ? 'pending' : 'selected')}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                                                sub.status === 'selected'
                                                    ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                                                    : 'bg-white/5 text-green-400 border border-green-500/20 hover:bg-green-500/15 hover:border-green-500/40'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                {sub.status === 'selected' ? 'check_circle' : 'radio_button_unchecked'}
                                            </span>
                                            {sub.status === 'selected' ? '✓ Selected' : 'Select'}
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(sub.id, sub.status === 'rejected' ? 'pending' : 'rejected')}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                                                sub.status === 'rejected'
                                                    ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                                    : 'bg-white/5 text-red-400 border border-red-500/20 hover:bg-red-500/15 hover:border-red-500/40'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                {sub.status === 'rejected' ? 'cancel' : 'block'}
                                            </span>
                                            {sub.status === 'rejected' ? '✗ Rejected' : 'Reject'}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filtered.length === 0 && (
                            <div className="col-span-2 text-center py-24 text-on-surface-variant/40">
                                <span className="material-symbols-outlined text-5xl block mb-3">inbox</span>
                                <p className="font-medium">No submissions{filter !== 'all' ? ` with status "${filter}"` : ''} yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    );
};
