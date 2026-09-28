import { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
export const CategoryManagementView = ({
  categories,
  onCreateCategory,
  onDeleteCategory
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [defaultPriority, setDefaultPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !name) return;
    setIsSubmitting(true);
    try {
      await onCreateCategory({
        code,
        name,
        description,
        severity,
        default_priority: defaultPriority
      });
      setShowAddModal(false);
      setCode("");
      setName("");
      setDescription("");
    } catch (err) {
      alert("Error creating category: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="space-y-6">
      
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Crime Offense Categories</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure legal crime categories, severity classifications, and default response priority levels.
          </p>
        </div>
        <button
    onClick={() => setShowAddModal(true)}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-2 "
  >
          <Plus className="w-4 h-4" /> Add Offense Category
        </button>
      </div>

      {
    /* Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => <div key={cat.id} className="bg-white p-5 rounded-xl   space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-blue-600 text-xs font-mono bg-blue-50 px-2 py-0.5 rounded border-blue-200">
                {cat.code}
              </span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cat.severity === "critical" ? "bg-red-100 text-red-800" : cat.severity === "high" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-800"}`}>
                  {cat.severity} Severity
                </span>
                <button
    type="button"
    onClick={async () => {
      if (window.confirm("Ma hubtaa inaad tirtirto qaybtan danbiga?")) {
        try {
          await onDeleteCategory(cat.id);
        } catch (err) {
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
            </div>

            <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>

            <div className="pt-3 border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Default Priority: <strong className="uppercase text-slate-800">{cat.default_priority}</strong></span>
              <span>Code ID: {cat.id}</span>
            </div>
          </div>)}
      </div>

      {
    /* Modal */
  }
      {showAddModal && <div className="fixed inset-0 bg-slate-900/60  z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl   max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between  pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add New Offense Category</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Code *</label>
                  <input
    type="text"
    required
    placeholder="CR-THFT"
    value={code}
    onChange={(e) => setCode(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg font-mono"
  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Severity Rating</label>
                  <select
    value={severity}
    onChange={(e) => setSeverity(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category Name *</label>
                <input
    type="text"
    required
    placeholder="e.g. Identity Theft & Cyber Extortion"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Legal Description</label>
                <textarea
    rows={3}
    placeholder="Official legal definition of offense..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
              </div>

              <div className="pt-3  flex justify-end gap-2">
                <button
    type="button"
    onClick={() => setShowAddModal(false)}
    className="px-4 py-2 bg-slate-100 border-none rounded text-slate-700 font-semibold"
  >
                  Cancel
                </button>
                <button
    type="submit"
    disabled={isSubmitting}
    className="px-5 py-2 bg-blue-600 text-white rounded font-semibold"
  >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>}

    </div>;
};
