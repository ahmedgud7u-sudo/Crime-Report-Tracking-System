const fs = require('fs');
let code = fs.readFileSync('src/components/PublicTrackerView.tsx', 'utf8');

const imageLogic = `
              {/* Photo Display if available */}
              {(() => {
                let photoUrl = null;
                if (searchedResult.type === 'report' && searchedResult.data.suspect_image) {
                  photoUrl = searchedResult.data.suspect_image;
                } else if (searchedResult.type === 'case' && searchedResult.data.report_id) {
                  const relatedReport = reports.find(r => r.id === searchedResult.data.report_id);
                  if (relatedReport && relatedReport.suspect_image) {
                    photoUrl = relatedReport.suspect_image;
                  }
                }

                if (photoUrl) {
                  return (
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Matched Photo / Suspect</span>
                      <img 
                        src={photoUrl} 
                        alt="Suspect Image" 
                        className="w-32 h-32 object-cover rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setPreviewImage(photoUrl)}
                      />
                    </div>
                  );
                }
                return null;
              })()}

              {/* Details Grid */}
`;

code = code.replace(/\{\/\* Details Grid \*\/\}/, imageLogic);

const modalHtml = `
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

code = code.replace(/    <\/div>\n  \);\n};\n?$/, modalHtml);

fs.writeFileSync('src/components/PublicTrackerView.tsx', code);
