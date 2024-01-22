import React, { useEffect, useState } from "react";
import { HouseInterface } from "../../../src/interfaces/houseInterface";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import loadGoogleMapsApi from "load-google-maps-api";

import Select from "react-select";

export const HouseForSaleForm = ({
  onSubmitForm,
}: {
  onSubmitForm: (status: string | null) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  console.log("currentUser from the house for sale form", currentUser);

  const [formDataForSale, setFormDataForSale] = useState<HouseInterface>({
    title: "",
    description: "",
    price: 0,
    address: "",
    location: "",
    imageUrl: [],
    agent: "",
    bedrooms: 0,
    bathrooms: 0,
    addedBy: currentUser?.username,
    userEmail: currentUser?.email,
    userId: currentUser?._id || "",
    status: "",
  });

  console.log("data from the form", formDataForSale);

  // setState for status of the house

  const [selectedStatus, setSelectedStatus] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [files, setFiles] = useState<File[] | null>([]);
  console.log("files form HouseForSaleForm at state level ", files);

  const [imageUploadError, setImageUploadError] = useState<string | null>("");
  const [uploading, setUpLoading] = useState<boolean>(false);

  // set address and map state

  const [address, setAddress] = useState<string>("");
  const [mapsLoaded, setMapsLoaded] = useState<boolean>(false);

  // load google maps api

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const googleMaps = await loadGoogleMapsApi({
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
          libraries: ["places"],
        });
        setMapsLoaded(true);
        console.log("RENT STATUS in GoogleMaps", googleMaps);
      } catch (error) {
        console.log("Error loading Google Maps API", error);
      }
    };
    loadGoogleMaps();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        "http://localhost:3000/api/create-house-for-sale",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formDataForSale),
        }
      );

      const data = await res.json();
      console.log(
        "data from the handle submit form to check what info I have",
        data
      );

      if (data.ok) {
        setFormDataForSale({
          title: "",
          description: "",
          price: 0,
          address: "",
          location: "",
          imageUrl: [],
          agent: "",
          bedrooms: 0,
          bathrooms: 0,
          userId: currentUser?._id || "",
          status: "",
        });
        setLoading(false);
        if (selectedStatus) {
          onSubmitForm(selectedStatus.value);
        }
        console.log(data.message);
      } else {
        setLoading(false);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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

  const handleSelect = async (selectedAddress: string) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);

      setFormDataForSale({
        ...formDataForSale,
        address: selectedAddress,
        location: `${latLng.lat}, ${latLng.lng}`,
      });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
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
        <textarea
          className="p-5 border rounded-lg"
          placeholder="description"
          id="description"
          onChange={handleFormChange}
          style={{ height: "150px", width: "100%" }}
        />
        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="price"
          id="price"
          onChange={handleFormChange}
        />

        {mapsLoaded && (
          <PlacesAutocomplete
            value={address}
            onChange={handleAddressChange}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Type and Select The Address",
                    className: "p-5 border rounded-lg w-full",
                  })}
                />
                <div>
                  {loading ? <div> choose the address</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "##22d3ee" : "#fff",
                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
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
        {/* select options for selctedSTate */}

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
            { value: "onSale", label: "Set the state of the house to ONSALE" },
          ]}
          value={selectedStatus}
          onChange={(option) => setSelectedStatus(option)}
          placeholder="Set the status of the house"
        />

        <button className="p-5 border rounded-lg" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};
