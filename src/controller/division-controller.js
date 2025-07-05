import divisionService from "../service/division-service.js";

const create = async (req, res, next) => {
  try {
    const result = await divisionService.create(req.body);
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
    const result = await divisionService.get();
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
    const divisionId = req.params.divisionId;
    const result = await divisionService.getById(divisionId);
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
    const divisionId = req.params.divisionId;
    const request = req.body;
    request.divisionId = divisionId;

    const result = await divisionService.update(request);
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
    const divisionId = req.params.divisionId;
    await divisionService.remove(divisionId);
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
