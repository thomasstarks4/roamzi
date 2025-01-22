import React, { useState } from "react";
import logo from "../images/Roamzi-logo.jpg";
const Welcome = (props) => {
  const [newUser, setNewUser] = useState(false);
  const [initialQuestionAnswered, setInitialQuestionAnswered] = useState(false);
  return (
    <div className="text-white h-screen">
      <h1 className="font-extrabold bg-gradient-to-b from-teal-400 to-teal-500 text-white p-5 text-center">
        Welcome to Roamzi!
      </h1>
      {/* Do they already have a trip planned? If so, allow user to upload text file to
      load the trip's information. Otherwise, open the trip details component */}
      {!initialQuestionAnswered && (
        <div className="col text-center mt-5">
          <img
            className="w-32 h-auto mx-auto mb-5 transition-transform duration-1000 hover:scale-150 rounded-full"
            src={logo}
            alt="Logo"
          />

          <h2 className="mb-2 font-extrabold">
            Do you already have a trip planned?
          </h2>
          <button
            onClick={() => {
              props.setShowWelcome(false);
              setInitialQuestionAnswered(true);
            }}
            className="px-4 mx-4 py-2 bg-green-700 text-white rounded hover:font-extrabold"
          >
            Yes, I do!
          </button>
          <button
            onClick={() => {
              setNewUser(true);
              setInitialQuestionAnswered(true);
            }}
            className="px-4 mx-4 py-2 bg-yellow-400 text-white rounded hover:font-extrabold"
          >
            Not yet!
          </button>
        </div>
      )}

      {newUser && (
        <div className="col">
          <div className="">
            <img
              className="w-32 h-auto mx-auto my-10 transition-transform duration-1000 hover:scale-150 rounded-full"
              src={logo}
              alt="Logo"
            />
            <div className="text-center">
              <button
                onClick={() => {
                  props.setCreateTrip(true);
                  props.setShowWelcome(false);
                }}
                type="button"
                className="bg-gradient-to-b from-blue-600 to-blue-950 
                        mx-auto mb-5 text-white px-3 py-2 rounded
                        transition-all duration-500
                        hover:font-extrabold hover:px-5 hover:py-3 hover:text-lg"
              >
                Get Started Now
              </button>
            </div>
          </div>
          <div className="bg-emerald-800 outline outline-sky-300 p-5">
            <div className="text-center text-xl font-extrabold p-3 mx-auto w-4/12 bg-gradient-to-b from-teal-600 to-teal-800 rounded">
              What is Roamzi?
            </div>
            <div className="text-white text-center w-9/12 mx-auto mt-3 p-5 bg-slate-500 rounded-lg">
              <b>Roamzi</b> is a collaborative trip-planning platform designed
              to make group travel easy, organized, and enjoyable! Whether
              you're planning a getaway with friends or family, Roamzi offers a
              range of tools to streamline the process, ensuring that everyone
              stays informed and engaged. <br />
              <br />
            </div>
          </div>
          <div className="bg-emerald-800 outline outline-sky-300 p-5">
            <div className="text-lg text-white text-center font-bold mb-5 mx-auto w-4/12 bg-gradient-to-b from-teal-600 to-teal-800 rounded">
              Interactive Trip Planning
            </div>
            <div className="text-white text-center w-10/12 mx-auto">
              <div className="text-white text-center">
                <div className="flex justify-center gap-4">
                  <div className="w-4/12 outline outline-sky-300 p-5">
                    Roamzi allows users to vote for places to visit, ensuring
                    that group decisions are made fairly and everyone has a say
                    in the itinerary.
                  </div>
                  <div className="w-4/12 outline outline-sky-300 p-5">
                    You can coordinate trip finances, track shared expenses, and
                    stay on top of group budgets, removing the hassle of manual
                    calculations.
                  </div>
                  <div className="w-4/12 outline outline-sky-300 p-5">
                    Important notes and references, like reservations,
                    schedules, or local tips, can be added and accessed by
                    everyone in the group.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-emerald-800 outline outline-sky-300 p-5 ">
            <div className=" text-lg text-white text-center font-bold mb-5 mx-auto w-4/12 bg-gradient-to-b from-teal-600 to-teal-800 rounded">
              User Profiles with Avatars
            </div>
            <div className="text-white text-center w-10/12 mx-auto">
              <div className="text-white text-center">
                <div className="flex justify-center gap-4">
                  <div className="w-6/12 outline outline-sky-300 p-5">
                    Users can personalize their experience by selecting
                    AI-generated avatars, adding a fun and unique touch to each
                    profile.
                  </div>
                  <div className="w-6/12 outline outline-sky-300 p-5">
                    Temporary usernames are automatically generated, providing a
                    layer of anonymity while keeping the interface clean and
                    professional.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-emerald-800 outline outline-sky-300 p-5">
            <div className="text-lg text-white text-center font-bold mb-5 mx-auto w-4/12 bg-gradient-to-b from-teal-600 to-teal-800 rounded">
              Secure and Temporary Data Handling
            </div>
            <div className="text-white text-center w-10/12 mx-auto">
              <div className="text-white text-center">
                <div className="flex justify-center gap-4">
                  <div className="w-4/12 outline outline-sky-300 p-5">
                    Roamzi ensures complete privacy and security by hashing
                    passwords, making them unreadable to other members of your
                    trip.
                  </div>
                  <div className="w-4/12 outline outline-sky-300 p-5">
                    All user data is stored temporarily and exclusively in a
                    provided text file, ensuring that no sensitive information
                    is retained outside the user’s control.
                  </div>
                  <div className="w-4/12 outline outline-sky-300 p-5">
                    Data extraction is designed to be simple and transparent.
                    When registering with a group, temporary usernames (like
                    "Vacationee1232134") are assigned.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-emerald-800 outline outline-sky-300 p-5">
            <div className=" text-lg text-white text-center font-bold mb-5 mx-auto w-4/12 bg-gradient-to-b from-teal-600 to-teal-800 rounded">
              Anonymous Voting and Privacy
            </div>
            <div className="text-white text-center w-10/12 mx-auto">
              <div className="text-white text-center">
                <div className="flex justify-center gap-4">
                  <div className="w-6/12 outline outline-sky-300 p-5">
                    Users can toggle anonymous voting for group decisions,
                    ensuring that individual preferences remain private. In this
                    mode, participants are identified by randomly generated
                    identifiers (e.g., "Traveler124578").
                  </div>
                  <div className="w-6/12 outline outline-sky-300 p-5">
                    The group creator handles account coordination and text file
                    management, ensuring that information is distributed
                    securely via email.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="text-center">
            <button
              onClick={() => {
                props.setCreateTrip(true);
                props.setShowWelcome(false);
              }}
              type="button"
              className="bg-gradient-to-b from-blue-600 to-blue-950 
         mx-auto mb-5 text-white px-3 py-2 rounded
         transition-all duration-500
         hover:font-extrabold hover:px-5 hover:py-3 hover:text-lg"
            >
              Get Started Now
            </button>
          </div>
          <div className="text-center bg-gradient-to-b from-teal-600 to-teal-950 col-1 text-white py-2">
            We hope you enjoy using Roamzi!
          </div>
        </div>
      )}
      {props.userRegistered && (
        <div className="col">The user is registered.</div>
      )}
    </div>
  );
};

export default Welcome;
