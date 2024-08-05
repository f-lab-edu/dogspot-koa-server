import { exec } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import { promisify } from 'util';
import sharp from 'sharp';

export class FileConvertService {
    private readonly baseUploadPath: string =
    process.env.BASE_FILE_DIR || '/default/path';

    async videoConvert(fileUrl: string, 
        filePath: string,
        subDir: string
    ): Promise<{ outputPath: string, coverPhotoPath: string }> {
        try {
            const orifinalVideo = path.join(this.baseUploadPath, fileUrl);
            const videoFolder = path.join(this.baseUploadPath, subDir);

            const outputPath = path.join(videoFolder, `${filePath}.mp4`);
            const coverPhotoPath = path.join(videoFolder, `${filePath}.jpg`);
      
           //  /영상 저장할 폴더가 없으면 생성
            if (subDir && !fs.existsSync(videoFolder)) {
                fs.mkdirSync(videoFolder, { recursive: true });
            }
            
            // .m4 파일 변환
            const executeFfmpeg = promisify(exec);
            if (path.extname(orifinalVideo).toLowerCase() === '.mov') {
                await executeFfmpeg(
                    `ffmpeg -i ${orifinalVideo} -c:v h264 -b:v 2M -vf "scale=1280:-2" -hls_time 10 -hls_list_size 0 ${outputPath}`
                );
            }
           
            // 5. 동영상 첫 번째 프레임 캡처하여 커버 사진 만들기
            await executeFfmpeg(
              `ffmpeg -i ${orifinalVideo} -ss 00:00:00.001 -vframes 1 ${coverPhotoPath}`
            );
            return { outputPath, coverPhotoPath };
          } catch (err) {
            console.error('Error during video upload:', err);
            throw err;
          }
    }

    async imageConvert(
        filePath: string, 
        fileName: string, 
        subDir: string
    ): Promise<{ outputPath: string, coverPhotoPath: string }> {
        const imageFolder = path.join(this.baseUploadPath, subDir);
        const orifinalImg = path.join(this.baseUploadPath, filePath);
        
        // 경로 설정
        const thumnailPath = path.join(subDir, `thumb_${fileName}.jpg`);
        const thumnailFilePath = path.join(imageFolder, `thumb_${fileName}.jpg`);
        
        // 폴더가 없으면 생성
        if (!fs.existsSync(imageFolder)) {
            fs.mkdirSync(imageFolder, { recursive: true });
        }

        // URL에서 이미지를 가져와서 변환
        const imageBuffer = fs.readFileSync(orifinalImg);

        // 이미지를 240px로 리사이즈
        await sharp(imageBuffer)
            .resize(240)
            .toFile(thumnailFilePath);

        return {outputPath: filePath, coverPhotoPath: thumnailPath};
    }
}