import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
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
import { getAuth } from "firebase/auth";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import loadGoogleMapsApi from "load-google-maps-api";

import Select from "react-select";

export const HouseForRentForm = ({
  onSubmitForm,
}: {
  onSubmitForm: (status: string | null) => void;
}) => {
  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  const authInstance = getAuth(app);

  const backendURL =
    process.env.NODE_ENV === "production"
      ? "https://sharestateback.onrender.com"
      : "http://localhost:3000";

  console.log("current user from the form", currentUser);
  console.log("current user from the form", currentUser?._id);

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
      status: "",
    });
  console.log("data from the form", formDataForRent);

  // setState for status of the house

  const [selectedStatusRent, setSelectedStatusRent] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [address, setAddress] = useState<string>("");
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  console.log("files form HouseForRentForm at state level ", files);

  const [imageUploadError, setImageUploadError] = useState<string | null>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUpLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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
        console.error("Error loading Google Maps API:", error);
      }
    };
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (imageUploadError) {
      const timeoutId = setTimeout(() => {
        setImageUploadError(null);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [imageUploadError]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      if (currentUser) {
        const res = await fetch(`${backendURL}/api/create-house-for-rent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formDataForRent,
            status: selectedStatusRent?.value,
          }),
        });

        const data = await res.json();
        if (data.ok) {
          setFormDataForRent({
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
            userId: currentUser?._id || "",
          });
          setLoading(false);
          if (selectedStatusRent) {
            onSubmitForm(selectedStatusRent.value);
          }

          console.log(data.message);
        } else {
          setLoading(false);
          alert(data.message);
        }
      } else {
        console.log("User is not authenticated");
        setLoading(false);
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
    const userToken = authInstance.currentUser;
    console.log("TOKEN userToken from the form", userToken);
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
        setUpLoading(false);
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

  const handleSelect = async (selectedAddress: string) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);

      setFormDataForRent({
        ...formDataForRent,
        address: selectedAddress,
        location: `${latLng.lat}, ${latLng.lng}`,
      });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
  };

  return (
    <div className="max-w-lg  mx-auto mt-10">
      <div className="text-start pl-6 text-cyan-950 uppercase">
        add a property <span className="font-bold"> for rent </span> to the
        listing
      </div>
      <form
        className="flex flex-col gap-3 m-5"
        onSubmit={handleFormForSaleChange}
      >
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="Insert the title of your listing"
          id="title"
          onChange={handleFormChange}
        />
        <textarea
          className="p-5 border rounded-lg"
          placeholder="Insert a detailed description of the house"
          id="description"
          onChange={handleFormChange}
          style={{ height: "150px", width: "100%" }}
        />
        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="MonthlyRent"
          id="monthlyRent"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="RentalDeposit"
          id="rentalDeposit"
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
                  {loading ? <div>choose the address </div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#22d3ee" : "#fff",
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
            className="p-5 border rounded-full bg-red-600 text-white uppercase"
          >
            {uploading ? (
              <span className=" text-cyan-950 ">'uploading'</span>
            ) : (
              "Upload"
            )}
          </button>
        </div>

        <input
          className="p-5 border rounded-lg"
          type="number"
          placeholder="Built year ... ex: 1990"
          id="year"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="How many bedrooms?"
          id="bedrooms"
          onChange={handleFormChange}
        />
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="How many bathrooms?"
          id="bathrooms"
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
              <div className="flex justify-between">
                <img
                  key={index}
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
          value={selectedStatusRent}
          onChange={(option) => setSelectedStatusRent(option)}
          placeholder="Set the status of the house"
        />

        <button
          className="p-5 border rounded-lg uppercase bg-cyan-900 text-white hover:opacity-85 "
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
