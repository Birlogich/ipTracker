import { useState } from "react";
import styles from "../../styles/dashboard.module.scss";
import { useEffect } from "react";

const dashName = {
  ipAddress: "IP ADDRESS",
  location: "LOCATION",
  timezone: "TIMEZONE",
  isp: "ISP",
};

export const Dashboard = ({ dataFromServ, coords }) => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    if (dataFromServ.IPv4) {
      setData([
        {
          [dashName.ipAddress]: dataFromServ?.IPv4,
        },
        { [dashName.location]: dataFromServ?.country_name },
        { [dashName.timezone]: "No Data" },
        { [dashName.isp]: "No Data" },
      ]);
    } else {
      setData([
        {
          [dashName.ipAddress]: dataFromServ?.ip,
        },
        { [dashName.location]: dataFromServ?.location?.region },
        { [dashName.timezone]: dataFromServ?.location?.timezone },
        { [dashName.isp]: dataFromServ?.isp },
      ]);
    }
  }, [dataFromServ]);

  return (
    <div className={styles.dashboard}>
      {data?.length > 1 &&
        data?.map((item, index) => {
          const [key] = Object.keys(item);
          return (
            <div key={index}>
              <span>{key}</span>
              <span>{coords.lat ? item[key] : "No Data Yet"}</span>
            </div>
          );
        })}
    </div>
  );
};
