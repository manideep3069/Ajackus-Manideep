import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/App.css";

const UserManagementDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [rowClass, setRowClass] = useState("");
  const [deleteConfirmRow, setDeleteConfirmRow] = useState(null);

  const API_URL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Example user data for demonstration
      const exampleUsers = [
        {
          id: 1,
          firstName: "Alice",
          lastName: "Smith",
          email: "alice.smith@example.com",
          department: "HR",
        },
        {
          id: 2,
          firstName: "Bob",
          lastName: "Brown",
          email: "bob.brown@example.com",
          department: "Finance",
        },
        {
          id: 3,
          firstName: "Charlie",
          lastName: "Johnson",
          email: "charlie.johnson@example.com",
          department: "Engineering",
        },
        {
          id: 4,
          firstName: "Diana",
          lastName: "Clark",
          email: "diana.clark@example.com",
          department: "Marketing",
        },
        {
          id: 5,
          firstName: "Eve",
          lastName: "Williams",
          email: "eve.williams@example.com",
          department: "IT",
        },
        {
          id: 6,
          firstName: "Sophia",
          lastName: "Miller",
          email: "sophia.miller@example.com",
          department: "Sales",
        },
        {
          id: 7,
          firstName: "Liam",
          lastName: "Davis",
          email: "liam.davis@example.com",
          department: "Support",
        },
        {
          id: 8,
          firstName: "Olivia",
          lastName: "Wilson",
          email: "olivia.wilson@example.com",
          department: "Operations",
        },
        {
          id: 9,
          firstName: "Noah",
          lastName: "Anderson",
          email: "noah.anderson@example.com",
          department: "Research",
        },
        {
          id: 10,
          firstName: "Emma",
          lastName: "Taylor",
          email: "emma.taylor@example.com",
          department: "Design",
        },
      ];
      setUsers(exampleUsers);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const playSound = (soundType) => {
    const soundMap = {
      save: "../sounds/save.mp3",
      delete: "/sounds/delete.mp3",
      edit: "/sounds/edit.mp3",
    };
    const audio = new Audio(soundMap[soundType]);
    audio.play();
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;
    try {
      const response = await axios.post(API_URL, formData);
      const newUser = { id: users.length + 1, ...formData };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setRowClass("add-highlight");
      setHighlightedRow(newUser.id);
      setModalOpen(false);
      setCurrentPage(Math.ceil(updatedUsers.length / itemsPerPage));
      playSound("save");
      setTimeout(() => {
        setHighlightedRow(null);
        setRowClass("");
      }, 2000);
    } catch (err) {
      setError("Failed to add user.");
    }
  };

  const handleEditUser = async () => {
    if (!validateForm()) return;
    try {
      const response = await axios.put(
        `${API_URL}/${currentUser.id}`,
        formData
      );
      setUsers(
        users.map((user) => {
          if (user.id === currentUser.id) {
            setRowClass("edit-highlight");
            setHighlightedRow(currentUser.id);
            setTimeout(() => {
              setHighlightedRow(null);
              setRowClass("");
            }, 2000);
            return { ...user, ...response.data };
          }
          return user;
        })
      );
      setModalOpen(false);
      playSound("edit");
    } catch (err) {
      setError("Failed to edit user.");
    }
  };

  const handleDeleteUser = (id) => {
    setDeleteConfirmRow(id);
  };

  const confirmDelete = async (id) => {
    try {
      setRowClass("delete-warning-row");
      setHighlightedRow(id);
      setTimeout(() => {
        const updatedUsers = users
          .filter((user) => user.id !== id)
          .map((user, index) => ({ ...user, id: index + 1 }));
        setUsers(updatedUsers);
        setHighlightedRow(null);
        setDeleteConfirmRow(null);
        setRowClass("");
        playSound("delete");
      }, 200);
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmRow(null);
  };

  const openModal = (user = null) => {
    setCurrentUser(user);
    setFormData(
      user || { firstName: "", lastName: "", email: "", department: "" }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.department.trim()
    ) {
      setError("All fields are required.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    setError(null);
    return true;
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app-background">
      <div className="dashboard-container">
        <h1 className="header">User Management Dashboard</h1>
        <button className="add-button" onClick={() => openModal()}>
          Add User
        </button>

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className={
                  deleteConfirmRow === user.id
                    ? "delete-warning-row"
                    : highlightedRow === user.id
                    ? rowClass
                    : ""
                }
              >
                <td>{user.id}</td>
                <td>{user.firstName || "-"}</td>
                <td>{user.lastName || "-"}</td>
                <td>{user.email}</td>
                <td>{user.department || "-"}</td>
                <td>
                  {deleteConfirmRow === user.id ? (
                    <>
                      <button
                        className="confirm-delete-button"
                        onClick={() => confirmDelete(user.id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="cancel-delete-button"
                        onClick={cancelDelete}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-button"
                        onClick={() => openModal(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-header">
                {currentUser ? "Edit User" : "Add User"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  currentUser ? handleEditUser() : handleAddUser();
                }}
                className="interactive-form"
              >
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="Enter Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    {currentUser ? "Update User" : "Add User"}
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementDashboard;
