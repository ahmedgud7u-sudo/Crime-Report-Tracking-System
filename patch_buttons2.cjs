const fs = require('fs');
let code = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const newCases = `
      case 'about':
         title = 'ℹ️ About CRTS';
         content = \`CRTS waa nidaam casri ah oo lagu maareeyo warbixinnada iyo kiisaska dambiyada.
Waxa uu fududeeyaa diiwaangelinta, baaritaanka iyo la socodka kiisaska.
Waxaa loogu talagalay isticmaalka hay'adaha amniga ee Puntland.\`;
         break;
      case 'learn_more':
         title = '📖 Learn More';
         content = \`Nidaamka CRTS (Crime Reporting & Tracking System) waxaa loogu talagalay in lagu casriyeeyo hannaanka dambiyada loo diiwaangeliyo lana socdo.

Waxaad ka heli kartaa adeegyo ay ka mid yihiin:
• Diiwaangelinta dhacdooyinka iyo dambiyada.
• Maareynta xogta kiisaska iyo caddeymaha.
• Isku-xirka laamaha amniga iyo shacabka.

Fadlan isticmaal nidaamkan si mas'uuliyad ku jirto.\`;
         break;
      case 'statistics':
         title = '📊 Statistics & Insights';
         content = \`Xogta iyo Tirakoobyada Guud ee Nidaamka CRTS:

• Warbixinnada Dambiyada ee la diiwaangeliyay.
• Kiisaska baaritaankoodu socdo ama la xiray.
• Maareynta diiwaanka tuhmanayaasha iyo caddeymaha.

Xogtan waa mid la socota waqtiga dhabta ah (Real-time) oo ka caawinaysa taliska go'aan qaadashada.\`;
         break;
`;

code = code.replace(/      case 'about':[\s\S]*?break;/, newCases);

fs.writeFileSync('src/components/LoginView.tsx', code);
