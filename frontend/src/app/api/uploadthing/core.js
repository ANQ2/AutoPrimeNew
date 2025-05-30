import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    carImageUploader: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 }
    }).onUploadComplete(({ file, metadata }) => {
        console.log("✅ Upload complete", file, metadata);
        if (!file) {
            console.error("❌ Ошибка: файл не загружен!");
            return { error: "No file uploaded" };
        }
        return { url: file.url };
    }),
};
