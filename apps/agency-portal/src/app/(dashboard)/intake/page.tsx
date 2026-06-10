import { submitClientLead } from "../../actions";
import { ArrowUpRight } from "lucide-react";

export default function IntakePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-10">
      {/* Page Header matching the new scale */}
      <div 
        className="relative w-full rounded-3xl border border-gray-800 bg-black p-8 md:p-12 overflow-hidden"
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      >
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Submit a Lead</h1>
          <p className="text-lg text-gray-400 max-w-xl">
            Register a new client. SmartKode will automatically generate an AI Brief and assign it to our engineering team within minutes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Form Info */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Client Details</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We need basic contact information and a brief description of what the client is looking to build. 
            </p>
          </div>
          
          <div className="rounded-2xl border border-gray-800 bg-black p-6">
            <h3 className="text-sm font-bold text-white mb-3">What happens next?</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-700 text-xs font-bold shrink-0">1</span>
                <p className="text-xs text-gray-400 mt-1">AI Brief generated & sent to admin pool</p>
              </li>
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-700 text-xs font-bold shrink-0">2</span>
                <p className="text-xs text-gray-400 mt-1">Project approved & development begins</p>
              </li>
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-700 text-xs font-bold shrink-0 text-black bg-white">3</span>
                <p className="text-xs text-white font-bold mt-1">Commission credited on delivery</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="lg:col-span-2">
          <form action={submitClientLead} className="space-y-8">
            <div className="space-y-6 rounded-3xl border border-gray-800 bg-black p-8 md:p-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-bold text-white">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    spellCheck={false}
                    placeholder="John Doe"
                    className="w-full bg-black border-b-2 border-gray-800 px-0 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold text-white">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="john@company.com"
                    className="w-full bg-black border-b-2 border-gray-800 px-0 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-bold text-white">
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Corp"
                    className="w-full bg-black border-b-2 border-gray-800 px-0 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2 relative">
                  <label htmlFor="budget" className="block text-sm font-bold text-white">
                    Estimated Budget <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-500 font-medium select-none">$</span>
                    <input
                      id="budget"
                      name="budget"
                      type="number"
                      required
                      min="0"
                      step="100"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="5000"
                      className="w-full bg-black border-b-2 border-gray-800 pl-6 pr-0 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label htmlFor="requirements" className="block text-sm font-bold text-white">
                  Project Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  required
                  rows={4}
                  autoComplete="off"
                  placeholder="Describe what needs to be built. E.g. E-commerce platform with Stripe integration, dark mode..."
                  className="w-full bg-black border-2 border-gray-800 rounded-xl px-4 py-4 text-base text-white placeholder-gray-600 resize-none focus:outline-none focus:border-white transition-colors duration-300 mt-2"
                />
              </div>

            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-black text-sm font-bold transition-all hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Submit Lead & Generate Brief
                <ArrowUpRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
