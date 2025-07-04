import * as NewsModel from "../models/newsModel.js";

export async function handleGetAllNews(req, res) {
  try {
    const news = await NewsModel.getAllNews();
    res.status(200).json({
      success: true,
      message: "News fetched successfully.",
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleAddNews(req, res) {
  try {
    const newsData = req.body;
    const file = req.file;

    const newNews = await NewsModel.addNews(newsData, file);

    res.status(201).json({
      success: true,
      message: "News added successfully.",
      data: newNews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}