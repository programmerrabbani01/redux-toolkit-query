// export const findPublicId = (url) => {
//   return url.split("/")[url.split("/").length - 1].split(".")[0];
// };

// export const findPublicId = (url) => {
//   // Split the URL by '/' to get segments, and then split the last segment by '.' to get the public ID.
//   const segments = url.split("/");
//   const lastSegment = segments[segments.length - 1];
//   const publicId = lastSegment.split(".")[0];

//   return publicId;
// };

export const findPublicId = (url) => {
  if (!url) {
    // Handle case where url is null or undefined
    return null; // or throw an error, depending on your use case
  }

  // Split the URL by '/' to get segments, and then split the last segment by '.' to get the public ID.
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];

  // Check if lastSegment has a dot (.) character before splitting
  const dotIndex = lastSegment.lastIndexOf(".");
  const publicId =
    dotIndex !== -1 ? lastSegment.substring(0, dotIndex) : lastSegment;

  return publicId;
};
