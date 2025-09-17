import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate the input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create transporter (you'll need to add your email service credentials)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'qulamovsenan@gmail.com', // Your email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Reply directly to this email to respond to ${name}</strong>
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 14px;">
            <p>This message was sent from your portfolio contact form at 48team.space</p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Also send a confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting The 48 Team',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6; text-align: center;">Thank You for Reaching Out!</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Hi ${name},</p>
            <p>Thank you for contacting us through our portfolio website. We've received your message and will get back to you as soon as possible.</p>
            
            <h3 style="color: #1e293b;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p style="background-color: #e2e8f0; padding: 15px; border-radius: 6px; margin: 15px 0;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">What's Next?</h3>
            <ul style="color: #1e40af;">
              <li>We typically respond within 24-48 hours</li>
              <li>For urgent matters, you can reach us directly at qulamovsenan@gmail.com</li>
              <li>Feel free to check out our latest projects while you wait</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #64748b;">Best regards,<br><strong>The 48 Team</strong></p>
            <p style="color: #64748b; font-size: 14px;">
              Website: <a href="https://48team.space" style="color: #3b82f6;">48team.space</a>
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(confirmationMailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
