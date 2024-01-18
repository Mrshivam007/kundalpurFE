import { backendApiUrl } from "../config/config";


const apikey = "rzp_test_vDtYuuL3iHbPDn";
const secereate = "Rd0Jc7RkBjGGNDcJG53gJ0GB";

let responsedata = {};
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";
export const displayRazorpay = async (
  { ammount, userid },
  callback
) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }
  const data = await fetch(
    `${backendApiUrl}payment/razorpay?ammount=` + ammount,
    {
      method: "POST",
    }
  ).then((t) => t.json());
  const options = {
    key: apikey,
    currency: data.currency,
    amount: data.amount.toString(),
    order_id: data.id,
    name: "Find My Next Subscribation",
    description: "Thank you for nothing. Please give us some money",
    image: `https://content.jdmagicbox.com/comp/damoh/e2/9999p7812.7812.200629001645.j6e2/catalogue/kundalpur-digambar-jain-temple-damoh-jain-temples-5jhvdldtbb-250.jpg`,
    handler: function (response) {
      callback(response);
    },
    prefill: {
      id: userid,
      ammount,
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
