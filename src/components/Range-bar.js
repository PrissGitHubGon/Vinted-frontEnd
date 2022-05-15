import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const RangeLine = () => {
  const STEP = 0.1;
  const MIN = 0;
  const MAX = 500;
  const [values, setValues] = useState([10, 100]);

  return (
    <div>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => {
          console.log(values);
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "288px",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors:
                    values.length > 1
                      ? ["#CCCCCC", "#2CB1BA", "#CCCCCC"]
                      : ["#CCCCCC", "#CCCCCC"],
                  min: MIN,
                  max: MAX,
                }),

                alignSelf: "center",
                margin: "0 auto",
              }}
            >
              {" "}
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "18px",
              width: "18px",
              borderRadius: "100%",
              backgroundColor: "#2CB1BA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div style={{ display: "flex" }}>
              <span>{values[index].toFixed(0)} </span>
              <span> €</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default RangeLine;
