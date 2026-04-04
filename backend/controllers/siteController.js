import SiteScore from "../models/SiteScoreSchema.js";

export const getSiteScore = async (req, res) => {
  try {
    let siteScore = await SiteScore.findOne();
    if (!siteScore) {
      siteScore = await SiteScore.create({ score: 0 });
    }
    return res.status(200).json({
      score: siteScore.score,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

export const incrementSiteScore = async (req, res) => {
  try {
    let siteScore = await SiteScore.findOne();
    if (!siteScore) {
      siteScore = await SiteScore.create({ score: 0 });
    }
    
    // Increment score
    siteScore.score += 1;
    await siteScore.save();

    return res.status(200).json({
      score: siteScore.score,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};
