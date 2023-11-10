export const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

export const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

export const FarmerBoard = (req, res) => {
  res.status(200).send("Farmer Content.");
};
