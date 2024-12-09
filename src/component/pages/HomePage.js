import React, { useState, useEffect } from "react";
import userData from "../../celebrities.json";
import CustomInput from "../shared/CustomInput/index.tsx";
import CustomSelect from "../shared/CustomSelect/index.tsx";
import CustomTextArea from "../shared/CustomTextArea/index.tsx";
import { GENDER_OPTIONS } from "../../utils";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const toggleAccordion = (id) => {
    if (editMode !== null) return;
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (user) => {
    if (user.age < 18) {
      alert("Only adults can be edited.");
      return;
    }
    setEditMode(user.id);
    setEditedUser({ ...user });
  };

  const handleSave = () => {
    if (editedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
      );
      setEditMode(null);
      setEditedUser(null);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedUser(null);
  };

  const handleDelete = (id) => {
    const openDialog = document.getElementById("openDialog");
    const closeDialog = document.getElementById("closeDialog");
    const confirmDialog = document.getElementById("confirmDialog");
    const dialog = document.getElementById("dialog");

    openDialog.addEventListener("click", () => {
      dialog.classList.remove("hidden");
    });

    closeDialog.addEventListener("click", () => {
      dialog.classList.add("hidden");
    });

    confirmDialog.addEventListener("click", () => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      dialog.classList.add("hidden");
    });
  };

  const handleInputChange = (field, value) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
    }
  };

  const filteredUsers =
    searchQuery.trim() === ""
      ? users
      : users.filter((user) =>
          user.fullname?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  function hasEmptyFields(data) {
    for (const key in data) {
      if (data[key] === "" || data[key] === null || data[key] === undefined) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    setUsers(
      userData.map((user) => ({
        ...user,
        fullname: user.first + " " + user.last,
        age: calculateAge(user.dob),
      }))
    );
  }, []);

  return (
    <div className="container mt-4">
      <h1>FactWise Assessment</h1>
      <div className="mb-2">
        <CustomInput
          placeholder="Search user by name..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredUsers.map((user) => (
        <div className="card mb-2" key={user.id}>
          <div
            className="card-header d-flex cursor-pointer align-items-center"
            onClick={() => toggleAccordion(user.id)}
          >
            <div className="user-list-header d-flex align-items-center gap-2 justify-contain-beetween flex-grow-1">
              <img className="icon-logo" src={user?.picture} alt="Icon" />

              {editMode === user.id ? (
                <CustomInput
                  value={editedUser?.fullname || ""}
                  onChange={(e) => {
                    handleInputChange("fullname", e.target.value);
                  }}
                />
              ) : (
                <h5 className="mb-0">{user.fullname}</h5>
              )}
            </div>
            {expandedId === user.id ? "-" : "+"}
          </div>

          {expandedId === user.id && (
            <div className="card-body">
              {editMode === user.id ? (
                <div className="row">
                  <div className="col-sm-4 mb-3">
                    <CustomInput
                      type="number"
                      label={"Age"}
                      value={editedUser?.age || ""}
                      onChange={(e) => {
                        handleInputChange("age", e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-sm-4 mb-3">
                    <CustomSelect
                      label={"Gender"}
                      options={GENDER_OPTIONS}
                      value={editedUser?.gender || ""}
                      onChange={(e) => {
                        handleInputChange("gender", e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-sm-4 mb-3">
                    <CustomInput
                      label={"Country"}
                      value={editedUser?.country || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "country",
                          e.target.value.replace(/[^a-zA-Z\s'-]/g, "")
                        )
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <CustomTextArea
                      label={"Description"}
                      className="form-control"
                      value={editedUser?.description || ""}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </div>
                  <div className="action-btn d-flex justify-content-end gap-2">
                    <button className="fs-4 text-danger" onClick={handleCancel}>
                      <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                    <button
                      className="fs-4"
                      onClick={handleSave}
                      disabled={
                        JSON.stringify(editedUser) ===
                          JSON.stringify(
                            users.find((u) => u.id === editedUser?.id)
                          ) || hasEmptyFields(editedUser)
                      }
                    >
                      <i
                        className={`fa-regular fa-circle-check ${
                          JSON.stringify(editedUser) !==
                            JSON.stringify(
                              users.find((u) => u.id === editedUser?.id)
                            ) && !hasEmptyFields(editedUser)
                            ? "text-success"
                            : ""
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="info-row">
                    <p>
                      Age<strong>{user.age} Years</strong>
                    </p>
                    <p>
                      Gender<strong>{user.gender}</strong>
                    </p>
                    <p>
                      Country
                      <strong>{user.country}</strong>
                    </p>
                  </div>

                  <p className="description">
                    Description
                    <strong>{user.description}</strong>
                  </p>
                  <div className="action-btn">
                    <button
                      id="openDialog"
                      className="text-danger p-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    {user.age > 18 && (
                      <button
                        className="text-primary p-2"
                        onClick={() => handleEdit(user)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <div id="dialog" className="dialog-overlay hidden">
        <div className="dialog-box">
          <p className="dialog-content">Are you sure you want to delete?</p>
          <div className="dialog-buttons">
            <button id="closeDialog" className="dialog-btn">
              Cencel
            </button>
            <button id="confirmDialog" className="dialog-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
