import style from "../../ui/Table.module.css";
import api from "../../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UpdateCategory() {
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [addCategory, setAddCategory] = useState({
    name: "",
    image: "",
  });
  const [isAdd, setIsAdd] = useState(null);
  const fetchCategory = async () => {
    try {
      const res = await api.get("/getAllCategory");
      if (res.status !== 200) {
        toast.error(res.data.message);
      }

      setCategories(res.data.categories);
      toast.success("fetch category successfully");
    } catch {
      toast.error("Faild to fetch category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/deleteCategory/${id}`);

      if (res.status === 200) {
        setCategories((categories) =>
          categories.filter((category) => category._id !== id),
        );
        toast.success("Delete Category");
      }
    } catch (error) {
      toast.error("faild delete Category");
    }
  };

  const handleSaveEdit = async (categoryId) => {
    try {
      const res = await api.put(
        `/updateCategory/${categoryId}`,
        editedCategory,
      );
      if (res.status === 200) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === categoryId ? { ...cat, ...editedCategory } : cat,
          ),
        );
        toast.success(res.data.message || "updated well");
        setEditingId(null);
        fetchCategories();
      }
    } catch (err) {
      toast.error("Failed to update categories");
      console.log(err);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await api.post("/createCategory", addCategory);

      if (res.status !== 200) {
        toast.error(res.data.message);
      }

      toast.success(res.data.message);
    } catch (err) {
      toast.error("faild add category");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div className={style.tableWrapper}>
        <table className={style.adminTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => {
              const isEditing = editingId === category._id;

              return (
                <tr key={category._id}>
                  {isEditing ? (
                    <td>
                      <input
                        value={editedCategory.name}
                        className={style.editInput}
                        onChange={(e) =>
                          setEditedCategory({
                            ...editedCategory,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                  ) : (
                    <td>{category.name}</td>
                  )}
                  {isEditing ? (
                    <td>
                      <input
                        value={editedCategory.image}
                        className={style.editInput}
                        onChange={(e) =>
                          setEditedCategory({
                            ...editedCategory,
                            image: e.target.value,
                          })
                        }
                      />
                    </td>
                  ) : (
                    <td className={style.imageCell}>
                      <span className={style.truncate} title={category.image}>
                        {category.image}
                      </span>
                    </td>
                  )}

                  <td>
                    {isEditing ? (
                      <div className={style.actionBtns}>
                        <button
                          className={style.btnEdit}
                          onClick={() => setEditingId(null)}
                        >
                          cancel
                        </button>

                        <button
                          className={style.btnSave}
                          onClick={() => handleSaveEdit(category._id)}
                        >
                          save
                        </button>
                      </div>
                    ) : (
                      <div className={style.actionBtns}>
                        <button
                          className={style.btnEdit}
                          onClick={() => {
                            (setEditingId(category._id),
                              setEditedCategory({
                                name: category.name,
                                image: category.image,
                              }));
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className={style.btnDelete}
                          onClick={() => handleDelete(category._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={style.addCategoryBox}>
        <button
          className={style.btnAddCategory}
          onClick={() => setIsAdd((prev) => !prev)}
        >
          Add category
        </button>
      </div>

      {isAdd && (
        <form className={style.categoryForm}>
          <div className={style.formGroup}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={addCategory.name}
              onChange={(e) =>
                setAddCategory({ ...addCategory, name: e.target.value })
              }
            />
          </div>

          <div className={style.formGroup}>
            <label>Image</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={addCategory.image}
              onChange={(e) =>
                setAddCategory({ ...addCategory, image: e.target.value })
              }
            />
          </div>

          <button className={style.btnSubmit} onClick={handleAdd}>
            Add Category
          </button>
        </form>
      )}
    </>
  );
}

export default UpdateCategory;
