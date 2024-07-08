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

    const relativePath = path.basename(filePath);
    if (!endLine || startLine === endLine) {
      console.log(`${relativePath} : Updated line ${startLine}`);
    } else {
      console.log(`${relativePath} : Updated lines ${startLine} to ${endLine}`);
    }
  } catch (err) {
    console.error(`Error updating file ${filePath}:`, err);
  }
};

// Function to delete specific lines from a file
const deleteLinesFromFile = async (filePath, startLine, endLine) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.split("\n");

    if (endLine === null || endLine === undefined) {
      endLine = startLine;
    }

    const filteredLines = lines.filter(
      (line, index) => index < startLine - 1 || index >= endLine,
    );

    await fs.writeFile(filePath, filteredLines.join("\n"), "utf8");

    const relativePath = path.basename(filePath);
    if (startLine === endLine) {
      console.log(`${relativePath} : Removed line ${startLine}`);
    } else {
      console.log(`${relativePath} : Removed lines ${startLine} to ${endLine}`);
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
  const typesDir = path.join(process.cwd(), "types");

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
      await updateLinesInFile(
        path.join(componentsDir, "sections", "hero-landing.tsx"),
        43,
        null,
        'href="/login"',
      );
      await updateLinesInFile(
        path.join(componentsDir, "sections", "hero-landing.tsx"),
        50,
        null,
        "<span>Go to Login Page</span>",
      );
      await updateLinesInFile(
        contentlayerPath,
        109,
        null,
        "documentTypes: [Page, Post],",
      );
      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "mobile-nav.tsx"),
        124,
        129,
      );
      await updateLinesInFile(
        path.join(componentsDir, "layout", "mobile-nav.tsx"),
        21,
        29,
        "const links = marketingConfig.mainNav;",
      );
      await updateLinesInFile(
        path.join(componentsDir, "layout", "navbar.tsx"),
        29,
        null,
        "const links = marketingConfig.mainNav;",
      );

      await deleteLinesFromFile(contentlayerPath, 23, 42);
      await deleteLinesFromFile(path.join(configDir, "dashboard.ts"), 39, null);
      await deleteLinesFromFile(path.join(configDir, "marketing.ts"), 9, 12);

      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "mobile-nav.tsx"),
        13,
        null,
      );
      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "mobile-nav.tsx"),
        9,
        null,
      );
      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "mobile-nav.tsx"),
        5,
        null,
      );
      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "navbar.tsx"),
        81,
        102,
      );
      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "navbar.tsx"),
        48,
        null,
      );
      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "navbar.tsx"),
        31,
        38,
      );
      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "navbar.tsx"),
        15,
        null,
      );
      await deleteLinesFromFile(
        path.join(componentsDir, "layout", "navbar.tsx"),
        8,
        null,
      );
      await deleteLinesFromFile(path.join(typesDir, "index.d.ts"), 42, 46);

      // remove folders & files
      await deleteFolderRecursive(path.join(appDir, "(docs)"));
      await deleteFolderRecursive(path.join(componentsDir, "docs"));
      await deleteFolderRecursive(path.join(configDir, "docs.ts"));
      await deleteFolderRecursive(path.join(contentDir, "docs"));
      await deleteFolderRecursive(path.join(staticDir, "docs"));

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
