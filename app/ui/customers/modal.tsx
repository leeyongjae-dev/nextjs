"use client";

import Image from "next/image";
import { useState } from "react";

import Modal from "components/modal";

export default function favorite({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Image
        src="/free-icon-pop-up.png"
        className="rounded-full"
        alt={`${id}'s`}
        width={28}
        height={28}
        onClick={() => handleOpenModal()}
        style={{ cursor: "pointer" }}
      />
      <Modal show={showModal} onClose={() => handleCloseModal()}>
        <p>{id}</p>
      </Modal>
    </>
  );
}
