import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sweet-loading text-center ">
        <HashLoader color="0000" loading={loading} css={override} size={80} />
      </div>
    </div>
  );
}

export default Loader;
