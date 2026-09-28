sed -i '502a \
  const handleDeleteCategory = async (categoryId: string) => {\
    if (!currentUser) return;\
    const res = await fetch(`/api/categories/${categoryId}`, {\
      method: "DELETE",\
      headers: {\
        "x-user-id": currentUser.id\
      }\
    });\
    if (!res.ok) {\
      const err = await res.json();\
      throw new Error(err.error || "Failed to delete category");\
    }\
    await fetchAllData();\
  };\
' src/App.tsx
