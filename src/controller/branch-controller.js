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

// const get = async (req, res, next) => {
//   try {
//     const result = await branchService.get();
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

const update = async (req, res, next) => {
  try {
    const branchId = req.params.branchId;
    const request = req.body;
    request.branchId = branchId;

    const result = await branchService.update(request);
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
    const branchId = req.params.branchId;
    await branchService.remove(branchId);
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
      branchName: req.query.branchName,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await branchService.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    console.error("Branch search error:", e);
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
