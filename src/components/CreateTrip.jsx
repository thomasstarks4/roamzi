import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const CreateTrip = () => {
  // Default empty/new trip details
  const initialTripDetails = {
    tripName: "My Trip",
    startDate: new Date().getFullYear() + "-01-01",
    endDate: new Date().getFullYear() + "-12-31",
    destination: "Somewhere Cool!",
    members: ["New Member"],
  };
  const [tripDetails, setTripDetails] = useState(initialTripDetails);

  // Helper to update individual fields (tripName, startDate, etc.)
  const handleFieldChange = (e) => {
    let { name, value } = e.target;

    setTripDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle updating a specific member
  const handleMemberChange = (index, newValue) => {
    const updatedMembers = [...tripDetails.members];
    updatedMembers[index] = newValue;
    setTripDetails((prev) => ({
      ...prev,
      members: updatedMembers,
    }));
  };

  // Add a new member
  const addMember = () => {
    setTripDetails((prev) => ({
      ...prev,
      members: [...prev.members, initialTripDetails.members[0]],
    }));
  };

  // Remove a member at a given index
  const removeMember = (index) => {
    const updatedMembers = [...tripDetails.members];
    updatedMembers.splice(index, 1);
    setTripDetails((prev) => ({
      ...prev,
      members: updatedMembers,
    }));
  };

  // Convert tripDetails to the text file content
  const generateTripFileContent = () => {
    const lines = [];
    lines.push(`TripName: ${tripDetails.tripName}`);
    lines.push(`StartDate: ${tripDetails.startDate}`);
    lines.push(`EndDate: ${tripDetails.endDate}`);
    lines.push(`Destination: ${tripDetails.destination}`);
    tripDetails.members.forEach((member) => {
      lines.push(`Member: ${member}`);
    });
    return lines.join("\n");
  };

  const saveTripToFile = () => {
    // Simple validation/checks for empty fields
    let message = "";
    let tempDetails = tripDetails;
    // Check if any fields are empty or are the same as the initial trip details
    for (let i = 0; i < Object.keys(tripDetails).length; i++) {
      if (
        tempDetails.tripName === "" ||
        tempDetails.tripName === initialTripDetails.tripName
      ) {
        let error = "Please enter a trip name.";
        if (!message.includes(error)) message += error;
      }
      if (tempDetails.startDate === "") {
        let error = "Please enter a start date.";
        if (!message.includes(error)) message += error;
        tempDetails.startDate = initialTripDetails.startDate;
      }
      if (tempDetails.endDate === "") {
        let error = "Please enter an end date.";
        if (!message.includes(error)) message += error;
        tempDetails.endDate = initialTripDetails.endDate;
      }
      if (
        tempDetails.destination === "" ||
        tempDetails.destination === initialTripDetails.destination
      ) {
        let error = "Please enter a destination.";
        if (!message.includes(error)) message += error;
        tempDetails.destination = initialTripDetails.destination;
      }
    }
    if (tripDetails.members.length >= 1) {
      let error = validateTripMembers();
      if (error !== "") {
        if (!message.includes(error)) message += error;
        tempDetails.members = initialTripDetails.members;
      }
    } else {
      let error = "Please add at least one member to your trip.";
      if (!message.includes(error)) message += error;
      tempDetails.members = initialTripDetails.members;
    }
    if (tempDetails !== tripDetails) {
      setTripDetails(tempDetails);
    } else if (tempDetails === initialTripDetails) {
      toast.error("You haven't made any changes to save.");
      return;
    }
    if (message !== "") {
      var errors = message.split(".");
      errors.forEach((error) => {
        if (error.length < 5) return;
        else {
          toast.error(error + ".");
        }
      });
      return;
    }

    try {
      // Trigger browser download of the .txt file
      const fileContent = generateTripFileContent();
      const blob = new Blob([fileContent], {
        type: "text/plain;charset=utf-8",
      });
      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      link.download = `${tripDetails.tripName || "myTrip"}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);

      toast.success("New trip details have been saved!");
    } catch (error) {
      toast.error("Unable to save trip details to file.");
    }
  };

  const validateTripMembers = () => {
    let error = "";
    tripDetails.members.forEach((member, index) => {
      if (
        member.toString().trim() === "" ||
        member.toString().trim() === "New Member"
      ) {
        error += `Please enter a member name for ${
          tripDetails.members.length > 1 ? "(or delete)" : ""
        }  member #${index + 1}.`;
      }
    });
    return error;
  };
  return (
    <div className="p-4 bg-gradient-to-b from-teal-500 to-teal-700 min-h-screen">
      <h1 className="text-2xl text-center text-white font-bold mb-6">
        Create a New Roamzi Trip
      </h1>
      <div className="w-11/12 max-w-2xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Trip Name:</label>
          <input
            type="text"
            name="tripName"
            id="tripName"
            value={tripDetails.tripName}
            onChange={handleFieldChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter Trip Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Start Date:</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={tripDetails.startDate}
            onChange={handleFieldChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">End Date:</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={tripDetails.endDate}
            onChange={handleFieldChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Destination:</label>
          <input
            type="text"
            name="destination"
            id="destination"
            value={tripDetails.destination}
            onChange={handleFieldChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter Destination"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Members:</label>
          {tripDetails.members.map((member, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded p-2"
                placeholder="Member name"
                required
              />
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addMember}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            + Add Member
          </button>
        </div>

        <button
          onClick={() => {
            saveTripToFile();
          }}
          className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700"
        >
          Save Trip to File
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateTrip;
