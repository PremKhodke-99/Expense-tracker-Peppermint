import { deleteExpense, editExpense } from "@/store/expenseSlice";
import { RootState } from "@/store/store";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoGiftOutline, IoPizzaOutline } from "react-icons/io5";
import { LiaPenSolid } from "react-icons/lia";
import { TbLuggage } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const RecentTransaction: React.FC = () => {
  const data = useSelector((state: RootState) => state.expenseSummary);
  const dispatch = useDispatch();

  return (
    <div className="flex-1">
      <h1 className="text-[28px] italic font-extrabold">Recent Transaction</h1>
      <div className="h-[345px] py-[20px] bg-white rounded-[15px] mt-[10px] text-xs">
        {data.map((expenses) => (
          <div
            className="mx-[27px] py-[10px] text-black border-b border-[#9B9B9B] flex items-center gap-[17px]"
            key={expenses.id}
          >
            <div className="h-max w-max p-2 bg-[#D9D9D9] rounded-full">
              {expenses.category === "Entertainment" ? (
                <IoGiftOutline className="h-6 w-6" />
              ) : expenses.category === "Food" ? (
                <IoPizzaOutline className="h-6 w-6" />
              ) : (
                <TbLuggage className="h-6 w-6" />
              )}
            </div>
            <div className="flex-1">
              <p>{expenses.title}</p>
              <p className="text-[#9B9B9B]">
                {expenses.date?.toISOString().split("T")[0]}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="font-bold text-[#F4BB4A] mr-5">
                ₹{expenses.amount}
              </p>
              <button
                className="h-[37px] w-[37px] rounded-[15px] bg-[#FF3E3E] text-white flex justify-center items-center mr-2"
                onClick={() => dispatch(deleteExpense(expenses.id))}
              >
                <CiCircleRemove className="h-6 w-6" />
              </button>
              <button
                className="h-[37px] w-[37px] rounded-[15px] bg-[#F4BB4A] text-white flex justify-center items-center"
                onClick={() => dispatch(editExpense(expenses))}
              >
                <LiaPenSolid className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
