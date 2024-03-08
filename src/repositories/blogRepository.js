import enums from "../helpers/enums.js";
import BlogModel from "../models/blog/blogModel.js";

export default class BlogRepository {

  static getBlogList =async () => {
    const blogs = await BlogModel.findAll({
//      where: { statusId: enums.blogStatus.Published },
      order: [['createdAt', 'DESC']],
      raw: true
    });
    return blogs;
  }
}