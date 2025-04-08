import SupplierModel from "../models/SupplierModel";

const addNew = async (req: any, res: any) => {
  const body = req.body;
  try {
    //console.log(req.body);
    const newSupplier: any = new SupplierModel(body);
    await newSupplier.save();
    res.status(200).json({
      message: "Add supplier",
      data: newSupplier,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export { addNew };
