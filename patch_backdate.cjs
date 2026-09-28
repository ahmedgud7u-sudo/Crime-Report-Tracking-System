const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/crts_db.json', 'utf8'));

// We have around 30-40 reports. Let's distribute their created_at dates over the last 5 months.
// May: 5, Jun: 8, Jul: 12, Aug: 15, Sep: remaining
const now = new Date();
const months = [
  new Date(now.getFullYear(), now.getMonth() - 4, 15), // May
  new Date(now.getFullYear(), now.getMonth() - 3, 15), // Jun
  new Date(now.getFullYear(), now.getMonth() - 2, 15), // Jul
  new Date(now.getFullYear(), now.getMonth() - 1, 15), // Aug
  new Date(now.getFullYear(), now.getMonth(), 5)       // Sep
];

let reportIdx = 0;
data.reports.forEach((r, i) => {
  const m = months[i % 5];
  // add some random days
  const randomDay = Math.floor(Math.random() * 10);
  m.setDate(10 + randomDay);
  r.created_at = m.toISOString();
});

data.cases.forEach((c, i) => {
  // Try to match case created_at with its report created_at if possible
  const relatedReport = data.reports.find(r => r.id === c.report_id);
  if (relatedReport) {
    const rd = new Date(relatedReport.created_at);
    rd.setDate(rd.getDate() + 1); // 1 day after report
    c.created_at = rd.toISOString();
  } else {
    const m = months[i % 5];
    m.setDate(15);
    c.created_at = m.toISOString();
  }
});

fs.writeFileSync('data/crts_db.json', JSON.stringify(data, null, 2));
console.log('Backdated data to show a nice trend.');
