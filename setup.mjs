import { promises as fs } from "fs";
import path from "path";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const mode = args["blog"] ? "blog" : args["docs"] ? "docs" : "all";

// Function to update specific lines in a file
const updateLinesInFile = async (
  filePath,
  startLine,
  endLine,
  updatedContent,
) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.split("\n");

    if (endLine === null || endLine === undefined) {
      endLine = startLine;
    }

    lines.splice(startLine - 1, endLine - startLine + 1, updatedContent);

    await fs.writeFile(filePath, lines.join("\n"), "utf8");

    if (!endLine || startLine === endLine) {
      console.log(`Updated line ${startLine} in file: ${filePath}`);
    } else {
      console.log(
        `Updated lines ${startLine} to ${endLine} in file: ${filePath}`,
      );
    }
  } catch (err) {
    console.error(`Error updating file ${filePath}:`, err);
  }
};

// Function to delete specific lines from a file
const deleteLinesFromFile = async (
  filePath,
  startLine,
  endLine = startLine,
) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.split("\n");

    const filteredLines = lines.filter(
      (line, index) => index < startLine - 1 || index >= endLine,
    );

    await fs.writeFile(filePath, filteredLines.join("\n"), "utf8");

    if (startLine === endLine) {
      console.log(`Removed line ${startLine} from file: ${filePath}`);
    } else {
      console.log(
        `Removed lines ${startLine} to ${endLine} from file: ${filePath}`,
      );
    }
  } catch (err) {
    console.error(`Error modifying file ${filePath}:`, err);
  }
};

const deleteFolderRecursive = async (path) => {
  const stat = await fs.stat(path);
  if (stat.isDirectory()) {
    const files = await fs.readdir(path);
    await Promise.all(
      files.map((file) => deleteFolderRecursive(`${path}/${file}`)),
    );
    await fs.rmdir(path);
  } else {
    await fs.unlink(path);
  }
};

(async () => {
  if (!mode) return;

  const appDir = path.join(process.cwd(), "app");
  const configDir = path.join(process.cwd(), "config");
  const componentsDir = path.join(process.cwd(), "components");
  const contentDir = path.join(process.cwd(), "content");
  const contentlayerPath = path.join(process.cwd(), "contentlayer.config.ts");
  const staticDir = path.join(process.cwd(), "public", "_static");

  switch (mode) {
    case "blog":
      console.log("Deleting blog-related content only");
      console.log("");

      // manage lines
      await updateLinesInFile(
        contentlayerPath,
        109,
        null,
        "documentTypes: [Page, Doc],",
      );
      await deleteLinesFromFile(contentlayerPath, 43, 90);
      await deleteLinesFromFile(path.join(configDir, "docs.ts"), 31, 34);
      await deleteLinesFromFile(path.join(configDir, "docs.ts"), 5, 8);
      await deleteLinesFromFile(path.join(configDir, "marketing.ts"), 5, 8);

      // remove folders & files
      await deleteFolderRecursive(
        path.join(appDir, "(marketing)", "(blog-post)"),
      );
      await deleteFolderRecursive(path.join(appDir, "(marketing)", "blog"));
      await deleteFolderRecursive(
        path.join(componentsDir, "content", "author.tsx"),
      );
      await deleteFolderRecursive(
        path.join(componentsDir, "content", "blog-card.tsx"),
      );
      await deleteFolderRecursive(
        path.join(componentsDir, "content", "blog-header-layout.tsx"),
      );
      await deleteFolderRecursive(
        path.join(componentsDir, "content", "blog-posts.tsx"),
      );
      await deleteFolderRecursive(path.join(contentDir, "blog"));
      await deleteFolderRecursive(
        path.join(contentDir, "docs", "configuration", "blog.mdx"),
      );
      await deleteFolderRecursive(path.join(configDir, "blog.ts"));
      await deleteFolderRecursive(path.join(staticDir, "avatars"));

      console.log("");
      console.log("Done.");
      break;

    case "docs":
      console.log("Deleting docs-related content only");
      console.log("");

      // manage lines

      // remove folders & files

      console.log("");
      console.log("Done.");
      break;

    default:
      console.log("Deleting all content");

      // remove folders & files

      console.log("");
      console.log("Done.");
      break;
  }
})();
