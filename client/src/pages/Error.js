import React from "react";
import Header from "../components/Header"

export default function Error() {
  return (
    <div >
      <Header />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <h3>Page could not be found !</h3>
      </div>
    </div>
  )
}
