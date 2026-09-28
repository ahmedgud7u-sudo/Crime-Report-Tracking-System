const fs = require('fs');
let code = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const importStatement = "import policeBg from '../assets/images/police_station_bg_1787393259916.jpg';\nimport { User } from '../types';";
code = code.replace("import { User } from '../types';", importStatement);

const oldBg = `      style={{
        backgroundImage: 'url("/crts_background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}`;

const newBg = `      style={{
        backgroundImage: \`url(\${policeBg})\`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}`;

code = code.replace(oldBg, newBg);
fs.writeFileSync('src/components/LoginView.tsx', code);
