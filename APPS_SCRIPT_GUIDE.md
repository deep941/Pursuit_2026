# How to Save Files to Google Drive without Login
To upload files to Google Drive from your website **without ensuring users log in**, you cannot use the standard Google Form "File Upload" question. Instead, you must use a **Google Apps Script**.

### Step 1: Create the Script
1.  Open your **Google Sheet** (where form responses go).
2.  Go to **Extensions** > **Apps Script**.
3.  Delete any code there and paste the code below:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Save File to Drive (if provided)
    let fileUrl = "No File Uploaded";
    if (data.file && data.fileName) {
      const folderId = "YOUR_DRIVE_FOLDER_ID"; // <--- PASTE YOUR FOLDER ID HERE
      const contentType = data.file.split(',')[0].split(':')[1].split(';')[0];
      const base64 = data.file.split(',')[1];
      const blob = Utilities.newBlob(Utilities.base64Decode(base64), contentType, data.fileName);
      const folder = DriveApp.getFolderById(folderId);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
    }

    // 2. Append Data to Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const timestamp = new Date();
    
    // Customize these columns to match your sheet order exactly!
    // Example: Timestamp, Name, Email, Phone, Branch, Year, College, Workshop, UTR, Proof Link
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.branch,
      data.year,
      data.college,
      data.workshop,
      data.utr,
      fileUrl // The link to the file on Drive
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", fileUrl: fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 2: Get Your Folder ID
1.  Go to Google Drive and create a folder named "Pursuit Receipts".
2.  Open the folder. Look at the URL in your browser.
3.  Copy the ID at the end: `drive.google.com/drive/u/0/folders/YOUR_FOLDER_ID_IS_HERE`
4.  Paste this ID into the script where it says `"YOUR_DRIVE_FOLDER_ID"`.

### Step 3: Deploy
1.  Click **Deploy** (blue button) > **New deployment**.
2.  Select type: **Web app**.
3.  **Description**: "Upload Handler".
4.  **Execute as**: "Me".
5.  **Who has access**: **Anyone** (IMPORTANT!).
6.  Click **Deploy**.
7.  **Authorize** the script (Click "Review permissions" -> Choose account -> Advanced -> Go to ... (unsafe) -> Allow).
8.  **Copy the Web App URL** (starts with `script.google.com`).

### Step 4: Provide URL
Give me (the AI) the **Web App URL** you just copied. I will update the website code to use it!
