import positionService from "../service/position-service.js";

const create = async (req, res, next) => {
  try {
    const result = await positionService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// const get = async (req, res, next) => {
//   try {
//     const result = await divisionService.get();
//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// };

const getById = async (req, res, next) => {
  try {
    const positionId = req.params.positionId;
    const result = await positionService.getById(positionId);
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
    const positionId = req.params.positionId;
    const request = req.body;
    request.positionId = positionId;

    const result = await positionService.update(request);
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
    const positionId = req.params.positionId;
    await positionService.remove(positionId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const request = {
      positionName: req.query.positionName,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await positionService.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    console.error("Position search error:", e);
    next(e);
  }
};

export default {
  create,
  // get,
  getById,
  remove,
  update,
  search,
};
