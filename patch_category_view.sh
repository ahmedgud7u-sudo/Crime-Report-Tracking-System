sed -i 's/onCreateCategory: (data: any) => Promise<void>;/onCreateCategory: (data: any) => Promise<void>;\n  onDeleteCategory: (id: string) => Promise<void>;/g' src/components/CategoryManagementView.tsx
sed -i 's/onCreateCategory/onCreateCategory,\n  onDeleteCategory/g' src/components/CategoryManagementView.tsx
