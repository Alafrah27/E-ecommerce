import Size from "../model/Size.model.js";

export const createSize = async (req, res) => {
  const { sizes } = req.body;
  try {
    const size = new Size({
      sizes,
    });
    const result = await size.save();

    res.status(201).json({ message: "Size created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSize = async (req, res) => {
  try {
    const size = await Size.find();
    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSize = async (req, res) => {
  const { id } = req.params;
  try {
    const size = await Size.findByIdAndDelete(id);
    res.status(200).json({ message: "Size deleted successfully", size });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSize = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Size.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: "Size updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
