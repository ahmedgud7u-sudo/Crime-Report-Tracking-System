const fs = require('fs');
let content = fs.readFileSync('src/components/CategoryManagementView.tsx', 'utf-8');

content = content.replace(/interface CategoryManagementViewProps \{[\s\S]*?\}[\s\S]*?export const CategoryManagementView/, `interface CategoryManagementViewProps {
  categories: CrimeCategory[];
  onCreateCategory: (data: any) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
}

export const CategoryManagementView: React.FC<CategoryManagementViewProps> = ({
  categories,
  onCreateCategory,
  onDeleteCategory
`)

fs.writeFileSync('src/components/CategoryManagementView.tsx', content);
