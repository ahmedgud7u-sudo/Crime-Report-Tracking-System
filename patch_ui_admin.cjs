const fs = require('fs');
let content = fs.readFileSync('src/components/UserManagementView.tsx', 'utf8');

const oldBtns = `                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-[11px]"
                    >
                      {u.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(u)}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-blue-100"
                      title="Edit User"
                    >
                      <Pencil className="w-3 h-3" /> Update
                    </button>

                    {onDeleteUser && (
                      <button
                        onClick={() => setUserToDelete(u)}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-red-100"
                        title="Delete User"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    )}
                  </td>`;

const newBtns = `                  <td className="px-4 py-3 text-right space-x-2">
                    {u.email !== 'admin@crts.gov.so' && (
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-[11px]"
                      >
                        {u.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleEdit(u)}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-blue-100"
                      title="Edit User"
                    >
                      <Pencil className="w-3 h-3" /> Update
                    </button>

                    {onDeleteUser && u.email !== 'admin@crts.gov.so' && (
                      <button
                        onClick={() => setUserToDelete(u)}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-red-100"
                        title="Delete User"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    )}
                  </td>`;

content = content.replace(oldBtns, newBtns);
fs.writeFileSync('src/components/UserManagementView.tsx', content);
