module.exports = {
    multipass: true, // Optimize SVG multiple times to get the best results
    plugins: [
      {
        name: "removeAttrs",
        params: { attrs: "(stroke|fill)" }, // Remove unnecessary stroke and fill attributes
      },
      {
        name: "removeDimensions",
        active: true, // Remove width/height attributes to make SVG responsive
      },
      {
        name: "removeViewBox",
        active: false, // Keep viewBox to ensure responsiveness
      },
      {
        name: "cleanupIDs",
        active: true, // Remove unused IDs
      },
      {
        name: "removeComments",
        active: true, // Remove comments
      },
      {
        name: "convertColors",
        params: { currentColor: true }, // Simplify colors
      },
      {
        name: "collapseGroups",
        active: true, // Merge unnecessary groups
      },
      {
        name: "removeUnusedNS",
        active: true, // Remove unused namespaces
      },
      {
        name: "mergePaths",
        active: true, // Merges paths where possible
      },
      {
        name: "removeStyleElement",
        active: true, // Removes embedded <style> elements
      },
      {
        name: "minifyStyles",
        active: true, // Minifies inline styles
      },
      
    ],
  };
  