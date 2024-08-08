"use client";

import Image from "next/image";
import { useState } from "react";

import Modal from "components/modal";

import "@/app/css/styles.css";

export default function favorite({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {content ? (
        <>
          <Image
            src="/free-icon-pop-up.png"
            alt={`${id}'s`}
            width={25}
            height={25}
            onClick={() => handleOpenModal()}
            style={{ cursor: "pointer" }}
            className={content ? "blinking-image" : ""}
          />
          <Modal
            title="상세내용"
            show={showModal}
            onClose={() => handleCloseModal()}
          >
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              style={{ maxHeight: "350px", overflow: "auto" }}
            />
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
}
