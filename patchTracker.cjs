const fs = require('fs');
let code = fs.readFileSync('src/components/PublicTrackerView.tsx', 'utf8');

code = code.replace(/import \{ Search, ShieldAlert, CheckCircle2, Clock, MapPin, Building2, AlertCircle \} from 'lucide-react';/, "import { Search, ShieldAlert, CheckCircle2, Clock, MapPin, Building2, AlertCircle, X } from 'lucide-react';");

code = code.replace(/const \[hasSearched, setHasSearched\] = useState\(false\);/, "const [hasSearched, setHasSearched] = useState(false);\n  const [previewImage, setPreviewImage] = useState<string | null>(null);");

code = code.replace(/const matchedCase = cases\.find\(c => c\.case_number\.toUpperCase\(\) === cleanNum \|\| c\.id === cleanNum\);/, `const matchedCase = cases.find(c => c.case_number.toUpperCase() === cleanNum || c.id === cleanNum || c.title.toUpperCase().includes(cleanNum));`);

code = code.replace(/const matchedReport = reports\.find\(r => r\.report_number\.toUpperCase\(\) === cleanNum \|\| r\.id === cleanNum\);/, `const matchedReport = reports.find(r => r.report_number.toUpperCase() === cleanNum || r.id === cleanNum || r.complainant_name.toUpperCase().includes(cleanNum) || (r.suspect_info && r.suspect_info.toUpperCase().includes(cleanNum)) || (r.complainant_national_id && r.complainant_national_id.toUpperCase().includes(cleanNum)));`);

fs.writeFileSync('src/components/PublicTrackerView.tsx', code);
