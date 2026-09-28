const fs = require('fs');
let code = fs.readFileSync('src/components/CrimeReportsView.tsx', 'utf8');
const modal = `
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Fullscreen preview" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
          <button onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 text-white hover:text-red-500 bg-slate-800 p-2 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
`;
code = code.replace(/    <\/div>\n  \);\n};\n?$/, modal);
fs.writeFileSync('src/components/CrimeReportsView.tsx', code);
