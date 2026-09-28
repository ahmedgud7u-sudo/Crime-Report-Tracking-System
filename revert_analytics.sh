sed -i "s/Xogta Dambiyada \& Warbixinnada Falanqaynta/Crime Statistics \& Analytical Reports/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Soo saar faahfaahinta, qaybinta shaqada booliska, iyo xogta warbixinnada./Generate executive summaries, police workload distributions, and thesis defense reporting data./g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Dhoofi Xogta (CSV)/Export CSV Data/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Daabac \/ PDF/Print \/ Export PDF/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/DHACDOOYINKA GUUD/TOTAL INCIDENTS/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Lagu diiwaangeliyay CRTS/Logged in CRTS/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/KIISASKA FIRFIRCOON/ACTIVE CASES/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Ku Jira Baaritaanka CID/Under CID Investigation/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/XALLIYAY \& XIRAN/RESOLVED \& CLOSED/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/La Xaliyay/Prosecuted \/ Solved/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/CADDAYMO LA URURIYAY/EVIDENCE COLLECTED/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Lagu xafiday qolka/Recorded in Locker/g" src/components/ReportsAnalyticsView.tsx

# Chart headers
sed -i "s/Dhacdooyinka Dambiyada ee Qayb ahaan/Crime Incidents by Category/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Tirada guud ee kiisaska oo loo kala saaray qaybaha/Total case load breakdown across categories/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Qaybinta Kiisaska ee Saldhigyada Booliska/Case Distribution by Police Station/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Isbarbardhiga shaqada saldhigyada/Jurisdiction station workload comparison/g" src/components/ReportsAnalyticsView.tsx

# Bar chart fill
sed -i 's/fill="#6366f1"/fill="#3b82f6"/g' src/components/ReportsAnalyticsView.tsx

# Ledger
sed -i "s/Soo Koobida Diiwaanka Kiisaska/Case Ledger Summary/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Muuqaal guud ee galka kiisaska la diiwaangeliyay/Comprehensive snapshot of recorded case files/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Tirada Guud/Total Records/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/Numbarka Kiiska/Case Number/g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Ciwaanka</>Title</g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Qaybta</>Category</g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Saldhigga</>Station</g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Baaraha</>Investigator</g" src/components/ReportsAnalyticsView.tsx
sed -i "s/>Xaaladda</>Status</g" src/components/ReportsAnalyticsView.tsx

# Colors
sed -i "s/const COLORS = \['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981'\];/const COLORS = \['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'\];/g" src/components/ReportsAnalyticsView.tsx
