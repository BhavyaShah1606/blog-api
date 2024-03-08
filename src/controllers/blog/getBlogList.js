import utils from '../../helpers/utils.js';
import blogRepository from "../../repositories/blogRepository.js";

export default async function getBlogList(req, res, next) {
  try {
    const blogs = await blogRepository.getBlogList();
    return utils.returnHttpSuccess(res, blogs);

  } catch (err) {
    console.error(err);
    return next(err);
  }
}
