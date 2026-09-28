const fs = require('fs');
let content = fs.readFileSync('src/components/CategoryManagementView.tsx', 'utf-8');

// Find the start of the interface and the start of handleSubmit
const interfaceStart = content.indexOf('interface CategoryManagementViewProps');
const handleSubmitStart = content.indexOf('const handleSubmit =');

if (interfaceStart !== -1 && handleSubmitStart !== -1) {
  const newText = `interface CategoryManagementViewProps {
  categories: CrimeCategory[];
  onCreateCategory: (data: any) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
}

export const CategoryManagementView: React.FC<CategoryManagementViewProps> = ({
  categories,
  onCreateCategory,
  onDeleteCategory
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [defaultPriority, setDefaultPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  `;
  content = content.substring(0, interfaceStart) + newText + content.substring(handleSubmitStart);
  fs.writeFileSync('src/components/CategoryManagementView.tsx', content);
}
