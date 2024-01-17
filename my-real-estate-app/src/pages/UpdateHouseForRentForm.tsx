import React, { useState , useEffect} from "react";

import { useNavigate , useParams } from "react-router-dom";
import { housesForRentInterface } from "../../../src/interfaces/housesForRentInterface";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";


export const UpdateHouseForRentForm = () => {
  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  const params = useParams();

//   console.log("current user from the form", currentUser);
//   console.log("current user from the form", currentUser?._id);

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
      userEmail: currentUser?.email,
      userId: currentUser?._id || "",
    });
//   console.log("data from the form", formDataForRent);

  const [files, setFiles] = useState<File[]>([]);
//   console.log("files form HouseForRentForm at state level ", files);

  const [imageUploadError, setImageUploadError] = useState<string | null>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUpLoading] = useState<boolean>(false);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchHousesForRent = async () => {
        const id = params.id;

        console.log("id from the params", id);

    }
    fetchHousesForRent();
  }, []);


  useEffect(() => {
    if (imageUploadError) {
      const timeoutId = setTimeout(() => {
        setImageUploadError(null);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [imageUploadError]);

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
          userId: currentUser?._id || "",
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


  const handleUploadImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFiles(files ? Array.from(files) : []);

    console.log("files", files);
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const uploadResult = await uploadTask;
            const downloadURL = await getDownloadURL(uploadResult.ref);
            const newImageUrl = {
              url: downloadURL,
            };
            resolve(newImageUrl.url);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const handleImageSubmit = () => {
    if (!files ) return;
    try {
      if (
        files.length > 0 &&
        files.length + formDataForRent.imageUrl.length < 7
      ) {
        setUpLoading(true);
        const promises = [];

        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises).then((urls) => {
          setFormDataForRent({
            ...formDataForRent,
            imageUrl: formDataForRent.imageUrl.concat(urls as string[]),
          });
          setImageUploadError(null);
          setUpLoading(false);
        });
      } else {
        setImageUploadError("Please upload between 1 and 6 images");
      }
    } catch (error) {
      setImageUploadError("Something went wrong, please try again");
    }
  };

  const handleRemoveImages = (index: number) => {
    setFormDataForRent({
      ...formDataForRent,
      imageUrl: formDataForRent.imageUrl.filter((_url, i) => i !== index),
    });

  }



  return (
    <div className="max-w-lg  mx-auto mt-10">
         <div className="text-center uppercase  ">update the property for rent</div>
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
            onChange={handleUploadImagesChange}
          />
          <button
          disabled={uploading}
            onClick={handleImageSubmit}
            type="button"
            className="p-5 border rounded-full"
          >
           { uploading ? 'uploading' :  'Upload' }
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
        <p>
        {imageUploadError ? (
          <div className="text-red-500 ">{imageUploadError}</div>
        ) : null}
        </p>
        { formDataForRent.imageUrl.length > 0 ? (
          <div className="flex flex-col gap-2">
            {formDataForRent.imageUrl.map((url, index) => (
              <div className="flex justify-between">
                <img key={index} src={url} alt="listing images"  className="w-20 h-20 object-contain rounded-lg"/>
                <button onClick={() => handleRemoveImages(index)} className="text-red-700 uppercase hover:opacity-75 pr-5">delete</button>
              </div>
            ))}
          </div>
        ) : null} 
        <button className="p-5 border rounded-lg uppercase" disabled={loading}>
          update
        </button>
    
      </form>
    </div>
  );
};
