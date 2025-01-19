import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const EditTrip = (props) => {
  // Local state to hold editable trip details
  const [tripDetails, setTripDetails] = useState(props.trip);

  // Helper to update individual fields (tripName, startDate, etc.)
  const handleFieldChange = (e) => {
    var { name, value } = e.target;
    if (value === "") {
      let message;
      switch (name) {
        case "tripName":
          message = "Please enter a trip name.";
          value = "My Trip";
          break;
        case "startDate":
          message = "Please enter a start date. Start date has been reset.";
          value = new Date().getFullYear() + "-01-01";
          break;
        case "endDate":
          message = "Please enter an end date. End date has been reset.";
          value = new Date().getFullYear() + "-12-31";
          break;
        case "destination":
          message = "Please enter a destination.";
          value = "Somewhere cool!";
          break;
        default:
          message = "Please fill out all fields.";
          break;
      }
      toast.error(message);
    }
    setTripDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle updating a specific member
  const handleMemberChange = (index, newValue) => {
    const updatedMembers = [...tripDetails.members];
    if (newValue === "") {
      toast.error("Please enter a member name or delete this member.");
      newValue = "New Member";
    }
    updatedMembers[index] = newValue;
    setTripDetails((prev) => ({
      ...prev,
      members: updatedMembers,
    }));
  };

  // Add a new blank member
  const addMember = () => {
    setTripDetails((prev) => ({
      ...prev,
      members: [...prev.members, ""],
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

  // Convert tripDetails to the text file content required by LoadTrip
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

  // Trigger browser download of the .txt file
  const saveTripToFile = () => {
    try {
      const fileContent = generateTripFileContent();
      const blob = new Blob([fileContent], {
        type: "text/plain;charset=utf-8",
      });
      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      link.download = `${tripDetails.tripName || "myTrip"}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);

      toast.success("Trip details have been saved!");
    } catch (error) {
      toast.error("Unable to save trip details to file.");
    }
  };

  return (
    <div className="p-4 bg-gradient-to-b from-teal-500 to-teal-700 min-h-screen">
      <h1 className="text-2xl text-center text-white font-bold mb-6">
        Edit Your Roamzi Trip
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
          onClick={saveTripToFile}
          className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700"
        >
          Save Trip to File
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditTrip;
