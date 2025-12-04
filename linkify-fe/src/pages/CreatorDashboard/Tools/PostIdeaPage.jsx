import React, { useState, useEffect } from 'react';
import { toolService } from '../../../services/toolService';

const PLATFORMS = [
    { id: 'tiktok', name: 'TikTok', icon: 'fa-brands fa-tiktok', color: 'text-black' },
    { id: 'instagram', name: 'Instagram', icon: 'fa-brands fa-instagram', color: 'text-pink-600' },
    { id: 'facebook', name: 'Facebook', icon: 'fa-brands fa-facebook', color: 'text-blue-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'fa-brands fa-linkedin', color: 'text-blue-700' },
    { id: 'twitter', name: 'X (Twitter)', icon: 'fa-brands fa-x-twitter', color: 'text-black' },
];

const TONES = [
    { id: 'funny', name: 'Funny 🤣' },
    { id: 'educational', name: 'Educational 📚' },
    { id: 'inspirational', name: 'Inspirational ✨' },
    { id: 'controversial', name: 'Controversial 🔥' },
    { id: 'professional', name: 'Professional 👔' },
];

const HOT_TOPICS = [
    "Coding Tips", "Productivity Hacks", "Day in Life", "Travel Vlog", 
    "Healthy Eating", "Small Business", "AI Tools", "Motivation"
];

export default function PostIdeaPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    // 
    const [creating, setCreating] = useState(false);

    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState(PLATFORMS[0]);
    const [tone, setTone] = useState(TONES[0]);
    
    const [hooks, setHooks] = useState([]);
    const [selectedHook, setSelectedHook] = useState(null);
    const [finalContent, setFinalContent] = useState('');

    const [log, setLog] = useState({ type: '', content: '' });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (log.content) {
            const timerId = setTimeout(() => setLog({ type: '', content: '' }), 2000);
            return () => clearTimeout(timerId);
        }
    }, [log]);
    
    const handleGenerateHooks = async () => {
        if (!topic.trim()) {
            setLog({ type: 'error', content: 'Please enter a topic!' });
            return;
        }
        
        try {
            setLoading(true);
            const { hooks }  = await toolService.generateHooks({
                topic, 
                platform: platform.name,
                tone: tone.name,
                // todo: fix thiếu target audiance
            });
            setHooks(hooks);
            setStep(2);
        } catch (err) {
            setLog({ type: 'error', content: 'Failed to generate ideas. Please try again.' });
        } finally {
            setLoading(false);
        }

    }

    const handleGenerateContent = async (hook) => {
        setSelectedHook(hook);
        try {
            setCreating(true);
            const { content } = await toolService.generateContent({
                topic,
                platform: platform.name,
                tone: tone.name,
                hookTitle: hook.titile,
                hookType: hook.type
            });
            setFinalContent(content);
            setStep(3);
        } catch (err) {
            setLog({ type: 'error', content: 'Failed to generate content.' });
        } finally {
            setCreating(false);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(finalContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const handleReset = () => {
        setStep(1);
        setHooks([]);
        setFinalContent('');
        setSelectedHook(null);
    }

    const renderLoadingScreen = () => (
        <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
            <div className="relative mb-8">
                {/* Hiệu ứng vòng tròn tỏa sáng phía sau */}
                <div className="absolute inset-0 bg-purple-300 rounded-full blur-2xl opacity-10 animate-pulse"></div>
                
                <div className="z-100">
                    <img 
                        src="/ai.png" 
                        alt="Magic AI" 
                        className="w-34 h-34 object-contain"
                    />
                </div>
                
                {/* Icon nhỏ bay bay */}
                <div className="absolute -top-6 -right-4 text-yellow-400 text-2xl animate-spin-slow">✨</div>
                <div className="absolute -bottom-6 -left-4 text-purple-500 text-xl animate-bounce">🪄</div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">Weaving your story...</h3>
            <p className="text-gray-500 text-center max-w-md">
                AI is crafting the perfect <span className="font-bold text-purple-600">{platform.name}</span> post 
                with a <span className="font-bold text-gray-700">{tone.name}</span> vibe.
            </p>
            
            {/* Loading bar */}
            <div className="w-64 h-2 bg-gray-100 rounded-full mt-8 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-loading-bar"></div>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-momo font-bold text-gray-800 mb-2">Got an idea in mind?</h1>
                <p className="text-gray-500">AI can turn it into a creative, ready-to-post caption.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
                {/* Topic Input */}
                <div>
                    <label className="block text-md font-bold text-gray-700 mb-2">Topic or Keyword</label>
                    <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="e.g., How to learn React, Summer Fashion..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    {/* Hot Topics Chips */}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {HOT_TOPICS.map(t => (
                            <button 
                                key={t}
                                onClick={() => setTopic(t)}
                                className={`text-xs px-3 py-1 rounded-full border transition ${topic === t ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Platform Select */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Platform</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {PLATFORMS.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setPlatform(p)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${platform.id === p.id ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                                <i className={`${p.icon} text-2xl mb-2 ${p.color}`}></i>
                                <span className="text-xs font-medium">{p.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tone Select */}
                <div>
                    <label className="block text-sm font-bold text-gray-700">Vibe / Tone</label>
                    <div className="flex flex-wrap gap-3">
                        {TONES.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTone(t)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${tone.id === t.id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`mb-3 -mt-2 text-center ${log.type == 'error' ? 'text-[red]' : 'text-[green]'} font-semibold`}>
                    {log.content}
                </div>

                <button 
                    onClick={handleGenerateHooks}
                    disabled={loading}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 transition disabled:opacity-70 flex justify-center items-center gap-2"
                >
                    {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                    Brainstorm Ideas
                </button>
            </div>
        </div>
    );

    // STEP 2: CHOOSE HOOK
    const renderStep2 = () => {
        if (creating) return renderLoadingScreen();

        return (
            <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => setStep(1)} className="text-gray-500 text-sm md:text-lg hover:text-black font-medium">
                        <i className="fa-solid fa-arrow-left mr-2"></i> Back
                    </button>
                    <h2 className="md:text-2xl font-momo font-bold">Choose an Angle</h2>
                    <div className="w-14"></div>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="h-50 bg-gray-200 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {hooks.map((hook, idx) => (
                            <div 
                                key={idx}
                                onClick={() => handleGenerateContent(hook)}
                                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-md cursor-pointer transition group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase">
                                    {hook.type}
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600">{hook.title}</h3>
                                <p className="text-sm text-gray-500">{hook.description}</p>
                                <div className="mt-4 text-purple-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                    Generate this post <i className="fa-solid fa-arrow-right"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="text-center mt-5">
                    <button onClick={handleGenerateHooks} className="text-gray-500 cursor-pointer hover:text-purple-600 text-sm font-medium">
                        <i className="fa-solid fa-rotate-right mr-1"></i> Not satisfied? Regenerate
                    </button>
                </div>
            </div>
        )
    };

    // STEP 3: FINAL CONTENT
    const renderStep3 = () => (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(2)} className="text-gray-500 hover:text-black font-medium">
                    <i className="fa-solid fa-arrow-left mr-2"></i> Back
                </button>
                <h2 className="md:text-2xl lg:text-3xl font-momo font-bold">Ready to Post</h2>
                <button onClick={handleReset} className="text-purple-600 font-bold">
                    Start New
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Header Preview */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.id === 'tiktok' ? 'bg-black text-white' : 'bg-white border border-gray-800'}`}>
                        <i className={`${platform.icon} text-xl ${platform.id !== 'tiktok' ? platform.color : ''}`}></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800">{selectedHook?.title}</div>
                        <div className="text-sm text-gray-500">{platform.name} • {tone.name}</div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                    {loading ? (
                        <div className="space-y-3 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-32 bg-gray-200 rounded w-full mt-4"></div>
                        </div>
                    ) : (
                        <textarea 
                            className="w-full h-[400px] p-4 bg-gray-50 rounded-xl border-none focus:ring-0 resize-none font-mono text-sm text-gray-700 leading-relaxed"
                            value={finalContent}
                            onChange={(e) => setFinalContent(e.target.value)}
                        ></textarea>
                    )}
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
                    <button 
                        onClick={handleCopy}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition duration-100
                            ${copied 
                                ? 'bg-[#be5edb] text-white hover:bg-[#cb7ce2]' 
                                : 'bg-black text-white hover:bg-gray-800'
                            }`
                        }
                    >
                        <i className={`fa-regular ${copied ? 'fa-circle-check' : 'fa-copy'}`}></i>
                        {copied ? "Copied!" : "Copy to Clipboard"}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full p-6 md:px-[60px] overflow-y-auto">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>
    );
}
