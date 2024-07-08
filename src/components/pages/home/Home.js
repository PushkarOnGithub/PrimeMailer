import React from 'react'
import './Home.css'
import file_upload from "../../assets/file_upload.png"
import google_logo from "../../assets/google_logo.png"
import write_mail from "../../assets/write_mail.png"
import mail_ban from "../../assets/mail_ban.png"
import hero_background_image from "../../assets/hero_background_image.png"

export default function Home() {
  return (
    <div className="home-container">
    <div className="hero-section">
        <div className="hero-section-wrapper">
          <div
            className="hero-background-image" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.4) 100%),url(${hero_background_image})`}}
          >
            <div className="info">
              <h1
                className="primary-info"
              >
                Welcome to PrimeMailer <br/> your all-in-one email marketing solution
              </h1>
              <span className="secondary-info">
                Experience the power of seamless communication
              </span>
            </div>
            <button
              className="welcome-button"
            >
              <span >Get Started</span>
            </button>
          </div>
        </div>
      </div>
      <div className="features-section">
        <div className="features-desc-wrapper" >
          <div className="features-desc">
            <h1 className="title">PrimeMailer Works Smoothly</h1>
            <span className="subtitle">
              PrimeMailer simplifies the mass emailing process with a step-by-step
              approach. <br/>
              Connect your Google account, craft your message, and
              upload your recipient list - we'll handle the rest.
            </span>
          </div>
          </div>
          
          <div className="features-container">
              <div className="feature">
                  <img src={google_logo} alt="Google Logo"/>
                <h3>Sign in with Google</h3>
                <p>
                  Connect your Google account to PrimeMailer for secure and
                  reliable email sending.
                </p>
              </div>
              <div className="feature">
                <img src={write_mail} alt="Compose"/>
                <h3>Write your email</h3>
                <p>
                  Craft your message using our built-in email editor with powerful
                  formatting tools.
                </p>
              </div>
              <div className="feature">
                <img src={file_upload} alt="Upload File Logo"/>
                <h3>Upload recipient list</h3>
                <p>
                  Add your email recipients by uploading a CSV file, and
                  PrimeMailer will handle the rest.
                </p>
              </div>
              <div className="feature">
                <img src={mail_ban} alt="Email Ban"/>
                <h3>Automatic Email Sanitization</h3>
                <p>
                  Your Emails will be sanitized before sending to avoid bounces.
                </p>
              </div>
          </div>
      </div>
      {/* <section className="bg-muted py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="PrimeMailer Email Editor Screenshot"
              className="rounded-lg"
              style="aspect-ratio: 600 / 400; object-fit: cover;"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Powerful Email Editor</h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              PrimeMailer's email editor provides a fully-featured interface for crafting your messages, ensuring your
              emails are professional and engaging.
            </p>
          </div>
        </div>
      </section> */}
      {/* <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Join over 1 million users today</h2>
      <div className="flex [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-3">
          <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
              style='background-image: url("https://cdn.usegalileo.ai/stability/e6c0ad2d-98a6-444a-8292-2a31d2a8751a.png");'
            ></div>
            <div>
              <p className="text-[#0d141c] text-base font-medium leading-normal">"PrimeMailer is so easy to use"</p>
              <p className="text-[#49719c] text-sm font-normal leading-normal">Sarah</p>
            </div>
          </div>
          <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
              style='background-image: url("https://cdn.usegalileo.ai/stability/3bc0830e-dde3-4ca7-8eb0-9e3570f12c9f.png");'
            ></div>
            <div>
              <p className="text-[#0d141c] text-base font-medium leading-normal">"I've seen my sales go up by 80% since using PrimeMailer"</p>
              <p className="text-[#49719c] text-sm font-normal leading-normal">John</p>
            </div>
          </div>
          <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
          </div>
        </div>
      </div> */}
      {/* <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">

        <p className="text-[#49719c] text-base font-normal leading-normal">© 2024 PrimeMailer Inc</p>
      </footer>
      <div className="h-5 bg-slate-50"></div> */}
    </div>
  )
}
