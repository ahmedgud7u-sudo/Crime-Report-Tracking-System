const fs = require('fs');
let content = fs.readFileSync('src/components/CategoryManagementView.tsx', 'utf-8');

const oldHeader = `              <span className={\`px-2 py-0.5 rounded text-[10px] font-bold uppercase \${
                cat.severity === 'critical' ? 'bg-red-100 text-red-800' :
                cat.severity === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
              }\`}>
                {cat.severity} Severity
              </span>
            </div>`;

const newHeader = `              <div className="flex items-center gap-2">
                <span className={\`px-2 py-0.5 rounded text-[10px] font-bold uppercase \${
                  cat.severity === 'critical' ? 'bg-red-100 text-red-800' :
                  cat.severity === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                }\`}>
                  {cat.severity} Severity
                </span>
                <button
                  onClick={async () => {
                    if (window.confirm('Ma hubtaa inaad tirtirto qaybtan danbiga?')) {
                      try {
                        await onDeleteCategory(cat.id);
                      } catch (err: any) {
                        alert(err.message);
                      }
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Tirtir (Delete)"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>`;

content = content.replace(oldHeader, newHeader);
fs.writeFileSync('src/components/CategoryManagementView.tsx', content);
