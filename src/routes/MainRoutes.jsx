import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../screens/User/Home/Home';
import EmailLogin from '../screens/User/Auth/EmailLogin/EmailLogin';
import NewLogin from '../screens/User/Auth/NewLogin/NewLogin';
import Forgot from '../screens/User/Auth/Forgot/Forgot';
import CreatePassword from '../screens/User/Auth/createPassword/CreatePassword';
import Donation from '../screens/User/donation/Donation';
import Auth from '../screens/User/Auth/Auth';
import Profile from '../screens/User/profile/Profile';
import DonationHistory from '../screens/User/donationHistory/DonationHistory1';
import ChangePassword from '../screens/User/ChangePassword/ChangePassword';
import PrivateRoutes from '../components/PrivateRoutes/PrivateRoutes';
import AboutUs from '../screens/User/Aboutus/AboutUs';
import PaymentStatusPage from '../screens/User/PaymentStatusPage/PaymentStatusPage';
import Reciept from '../screens/Admin/Reciept/Reciept';
import ReceiptManual from '../screens/Admin/Reciept/RecieptManual';
import OnlineReceipt from '../screens/Admin/Reciept/OnlineReceipt';
import RoomBooking from '../screens/User/roombookings/RoomBooking';
import DharamDetails from '../screens/User/roombookings/DharamDetails/DharamDetails';
import RoomBookingscreen from '../screens/User/roombookings/RoomBookingscreen/RoomBookingscreen';
import PaymentSuccess from '../screens/User/roombookings/PaymentSuccess/PaymentSuccess';
import DownloadReceipt from '../screens/Admin/Reciept/DownloadReceipt';
import BookingHistory from '../screens/User/roombookings/BookingHistory/BookingHistory1';
import ReceiptBooking from '../screens/User/roombookings/Receipt/ReceiptBooking';
import TearmCondition from '../screens/User/TearmCondition/TearmCondition';

import Bhojnayalay from '../screens/User/Bhojnayalaya/Bhojnayalay';
import PendingBoli from '../screens/User/PendingBoli/PendingBoli1';
import BhojnayalayPayment from '../screens/User/Bhojnayalaya/BhojnalayPaymentStatus';
import BhojnalayReceipt from '../screens/User/Bhojnayalaya/Receipt/BhojnalayReceipt';
import BhojnalatHistory from '../screens/User/Bhojnayalaya/BhojnalayHistory';


function MainRoutes({
  setopendashboard,
  setshowreciept,
  setHeaderFooter,
  paymentId,
  setpaymentId,
  setonlineId,
  onlineId,
  setshowRoomOptions,
  roomfilterdata,
  setroomfilterdata,
}) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home setshowRoomOptions={setshowRoomOptions} />}
        />
        <Route path="/login" element={<EmailLogin />} />
        <Route path="/phonelogin" element={<NewLogin />} />
        <Route path="/forgot" element={<Forgot />} />

        <Route path="/forgetpassword" element={<CreatePassword />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/termsandconditions" element={<TearmCondition />} />
        <Route
          path="/payment-status"
          element={
            <PaymentStatusPage
              setHeaderFooter={setHeaderFooter}
              setpaymentId={setpaymentId}
            />
          }
        />

        <Route
          path="bhojnalay/payment-status"
          element={
            <BhojnayalayPayment
              setHeaderFooter={setHeaderFooter}
              setpaymentId={setpaymentId}
            />
          }
        />

        <Route
          path="bhojnalayreceipt"
          element={
            <BhojnalayReceipt
              setopendashboard={setopendashboard}
              setshowreciept={setshowreciept}
              onlineId={onlineId}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/donation"
          element={
            // route is protected
            <PrivateRoutes>
              <Donation
                setshowreciept={setshowreciept}
                paymentId={paymentId}
                setonlineId={setonlineId}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/donationhistory"
          element={
            <PrivateRoutes>
              <DonationHistory
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
                setHeaderFooter={setHeaderFooter}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/PendingBoli"
          element={
            <PrivateRoutes>
              <PendingBoli
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
                setHeaderFooter={setHeaderFooter}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/bookinghistory"
          element={
            <PrivateRoutes>
              <BookingHistory
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
                setHeaderFooter={setHeaderFooter}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/reciept"
          element={
            <PrivateRoutes>
              <Reciept
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
                onlineId={onlineId}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/onlinereceipt"
          element={
            <PrivateRoutes>
              <OnlineReceipt
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
                onlineId={onlineId}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/manualreceipt"
          element={
            <PrivateRoutes>
              <ReceiptManual
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
              />
            </PrivateRoutes>
          }
        />

        <Route
          path="/roombooking"
          element={<RoomBooking setroomfilterdata={setroomfilterdata} />}
        />

        <Route
          path="/room/ReceiptBookingy"
          element={
            <PrivateRoutes>
              <ReceiptBooking setroomfilterdata={setroomfilterdata} />
            </PrivateRoutes>
          }
        />
        <Route
          path="/Dharamshala/Details/:id"
          element={<DharamDetails roomfilterdata={roomfilterdata} />}
        />

        <Route
          path="/room/booking"
          element={
            <PrivateRoutes>
              <RoomBookingscreen />
            </PrivateRoutes>
          }
        />

        <Route
          path="/bhojnayalay"
          element={
            <Bhojnayalay
              setopendashboard={setopendashboard}
              setshowreciept={setshowreciept}
            />
          }
        />

        <Route
          path="/bhojnalayhistory"
          element={
            <BhojnalatHistory
              setopendashboard={setopendashboard}
              setshowreciept={setshowreciept}
            />
          }
        />




        <Route
          path="/room/paymentsuccessfuly"
          element={
            <PrivateRoutes>
              <PaymentSuccess />
            </PrivateRoutes>
          }
        />

        <Route
          path="downloadreceipt"
          element={
            <PrivateRoutes>
              <DownloadReceipt />
            </PrivateRoutes>
          }
        />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
