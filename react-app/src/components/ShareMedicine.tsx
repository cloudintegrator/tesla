import { Medicine } from "../api/types/medicine";
import { postMedicine } from "../api/medicines/post-medicines";
import { useAuthContext } from "@asgardeo/auth-react";
import { useState } from "react";

const ShareMedicine = (props) => {
  const { getAccessToken, getBasicUserInfo } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  async function handleShareMedicine(e) {
    e.preventDefault();
    const medicine_name = document.getElementById(
      "medicine_name"
    ) as HTMLInputElement;
    const medicine_qty = document.getElementById(
      "medicine_qty"
    ) as HTMLInputElement;
    const medicine_validity = document.getElementById(
      "medicine_validity"
    ) as HTMLInputElement;
    
    

    let created_date = new Date();
    let created_date_day = addLeadingZero(created_date.getDate());
    let created_date_month = addLeadingZero(created_date.getMonth());
    let created_date_year = created_date.getFullYear();

    let x = new Date(medicine_validity.value);
    let m = addLeadingZero(x.getMonth()+1);
    let d = addLeadingZero(x.getDate());
    let y = x.getFullYear();

    const user = await getBasicUserInfo();
    const accessToken = await getAccessToken();

    const med: Medicine = {
      email: user?.username,
      created:
        created_date_year + "-" + created_date_month + "-" + created_date_day,
      medicine_name: medicine_name.value?.toUpperCase(),
      medicine_qty: Number(medicine_qty.value),
      medicine_validity: y + "-" + m + "-" + d,
      expired: false,
    };

    setIsLoading(true);
    postMedicine(accessToken, med)
      .then((res) => {
        console.log(res);
        props.toggle();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
        medicine_name.value="";
        medicine_qty.value="";
        
      });
  }
  function addLeadingZero(n) {
    if (n <= 9) return "0" + n;
    else return n;
  }
  return (
    <div className="share-medicine-popup-div">
      {isLoading && <div className="loader"></div>}
      <form id="add_med_form" onSubmit={handleShareMedicine}>
        <label className="share-medicine-popup-label">Medicine</label>
        <input
          className="share-medicine-popup-input"
          id="medicine_name"
          type="text"
          required
        />
        <label className="share-medicine-popup-label">Quantity</label>
        <input
          className="share-medicine-popup-input"
          id="medicine_qty"
          min={1}
          type="number"
          required
        />
        <label className="share-medicine-popup-label">Expiry Date</label>
        <input
          className="share-medicine-popup-input"
          id="medicine_validity"
          type="date"
          required
        />
        <button className="button" id="btnAdd" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
export default ShareMedicine;
