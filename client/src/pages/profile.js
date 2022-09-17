import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import UpdateAvatarModal from "../components/Profile/UpdateAvatarModal";
import DeleteAvatarModal from "../components/Profile/DeleteAvatarModal";
import "../assets/css/profile.css";

function Profile() {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profile, setProfile] = useState("");
  const [profileName, setProfileName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("token");
  const decoded = jwt_decode(token);
  let baseUrl = "http://localhost:3000/api";
  let firstLetter = profileName?.charAt(0);

  const updateUser = () => {
    let data = JSON.stringify({
      profilePic: deleteModalOpen ? profileName : profilePic,
      name,
      email,
      password: newPassword ? newPassword : currentPassword,
    });

    let config = {
      method: "put",
      url: `${baseUrl}/users/${decoded._id}`,
      headers: {
        "X-Auth-Token": token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    let config = {
      method: "get",
      url: `${baseUrl}/users`,
      headers: { "X-Auth-Token": token },
    };

    axios(config)
      .then(function (res) {
        setIsLoaded(true);
        setProfile(res.data.profilePic);
        setProfileName(res.data.name);
        setEmail(res.data.email);
        localStorage.setItem("profilePic", res.data.profilePic);
      })
      .catch(function (err) {
        setIsLoaded(true);
        console.log(err);
      });
  }, [baseUrl, token]);

  useEffect(() => {
    setProfilePic(profile);
    setName(profileName);
  }, [profile, profileName]);

  useEffect(() => {
    document.title = "My Profile";
  }, []);

  return (
    <div className="profile">
      {!isLoaded ? (
        <div className="book__loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <h1>Edit your Profile</h1>
          <hr />

          <div className="profile__avatar">
            <div>
              {profile ? (
                <Avatar
                  alt={firstLetter}
                  src={profile}
                  onError={() => setProfile("")}
                />
              ) : (
                <Avatar sx={{ background: "#f2709b", fontSize: 40 }}>
                  {firstLetter}
                </Avatar>
              )}
              <div>
                <h2>{profileName}</h2>
                <p>Update your photo and personal details.</p>
              </div>
            </div>

            <div>
              <Button
                variant="contained"
                onClick={() => setUpdateModalOpen(true)}
              >
                Change Avatar
              </Button>
              <Button
                variant="contained"
                onClick={() => setDeleteModalOpen(true)}
              >
                Remove Avatar
              </Button>
            </div>

            {updateModalOpen && (
              <UpdateAvatarModal
                updateModalOpen={updateModalOpen}
                setUpdateModalOpen={setUpdateModalOpen}
                setProfilePic={setProfilePic}
                updateUser={updateUser}
              />
            )}

            {deleteModalOpen && (
              <DeleteAvatarModal
                deleteModalOpen={deleteModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
                updateUser={updateUser}
              />
            )}
          </div>

          <div className="profile__details">
            <div>
              <h3>Name:</h3>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <h3>Email:</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <h3>Password:</h3>
              <input
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <div>
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="profile__buttons">
            <Button
              variant="contained"
              onClick={() => updateUser()}
              disabled={
                !name ||
                !email ||
                !currentPassword ||
                newPassword !== confirmPassword
              }
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/")}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
