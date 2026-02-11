import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import style from "../../ui/Table.module.css";

function UpdateUser() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const fetchUser = async () => {
    try {
      const res = await api.get("/getAllUser");
      if (res.status !== 201) {
        toast.error(res.data.message);
      }

      setUsers(res.data.users);
      toast.success("fetch user successfully");
    } catch {
      toast.error("Faild to fetch user");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/deleteUser/${id}`);

      if (res.status === 200) {
        setUsers((users) => users.filter((user) => user._id !== id));
        toast.success("Delete User");
      }
    } catch (error) {
      toast.error("faild delete user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className={style.search}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search..."
        />
      </div>
      <div className={style.tableWrapper}>
        <table className={style.adminTable}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(query.toLowerCase()) ||
                  user.email.includes(query),
              )

              .map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td className={style.password}>{user.password}</td>

                  <td>{user.role}</td>

                  <td>
                    <div className={style.actionBtns}>
                      <button
                        className={style.btnDelete}
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UpdateUser;
