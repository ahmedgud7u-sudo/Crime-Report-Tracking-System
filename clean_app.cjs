const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
const badBlock = `  const handleDeleteCategory = async (categoryId: string) => {
    if (!currentUser) return;
    const res = await fetch(\`/api/categories/\${categoryId}\`, {
      method: "DELETE",
      headers: {
        "x-user-id": currentUser.id
      }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete category");
    }
    await fetchData();
  };\n`;
content = content.split(badBlock).join('');
fs.writeFileSync('src/App.tsx', content);
