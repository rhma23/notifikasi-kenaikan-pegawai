import unitService from "../service/unit-service.js";

const create = async (req, res, next) => {
  try {
    const result = await unitService.create(req.body);
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
    const result = await unitService.get();
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
    const unitId = req.params.unitId;
    const result = await unitService.getById(unitId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const unitId = req.params.unitId;
    const request = req.body;
    request.unitId = unitId;

    const result = await unitService.update(request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const unitId = req.params.unitId;
    await unitService.remove(unitId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  getById,
  remove,
  update,
};
