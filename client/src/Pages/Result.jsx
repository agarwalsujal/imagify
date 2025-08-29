import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const { generateImage } = useContext(AppContext);
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!input.trim()) {
      alert("Please enter a prompt to generate an image.");
      return;
    }
    if(input.length < 5) {
      alert("Prompt must be at least 5 characters long.");
      return;
    }
    if(input.length > 100) {
      alert("Prompt must be less than 100 characters.");
      return;
    }
    if(input){
      const imageUrl = await generateImage(input);
      if(imageUrl) {
        setIsImageLoaded(true);
        setImage(imageUrl);
        // console.log("Image generated successfully:", imageUrl);
      } else {
        setIsImageLoaded(false);
      }

    }

    setLoading(false);
  }
    // Simulate image loading
  //   setTimeout(() => {
  //     setImage(assets.sample_img_2); // Replace with actual image generation logic
  //     setIsImageLoaded(true);
  //     setLoading(false);
  //   }, 2000); // Simulate a 2-second loading time
  // };
  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh",
        justifyContent: "center",
        alignItems: "center"
      }}
      action=""
      onSubmit={onSubmitHandler}
    >
      <div>
        <div style={{ position: "relative" }}>
          <img style={{ maxWidth: "24rem", borderRadius: "0.5rem" }} src={image} alt="" />
          <span
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "4px",
              background: "#3b82f6",
              width: loading ? "100%" : "0",
              transition: "width 0.1s"
            }}
          />
        </div>
        <p style={{ display: loading ? "block" : "none" }}>Loading...</p>
      </div>
      {!isImageLoaded && (
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "36rem",
            background: "#737373",
            color: "white",
            fontSize: "0.875rem",
            padding: "0.125rem",
            marginTop: "2.5rem",
            borderRadius: "9999px"
          }}
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe What you want to generate"
            style={{
              flex: 1,
              background: "transparent",
              outline: "none",
              marginLeft: "2rem",
              minWidth: "5rem",
              color: "white"
            }}
          />
          <button
            style={{
              background: "#18181b",
              padding: "0.75rem 2.5rem",
              borderRadius: "9999px",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}
            type="submit"
          >
            Generate
          </button>
        </div>
      )}
      {isImageLoaded && (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            color: "white",
            fontSize: "0.875rem",
            padding: "0.125rem",
            marginTop: "2.5rem",
            borderRadius: "9999px"
          }}
        >
          <p
            style={{
              background: "transparent",
              border: "1px solid #18181b",
              color: "black",
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              cursor: "pointer"
            }}
            onClick={() => setIsImageLoaded(false)}
          >
            Generate Another{" "}
          </p>
          <a
            style={{
              background: "#18181b",
              padding: "0.75rem 2.5rem",
              borderRadius: "9999px",
              cursor: "pointer",
              color: "white",
              textDecoration: "none"
            }}
            download
            href={image}
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
