import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api";
import style from "../style/UpdateUser.module.css";

function UpdateUser() {
  const [users, setUsers] = useState([]);

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

  const handleDelete =async (id) => {
    try {
      const res =await api.delete(`/deleteUser/${id}`);

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
      <div className={style.tableWrapper}>
        <table className={style.adminTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td className={style.password}>{user.password}</td>

                <td>{user.role}</td>

                <td>
                  <div className={style.actionBtns}>
                    <button className={style.btnEdit}>Edit</button>
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
