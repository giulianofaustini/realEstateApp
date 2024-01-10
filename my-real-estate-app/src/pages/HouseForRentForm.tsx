import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { housesForRentInterface } from "../../../src/interfaces/housesForRentInterface";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


export const HouseForRentForm = () => {
  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));
  const [formDataForRent, setFormDataForRent] =
    useState<housesForRentInterface>({
      title: "",
      description: "",
      monthlyRent: 0,
      rentalDeposit: 0,
      address: "",
      location: "",
      imageUrl: [],
      agent: "",
      bedrooms: 0,
      bathrooms: 0,
      addedBy: currentUser?.username,
    });
  console.log("data from the form", formDataForRent);

  const [files, setFiles] = useState<File[]>([]);
  console.log("files form HouseForRentForm at state level ", files);

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataForRent({
      ...formDataForRent,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormForSaleChange = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/create-house-for-rent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formDataForRent),
        }
      );

      const data = await res.json();
      console.log(
        "data from the handle submit form to check what info RENT HOUSES I have",
        data
      );

      if (data.ok) {
        setFormDataForRent({
          title: "",
          description: "",
          monthlyRent: 0,
          rentalDeposit: 0,
          address: "",
          location: "",
          imageUrl: [],
          agent: "",
          bedrooms: 0,
          bathrooms: 0,
        });
        setLoading(false);
        console.log(data.message);
      } else {
        setLoading(false);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      navigate("/api/housesForRent");
    }
  };

  const storeImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot: { bytesTransferred: number; totalBytes: number }) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error ) => {
          reject(error);
        },
        async () => {
          try {
            const uploadResult = await uploadTask;
            const downloadURL = await getDownloadURL(uploadResult.ref);
            const newImageUrl = {
              url: downloadURL,
            };
            resolve(newImageUrl.url); // Resolving with the URL string
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };


  const handleImageSubmit = () => {
    if (!files || files.length === 0) return;
    if (files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormDataForRent({
          ...formDataForRent,
          imageUrl: formDataForRent.imageUrl.concat(urls),
        });
      });
    } else {
      alert("Please upload between 1 and 6 images");
    }
  };

  return (
    <div className="max-w-lg  mx-auto mt-10">
      <form
        className="flex flex-col gap-3 m-5"
        onSubmit={handleFormForSaleChange}
      >
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="title"
          id="title"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="description"
          id="description"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="monthlyRent"
          id="monthlyRent"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="rentalDeposit"
          id="rentalDeposit"
          onChange={handleFormChange}
        />

        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="address"
          id="address"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="location"
          id="location"
          onChange={handleFormChange}
        />

        <div className="flex items-center gap-2 h-auto">
          <input
            className="p-7 border rounded-lg "
            type="file"
            placeholder="imageUrl"
            id="imageUrl"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            onClick={handleImageSubmit}
            type="button"
            className="p-5 border rounded-full"
          >
            Upload
          </button>
        </div>

        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="agent"
          id="agent"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="bedrooms"
          id="bedrooms"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="bathrooms"
          id="bathrooms"
          onChange={handleFormChange}
        />
        <button className="p-5 border rounded-lg" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};



// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read,
//       write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }