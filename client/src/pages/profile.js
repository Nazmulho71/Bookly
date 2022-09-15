import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import "../assets/css/profile.css";

function Profile() {
  const [profileName, setProfileName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const cookies = new Cookies();
  const token = cookies.get("token");
  let baseUrl = "http://localhost:3000/api";

  const imageUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("selectedImage", selectedImage);
    try {
      const response = await axios({
        method: "post",
        url: "/api/upload/file",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const imageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const updateUser = () => {
    let data = JSON.stringify({
      name,
      email,
      password: newPassword ? newPassword : currentPassword,
    });

    let config = {
      method: "put",
      url: `${baseUrl}/users/6319d82810f03bab358ded74`,
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
        setProfileName(res.data.name);
        setEmail(res.data.email);
      })
      .catch(function (err) {
        setIsLoaded(true);
        console.log(err);
      });
  }, [baseUrl, token]);

  useEffect(() => {
    setName(profileName);
  }, [profileName]);

  useEffect(() => {
    document.title = "My Profile";
  }, []);

  console.log(selectedImage);

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
              <Avatar
                alt={profileName}
                // src={selectedImage && URL.createObjectURL(selectedImage)}
              />
              <div>
                <h2>{profileName}</h2>
                <p>Update your photo and personal details.</p>
              </div>
            </div>

            <div>
              <Button variant="contained">Change Avatar</Button>
              <Button variant="contained">Remove Avatar</Button>
            </div>
            {/* <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            /> */}
            <form onSubmit={imageUpload}>
              <input type="file" onChange={imageSelect} />
              <input type="submit" value="Upload File" />
            </form>
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
            <Button variant="outlined">Cancel</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
