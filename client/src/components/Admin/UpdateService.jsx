import style from "../../ui/Table.module.css";
import api from "../../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UpdateService() {
  const userd = localStorage.getItem("user");
  const userInfo = JSON.parse(userd);
  console.log(userInfo);

  const [services, setServices] = useState([]);
  const [editedService, setEditedService] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [addService, setAddService] = useState({
    user:"",
    name:"",
    description: "",
    price: "",
    image: "",
    rate: "",
    category: "",
  });
  const [isAdd, setIsAdd] = useState(null);
  const fetchservices = async () => {
    try {
      const res = await api.get("/getAllService");
      if (res.status !== 200) {
        toast.error(res.data.message);
      }
      console.log(res.data)
      setServices(res.data.services);
      toast.success("fetch service successfully");
    } catch {
      toast.error("Faild to fetch service");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/deleteService/${id}`);

      if (res.status === 200) {
        setServices((services) =>
          services.filter((service) => service._id !== id),
        );
        toast.success("Delete service");
      }
    } catch (error) {
      toast.error("faild delete service");
    }
  };

  const handleSaveEdit = async (serviceId) => {
    try {
      const res = await api.put(`/updateService/${serviceId}`, editedService);
      if (res.status === 200) {
        setServices((prev) =>
          prev.map((service) =>
            service._id === serviceId
              ? { ...service, ...editedService }
              : service,
          ),
        );
        toast.success(res.data.message || "service well");
        setEditingId(null);
        fetchservices();
      }
    } catch (err) {
      toast.error("Failed to update categories");
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/createService", addService);
      console.log(res);

      if (res.status !== 200) {
        toast.error(res.data.message);
      }

      setServices((prev) => [...prev, addService]);

      toast.success(res.data.message);
      fetchservices();

      setAddService({
        user:"",
        name: "",
        description: "",
        price: "",
        image: "",
        rate: "",
        category: "",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to add service";
    toast.error(errorMsg);
    }
  };

  useEffect(() => {
    fetchservices();
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
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th style={{ paddingLeft: "55px" }}>Price</th>
              <th>Rate</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {services
              .filter(
                (service) =>
                  service.name && service.name.toLowerCase().includes(query.toLowerCase()) ||
                  service.price.includes(query),
              )
              .map((service) => {
                const isEditing = editingId === service._id;

                return (
                  <tr key={service._id}>
                    {isEditing ? (
                      <td>
                        <input
                          value={editedService.name}
                          className={style.editInput}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService,
                              name: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{service.name}</td>
                    )}

                    {isEditing ? (
                      <td>
                        <input
                          value={editedService.description}
                          className={style.editInput}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService,
                              description: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{service.description}</td>
                    )}

                    {isEditing ? (
                      <td>
                        <input
                          value={editedService.category}
                          className={style.editInput}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService,
                              category: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{service.category}</td>
                    )}
                    {isEditing ? (
                      <td>
                        <input
                          value={editedService.price}
                          className={style.editInput}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService,
                              price: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td style={{ paddingLeft: "70px" }}>{service.price}</td>
                    )}

                    {isEditing ? (
                      <td>
                        <input
                          value={editedService.rate}
                          className={style.editInput}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService,
                              rate: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{service.rate}</td>
                    )}

                    {isEditing ? (
                      <td>
                        <input
                          value={editedService.image}
                          className={style.editInput}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService,
                              image: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td className={style.imageCell}>
                        <span className={style.truncate} title={service.image}>
                          {service.image}
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
                            onClick={() => handleSaveEdit(service._id)}
                          >
                            save
                          </button>
                        </div>
                      ) : (
                        <div className={style.actionBtns}>
                          <button
                            className={style.btnEdit}
                            onClick={() => {
                              (setEditingId(service._id),
                                setEditedService({
                                  name: service.name,
                                  image: service.image,
                                  description: service.description,
                                  rate: service.rate,
                                  price: service.price,
                                  category: service.category,
                                }));
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className={style.btnDelete}
                            onClick={() => handleDelete(service._id)}
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
          Add service
        </button>
      </div>

      {isAdd && (
        <form className={style.categoryForm}>
          <div className={style.formGroup}>
            <label>User Id</label>
            <input
              type="text"
              placeholder="Enter User name"
              value={addService.user}
              onChange={(e) =>
                setAddService({ ...addService, user: e.target.value })
              }
            />
          </div>

          <div className={style.formGroup}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={addService.name}
              onChange={(e) =>
                setAddService({ ...addService, name: e.target.value })
              }
            />
          </div>

          <div className={style.formGroup}>
            <label>Image</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={addService.image}
              onChange={(e) =>
                setAddService({ ...addService, image: e.target.value })
              }
            />
          </div>

          <div className={style.formGroup}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={addService.description}
              onChange={(e) =>
                setAddService({ ...addService, description: e.target.value })
              }
            />
          </div>

          <div className={style.formGroup}>
            <label>Rate</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={addService.rate}
              onChange={(e) =>
                setAddService({ ...addService, rate: e.target.value })
              }
            />
          </div>

          <div className={style.formGroup}>
            <label>Price</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={addService.price}
              onChange={(e) =>
                setAddService({ ...addService, price: e.target.value })
              }
            />
          </div>
          <div className={style.formGroup}>
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={addService.category}
              onChange={(e) =>
                setAddService({ ...addService, category: e.target.value })
              }
            />
          </div>

          <button className={style.btnSubmit} onClick={handleAdd}>
            Add Service
          </button>
        </form>
      )}
    </>
  );
}

export default UpdateService;
