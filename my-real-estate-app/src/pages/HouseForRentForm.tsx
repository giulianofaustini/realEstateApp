import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { housesForRentInterface } from "../../../src/interfaces/housesForRentInterface";

export const HouseForRentForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formDataForRent, setFormDataForRent] =
    useState<housesForRentInterface>({
      title: "",
      description: "",
      monthlyRent: 0,
      rentalDeposit: 0,
      address: "",
      location: "",
      imageUrl: "",
      agent: "",
      bedrooms: 0,
      bathrooms: 0,
    });

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
          imageUrl: "",
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
        <input
          className="p-5 border rounded-lg"
          type="text"
          placeholder="imageUrl"
          id="imageUrl"
          onChange={handleFormChange}
        />
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
