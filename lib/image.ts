/**
 * Reads an image file, resizes it to a sane max width and re-encodes it as
 * a compressed JPEG data URL. Runs entirely in the browser (canvas API),
 * so uploaded photos are normalized to one consistent format/size before
 * being stored — no server needed.
 */
export function fileToOptimizedDataUrl(
  file: File,
  maxWidth = 1400,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Не удалось прочитать файл"));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Не удалось загрузить изображение"));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas недоступен"));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export async function filesToOptimizedDataUrls(files: FileList | File[]): Promise<string[]> {
  const list = Array.from(files);
  const results = await Promise.all(list.map((f) => fileToOptimizedDataUrl(f)));
  return results;
}
