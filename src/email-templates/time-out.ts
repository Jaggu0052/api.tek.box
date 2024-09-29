const time_out = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punch In Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #007bff;
        }
        p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Punch In Confirmation</h1>
        <p>Hello %%name%% ,</p>
        <p>Your punch-in time was successfully recorded.</p>
        <p>Time: %%time%% </p>
        <p>Thank you for keeping track of your time. If you have any questions or need assistance, please let us know.</p>
        <p>Best regards,<br>The Team</p>
    </div>
</body>
</html>`;
export default time_out;
