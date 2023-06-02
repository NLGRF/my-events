import Modal from "src/components/Modal";
import { useState } from "react";
import { useQRCode } from "next-qrcode";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const { Canvas } = useQRCode();

  // newDeposit with post request
  const createStock = async () => {
    console.log("createStock");
    const res = await fetch("http://localhost:3001/stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: "Stock #2",
        ask: 789,
        bid: 100,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  
  const generateQRCode = () => {
    createStock();
    console.log("generateQRCode");
    setShowQRCode(true);
  };
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello from the modal!</h1>
          <button onClick={() => generateQRCode()}>new Stock</button>
          <hr />
          {showQRCode && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* <Canvas text="https://metamask.app.link/send/0x200C234721b5e549c3693CCc93cF191f90dC2aF9/transfer?address=0x65b7CE9C408A8E9b0Bc37d3024B8ec43544A226c&uint256=3e18" /> */}
              {/* <Canvas text="http://localhost:3001/stocks" /> */}
              <Canvas
                text="https://37c4-49-0-84-39.ngrok-free.app/stocks"
                options={{
                  level: "M",
                  margin: 2,
                  scale: 5,
                  width: 450,
                  // color: {
                  //   dark: "#252525",
                  //   light: "#c8b370",
                  // },
                }}
              />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
