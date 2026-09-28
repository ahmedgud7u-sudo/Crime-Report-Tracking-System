import re

with open('src/components/CrimeReportsView.tsx', 'r') as f:
    content = f.read()

# Find showCreateModal block
# We can use simple regex if we know it ends with Save & Register Report
start_str = '{showCreateModal && ('
end_str = "Save & Register Report'}\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      )}"

start_idx = content.find(start_str)
end_idx = content.find(end_str) + len(end_str)

modal_code = content[start_idx:end_idx]

# Replace for Edit
edit_modal = modal_code.replace('{showCreateModal && (', '{showEditModal && (')
edit_modal = edit_modal.replace('Register New Crime Incident Report', 'Update Crime Incident Report')
edit_modal = edit_modal.replace('setShowCreateModal(false)', 'setShowEditModal(false)')
edit_modal = edit_modal.replace('handleCreateSubmit', 'handleUpdateSubmit')
edit_modal = edit_modal.replace("Save & Register Report", "Update Report")

# Insert right after the create modal
new_content = content[:end_idx] + '\n\n      {/* Edit User Modal */}\n      ' + edit_modal + content[end_idx:]

with open('src/components/CrimeReportsView.tsx', 'w') as f:
    f.write(new_content)
