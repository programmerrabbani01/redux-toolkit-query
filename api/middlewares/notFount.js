// 404 not found handler

const notFound = (req, res, next) => {
  // 404 response
  res.status(404).json({
    message: "Sorry, The Requested Resource Was Not Found",
  });
};

// export 404 not found handler

export default notFound;
