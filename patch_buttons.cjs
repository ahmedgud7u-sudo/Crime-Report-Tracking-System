const fs = require('fs');
let code = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const newCases = `
      case 'about':
         title = 'ℹ️ About CRTS';
         content = 'CRTS waa nidaam casri ah oo lagu maareeyo warbixinnada iyo kiisaska dambiyada.\nWaxa uu fududeeyaa diiwaangelinta, baaritaanka iyo la socodka kiisaska.\nWaxaa loogu talagalay isticmaalka hay\'adaha amniga ee Puntland.';
         break;
      case 'learn_more':
         title = '📖 Learn More';
         content = 'Nidaamka CRTS (Crime Reporting & Tracking System) waxaa loogu talagalay in lagu casriyeeyo hannaanka dambiyada loo diiwaangeliyo lana socdo.\n\nWaxaad ka heli kartaa adeegyo ay ka mid yihiin:\n• Diiwaangelinta dhacdooyinka iyo dambiyada.\n• Maareynta xogta kiisaska iyo caddeymaha.\n• Isku-xirka laamaha amniga iyo shacabka.\n\nFadlan isticmaal nidaamkan si mas\'uuliyad ku jirto.';
         break;
      case 'statistics':
         title = '📊 Statistics & Insights';
         content = 'Xogta iyo Tirakoobyada Guud ee Nidaamka CRTS:\n\n• Warbixinnada Dambiyada ee la diiwaangeliyay.\n• Kiisaska baaritaankoodu socdo ama la xiray.\n• Maareynta diiwaanka tuhmanayaasha iyo caddeymaha.\n\nXogtan waa mid la socota waqtiga dhabta ah (Real-time) oo ka caawinaysa taliska go\'aan qaadashada.';
         break;
`;

code = code.replace(/      case 'about':[\s\S]*?break;/, newCases);

code = code.replace(
  /<button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-sm flex items-center gap-2  shadow-blue-500\/30 transition-all border-blue-400">/,
  '<button onClick={() => handleNavClick(\'learn_more\')} className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-sm flex items-center gap-2  shadow-blue-500/30 transition-all border-blue-400">'
);

code = code.replace(
  /<button className="px-6 py-3 rounded-full bg-\[#0d1838\]\/80 hover:bg-\[#152554\]\/80 border-\[#1e3a8a\] text-white font-bold text-sm flex items-center gap-2  transition-all">/,
  '<button onClick={() => handleNavClick(\'statistics\')} className="px-6 py-3 rounded-full bg-[#0d1838]/80 hover:bg-[#152554]/80 border-[#1e3a8a] text-white font-bold text-sm flex items-center gap-2  transition-all">'
);

fs.writeFileSync('src/components/LoginView.tsx', code);
