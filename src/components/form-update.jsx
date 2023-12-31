import React, { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

function FormUpdateEvent() {
  const initialFormState = {
    eventName: "",
    eventCategory: "",
    eventDate: "",
    eventContact: "",
    eventLocation: "",
    eventDescription: "",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [updateEvent, setUpdateEvent] = useState(initialFormState);

  const fetchEvent = async () => {
    const eventRef = doc(db, "events", id);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      setEvent(eventDoc.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateEvent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventRef = doc(db, "events", id);

    try {
      await updateDoc(eventRef, updateEvent);
      alert("Update data berhasil");
      setUpdateEvent(initialFormState);
      navigate("/event-list");
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-75 mt-3 mb-8 flex flex-col items-center">
      <div className="px-[30px] md:px-[100px] md:pt-6 rounded-xl bg-gray-400">
        <div className="flex flex-col items-center">
          <div className=" mb-8 border-b-2 border-[#C98411]">
            <h1 className="text-black font-semi-bold text-ls md:text-3xl">Update event</h1>
          </div>
        </div>
        <div className="flex flex-col items-center text-start">
          <form onSubmit={handleSubmit} className=" md:w-[400px]">
            <div className="mb-6">
              <label htmlFor="eventName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Event Title :
              </label>
              <input
                type="text"
                name="eventName"
                value={updateEvent.eventName}
                onChange={handleUpdateChange}
                placeholder="Enter event Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="eventCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Event Category
              </label>
              <select
                id="eventCategory"
                name="eventCategory"
                value={updateEvent.eventCategory}
                onChange={handleUpdateChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose.</option>
                <option value="Konser">Konser</option>
                <option value="Bazar">Bazar</option>
                <option value="Festival">Festival</option>
                <option value="Seminar">Seminar</option>
              </select>
            </div>
            <br />
            <div className="mb-6">
              <label htmlFor="eventLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Event Location :
              </label>
              <input
                type="text"
                name="eventLocation"
                value={updateEvent.eventLocation}
                onChange={handleUpdateChange}
                placeholder="Enter url gMaps"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="eventDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date Event :
              </label>
              <div className="relative max-w-sm">
                <input
                  id="eventDate"
                  name="eventDate"
                  onChange={handleUpdateChange}
                  value={updateEvent.eventDate}
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="eventContact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contact :
              </label>
              <input
                type="number"
                name="eventContact"
                value={updateEvent.eventContact}
                onChange={handleUpdateChange}
                placeholder="Enter phone/WA number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="eventDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Event Description
              </label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input Description Event..."
                value={updateEvent.eventDescription}
                onChange={handleUpdateChange}
              />
            </div>

            <div className="flex flex-col items-center my-6">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateEvent;
