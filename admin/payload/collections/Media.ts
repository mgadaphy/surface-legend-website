import path from "path";
import type { CollectionConfig } from "payload";
import { adminOrAbove, loggedIn } from "../access";
import { slugify } from "../../lib/slugify";

/** Portfolio photos and other images. Resized automatically; alt text is required for accessibility and SEO. */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: { en: "Image", fr: "Image" }, plural: { en: "Images", fr: "Images" } },
  admin: {
    hideAPIURL: true,
    group: { en: "Content", fr: "Contenu" },
    description: {
      en: "Photos are resized, converted to WebP and named from their description automatically, so pages load fast and Google Images understands them. To use a different photo somewhere, choose or upload another image there; an image's own file cannot be swapped, so nothing changes elsewhere by surprise.",
      fr: "Les photos sont redimensionnées, converties en WebP et nommées d’après leur description automatiquement, pour des pages rapides et bien comprises par Google Images. Pour changer une photo, choisissez ou téléversez une autre image à l’endroit voulu ; le fichier d’une image ne peut pas être remplacé, pour que rien ne change ailleurs par surprise.",
    },
  },
  access: {
    read: () => true,
    create: loggedIn,
    update: loggedIn,
    delete: adminOrAbove,
  },
  upload: {
    // No in-place file replacement: it would silently change the photo everywhere it is used.
    hideRemoveFile: true,
    staticDir: path.resolve(process.cwd(), "media"),
    mimeTypes: ["image/*"],
    focalPoint: true,
    formatOptions: { format: "webp", options: { quality: 82 } },
    resizeOptions: { width: 2400, withoutEnlargement: true },
    imageSizes: [
      { name: "thumbnail", width: 400, formatOptions: { format: "webp", options: { quality: 80 } } },
      { name: "card", width: 900, formatOptions: { format: "webp", options: { quality: 80 } } },
      { name: "wide", width: 1600, formatOptions: { format: "webp", options: { quality: 82 } } },
    ],
    adminThumbnail: "thumbnail",
  },
  hooks: {
    beforeOperation: [
      ({ req, args }) => {
        // Files are named from their description, which is what Google Images reads:
        // "IMG_2041.PNG" described as "Mohamed Gadaphy, Founder" becomes "mohamed-gadaphy-founder.webp".
        // Without a description, the original name is cleaned instead ("Photo (4).PNG" becomes "photo-4").
        const file = req.file;
        if (file?.name) {
          const ext = path.extname(file.name).toLowerCase();
          const alt = (args as { data?: { alt?: unknown } }).data?.alt;
          const description = typeof alt === "string" ? alt : (alt as { en?: string } | undefined)?.en;
          const base = slugify(description || "").slice(0, 60).replace(/-+$/, "") || slugify(path.basename(file.name, path.extname(file.name)));
          file.name = `${base || "image"}${ext}`;
        }
        return args;
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Description of the image (alt text)", fr: "Description de l’image (texte alternatif)" },
      admin: {
        description: {
          en: "Describe what the image shows, for people using screen readers and for Google Images.",
          fr: "Décrivez ce que montre l’image, pour les lecteurs d’écran et pour Google Images.",
        },
      },
    },
  ],
};
