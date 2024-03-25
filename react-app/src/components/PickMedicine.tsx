import { Medicine } from "../api/types/medicine";
import { useAuthContext } from "@asgardeo/auth-react";
import { pickMedicine } from "../api/medicines/pick-medicine";


const PickMedicine = ({callBackPickMedicine,selectedMed}) => {
  const { getAccessToken } = useAuthContext();

  async function handleButton(e) {
    console.log(selectedMed);
    const medicine_qty_field = document.getElementById(
      "medicine_qty"
    ) as HTMLInputElement;
    const msg_field = document.getElementById("msg") as HTMLTextAreaElement;

    let medicine_qty = Number(medicine_qty_field.value);
    let actual_qty = selectedMed?.medicine_qty;
    let msg = msg_field.value;

    if (medicine_qty !== 0 && medicine_qty <= actual_qty!) {
      let temp: Medicine = {
        id: selectedMed?.id,
        email: selectedMed?.email,
        medicine_name: selectedMed?.medicine_name,
        medicine_qty: medicine_qty,
        medicine_validity: selectedMed?.medicine_validity,
        expired: selectedMed?.expired,
        msg: msg,
      };

      const token = await getAccessToken();
      pickMedicine(token, temp)
        .then((res) => {
          console.log("[PickMedicine] - Medicine has been picked up.")
        })
        .finally(() => {});
    }
    callBackPickMedicine();
  }
  return (
    <div>
      <form
        style={{ padding: "40px" }}
        id="add_med_form"
        onSubmit={handleButton}
      >
        <label>Quantity</label>
        <input
          className="share-medicine-popup-input"
          id="medicine_qty"
          defaultValue={1}
          min={1}
          max={selectedMed?.medicine_qty}
          type="number"
          required
        />
        <label>Message</label>
        <textarea
          style={{ width: "100%", resize: "none" }}
          id="msg"
          name="msg"
          rows={4}
        />
        <br></br>
        <br></br>
        <button className="button" id="btnAdd" type="submit" onClick={handleButton} >
          Add
        </button>
        <button
          className="button-cancel"
          id="btnCancel"
          onClick={(e) => {
            callBackPickMedicine();
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PickMedicine;
