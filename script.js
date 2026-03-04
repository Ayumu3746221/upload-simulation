'use strict'

class UploadFileError extends Error {
  constructor(message, path) {
    super(message);
    this.name = "UploadFileError";
    this.path = path;
  }
}

class InsertDBError extends Error {
  constructor(message, path) {
    super(message);
    this.name = "InsertDBError";
    this.path = path;
  }
}

function uploadStorage() {
  return new Promise((resolve, reject) => {
    console.log("start uploading file to storage");
    setTimeout(() => {
      const success = true; // switch
      if (success) {
        console.log("complete to upload file");
        resolve("file path");
      } else {
        reject(new UploadFileError("Uploading is failed", "file path"));
      }
    }, 10000);
  });
}

function deleteStorage(path) {
  return new Promise((resolve, reject) => {
    console.log(`start deleting file ${path}`);
    setTimeout(() => {
      const success = true; // switch
      if (success) {
        console.log("complete to delete file");
        resolve();
      } else {
        reject(new Error("failed to delete file"));
      }
    }, 10000)
  })
}

function registerDB(path) {
  return new Promise((resolve, reject) => {
    console.log(`start register to file path ${path}`);
    setTimeout(() => {
      const success = true; // switch
      if (success) {
        console.log("complete to register DB");
        resolve();
      } else {
        reject(new InsertDBError("failed to insert DB", path));
      }
    }, 10000);
  });
}

async function main() {
  try {
    console.log("Starting main script");
    const path = await uploadStorage();
    await registerDB(path);
    console.log("End main script");
  } catch (error) {
    if (error instanceof UploadFileError) {
      console.error(error.message);
    } else if (error instanceof InsertDBError) {
      console.error(error.message);
      await deleteStorage(error.path);
      // create rollback logic
    } else {
      console.error("Unknown Error:" + error.message);
    }
  }
}

main();
