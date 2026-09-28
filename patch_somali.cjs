const fs = require('fs');
let code = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const oldLogic = `            {/* Huge Headline */}
            <h2 className="text-3xl md:text-4xl xl:text-[56px] font-black text-white leading-[1.1] tracking-tight">
              Smarter Reporting.<br />
              <span className="text-[#3b82f6]">Faster Response.</span><br />
              Safer Community.
            </h2>

            {/* Description */}
            <div className="w-12 h-1 bg-yellow-500 mt-1"></div>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl font-medium mt-1">
              A modern and secure system built for law enforcement to report, track and manage criminal cases efficiently.<br/>
              Together for a safer and stronger <span className="text-[#3b82f6] font-bold">Puntland</span>.
            </p>`;

const newLogic = `            {/* Huge Headline */}
            <h2 className="text-3xl md:text-4xl xl:text-[56px] font-black text-white leading-[1.1] tracking-tight">
              Diiwaangelin Hufan.<br />
              <span className="text-[#3b82f6]">Jawaab Degdeg ah.</span><br />
              Bulsho Ammaan ah.
            </h2>

            {/* Description */}
            <div className="w-12 h-1 bg-yellow-500 mt-1"></div>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl font-medium mt-1">
              Waa nidaam casri ah oo sugan kaas oo loo sameeyay laamaha amniga si ay u diiwaangeliyaan, ula socdaan, una maareeyaan kiisaska dambiyada si hufan.<br/>
              Wadajir aan ku dhisno <span className="text-[#3b82f6] font-bold">Puntland</span> ammaan ah oo xooggan.
            </p>`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/LoginView.tsx', code);
