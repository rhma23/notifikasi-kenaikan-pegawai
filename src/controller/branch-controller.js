import branchService from "../service/branch-service.js";

const create = async (req, res, next) => {
  try {
    const result = await branchService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await branchService.get();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const branchId = req.params.branchId;
    const result = await branchService.getById(branchId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export default {
  create,
  get,
  getById,
};
