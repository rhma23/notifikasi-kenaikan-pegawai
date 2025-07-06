import educationService from "../service/education-service.js";

const create = async (req, res, next) => {
  try {
    const result = await educationService.create(req.body);
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
    const educationId = req.params.educationId;
    const result = await educationService.getById(educationId);
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
    const educationId = req.params.educationId;
    const request = req.body;
    request.educationId = educationId;

    const result = await educationService.update(request);
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
    const educationId = req.params.educationId;
    await educationService.remove(educationId);
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
      educationName: req.query.educationName,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await educationService.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    console.error("Education search error:", e);
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
