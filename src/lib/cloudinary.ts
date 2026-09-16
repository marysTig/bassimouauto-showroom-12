const CLOUD_NAME = import.meta.env["VITE_CLOUDINARY_CLOUD_NAME"] as string;
const UPLOAD_PRESET = import.meta.env["VITE_CLOUDINARY_UPLOAD_PRESET"] as string;

/**
 * Upload une image vers Cloudinary (unsigned upload).
 * Retourne l'\''URL sécurisée hébergée sur Cloudinary.
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "bassimouauto");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Échec de l'\''upload de l'\''image sur Cloudinary.");
  }

  const data = await response.json() as { secure_url: string };
  return data.secure_url;
}

/**
 * Upload plusieurs images en parallèle.
 */
export async function uploadImages(files: File[]): Promise<string[]> {
  return Promise.all(files.map(uploadImage));
}
