import Color from "../model/Color.model.js";

export const createColor = async (req, res) => {
  const { colors } = req.body;
  try {
    const color = new Color({
      colors,
    });
    const result = await color.save();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getColor = async (req, res) => {
  try {
    const color = await Color.find();
    res.status(200).json(color);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteColor = async (req, res) => {
  const { id } = req.params;
  try {
    const color = await Color.findByIdAndDelete(id);
    res.status(200).json({ message: "Size deleted successfully", color });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateColor = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Color.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: "Size updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
