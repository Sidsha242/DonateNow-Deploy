import React from "react";
import app from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import userImg from "../images/preview.png";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const DashTitle = (props) => {
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState(props.userImage);

  async function handleImageChange(e) {
    const image = e.target.files[0];
    if (image) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setImageURL(downloadURL);
        upload(downloadURL);
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    }
  }

  const upload = (downloadURL) => {
    //console.log(uploading);
    //console.log(downloadURL);
    axiosPrivate
      .post(
        "/user/uploadImage",
        {
          user_id: props.user_id,
          image: downloadURL,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.auth?.token}`,
          },
        }
      )
      .then((response) => {
        //console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="flex flex-row space-x-5 p-2 bg-white rounded-md items-center justify-center">
        <div className="flex flex-col space-y-2">
          {imageURL ? (
            <img
              src={imageURL}
              alt="user-img"
              className="h-32 w-32 rounded-full"
            ></img>
          ) : (
            <img src={userImg} alt="user-img" className="h-32 w-32"></img>
          )}
          <label>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="block border border-gray-300 rounded-lg p-1 text-center cursor-pointer">
              {uploading ? "Uploading" : "Edit"}
            </span>
          </label>
        </div>
        <h1 className="flex flex-col">
          <span className="text-5xl">Welcome</span>{" "}
          <span className="font-bold text-3xl">{props.firstName}</span>{" "}
        </h1>
      </div>
    </div>
  );
};

export default DashTitle;
