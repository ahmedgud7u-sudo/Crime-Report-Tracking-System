sed -i 's/12,846/{stats?.total_reports?.toLocaleString() || "12,846"}/g' src/components/LoginView.tsx
sed -i 's/342/{stats?.active_investigations?.toLocaleString() || "342"}/g' src/components/LoginView.tsx
sed -i 's/8,921/{stats?.closed_cases?.toLocaleString() || "8,921"}/g' src/components/LoginView.tsx
sed -i 's/On Duty Officers/Evidence Items/g' src/components/LoginView.tsx
sed -i 's/1,258/{stats?.total_evidence_records?.toLocaleString() || "1,258"}/g' src/components/LoginView.tsx
sed -i 's/Across Stations/Logged in DB/g' src/components/LoginView.tsx
sed -i 's/<div className="bg-\[#0b1633\]\/70  border-\[#1e3a8a\]\/60 rounded-xl p-3 flex flex-col hover:bg-\[#0b1633\]\/90 transition-colors ">/<div onClick={handleQuickEnter} className="bg-[#0b1633]\/70 border-[#1e3a8a]\/60 rounded-xl p-3 flex flex-col hover:bg-[#0b1633]\/90 transition-colors cursor-pointer">/g' src/components/LoginView.tsx
sed -i 's/<div className="bg-\[#0b1633\]\/80  border-\[#009444\]\/50 rounded-xl p-3 flex flex-col hover:bg-\[#0b1633\]\/90 transition-colors relative overflow-hidden ">/<div onClick={handleQuickEnter} className="bg-[#0b1633]\/80 border-[#009444]\/50 rounded-xl p-3 flex flex-col hover:bg-[#0b1633]\/90 transition-colors relative overflow-hidden cursor-pointer">/g' src/components/LoginView.tsx
