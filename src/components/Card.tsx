import { Dispatch, SetStateAction } from "react";

interface CardType {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  handleCloseModal: () => void;
  setModalType: Dispatch<SetStateAction<"" | "INCOME" | "EXPENSE" | "EDIT">>;
}

const Card: React.FC<CardType> = ({
  title,
  amount,
  type,
  handleCloseModal,
  setModalType,
}) => {
  return (
    <div className="w-[355.41px] h-[181px] rounded-[15px] bg-[#9B9B9B] flex flex-col justify-center items-center gap-[19px]">
      <p className="text-3xl">
        {title}: <span className="font-bold">{amount}</span>
      </p>
      {type === "INCOME" ? (
        <button
          className="h-[38px] w-[167.65px] rounded-[15px] bg-gradient-to-r from-[#B5DC52] to-[#89E148] font-bold"
          onClick={() => {
            handleCloseModal();
            setModalType("INCOME");
          }}
        >
          + Add Income
        </button>
      ) : (
        <button
          className="h-[38px] w-[167.65px] rounded-[15px] bg-gradient-to-r from-[#FF9595] via-[#FF4747] to-[#FF3838] font-bold"
          onClick={() => {
            handleCloseModal();
            setModalType("EXPENSE");
          }}
        >
          + Add Expense
        </button>
      )}
    </div>
  );
};

export default Card;
