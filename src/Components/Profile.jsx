import { storage } from "../firebase/config";
import { getAuth } from "firebase/auth";
import Userpics from "./Userpics";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
import { useEffect } from "react";
import { useAuth } from "./../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logoutimg from "../../public/icons8-logout-50.png";
import edit from "../../public/icons8-edit-64 .png";
const Profile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const types = ["image/png", "image/jpeg"];
  const auth = getAuth();
  const user = auth.currentUser;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const changeUserPic = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(null);
      upload(selected, user);
    } else {
      setFile(null);
      setError("please select an image file (png or jpg)");
    }
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setError("Failed to log out");
    }
  }

  async function upload(file, currentUser) {
    const fileRef = ref(storage, currentUser.uid + ".png");

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });
  }
  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user.photoURL]);

  return (
    <div>
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-7/12 px-4 mx-auto">
          <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <img
                src={logoutimg}
                onClick={handleLogout}
                className="mr-0 w-4 xs:w-3 sm:w-3 md:w-7 m-2"
                role="button"
              ></img>

              <div className="  h-auto flex justify-center w-1/3 max-h-2/3 m-auto">
                <div className="image-upload ">
                  <label htmlFor="file">
                    <img
                      role="button"
                      alt="..."
                      src={photoURL}
                      className="shadow-xl  h-auto self-center  border-none  mb-0 profile-img"
                    ></img>
                    <div className="middle">
                      <img src={edit} className="middle-img w-28"></img>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="label-input"
                    onChange={changeUserPic}
                  ></input>
                </div>
              </div>

              <div className="text-center mt-12">
                {user && (
                  <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                    {user.displayName}
                  </h3>
                )}
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <h1 className="w-full font-bold text-lg mb-6">
                    Your Pictures
                  </h1>
                  <div className="w-full lg:w-9/12 px-4">
                    <Userpics></Userpics>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
