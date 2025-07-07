import { level } from "winston";
import baseSalaryService from "../service/baseSalary-service.js";

const create = async (req, res, next) => {
  try {
    const result = await baseSalaryService.create(req.body);
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
    const baseSalaryId = req.params.baseSalaryId;
    const result = await baseSalaryService.getById(baseSalaryId);
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
    const baseSalaryId = req.params.baseSalaryId;
    const request = req.body;
    request.baseSalaryId = baseSalaryId;

    const result = await baseSalaryService.update(request);
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
    const baseSalaryId = req.params.baseSalaryId;
    await baseSalaryService.remove(baseSalaryId);
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
      type: req.query.type,
      yearsOfService: req.query.yearsOfService,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await baseSalaryService.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    console.error("Base Salary search error:", e);
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
