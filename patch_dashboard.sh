sed -i '240,256c\
              <BarChart data={stats.cases_by_category} margin={{ top: 20, right: 30, left: 0, bottom: 25 }}>\
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />\
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={60} />\
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />\
                <Tooltip />\
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />\
              </BarChart>' src/components/DashboardView.tsx
