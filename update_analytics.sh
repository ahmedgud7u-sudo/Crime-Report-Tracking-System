sed -i "s/Crime Statistics & Analytical Reports/Xogta Dambiyada \& Warbixinnada Falanqaynta/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Generate executive summaries, police workload distributions, and thesis defense reporting data./Soo saar faahfaahinta, qaybinta shaqada booliska, iyo xogta warbixinnada./g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Export CSV Data/Dhoofi Xogta (CSV)/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Print \/ Export PDF/Daabac \/ PDF/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/TOTAL INCIDENTS/DHACDOOYINKA GUUD/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Logged in CRTS/Lagu diiwaangeliyay CRTS/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/ACTIVE CASES/KIISASKA FIRFIRCOON/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Under CID Investigation/Ku Jira Baaritaanka CID/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/RESOLVED & CLOSED/XALLIYAY \& XIRAN/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Prosecuted \/ Solved/La Xaliyay/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/EVIDENCE COLLECTED/CADDAYMO LA URURIYAY/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Recorded in Locker/Lagu xafiday qolka/g" src/components/ReportsAnalyticsView.tsx

# Chart headers
sed -i "s/Crime Incidents by Category/Dhacdooyinka Dambiyada ee Qayb ahaan/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Total case load breakdown across categories/Tirada guud ee kiisaska oo loo kala saaray qaybaha/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Case Distribution by Police Station/Qaybinta Kiisaska ee Saldhigyada Booliska/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Jurisdiction station workload comparison/Isbarbardhiga shaqada saldhigyada/g" src/components/ReportsAnalyticsView.tsx

# Ledger
sed -i "s/Case Ledger Summary/Soo Koobida Diiwaanka Kiisaska/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Comprehensive snapshot of recorded case files/Muuqaal guud ee galka kiisaska la diiwaangeliyay/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Total Records/Tirada Guud/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Case Number/Numbarka Kiiska/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Title</>Ciwaanka</g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Category</>Qaybta</g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Station</>Saldhigga</g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Investigator</>Baaraha</g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Status</>Xaaladda</g" src/components/ReportsAnalyticsView.tsx

# Colors
sed -i "s/const COLORS = \['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'\];/const COLORS = \['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981'\];/g" src/components/ReportsAnalyticsView.tsx
