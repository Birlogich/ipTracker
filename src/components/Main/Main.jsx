import { useState } from "react";
import styles from "../../styles/main.module.scss";
import { Dashboard } from "../UI/Dashboard";
import { Header } from "./Header/Header";
import { Map } from "./Map/Map";

export const Main = () => {
  const [dataFromServ, setData] = useState({});
  const [coords, setCoords] = useState({});
  const getData = (val) => {
    setData(val);
  };

  const getCoords = (val) => {
    setCoords(val);
  };

  return (
    <div className={styles.main}>
      <Header
        getData={getData}
        getCoords={getCoords}
        children={<Dashboard dataFromServ={dataFromServ} coords={coords} />}
      />
      <Map coords={coords} />
    </div>
  );
};
