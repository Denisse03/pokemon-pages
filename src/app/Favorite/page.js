"use client";
import React from "react";
import searchStyle from "@/app/Search/search.module.css";

export default function Favorite({ img = "", name = "", types = [] }) {
  const typesJsx = types.map((typeObj) => typeObj.type.name).join(", ");
  return (
    <main>
      <div className={searchStyle.searchFeature}>
        <h1>Pokemon Favorites</h1>

        <img src={img} />
        <h4>{name}</h4>

        <p>
          <i>Types: {typesJsx}</i>
        </p>
      </div>
    </main>
  );
}
