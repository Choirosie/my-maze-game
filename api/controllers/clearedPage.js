import ClearedPage from '../models/ClearedPage.js';



export const saveClearedPage = async (req, res) => {
  try {
    const { pageId } = req.body; 
    const userId = req.user.id; // 인증된 사용자 ID
    const existingClearedPage = await ClearedPage.findOne({ userId, pageId });

    if (existingClearedPage) {
      return res.status(200).json(existingClearedPage); // 이미 클리어한 페이지가 있는 경우
    }

    const clearedPage = new ClearedPage({ userId, pageId });
    await clearedPage.save();

    res.status(201).json(clearedPage);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
};

export const getClearedPages = async (req, res) => {
  try {
    console.log("777")
    const userId = req.user.id; // 인증된 사용자 ID
    console.log(req.user.id)

    const clearedPages = await ClearedPage.find({ userId });
    res.status(200).json(clearedPages);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
};
