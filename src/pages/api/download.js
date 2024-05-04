import fs from 'fs'
import path from 'path';

const handler = (req, res) => {    
    const filePath = path.resolve('./public/assets/CampaignTemplate.csv'); 
    const fileStream = fs.createReadStream(filePath);
  
    res.setHeader('Content-Type', 'application/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=CampaignTemplate.csv'); 
  
    fileStream.pipe(res);
  }

export default handler