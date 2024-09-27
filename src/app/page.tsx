"use client";

import Card from "@/components/Card";
import PiePresentation from "@/components/PiePresentation";
import TopExpense from "@/components/TopExpense";
import { RootState, store } from "@/store/store";
import { Provider } from "react-redux";
import { useState } from "react";
import Modals from "@/components/Modals";
import RecentTransaction from "@/components/RecentTransaction";
import { useSelector } from "react-redux";

export default function HomeProvider() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"INCOME" | "EXPENSE" | "EDIT" | "">("");

  const balance = useSelector((state: RootState) => state.balance);
  const expense = useSelector((state: RootState) => state.expense);

  const handleCloseModal = (): void => {
    setShowModal((prev) => !prev);
  };

  return (
    <main className="py-3 px-8">
      {modalType === "INCOME" ? (
        <Modals
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          type="INCOME"
          setModalType={setModalType}
        />
      ) : (
        <Modals
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          type="EXPENSE"
          setModalType={setModalType}
        />
      )}

      <h1 className="text-[32px] font-bold leading-9">Expense Tracker</h1>
      <div className="w-full h-max p-6 rounded-[10px] bg-[#626262] mt-[9px] flex justify-between">
        <Card
          title="Wallet Balance"
          amount={balance}
          type="INCOME"
          handleCloseModal={handleCloseModal}
          setModalType={setModalType}
        />
        <Card
          title="Expenses"
          amount={expense}
          type="EXPENSE"
          handleCloseModal={handleCloseModal}
          setModalType={setModalType}
        />
        <PiePresentation />
      </div>
      <div className="flex gap-8 mt-8">
        <RecentTransaction />
        <TopExpense />
      </div>
    </main>
  );
}
