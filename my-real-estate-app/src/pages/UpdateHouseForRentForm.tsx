import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Select from "react-select";

export const UpdateHouseForRentForm = () => {
  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  const params = useParams();


  const backendURL = process.env.NODE_ENV === 'production' ? 'https://sharestateback.onrender.com' : 'http://localhost:3000';


  const [formDataForRent, setFormDataForRent] =
    useState<housesForRentInterface>({
      title: "",
      description: "",
      monthlyRent: 0,
      rentalDeposit: 0,
      address: "",
      location: "",
      imageUrl: [],
      year: 0,
      bedrooms: 0,
      bathrooms: 0,
      addedBy: currentUser?.username,
      userEmail: currentUser?.email,
      userId: currentUser?._id || "",
    });

  const [files, setFiles] = useState<File[]>([]);
  const [imageUploadError, setImageUploadError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUpLoading] = useState<boolean>(false);
  const [selectedStatusRent, setSelectedStatusRent] =
    useState<{ value: string; label: string } | null>(null);

  const navigate = useNavigate();

  const updateFormData = (data: housesForRentInterface) => {
    console.log("Updating form data with:", data);
    setFormDataForRent((prevData) => ({
      ...prevData,
      ...data,
    }));
    setSelectedStatusRent(
      data.status ? { value: data.status, label: data.status } : null,
    );
  };

  useEffect(() => {
    console.log("the use effect is running");
    const fetchHousesForRent = async () => {
      const id = params.id;
      console.log("id from the params", id);
      try {
        setLoading(true);
        // console.log('the try block is running and set loading to true')

        const response = await fetch(
          `${backendURL}/api/housesForRent/rent/${id}`
        );

        const data = await response.json();

        // console.log("UPDATE data from the fetch", data);

        // console.log('the data from house for rent with the id is fetched and returned')
        if (data) {
          console.log(
            "in the if statement with data.title set to if data .title update form data is called"
          );
          updateFormData(data);
        }
        setLoading(false);
        return data;
      } catch (error) {
        console.error("Error fetching house for rent:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHousesForRent();
  }, [backendURL, params.id]);

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
        `${backendURL}/api/update-house-for-rent/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            _id: params.id,
            ...formDataForRent,
            status: selectedStatusRent?.value || "",
          }),
        }
      );
      if (res.ok) {
        const updatedData = await res.json();
        // console.log(
        //   "data from the handle submit form to check what info RENT HOUSES I have",
        //   updatedData
        // );

        updateFormData(updatedData);

        setLoading(false);
        console.log("Update successful:", updatedData.message);
      } else {
        setLoading(false);
        const errorData = await res.json();
        console.error("Update failed. Server response:", errorData);
        alert(
          "Failed to update the house. Please check the console for details."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during house update:", error);
      alert(
        "An unexpected error occurred. Please check the console for details."
      );
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
    if (!files) return;
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
  };

  return (
    <div className="max-w-lg  mx-auto mt-10">
      <div className="text-center uppercase  ">
        update the property for rent
      </div>
      <form
        className="flex flex-col gap-3 m-5"
        onSubmit={handleFormForSaleChange}
      >
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="title"
          id="title"
          value={formDataForRent.title}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="description"
          id="description"
          value={formDataForRent.description}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="monthlyRent"
          id="monthlyRent"
          value={formDataForRent.monthlyRent}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="rentalDeposit"
          id="rentalDeposit"
          value={formDataForRent.rentalDeposit}
          onChange={handleFormChange}
        />

        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="address"
          id="address"
          value={formDataForRent.address}
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
            {uploading ? "uploading" : "Upload"}
          </button>
        </div>

        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="built year"
          id="year"
          value={formDataForRent.year}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="bedrooms"
          id="bedrooms"
          value={formDataForRent.bedrooms}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="bathrooms"
          id="bathrooms"
          value={formDataForRent.bathrooms}
          onChange={handleFormChange}
        />
        <p>
          {imageUploadError ? (
            <div className="text-red-500 ">{imageUploadError}</div>
          ) : null}
        </p>
        {formDataForRent.imageUrl.length > 0 ? (
          <div className="flex flex-col gap-2">
            {formDataForRent.imageUrl.map((url, index) => (
              <div key={index} className="flex justify-between">
                <img
                  src={url}
                  alt="listing images"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImages(index)}
                  className="text-red-700 uppercase hover:opacity-75 pr-5"
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        ) : null}
         <Select
          options={[
            {
              value: "onHold",
              label:
                "Set the state of the house to ON HOLD to temporarily reserve it",
            },
            {
              value: "sold",
              label:
                "Set the state of the house to SOLD / The house should be deleted from the list",
            },
            { value: "onSale", label: "Set the state of the house to ON-SALE" },
          ]}
          value={selectedStatusRent}
          onChange={(option) => setSelectedStatusRent(option)}
          placeholder="Set the status of the house"
        />
        <button className="p-5 border rounded-lg uppercase bg-cyan-900 text-white hover:opacity-85 " disabled={loading}>
          update
        </button>
      </form>
    </div>
  );
};
