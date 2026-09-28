import { useState } from "react";
import { Search, ShieldAlert, AlertCircle, X } from "lucide-react";
export const PublicTrackerView = ({ reports, cases }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchedResult, setSearchedResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const handleTrack = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanNum = trackingNumber.trim().toUpperCase();
    const matchedCase = cases.find((c) => c.case_number.toUpperCase() === cleanNum || c.id === cleanNum || c.title.toUpperCase().includes(cleanNum));
    if (matchedCase) {
      setSearchedResult({
        type: "case",
        data: matchedCase
      });
      return;
    }
    const matchedReport = reports.find((r) => r.report_number.toUpperCase() === cleanNum || r.id === cleanNum || r.complainant_name.toUpperCase().includes(cleanNum) || r.suspect_info && r.suspect_info.toUpperCase().includes(cleanNum) || r.complainant_national_id && r.complainant_national_id.toUpperCase().includes(cleanNum));
    if (matchedReport) {
      setSearchedResult({
        type: "report",
        data: matchedReport
      });
      return;
    }
    setSearchedResult(null);
  };
  return <div className="max-w-3xl mx-auto space-y-6">
      
      {
    /* Title Card */
  }
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-8 rounded-2xl text-white  border-slate-800 text-center space-y-3">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto ">
          <ShieldAlert className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">Public Case & Crime Report Tracking Portal</h1>
        <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
          Puntland Police Force public transparency portal. Enter your official Report Reference (e.g. <span className="font-mono text-amber-300 font-bold">REP-2026-0001</span>) or CID Case Number (e.g. <span className="font-mono text-blue-300 font-bold">CASE-2026-0089</span>) to check real-time status.
        </p>

        {
    /* Search Input Form */
  }
        <form onSubmit={handleTrack} className="flex items-center gap-2 max-w-md mx-auto pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
    type="text"
    required
    placeholder="e.g. REP-2026-0001 or CASE-2026-0089"
    value={trackingNumber}
    onChange={(e) => setTrackingNumber(e.target.value)}
    className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none "
  />
          </div>
          <button
    type="submit"
    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold text-xs rounded-xl transition-colors  shrink-0"
  >
            Track Status
          </button>
        </form>
      </div>

      {
    /* Results Box */
  }
      {hasSearched && <div className="space-y-4">
          {!searchedResult ? <div className="bg-white p-6 rounded-xl  text-center text-slate-600 text-xs space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="font-bold text-slate-800">Reference Number Not Found</p>
              <p className="text-slate-500">
                No active crime report or case matches <span className="font-mono font-bold text-slate-900">{trackingNumber}</span>. Please verify your reference receipt or contact the nearest police station desk officer.
              </p>
            </div> : <div className="bg-white p-6 rounded-2xl   space-y-5 text-xs">
              
              <div className="flex items-center justify-between  pb-4">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border-blue-200">
                    {searchedResult.type === "case" ? "Official CID Case File" : "Crime Incident Report"}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {searchedResult.type === "case" ? searchedResult.data.case_number : searchedResult.data.report_number}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">CURRENT STATUS</span>
                  <span className="text-sm font-extrabold text-blue-700 uppercase bg-blue-50 px-3 py-1 rounded border-blue-200 inline-block mt-0.5">
                    {searchedResult.type === "case" ? searchedResult.data.status : searchedResult.data.status.replace(/_/g, " ")}
                  </span>
                </div>
              </div>

              
              {
    /* Photo Display if available */
  }
              {(() => {
    let photoUrl = null;
    if (searchedResult.type === "report" && searchedResult.data.suspect_image) {
      photoUrl = searchedResult.data.suspect_image;
    } else if (searchedResult.type === "case" && searchedResult.data.report_id) {
      const relatedReport = reports.find((r) => r.id === searchedResult.data.report_id);
      if (relatedReport && relatedReport.suspect_image) {
        photoUrl = relatedReport.suspect_image;
      }
    }
    if (photoUrl) {
      return <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Matched Photo / Suspect</span>
                      <img
        src={photoUrl}
        alt="Suspect Image"
        className="w-32 h-32 object-cover rounded-lg shadow-none border-0 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setPreviewImage(photoUrl)}
      />
                    </div>;
    }
    return null;
  })()}

              {
    /* Details Grid */
  }

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl ">
                <div>
                  <span className="text-slate-400 block text-[10px]">INCIDENT CATEGORY</span>
                  <span className="font-bold text-slate-800">{searchedResult.data.category_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">DISTRICT / STATION</span>
                  <span className="font-semibold text-slate-800">{searchedResult.data.police_station}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">INCIDENT DATE</span>
                  <span className="font-semibold text-slate-800">{searchedResult.data.incident_date}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Investigation Scope / Summary:</span>
                <p className="p-3 bg-slate-50 rounded-lg  text-slate-700 leading-relaxed">
                  {searchedResult.data.summary || searchedResult.data.description}
                </p>
              </div>

              <div className="p-3 bg-blue-50 border-blue-200 rounded-xl text-blue-900 text-[11px] leading-relaxed">
                <strong>Official Note:</strong> For additional information or to submit supplemental evidence regarding this tracking file, please visit the desk officer at <strong>{searchedResult.data.police_station}</strong>.
              </div>

            </div>}
        </div>}


      {previewImage && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Fullscreen preview" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
          <button type="button" onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 text-white hover:text-red-500 bg-slate-800 p-2 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>}
    </div>;
};
