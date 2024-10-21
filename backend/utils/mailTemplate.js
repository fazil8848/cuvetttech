const emailContentExporter = (job) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exciting Job Opportunity</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
        
        body {
            font-family: 'Montserrat', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f0f4f8;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .content {
            padding: 40px 30px;
        }
        .job-details {
            background-color: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .job-details h2 {
            color: #6a11cb;
            margin-top: 0;
            font-size: 24px;
        }
        .detail-row {
            display: flex;
            margin-bottom: 15px;
            align-items: flex-start;
        }
        .detail-label {
            font-weight: 600;
            width: 130px;
            color: #4a4a4a;
            position: relative;
            padding-left: 25px;
        }
        .detail-label::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
            background-color: #2575fc;
            border-radius: 50%;
        }
        .detail-value {
            flex: 1;
            color: #333;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 50px;
            font-weight: 600;
            margin-top: 30px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(56, 239, 125, 0.4);
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(56, 239, 125, 0.6);
        }
        .footer {
            background-color: #f1f3f5;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
        .footer a {
            color: #6a11cb;
            text-decoration: none;
            font-weight: 600;
        }
        .highlight {
            color: #2575fc;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Your Dream Job Awaits!</h1>
        </div>
        <div class="content">
            <p>Hello Aspiring Professional,</p>
            <p>We're thrilled to present an exceptional opportunity at <span class="highlight">${job.postedBy.companyName}</span> that seems tailor-made for your talents!</p>
            
            <div class="job-details">
                <h2>🌟 Exciting Position Details</h2>
                <div class="detail-row">
                    <span class="detail-label">Job Title:</span>
                    <span class="detail-value">${job.jobTittle}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">${job.jobDescription}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Experience:</span>
                    <span class="detail-value">${job.experienceLevel}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">${job.location}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Salary:</span>
                    <span class="detail-value">${job.salary}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Apply Before:</span>
                    <span class="detail-value">${job.endDate}</span>
                </div>
            </div>
            
            <p>This role is a perfect blend of challenge and opportunity. We believe your skills and passion would make you an invaluable asset to our team!</p>
            
            // <center>
            //     <a href="#" class="cta-button">Take the Next Step - Apply Now!</a>
            // </center>
        </div>
        <div class="footer">
            <p>Questions? We're here to help! Reach out to us at <a href="mailto:${process.env.EMAIL}">${process.env.EMAIL}</a>.</p>
            <p>Wishing you the best,<br><strong>${job.companyName} Talent Acquisition Team</strong></p>
        </div>
    </div>
</body>
</html>
`;
};

const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        body {
            font-family: 'Poppins', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f7fa;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .otp-box {
            background-color: #f0f4f8;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 5px;
            color: #4a4a4a;
        }
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .footer {
            background-color: #f1f3f5;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify Your Account</h1>
        </div>
        <div class="content">
            <p class="message">Thank you for signing up! Please use the following OTP to verify your account:</p>
            <div class="otp-box">
                ${otp}
            </div>
            <p class="message">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
        </div>
        <div class="footer">
            <p>If you didn't request this verification, please ignore this email or contact our support team at <a href="mailto:${process.env.EMAIL}">${process.env.EMAIL}</a>.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = { emailContentExporter, otpEmailTemplate };
