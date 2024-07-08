import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchContainer from "../SearchContainer";

const Appointment = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://zummit-chandan.onrender.com/api/therapist/gettherapistAppointmentLists"
      )
      .then((response) => {
        if (response.data.success) {
          setAppointmentsList(response.data.therapistAppointmentData);
        } else {
          console.error("Failed to fetch appointments");
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const cancelledStyle = { color: "#B00202" };
  const completedStyle = { color: "#02B04A" };
  const upcomingStyle = { color: "#02B04A" };
  const getStyle = (report) => {
    switch (report) {
      case "Cancelled":
        return cancelledStyle;
      case "Completed":
        return completedStyle;
      case "Upcoming":
        return upcomingStyle;
      default:
        return {};
    }
  };
  const getButtonBgColor = (report) => {
    switch (report) {
      case "Cancelled":
        return "#B00202";
      case "Completed":
        return "#0190B1";
      case "Upcoming":
        return "#FED365";
      default:
        return "#0190B1";
    }
  };
  const getReasonColor = (report) => {
    switch (report) {
      case "Cancelled":
        return "#B00202";
      case "Upcoming":
        return "#02B04A";
      default:
        return "#001519";
    }
  };

  const BtnHandler = () => {
    setShowSort(!showSort);
  };
  const handleSortClick = (selected) => {
    setSelectedSort(selected);
  };
  return (
    <div className="w-full px-10 bg-[#F2FCFF]">
      <SearchContainer />
      <div className="flex w-[90%] justify-between items-center">
        <h1 className="font-medium text-3xl leading-10 my-6">Appointments</h1>
      </div>

      <div className="p-4 w-[90%] rounded-lg bg-white text-xl leading-6 font-medium text-black shadow-lg">
        <div className="w-full bg-[#DCDCDD] mb-4 rounded-lg p-2 flex gap-2 items-center">
          <h1 className="w-[18%] ">Client Name</h1>
          <h1 className="w-[18%]">Appointment Time</h1>
          <h1 className="w-[18%]">Therapy type</h1>
          <h1 className="w-[10%] text-end">Amount</h1>
          <h1 className="w-[14%]">Status</h1>
          <h1>Reason</h1>
        </div>

        <div className="h-[100vh] mt-2 overflow-y-scroll">
          {appointmentsList.map((item) => (
            <div className="flex gap-2 w-full p-2 text-lg rounded-lg ">
              <div className="w-[18%]">
                <h1>{item.clientName}</h1>
              </div>
              <div className="w-[18%]">
                <h1>{item.appointmentTime.date}</h1>
                <p className="text-[#1e3f47] text-sm font-light">
                  <span>{item.appointmentTime.time}</span>
                </p>
              </div>
              <h1 className="w-[18%]">{item.therapyType}</h1>
              <h1 style={getStyle(item.report)} className="w-[5rem] text-end ">
                {item.amount}
              </h1>
              <div className="w-[10%]">
                <button
                  style={{ backgroundColor: getButtonBgColor(item.report) }}
                  className="py-1 rounded-md w-[6.5rem]"
                >
                  {item.report}
                </button>
              </div>
              <h1
                style={{ color: getReasonColor(item.report) }}
                className="w-[14%]"
              >
                {item.reason}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
