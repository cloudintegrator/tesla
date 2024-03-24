import { Medicine } from "../api/types/medicine";
import { useAuthContext } from "@asgardeo/auth-react";

const PickMedicinePopup = (props) => {
  const { getAccessToken } = useAuthContext();

  async function handleButton(e) {
    let selectedMed = props.selectedMed;
    console.log(selectedMed);
    const medicine_qty_field = document.getElementById(
      "medicine_qty"
    ) as HTMLInputElement;
    const msg_field = document.getElementById("msg") as HTMLTextAreaElement;
    const popup = document.getElementById("snackbar") as HTMLElement;

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

    //   const token = await getAccessToken();
    //   pickMedicine(token, temp)
    //     .then((res) => {
    //       popup.className = "show";
    //       setTimeout(() => {
    //         popup.className = popup.className.replace("show", "");
    //         getMedicines();
    //       }, 5000);
    //     })
    //     .finally(() => {});
    }
    props.toggle();
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
          max={props?.selectedMed?.medicine_qty}
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
        <button className="button" id="btnAdd" type="submit">
          Add
        </button>
        <button
          className="button-cancel"
          id="btnCancel"
          onClick={(e) => {
            props.toggle();
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PickMedicinePopup;
