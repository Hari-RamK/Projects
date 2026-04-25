import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Chip,
  IconButton
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";

// hero / about images
import images1 from "../assets/images1.jpg";
import images2 from "../assets/images2.jpg";
import images3 from "../assets/images3.jpg";
import download from "../assets/download.jpg";
import download1 from "../assets/download1.jpg";
import download2 from "../assets/download2.jpg";

// category icons
import sweetIcon from "../assets/sweet.jpg";
import savouriesIcon from "../assets/savouries.jpg";
import bakeryIcon from "../assets/bakery.jpg";
import othersIcon from "../assets/others.jpg";

// menu images
import sweetMenu from "../assets/sweet-menu.jpg";
import savouriesMenu from "../assets/savouries-menu.jpg";
import bakeryMenu from "../assets/bakery-menu.jpg";
import othersMenu from "../assets/others-menu.jpg";

// best seller images (use distinct files)
import img1 from "../assets/images1.jpg";
import img2 from "../assets/images2.jpg";
import img3 from "../assets/images3.jpg";

// logo
import logo from "../assets/logo.png";

/* -------------------- MENU SECTION -------------------- */
const MenuSection = ({ images, index, AboutImg, menu }) => {
  const [selected, setSelected] = useState(menu[0]);

  return (
    <div className="page">
      <Grid container spacing={2}>
        <Grid size={{sm:12,xs:12,md:12,lg:12}}>
          {/* Navbar */}
          <nav className="navbar">
            <div className="nav-container">
              <div style={{ display: "flex", alignItems: "center",justifyContent:"center" }}>
                <div className="logo">
                  <img src={logo} alt="logo" />
                <span className="brand-name">City Bakery</span>
                </div>
              </div>

              <div className="menu">
                <a href="#">ABOUT US</a>
                <a href="#">MENU</a>
                <a href="#">BEST SELLERS</a>
                <a href="#">CONTACT US</a>
              </div>

              <div className="contact">📞 +91 8940940435</div>
            </div>
          </nav>

          {/* Hero */}
          <section className="hero">
            <img src={images[index]} alt="hero" className="hero-bg" />
            <div className="overlay"></div>
            <div className="hero-content">
              <h1>Celebrate Every Occasion with our</h1>
              <h2>DELIGHTFULL SWEETS</h2>
            </div>
          </section>

          {/* Menu */}
          <div style={{background:"#f7f7f7"}}>
          <Container maxWidth="md" sx={{ py: 6}}>
            
            <Typography align="center" variant="h5" mb={5} style={{marginBottom:"20px"}}>
              <span className="tag">Our Menu</span>
            </Typography>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              
            >
              {menu.map((item, i) => (
                <Grid
                  size={{sm:6,xs:6,md:3,lg:3}}
                  key={i}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    src={item.icon}
                    alt={item.name}
                    onClick={() => setSelected(item)}
                    sx={{
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      objectFit: "cover",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: "2px solid transparent",
                      transform:
                        selected.name === item.name ? "scale(1.1)" : "scale(1)",
                      boxShadow:
                        selected.name === item.name
                          ? "0 0 0 4px #D4AF37, 0 0 20px rgba(212,175,55,0.6)"
                          : "0 4px 10px rgba(0,0,0,0.1)"
                    }}
                  />

                   <Typography
                    mt={1}
                    onClick={() => setSelected(item)}
                    sx={{
                      alignItems:"center",
                      justifyContent:"center",
                      cursor: "pointer",
                      fontWeight:
                        selected.name === item.name ? "bold" : "normal"
                    }}
                    style={{marginLeft:"40px",marginTop:"20px"}}
                  >
                    {item.name}
                  </Typography>

                 
                </Grid>
              ))}
            </Grid>

            {/* Selected Menu Image */}
            <Box mt={5} display="flex" justifyContent="center">
              <Box
                component="img"
                src={selected.menu}
                alt={selected.name}
                sx={{
                  width: "100%",
                  maxWidth: 900,
                  borderRadius: 2,
                  boxShadow: 3,
                  marginTop:"40px"
                }}
              />
            </Box>
          </Container>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const BestSellers = () => {
  const products = [
    {
      name: "Thean Mittai",
      desc: "Luscious red colour sweet which is juicy inside.",
      img: img1
    },
    {
      name: "Laddu",
      desc: "Traditional sweet made with gram flour and ghee.",
      img: img2
    },
    {
      name: "Jalebi",
      desc: "Crispy, juicy spiral sweet soaked in sugar syrup.",
      img: img3
    }
  ];

  const [index, setIndex] = useState(0);

  // AUTO SLIDE EVERY 5 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  const product = products[index];

  return (
    <div style={{background:"#a9d0be"}}>
    <Container maxWidth="md" sx={{ py: 6 }}>

      {/* Header */}
      <Typography align="center" variant="h5" mb={5} style={{marginBottom:"20px"}}>
              <span className="tag">Best sellers</span>
            </Typography>
      <div style={{alignItems:"center",justifyContent:"center"}}>
        <Typography align="center" variant="h5" mb={5} style={{marginBottom:"20px",fontSize:"30px",fontFamily:"Verdana, sans-serif;"}}>
          Best Sellers
        </Typography>

         <Typography align="center" variant="body1" mb={5} >
          We are known for the unique tastes when it comes to 
        </Typography>
         <Typography align="center" variant="body1">
          traditional sweets and savouries.
        </Typography>
      </div>

      {/* Content */}
      <div style={{marginTop:"20px"}}></div>
      <Grid container justifyContent="center">
        <Grid  size={{sm:6,xs:6,md:12,lg:12}}>
          <Grid container alignItems="center" spacing={4}>

            {/* TEXT */}
            <Grid  size={{sm:6,xs:6,md:6,lg:6}}>
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                style={{alignItems:"center",justifyContent:"center",marginTop:"70px"}}
              >
                <Typography variant="h5" fontWeight={600}>
                  {product.name}
                </Typography>

                <Typography mt={2} color="text.secondary">
                  {product.desc}
                </Typography>
              </motion.div>
            </Grid>

            {/* IMAGE */}
            <Grid  size={{sm:6,xs:6,md:6,lg:6}} textAlign="center">
              <motion.div
                key={product.img}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Box
                  component="img"
                  src={product.img}
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                  }}
                />
              </motion.div>
            </Grid>

          </Grid>
        </Grid>
      </Grid>

    </Container>
    </div>
  );
};


/* -------------------- FOOTER -------------------- */
const Footer = () => {
  return (
    
   <>

      {/* FOOTER */}
      <Box
        sx={{
          background: "linear-gradient(90deg,#0f0f0f,#1a1a1a)",
          color: "#ccc",
          // pt: 10,
          pb: 4,
          position: "relative"
        }}
      >
        <Container>

          <Grid container spacing={4}>

            {/* LEFT */}
            <Grid size={{sm:6,xs:6,md:6,lg:6}}>
              <Box mb={2}>
                <img src={logo} alt="logo" width="120" />
              </Box>

              <Typography sx={{ lineHeight: 1.8 }}>
                It’s our commitment to quality that has brought us
                where we are today. I invite all our guests to
                experience the same.
              </Typography>

              <Typography
                mt={2}
                sx={{ fontStyle: "italic", fontFamily: "cursive" }}
              >
                Management
              </Typography>
            </Grid>

            {/* CONTACT */}
            <Grid size={{sm:6,xs:6,md:6,lg:6}}>
            <div style={{marginTop:"50px"}}>
              <Typography fontWeight={600} mb={2} sx={{fontWeight:"bold",fontSize:"24px",color:"red"}}>
                Contact
              </Typography>

              <Typography color="red">
                +91 8940940435
              </Typography>

              <Typography color="red" mt={1}>
                01citybakerysulur@gmail.com
              </Typography>

              <Typography mt={2}>
                City Bakery Sweet & Snacks,
                Trichy Rd, opp. to Sulur Bus stand,
                Sulur, Tamil Nadu 641402
              </Typography>
              </div>
            </Grid>

            {/* HOURS */}
            <Grid size={{sm:6,xs:6,md:6,lg:6}}>
              <Typography fontWeight={600} mb={2}>
                Hours of opening
              </Typography>

              <Typography>
                Monday to Sunday - 24/7
              </Typography>
            </Grid>
<Grid size={{sm:6,xs:6,md:6,lg:6}}>
             <Box
            mt={6}
            pt={3}
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            borderTop="1px solid #333"
          >
            <Typography variant="body2">
              © 2026 City Bakes Sulur. All rights reserved.
            </Typography>

            <Typography variant="body2">
              Developed by <span style={{ color: "red" }}>buhoverse</span>
            </Typography>
          </Box>
</Grid>
          </Grid>

          {/* BOTTOM BAR */}
         

        </Container>

        {/* SCROLL TO TOP */}
        <Box
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            position: "fixed",
            right: 30,
            bottom: 30,
            width: 40,
            height: 40,
            backgroundColor: "red",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ↑
        </Box>

      </Box>

      </>
  );
}

// /* -------------------- HOME -------------------- */
const Home = () => {
  const images = [images1, images2, images3];
  const AboutImg = [download, download1, download2];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const menu = [
    { name: "Sweet", icon: sweetIcon, menu: sweetMenu },
    { name: "Savouries", icon: savouriesIcon, menu: savouriesMenu },
    { name: "Bakery Items", icon: bakeryIcon, menu: bakeryMenu },
    { name: "Others", icon: othersIcon, menu: othersMenu }
  ];

  return (
    <>
      <MenuSection
        images={images}
        index={index}
        AboutImg={AboutImg}
        menu={menu}
      />
      <BestSellers /> 

      <section className="about">
  <Grid container spacing={2}>
      {/* Left Content */}
        <Grid size={{ xs: 12, sm:12, md: 7,lg:7}}>
      <div className="about-left">

        <span className="tag">Our Story</span>

        <h2>
         A Home of Authentic Sweets and Snacks
        </h2>

        <p>
         Established in 1991, we have been serving generations of families with authentic sweets and freshly prepared snacks for over 35 years, building a legacy rooted in taste, trust, and tradition. What began as a small neighborhood bakery has grown into a well-loved destination known for quality, consistency, and a deep passion for craftsmanship.
        </p>

        <p>
          From the very beginning, our mission has been simple — to create delicious, high-quality sweets and snacks using time-tested recipes and the finest ingredients. Every item we prepare reflects our commitment to preserving traditional flavors while maintaining the highest standards of hygiene and freshness.
        </p>

        <p>
          As we continue to grow, we remain committed to the values that started it all — quality, tradition, and customer satisfaction. We are honored to be a part of your celebrations and everyday indulgences, and we look forward to serving you for many more years to come.
        </p>

      </div>
</Grid>
 <Grid size={{ xs: 12, sm:12, md: 4,lg:4}} >
      {/* Right Image */}
      <div className="about-right">

       <img src={AboutImg[index]} alt="sweet"  className='aboutimg'/>

        {/* Arrows */}
        <button className="arrow left">‹</button>
        <button className="arrow right">›</button>

      </div>
      </Grid>
</Grid>
    </section>

       <Footer />
    </>
  );
};

export default Home;