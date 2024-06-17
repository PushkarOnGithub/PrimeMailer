import React from 'react';

const NotFound = () => {

  return (
    <div className='container' style={{textAlign: 'left', margin:'5%',fontSize: "1.5rem"}}>
      <h1 style={{color: '#0000ff'}}>About PrimeMailer</h1>
      <p >PrimeMailer is a feature-rich React web application designed to revolutionize your email marketing campaigns. With a mission to simplify, automate, and optimize your email outreach, PrimeMailer goes above and beyond to make your email marketing endeavors successful.</p>
      <h1  style={{color: '#0000ff'}}>Key Features</h1>
      <ol>
        <li style={{color: 'red'}}>Built-in Responsive Text Editor</li>
        <p>
        Communication is key, and PrimeMailer understands that. Our platform includes a powerful and responsive text editor that allows you to craft compelling emails with ease. Whether you're sending newsletters, promotional offers, or informative updates, our editor ensures that your content looks perfect on every device.
        From formatting options to customizable templates, you can create visually appealing emails that engage your recipients and drive results. Effortlessly add images, links, and call-to-action buttons to make your emails stand out.
        </p>
        <li style={{color: 'red'}}>Sign in with Google</li>
        <p>
        Simplify your login experience with the "Sign in with Google" feature. PrimeMailer offers seamless integration with Google accounts, allowing you to access your email campaigns quickly and securely. No need to remember another username and password—just a single click to get started.

        With this feature, you can leverage your existing Google credentials, making it convenient and efficient for users who already rely on Google services.
        </p>
        <li style={{color: 'red'}}>Optimized Email Sending</li>
        <p>
        We understand the challenges of sending bulk emails, especially when dealing with limits imposed by email providers like Gmail. PrimeMailer has a smart solution to tackle this issue.

        PrimeMailer Send intelligently divides your email list into manageable segments, ensuring that you stay within the limits set by email service providers. For example, Gmail has a daily limit of 500 emails. PrimeMailer Send will automatically schedule your email campaign over multiple days, adhering to these limits while maintaining the effectiveness of your outreach.

        This feature not only ensures compliance with email service provider restrictions but also maximizes the deliverability and engagement of your emails. You can relax while PrimeMailer manages the logistics, allowing you to focus on your message and audience.
        </p>
        <li style={{color: 'red'}}>Personalization and Segmentation</li>
        <p>Tailor your email campaigns to perfection with PrimeMailer's personalization and segmentation options. Engage with your audience on a personal level by addressing them by their names and providing content that speaks directly to their interests and needs.
        Segment your email lists based on criteria like location, past behavior, or demographics, and send targeted emails that are more likely to convert. PrimeMailer helps you build meaningful connections with your subscribers.

        PrimeMailer is your all-in-one solution for conquering the complexities of email marketing. Whether you're a seasoned marketer or just starting, PrimeMailer empowers you to create, send, and analyze email campaigns that drive results and boost your business's success.

        Join the PrimeMailer community today and unlock the potential of email marketing like never before.</p>
      </ol>
      <h1 style={{color: "red", textAlign: 'center'}}>Contact Us</h1>
      <p >Have questions or need assistance? Reach out to our support team at <a href="mailto:support@primemailer.com">support@primemailer.com</a></p>
    </div>
  )
}

export default NotFound;
