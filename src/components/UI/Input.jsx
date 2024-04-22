import MaskedInput from "react-text-mask";
import Arrow from "../../assets/icon-arrow.svg?react";
import styles from "../../styles/input.module.scss";
import { useEffect, useRef } from "react";
import { useState } from "react";

const props = {
  guide: true,
  mask: (value) => {
    let result = [];
    const chunks = value.split(".");

    for (let i = 0; i < 4; ++i) {
      const chunk = (chunks[i] || "").replace(/_/gi, "");

      if (chunk === "") {
        result.push(/\d/, /\d/, /\d/, ".");
        continue;
      } else if (+chunk === 0) {
        result.push(/\d/, ".");
        continue;
      } else if (
        chunks.length < 4 ||
        (chunk.length < 3 && chunks[i].indexOf("_") !== -1)
      ) {
        if (
          (chunk.length < 2 && +`${chunk}00` > 255) ||
          (chunk.length < 3 && +`${chunk}0` > 255)
        ) {
          result.push(/\d/, /\d/, ".");
          continue;
        } else {
          result.push(/\d/, /\d/, /\d/, ".");
          continue;
        }
      } else {
        result.push(...new Array(chunk.length).fill(/\d/), ".");
        continue;
      }
    }

    result = result.slice(0, -1);
    return result;
  },
  pipe: (value) => {
    if (value === "." || value.endsWith("..")) return false;

    const parts = value.split(".");

    if (
      parts.length > 4 ||
      parts.some((part) => part === "00" || part < 0 || part > 255)
    ) {
      return false;
    }

    return value;
  },
};

export const Input = ({ getData, getCoords }) => {
  const [initialIp, setInitialIp] = useState("");
  const btnRef = useRef(null);

  useEffect(() => {
    const getInitialIp = async () => {
      const res = await fetch("https://geolocation-db.com/json/");
      return await res.json();
    };
    getInitialIp().then((res) => setInitialIp(res));
  }, []);

  useEffect(() => {
    if (initialIp) {
      getData(initialIp);
      getCoords({ lat: initialIp.latitude, lng: initialIp.longitude });
    }
  }, [initialIp]);

  const valueHandle = (e, ip) => {
    e.preventDefault();

    const getRequest = async (ipAddress) => {
      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_wSart9MBi5Y6Rhh9ifpeIkuHzIreJ&ipAddress=${ipAddress}`
        );
        return await response.json();
      } catch (error) {
        throw new Error(`Error at ${ip} API`);
      }
    };
    getRequest(ip).then((data) => {
      getData(data);
      getCoords({ lat: data.location.lat, lng: data.location.lng });
    });
  };

  return (
    <form
      ref={btnRef}
      className={styles.form}
      onSubmit={(e) =>
        valueHandle(e, initialIp ? initialIp.IPv4 : e.target.ip.value)
      }
    >
      <div className={styles.inputWrapper}>
        <MaskedInput
          {...props}
          value={initialIp.IPv4}
          name="ip"
          placeholder="Search for any IP address or domain"
        />
        <button type="submit">
          <Arrow />
        </button>
      </div>
    </form>
  );
};
