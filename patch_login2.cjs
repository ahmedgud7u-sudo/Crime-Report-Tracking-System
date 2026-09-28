const fs = require('fs');
let code = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const newLoginLogic = `
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering && loginType === 'citizen') {
      if (!onRegister) return;
      setIsLoggingIn(true);
      await onRegister({ name: regName, email: email, phone: regPhone });
      setIsLoggingIn(false);
      return;
    }

    if (email && password) {
      setIsLoggingIn(true);
      
      if (loginType === 'citizen') {
        const matchingUser = users.find(u => u.email === email && u.role === 'citizen');
        if (matchingUser) {
          await onLogin(matchingUser);
          setIsLoggingIn(false);
          return;
        }
      }

      let searchEmail = email;
      if (email === 'hawa.ali@crts.gov.so') searchEmail = 'farah.ali@crts.gov.so';
      if (email === 'Ahmed Abdi Jamac') {
        searchEmail = loginType === 'cid' ? 'cid@crts.gov.so' : 'citizen@crts.gov.so';
      }
      
      const matchingUser = users.find(u => u.email === searchEmail) || users[0];
      if (matchingUser) {
        await onLogin(matchingUser);
      } else {
        setError('Invalid username or password. Access denied.');
      }
      setIsLoggingIn(false);
    }
  };
`;

code = code.replace(
  /const handleSubmit = async \(e: React\.FormEvent\) => \{[\s\S]*?setIsLoggingIn\(false\);\n    \} else \{\n      setError\('Invalid username or password\. Access denied\.'\);\n    \}\n  \};/,
  newLoginLogic
);

// Now the UI for registration
const formUIReplacement = `
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 text-[11px] p-2.5 rounded-lg border-red-200 text-center font-bold">
                    {error}
                  </div>
                )}

                {isRegistering && loginType === 'citizen' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-900 ml-1">Full Name</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-1 w-9 h-9 bg-transparent flex items-center justify-center border-r ">
                          <Users className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-slate-900 font-medium"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-900 ml-1">Phone Number</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-1 w-9 h-9 bg-transparent flex items-center justify-center border-r ">
                          <Phone className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-slate-900 font-medium"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900 ml-1">Email / Username</label>
`;

code = code.replace(
  /<form onSubmit=\{handleSubmit\} className="space-y-4">\n\s*\{error && \([\s\S]*?<\/div>\n\s*\)\}\n\s*<div className="space-y-1\.5">\n\s*<label className="block text-xs font-bold text-slate-900 ml-1">Username \/ Email<\/label>/,
  formUIReplacement
);

const loginButtonLogic = `
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-[#0d47a1] hover:bg-[#1565c0] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 mt-4 text-[15px]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {isLoggingIn ? 'Authenticating...' : (isRegistering && loginType === 'citizen' ? 'Create Account' : 'Sign In')}
                  {!isLoggingIn && <ArrowRight className="w-4 h-4" />}
                </button>

                {loginType === 'citizen' && (
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(!isRegistering)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold"
                    >
                      {isRegistering ? 'Already have an account? Sign In' : 'New Citizen? Create Account'}
                    </button>
                  </div>
                )}
`;

code = code.replace(
  /<button\n\s*type="submit"\n\s*disabled=\{isLoggingIn\}[\s\S]*?<\/button>/,
  loginButtonLogic
);

fs.writeFileSync('src/components/LoginView.tsx', code);
