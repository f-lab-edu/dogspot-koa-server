import { Request, Response } from 'express';

/* 
* 기본 컨트롤러 구상
*
*/
exports.push = async (req: Request, res: Response) => {
  const { userId, message } = req.body;
  return res.status(200).json({ message: '푸시 알림이 성공적으로 전송되었습니다.' });
}
