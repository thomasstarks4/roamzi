import { useState } from "react";
import Welcome from "./components/Welcome";
import LoadTrip from "./components/LoadTrip";
import EditTrip from "./components/EditTrip";
import CreateTrip from "./components/CreateTrip";

function App() {
  const [userRegistered, setUserRegistered] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [superUser, setSuperUser] = useState({
    email: "",
    password: "",
    groupName: "",
    groupPassword: "",
  });
  const [trip, setTrip] = useState({
    tripName: "",
    startDate: "",
    endDate: "",
    destination: "",
    members: [],
  }); // This will be the master trip object that will be passed down to all components

  const [editTrip, setEditTrip] = useState(false);
  const [createTrip, setCreateTrip] = useState(false);
  const setMasterUser = (user) => {
    setSuperUser(user);
  };

  const setMasterTrip = (trip) => {
    setTrip(trip);
  };

  return (
    <div>
      {showWelcome ? (
        <Welcome
          userRegistered={userRegistered}
          setUserRegistered={setUserRegistered}
          setMasterUser={setMasterUser}
          setShowWelcome={setShowWelcome}
          createTrip={createTrip}
          setCreateTrip={setCreateTrip}
        />
      ) : editTrip ? (
        <EditTrip trip={trip} setMasterTrip={setMasterTrip} />
      ) : createTrip ? (
        <CreateTrip
          trip={trip}
          setMasterTrip={setMasterTrip}
          masterUser={superUser}
          setMasterUser={setMasterUser}
          setShowWelcome={setShowWelcome}
        />
      ) : (
        <LoadTrip
          trip={trip}
          setMasterTrip={setMasterTrip}
          masterUser={superUser}
          setMasterUser={setMasterUser}
          setEditTrip={setEditTrip}
        />
      )}
    </div>
  );
}

export default App;
