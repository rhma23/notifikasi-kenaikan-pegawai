import { level } from "winston";
import gradeService from "../service/grade-service.js";

const create = async (req, res, next) => {
  try {
    const result = await gradeService.create(req.body);
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
//     const result = await educationService.get();
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
    const gradeId = req.params.gradeId;
    const result = await gradeService.getById(gradeId);
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
    const gradeId = req.params.gradeId;
    const result = await gradeService.update(gradeId, req.body);
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
    const gradeId = req.params.gradeId;
    await gradeService.remove(gradeId);
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
      gradeName: req.query.gradeName,
      type: req.query.type,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await gradeService.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    console.error("Grade search error:", e);
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
