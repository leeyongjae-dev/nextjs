"use client";

import Cookie from "js-cookie";
import { useState } from "react";

export default function favorite({ id }: { id: string }) {
  let [value, setValue] = useState(Cookie.get("fa" + id));

  const handleFavoriteOn =
    (id: string) => (event: React.MouseEvent<HTMLImageElement>) => {
      Cookie.set("fa" + id, id, { expires: 1 });
      setValue(Cookie.get("fa" + id));

      if (Cookie.get("fa" + id)) {
        alert("즐겨찾기 등록되었습니다.");
      }
    };

  const handleFavoriteOff =
    (id: string) => (event: React.MouseEvent<HTMLImageElement>) => {
      Cookie.remove("fa" + id);
      setValue("");

      if (!Cookie.get("fa" + id)) {
        alert("즐겨찾기 삭제되었습니다.");
      }
    };

  return value ? (
    <img
      src="/free-icon-favorite-on.png"
      className="rounded-full"
      alt={`${id}'s star`}
      width={28}
      height={28}
      onClick={handleFavoriteOff(id)}
      style={{ cursor: "pointer" }}
    />
  ) : (
    <img
      src="/free-icon-favorite-off.png"
      className="rounded-full"
      alt={`${id}'s star`}
      width={28}
      height={28}
      onClick={handleFavoriteOn(id)}
      style={{ cursor: "pointer" }}
    />
  );
}
