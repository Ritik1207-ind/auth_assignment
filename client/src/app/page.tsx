"use client"
import Link from 'next/link';
import { ShieldCheck, Lock, Zap, Code, ArrowRight, CheckCircle, Fingerprint } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

// --- Components ---

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const router = useRouter()

    try {
      // 1. Call Backend API
      const res = await fetch('http://localhost:5000/api/auth/logout');

      router.push('/login');
      
    } catch (err: any) {
      // setError(err.message);
    } finally {
      // setIsLoading(false);
    }
  };

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Fingerprint className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">AuthFlow</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</Link>
          <Link href="#docs" className="text-gray-600 hover:text-indigo-600 transition">Documentation</Link>
          <div className="flex items-center space-x-4 ml-4">
            <Link href="/login">
              
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-indigo-50/50 to-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium text-sm mb-8 animate-fade-in-up">
        <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
        v1.0 is now live
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
        Authentication for <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
          Modern Developers
        </span>
      </h1>
      <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
        Secure, scalable, and easy-to-integrate authentication built on the MERN stack. 
        Add JWT auth, OAuth, and user management to your app in minutes.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/register">
          <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/20 flex items-center justify-center">
            Start Integrating <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </Link>
        <Link href="https://github.com/your-repo">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition flex items-center justify-center">
            <Code className="mr-2 h-5 w-5" /> View on GitHub
          </button>
        </Link>
      </div>
      
      {/* Code Snippet Preview */}
      <div className="mt-16 mx-auto max-w-4xl bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-2 overflow-hidden transform rotate-1 hover:rotate-0 transition duration-500">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-t-lg">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs text-gray-400 font-mono">auth-middleware.ts</span>
        </div>
        <div className="p-6 overflow-x-auto text-left">
          <pre className="text-sm font-mono text-gray-300">
            <code>
              <span className="text-purple-400">const</span> <span className="text-blue-400">authMiddleware</span> = (<span className="text-orange-400">req, res, next</span>) ={'>'} {'{'}
              {'\n'}  <span className="text-purple-400">const</span> token = req.headers.authorization?.<span className="text-blue-400">split</span>(<span className="text-green-400">' '</span>)[1];
              {'\n'}  <span className="text-purple-400">if</span> (!token) <span className="text-purple-400">return</span> res.<span className="text-blue-400">status</span>(401);
              {'\n'}
              {'\n'}  <span className="text-gray-500">// Verify JWT securely</span>
              {'\n'}  <span className="text-purple-400">try</span> {'{'}
              {'\n'}    <span className="text-purple-400">const</span> decoded = jwt.<span className="text-blue-400">verify</span>(token, process.env.JWT_SECRET);
              {'\n'}    req.user = decoded;
              {'\n'}    <span className="text-blue-400">next</span>();
              {'\n'}  {'}'} <span className="text-purple-400">catch</span> (err) {'{'}
              {'\n'}    res.<span className="text-blue-400">status</span>(403).<span className="text-blue-400">json</span>({'{'} error: <span className="text-green-400">'Invalid token'</span> {'}'});
              {'\n'}  {'}'}
              {'\n'}{'}'};
            </code>
          </pre>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-white" />,
      title: "Bank-Grade Security",
      desc: "Password hashing with bcrypt, HTTP-only cookies, and CSRF protection out of the box.",
      color: "bg-blue-500"
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Lightning Fast",
      desc: "Optimized MERN backend ensuring sub-100ms response times for authentication requests.",
      color: "bg-amber-500"
    },
    {
      icon: <Lock className="h-6 w-6 text-white" />,
      title: "JWT Strategy",
      desc: "Stateless authentication using JSON Web Tokens. Perfect for scalable microservices.",
      color: "bg-emerald-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need for Auth</h2>
          <p className="mt-4 text-lg text-gray-600">Don't reinvent the wheel. We handle the complexity so you can build your product.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition duration-300">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 py-12 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Fingerprint className="h-6 w-6 text-indigo-400" />
          <span className="ml-2 text-lg font-bold text-white">AuthFlow</span>
        </div>
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Contact Support</a>
        </div>
        <div className="mt-4 md:mt-0 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AuthFlow. Built with MERN + Next.js.
        </div>
      </div>
    </div>
  </footer>
);
const page = () => {
  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}

export default page
