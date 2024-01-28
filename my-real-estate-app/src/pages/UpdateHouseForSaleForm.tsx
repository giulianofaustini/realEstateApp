import React, { useState, useEffect } from "react";
import { HouseInterface } from "../../../src/interfaces/houseInterface";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import Select from "react-select";


export const UpdateHouseForSaleForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();

  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  // console.log("currentUser from the house for sale form", currentUser);


  const backendURL = process.env.NODE_ENV === 'production' ? 'https://sharestateback.onrender.com' : 'http://localhost:3000';


  const [formDataForSale, setFormDataForSale] = useState<HouseInterface>({
    title: "",
    description: "",
    price: 0,
    address: "",
    location: "",
    imageUrl: [],
    year: 0,
    bedrooms: 0,
    bathrooms: 0,
    addedBy: currentUser?.username,
    userEmail: currentUser?.email,
    userId: currentUser?._id || "",
    status: "",
  });

  const [files, setFiles] = useState<File[] | null>([]);
  const [imageUploadError, setImageUploadError] = useState<string | null>("");
  const [uploading, setUpLoading] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const updateFormData = (data: HouseInterface) => {
    setFormDataForSale((prev) => ({
      ...prev,
      ...data,
    }));
    setSelectedStatus(
      data.status ? { value: data.status, label: data.status } : null
    );
  };

  useEffect(() => {
    const fetchHousesForSale = async () => {
      const id = params.id;
      // console.log("id from the params", id);

      try {
        setLoading(true);
        const res = await fetch(
          `${backendURL}/api/housesForSale/sale/${id}`
        );
        const data = await res.json();
        console.log("UPDATE data from the fetch", data);
        if (data) {
          updateFormData(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHousesForSale();
  }, [params.id]);

  useEffect(() => {
    if (imageUploadError) {
      const timeoutId = setTimeout(() => {
        setImageUploadError(null);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [imageUploadError]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataForSale({
      ...formDataForSale,
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
        `http://localhost:3000/api/update-house-for-sale/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            _id: params.id,
            ...formDataForSale,
            status: selectedStatus?.value || "", 
          }),
        }
      );

      if (res.ok) {
        const updatedData = await res.json();
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
      navigate("/api/housesForSale");
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
        files.length + formDataForSale.imageUrl.length < 7
      ) {
        setUpLoading(true);
        const promises = [];

        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises).then((urls) => {
          setFormDataForSale({
            ...formDataForSale,
            imageUrl: formDataForSale.imageUrl.concat(urls as string[]),
          });
          setImageUploadError(null);
          setUpLoading(false);
        });
      } else {
        setImageUploadError("You can only upload 6 images");
      }
    } catch (error) {
      setImageUploadError("Something went wrong, please try again");
    }
  };

  const handleImageDelete = (index: number) => {
    setFormDataForSale({
      ...formDataForSale,
      imageUrl: formDataForSale.imageUrl.filter((_url, i) => i !== index),
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="text-center uppercase  ">
        update the property for sale
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
          value={formDataForSale.title}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="description"
          id="description"
          value={formDataForSale.description}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="price"
          id="price"
          value={formDataForSale.price}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="address"
          id="address"
          value={formDataForSale.address}
          onChange={handleFormChange}
        />
  
        <div className="flex items-center gap-2 ">
          <input
            className="p-5 border rounded-lg max-h-20"
            type="file"
            placeholder="imageUrl"
            id="imageUrl"
            onChange={handleUploadImagesChange}
            multiple
          />
          <button
            onClick={handleImageSubmit}
            type="button"
            className="p-3 border rounded-full max-h-20 uppercase"
          >
            {uploading ? "uploading" : "upload"}
          </button>
        </div>

        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="year"
          id="year"
          value={formDataForSale.year}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="bedrooms"
          id="bedrooms"
          value={formDataForSale.bedrooms}
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="bathrooms"
          id="bathrooms"
          value={formDataForSale.bathrooms}
          onChange={handleFormChange}
        />
        <p>
          {imageUploadError ? (
            <div className="text-red-500 ">{imageUploadError}</div>
          ) : null}
        </p>
        {formDataForSale.imageUrl.length > 0 ? (
          <div className="flex flex-col gap-2">
            {formDataForSale.imageUrl.map((url, index) => (
              <div key={index} className="flex justify-between">
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleImageDelete(index)}
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
          value={selectedStatus}
          onChange={(option) => setSelectedStatus(option)}
          placeholder="Set the status of the house"
        />
        <button className="p-5 border rounded-lg uppercase bg-cyan-900 text-white hover:opacity-85 " disabled={loading}>
          update
        </button>
      </form>
    </div>
  );
};
