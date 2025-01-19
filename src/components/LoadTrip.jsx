import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const LoadTrip = (props) => {
  const [file, setFile] = useState(null);
  const initialTripDetails = {
    tripName: "",
    startDate: "",
    endDate: "",
    destination: "",
    members: [],
  };
  const [tripDetails, setTripDetails] = useState(initialTripDetails);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Early return if no file is selected
    if (!file) {
      toast.error("No file selected. Please select a file to upload.");
      return;
    }

    try {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const textContent = e.target.result;
          const lines = textContent.split("\n");
          const newDetails = initialTripDetails;

          lines.forEach((line) => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith("TripName:")) {
              newDetails.tripName = trimmedLine.replace("TripName:", "").trim();
            } else if (trimmedLine.startsWith("StartDate:")) {
              newDetails.startDate = trimmedLine
                .replace("StartDate:", "")
                .trim();
            } else if (trimmedLine.startsWith("EndDate:")) {
              newDetails.endDate = trimmedLine.replace("EndDate:", "").trim();
            } else if (trimmedLine.startsWith("Destination:")) {
              newDetails.destination = trimmedLine
                .replace("Destination:", "")
                .trim();
            } else if (trimmedLine.startsWith("Member:")) {
              const memberName = trimmedLine.replace("Member:", "").trim();
              newDetails.members.push(memberName);
            }
          });

          // Update state with the parsed details
          setTripDetails(newDetails);

          // If all went well, show success
          toast.success("Trip loaded successfully!");
        } catch (parseError) {
          // If something went wrong during parsing
          toast.error(
            "Something funky happened. Please try reloading the page."
          );
        }
      };

      // Handle file reading errors
      reader.onerror = () => {
        toast.error("There was an issue loading your file. Please try again.");
      };

      // Start reading the file
      reader.readAsText(file);
    } catch (generalError) {
      // Catch any unexpected errors outside of file reading
      toast.error(
        "Something really funky happened! Please contact the site administrator to resolve this issue."
      );
    }
  };

  return (
    <div className="p-4 bg-gradient-to-b from-teal-500 to-teal-700 h-screen">
      <h1 className="text-2xl text-center text-white font-bold mb-6">
        Upload your Roamzi trip file
      </h1>
      <form
        onSubmit={handleSubmit}
        className="justify-center flex items-center space-x-3 mb-6 mx-auto"
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="block w-full max-w-xs text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Upload
        </button>
      </form>

      <div className="mt-4 w-10/12 mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-white text-center">
          Trip Details Preview:
        </h3>
        <table className="w-full border border-gray-200 table-auto shadow-lg rounded-md overflow-hidden">
          <tbody>
            <tr className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <td className="px-4 py-2 font-medium text-gray-700">Trip Name</td>
              <td className="px-4 py-2 text-gray-600">
                {tripDetails.tripName}
              </td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <td className="px-4 py-2 font-medium text-gray-700">
                Start Date
              </td>
              <td className="px-4 py-2 text-gray-600">
                {tripDetails.startDate}
              </td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <td className="px-4 py-2 font-medium text-gray-700">End Date</td>
              <td className="px-4 py-2 text-gray-600">{tripDetails.endDate}</td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <td className="px-4 py-2 font-medium text-gray-700">
                Destination
              </td>
              <td className="px-4 py-2 text-gray-600">
                {tripDetails.destination}
              </td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <td className="px-4 py-2 font-medium text-gray-700">Members</td>
              <td className="px-4 py-2 text-gray-600">
                {tripDetails.members.map((member, index) => (
                  <div className="hover:bg-green-300" key={index}>
                    {member}
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button
          onClick={() => {
            toast.success("Awesome!"); // Navigate to the trip edit component after updating master trip with tripDetails
            props.setMasterTrip(tripDetails);
            props.setEditTrip(true);
          }}
          className="w-6/12  px-4 mx-auto py-2 bg-green-700 text-white rounded hover:font-extrabold"
        >
          Everything looks right!
        </button>
        <button
          onClick={() => {
            toast.dark(
              "Please contact your group leader or verify you have the latest version of your Roamzi file. Data mismatches can occur if the file is outdated."
            );
            props.setMasterTrip(tripDetails);
          }}
          className="w-6/12  px-4 mx-auto py-2 bg-red-700 text-white rounded hover:font-extrabold"
        >
          Something is wrong!
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoadTrip;
