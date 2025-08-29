import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: "5rem 0",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          color: "#78716c",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "#fff",
          padding: "0.25rem 1.5rem",
          borderRadius: "9999px",
          border: "1px solid #737373",
        }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
        style={{
          fontSize: "2.25rem",
          maxWidth: "330px",
          margin: "2.5rem auto 0 auto",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Turn text to <span style={{ color: "#2563eb" }}>image</span>, in
        seconds.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          textAlign: "center",
          maxWidth: "36rem",
          margin: "1.25rem auto 0 auto",
        }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
        style={{
          fontSize: "1.125rem",
          color: "#fff",
          background: "#000",
          marginTop: "2rem",
          padding: "0.625rem 3rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => onClickHandler()}
      >
        Generate Images
        <img style={{ height: "1.5rem" }} src={assets.star_group} alt="" />
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.75rem",
          marginTop: "4rem",
        }}
      >
        {Array(6)
          .fill("")
          .map((_, index) => (
            <motion.img
              whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
              key={index}
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=""
              width={70}
              style={{
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-2 text-neutral-600"
      >
        Generated image from imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
