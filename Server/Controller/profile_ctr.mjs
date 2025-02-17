const profile_ctr = (req, res) => {
  res.send(req.authData);
};

export default profile_ctr;
