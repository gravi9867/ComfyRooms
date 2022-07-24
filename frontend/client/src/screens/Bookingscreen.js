import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Loader from "../components/Loader";
import Error from "../components/Error";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({ duration: 1000 });

function Bookingscreen() {
  const { roomid } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const totaldays =
    moment
      .duration(
        moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"))
      )
      .asDays() + 1;

  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    (async function () {
      if (!localStorage.getItem("currentUser")) {
        window.location.href = "/login";
      }

      try {
        setloading(true);
        const data = await (
          await axios.post("/api/rooms/getroombyid", { roomid })
        ).data;
        settotalamount(data.rentperday * totaldays);

        setroom(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    })();
  }, []);
  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
    };

    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
    } catch (error) {}
  }

  return (
    <div className="m-5" data-aos="flip-left">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-6 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg"></img>
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <p>
                  <b>Name : </b>
                  <b style={{ color: "red" }}>
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </b>
                </p>

                <p>
                  <b>From Date : </b>
                  {fromdate}
                </p>

                <p>
                  <b>To Date : </b>
                  {todate}
                </p>

                <p>
                  <b>Max Count : </b>
                  {room.maxcount}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />

                <p>
                  <b>Total days : </b>
                  {totaldays}
                </p>

                <p>
                  <b>Rent per day : </b>
                  {room.rentperday}
                </p>

                <p>
                  <b>Total Amount : </b>
                  <b style={{ color: "red" }}>{totalamount}</b>
                </p>
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51LKiTJSCa1TKFiKy4BVVnnC4MjORVXOCVufnfbH8mouYezAGDeSF1VuHjAGEIyefAh93MFmIjEj7P66AOlvesq9O00MJ5LBW1C"
                >
                  <button className="btn btn-primary">Pay Now </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
export default Bookingscreen;
