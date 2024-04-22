import React from "react";
import { Input } from "../../UI/Input";
import styles from "../../../styles/header.module.scss";

export const Header = ({ getData, getCoords, children }) => {
  return (
    <div className={styles.header}>
      <div className="container">
        <h1>IP Address Tracker</h1>
        <Input getData={getData} getCoords={getCoords} />
        {children}
      </div>
    </div>
  );
};
