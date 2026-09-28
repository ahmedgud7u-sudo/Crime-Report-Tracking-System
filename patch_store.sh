sed -i 's/this.data.cases.forEach(c => {/this.data.reports.forEach(c => {/g' src/db/store.ts
sed -i 's/catMap\[c.category_name\] = (catMap\[c.category_name\] || 0) + 1;/catMap[c.category_name] = (catMap[c.category_name] || 0) + 1;/g' src/db/store.ts
