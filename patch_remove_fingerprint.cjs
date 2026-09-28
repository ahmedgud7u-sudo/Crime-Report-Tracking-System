const fs = require('fs');
let code = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

// 1. Remove state variables
code = code.replace(/  const \[isScanning, setIsScanning\] = useState\(false\);\n/, '');
code = code.replace(/  const \[scanStatus, setScanStatus\] = useState<'idle' \| 'scanning' \| 'success' \| 'error'>\('idle'\);\n/, '');
code = code.replace(/  const \[authName, setAuthName\] = useState\(''\);\n/, '');

// 2. Remove functions
const handleFingerprintLoginRegex = /  const handleFingerprintLogin = \(\) => \{[\s\S]*?\};\n\n/;
code = code.replace(handleFingerprintLoginRegex, '');

const handleSimulateScanRegex = /  const handleSimulateScan = \([\s\S]*? \}, 2000\);\n  \};\n\n/;
code = code.replace(handleSimulateScanRegex, '');

// 3. Remove conditional wrap for isScanning and closing bracket for the form wrap
// Original code has:
// {isScanning ? ( ... huge block ... ) : (
// <form onSubmit={handleSubmit} className="space-y-4">
// ...
// </form>
// )}

const isScanningBlockRegex = /              \{\/\* Login Form or Fingerprint Scanner \*\/\}\n\s*\{isScanning \? \([\s\S]*?\) : \(\n/;
code = code.replace(isScanningBlockRegex, '              {/* Login Form */}\n');

// 4. Remove the OR separator and fingerprint button
const orDividerAndButtonRegex = /                <div className="relative flex items-center py-3">[\s\S]*?<span>Login with Police ID<\/span>\n\s*<\/button>\n/;
code = code.replace(orDividerAndButtonRegex, '');

// 5. Remove the closing bracket of the isScanning conditional wrap
// Since we removed `{isScanning ? (...) : (`, we also need to remove `)}` which appears exactly after `</form>`
const closingConditionalRegex = /              <\/form>\n              \)\}\n/;
code = code.replace(closingConditionalRegex, '              </form>\n');

fs.writeFileSync('src/components/LoginView.tsx', code);
