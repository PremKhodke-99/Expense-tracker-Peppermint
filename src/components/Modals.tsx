import { addBalance, addExpense, Summary } from "@/store/expenseSlice";
import React, {
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import Modal from "react-modal";
import { useDispatch } from "react-redux";

interface ModalType {
  showModal: boolean;
  handleCloseModal: () => void;
  type: "INCOME" | "EXPENSE";
  setModalType: Dispatch<SetStateAction<"" | "INCOME" | "EXPENSE">>;
  data?: object
}

const Modals: React.FC<ModalType> = ({
  showModal,
  handleCloseModal,
  type,
  setModalType,
}) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

  const [balance, setBalance] = useState<number>(0);
  const [expenseData, setExpenseData] = useState<Summary>({
    id: characters.charAt(Math.floor(Math.random() * characters.length)),
    title: "",
    amount: 0,
    category: "",
    date: new Date(),
  });
  // const [editData, setEditData] = useState({

  // })

  const dispatch = useDispatch();

  const handleAddBalance = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addBalance(balance));
    setBalance(0);
    handleCloseModal();
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]:
        name === "date"
          ? new Date(value)
          : name === "amount"
          ? parseInt(value)
          : value,
    });
  };

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addExpense(expenseData));
    setExpenseData({
      id: characters.charAt(Math.floor(Math.random() * characters.length)),
      title: "",
      amount: 0,
      category: "",
      date: new Date(),
    });
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={showModal}
      contentLabel="onRequestClose Example"
      onRequestClose={() => {
        handleCloseModal();
        setModalType("");
      }}
      shouldCloseOnOverlayClick={true}
      className={
        "h-max w-[538px] px-[30px] py-[34px] rounded-[15px] bg-[#efefef] m-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      }
    >
      <p className="text-[30px] leading-[34.47px] font-bold text-black">
        {type === "INCOME" ? "Add Balance" : "Add Expense"}
      </p>
      {type === "INCOME" ? (
        <form
          className="flex gap-[14px] mt-5 text-black"
          onSubmit={handleAddBalance}
        >
          <input
            type="number"
            placeholder="Income Amount"
            className="inputfield"
            name="balance"
            value={balance}
            onChange={(e) => setBalance(parseInt(e.target.value))}
          />
          <button
            type="submit"
            className="h-[51px] w-[223px] bg-[#F4BB4A] rounded-[15px]"
          >
            Add Balance
          </button>
          <button
            onClick={() => {
              handleCloseModal();
              setModalType("");
            }}
            className="w-28 h-[51px] bg-[#E3E3E3] text-black rounded-[15px] shadow-2xl"
          >
            Cancel
          </button>
        </form>
      ) : (
        <form
          className="flex gap-[14px] flex-wrap mt-5 text-black"
          onSubmit={handleAddExpense}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="inputfield"
            value={expenseData.title}
            onChange={handleDataChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Price"
            className="inputfield"
            value={expenseData.amount}
            onChange={handleDataChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Select Category"
            className="inputfield"
            value={expenseData.category}
            onChange={handleDataChange}
          />
          <input
            type="date"
            name="date"
            placeholder="dd/mm/yyyy"
            className="inputfield"
            onChange={handleDataChange}
            value={expenseData.date.toISOString().split("T")[0]}
          />
          <button
            type="submit"
            className="h-[51px] w-[223px] bg-[#F4BB4A] rounded-[15px]"
          >
            Add Expense
          </button>
          <button
            onClick={() => {
              handleCloseModal();
              setModalType("");
            }}
            className="w-28 h-[51px] bg-[#E3E3E3] text-black rounded-[15px] shadow-2xl"
          >
            Cancel
          </button>
        </form>
      )}
    </Modal>
  );
};

export default Modals;
