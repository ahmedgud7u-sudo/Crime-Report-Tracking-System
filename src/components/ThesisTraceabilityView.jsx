import { GraduationCap, CheckCircle2 } from "lucide-react";
export const ThesisTraceabilityView = () => {
  const objectiveMappings = [
    {
      objective_number: 1,
      objective_title: "Falanqaynta Hababka Dacwad Gudbinta & Nidaamyada Kiisaska ee Jira",
      system_solution: "Waxaa lagu bedelay waraaqihii gacanta nidaam dijitaal ah oo isku xiran oo daboolaya soo gudbinta dhacdada, eegista sarkaalka, meelaynta CID, iyo xallinta.",
      features_implemented: [
        "Habraaca Diiwaangelinta Dhacdada Dambiga oo la jaangooyay",
        "Maamulka Helitaanka Xogta oo ku dhisan Doorar (Maamule, Sarkaal, Baare, Muwaadin)",
        "U beddelida Warbixinta Dambiga Kiis rasmi ah oo CID ah",
        "Dabagal dhexe oo lagu sameeyo awoodaha Saldhigyada Booliska"
      ],
      thesis_section: "Cutubka 1aad (Baaxadda) & Cutubka 3aad (Habka Cilmi-baarista)",
      status: "WAA LA DHAMAYSTIRAY"
    },
    {
      objective_number: 2,
      objective_title: "Qaabaynta Keyd Xogeed Sugan oo Isku-xiran (Relational Database)",
      system_solution: "Waxaa la hirgeliyay keyd xogeed ka kooban miisas kala duwan oo matalaya Isticmaalayaasha, Noocyada Dambiyada, Warbixinnada, Kiisaska, Taariikhda Xaaladaha, Caddaymaha, iyo Diiwaanka Lasocodka (Audit Logs).",
      features_implemented: [
        "Qaab-dhismeed isku-xiran oo leh xiriirka furaha koowaad/labaad (Primary/Foreign Key)",
        "Kaydinta xogta joogtada ah (`crts_db.json`)",
        "Diiwaangelinta waqtiga otomaatig ah iyo taariikhda isbeddelka xaaladda oo aan la tirtiri karin",
        "Xeerarka ogolaanshaha keydka xogta ee ku salaysan doorarka"
      ],
      thesis_section: "Cutubka 3aad (Falanqaynta Nidaamka & Qaabaynta Keydka Xogta)",
      status: "WAA LA DHAMAYSTIRAY"
    },
    {
      objective_number: 3,
      objective_title: "Horumarinta Nidaam Kumbuyuutareed lagu Diiwaangeliyo Warbixinnada Dambiyada",
      system_solution: "Waxaa la dhisay Diiwaanka Warbixinnada Dambiyada oo dhameystiran kaas oo leh hubinta xogta, abuurista Aqoonsi (ID) u gaar ah warbixin kasta (`REP-2026-XXXX`), iyo dabagalka dacwoodaha.",
      features_implemented: [
        "Qaybta Warbixinnada Dambiyada oo leh raadin degdeg ah iyo kala shaandhayn (filter)",
        "Hubinta xogta muhiimka ah ee dacwoodaha & dhacdada",
        "Meelaynta heerka ahmiyadda (Hoose, Dhexe, Sare, Degdeg)",
        "Kala saarida dambiyada iyo diiwaanada macluumaadka eedeysanaha/dhibanaha"
      ],
      thesis_section: "Cutubka 4aad (Hirgelinta Nidaamka & Qaabaynta Muuqaalka)",
      status: "WAA LA DHAMAYSTIRAY"
    },
    {
      objective_number: 4,
      objective_title: "In Isticmaalayaasha La Oggolyahay Ay Lasocdaan & Cusbooneysiiyaan Xaaladda Kiiska",
      system_solution: "Waxaa la abuuray qaybta Maamulka Kiisaska oo leh taariikhda isbeddelka xaaladda oo dhan, meelaynta baare, iyo faallooyinka qasabka ah ee cusbooneysiinta xaaladda.",
      features_implemented: [
        "Dabagalka waqtiga Xaaladda Kiiska (Waa lasoo sheegay \u2192 Baaris baa ku socota \u2192 Waa la xiray)",
        "Faallooyinka xaaladda ee qasabka ah si loo helo isla xisaabtan",
        "Dib-u-meelaynta Baaraha Horjoogaha CID",
        "Dabagalka Kiiska Muwaadinka (Dadweynaha) iyadoo la isticmaalayo Koodhka Raadraaca"
      ],
      thesis_section: "Cutubka 4aad (Qaybta Dabagalka Kiiska & Baarista)",
      status: "WAA LA DHAMAYSTIRAY"
    },
    {
      objective_number: 5,
      objective_title: "Soosaarida Warbixinno & Xog-koob (Statistics) si Go'aan Loo Gaaro",
      system_solution: "Waxaa lagu xiray shaxanka (Recharts) si loo falanqeeyo qeybinta dambiyada, isbeddellada dambiyada bilaha ah, culeyska shaqo ee saldhigyada booliska, iyo soosaarida PDF / CSV la daabacan karo.",
      features_implemented: [
        "Sawir-xogeedka Recharts ee Shaxda Guud (Dashboard)",
        "Shaxanka goobada/xariiqda ee culeyska shaqo ee Noocyada dambiyada & Saldhigyada Booliska",
        "Shaxanka muujinaya isbeddelka dambiyada bishiiba",
        "Warbixin Boolis rasmi ah oo PDF ah oo la daabacan karo iyo dhoofinta xogta CSV"
      ],
      thesis_section: "Cutubka 4aad (Nidaamyada Warbixinta & Taageerada Go'aanka)",
      status: "WAA LA DHAMAYSTIRAY"
    },
    {
      objective_number: 6,
      objective_title: "Yaraynta Waraaqaha & In Laga Hortago Khaladaadka Diiwaangelinta Gacanta",
      system_solution: "Waxaa la sameeyay nidaam dhexe oo elektaroonig ah oo lagu hayo caddeymaha, diiwaanka xisaabinta ee falalka isticmaalaha (audit logging), iyo raadin qoraal buuxa oo degdeg ah.",
      features_implemented: [
        "Kaydka Caddaymaha oo leh sumadaha ogolaanshaha amniga (Sir Sare / Xaddidan)",
        "Diiwaanka (Audit Log) ee daba-galaya soo gelida isticmaalaha, cinwaannada IP, iyo tafatirka",
        "Raadin degdeg ah oo ka dhex raadinaysa kiisaska iyo warbixinnada",
        "Baddelaha Doorka si loogu tijaabiyo looguna soo bandhigo difaaca buugga"
      ],
      thesis_section: "Cutubka 1aad (Qeexida Dhibaatada) & Cutubka 5aad (Gunaanad)",
      status: "WAA LA DHAMAYSTIRAY"
    }
  ];
  return <div className="space-y-6">
      
      {
    /* Header Banner */
  }
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 rounded-2xl text-white  border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <GraduationCap className="w-5 h-5" /> Shaxda Raad-raaca Buugga Qalin-jabinta (Thesis Matrix)
          </div>
          <h1 className="text-xl font-extrabold text-white">Tilmaamaha Difaaca & Is-waafajinta Buugga Qalin-jabinta ee CRTS</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Shaxdani waxay toos ula xiriirisaa 6-da Hadaf ee Gaarka ah ee buugga qalin-jabinta qaybaha shaqaynaya, dhismaha keydka xogta, iyo amniga lagu hirgeliyay nidaamkan webka.
          </p>
        </div>
        <div className="bg-white/10  px-4 py-3 rounded-xl border-white/20 text-center shrink-0">
          <span className="text-[10px] uppercase font-semibold text-slate-300 block">XAALADDA BUUGGA</span>
          <span className="text-base font-extrabold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> 100% WAA LA WAAFAJIYAY
          </span>
        </div>
      </div>

      {
    /* Traceability Objective Cards */
  }
      <div className="space-y-4">
        {objectiveMappings.map((obj) => <div key={obj.objective_number} className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                  #{obj.objective_number}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{obj.objective_title}</h3>
              </div>
              <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] px-2.5 py-0.5 rounded-full border-emerald-200 dark:border-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {obj.status}
              </span>
            </div>
            
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border-slate-100 dark:border-slate-700">
              <strong className="text-blue-900 dark:text-blue-400">Xalka Nidaamka:</strong> {obj.system_solution}
            </p>

            <div>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block mb-1.5 uppercase tracking-wider">Qaybaha & Astaamaha Muhiimka ah ee La Hirgeliyay:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {obj.features_implemented.map((feat, idx) => <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                    <span>{feat}</span>
                  </div>)}
              </div>
            </div>

            <div className="pt-2 border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
              <span>La Xiriirinta Buugga: <strong className="text-slate-700 dark:text-slate-300">{obj.thesis_section}</strong></span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Waa Loo Xaqiijiyay Difaaca</span>
            </div>
          </div>)}
      </div>
    </div>;
};
