const express = require('express');
const axios = require('axios');
const parseString = require('xml2js').parseString;

const app = express();
const PORT = process.env.PORT || 3000;

const API_ENDPOINT = 'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire';

app.get('/pharmacies', async (req, res) => {
  try {
    const response = await axios.get(API_ENDPOINT, {
      params: {
        Q0: '서울특별시',
        Q1: '종로구',
        ORD: 'ADDR',
        pageNo: 1,
        numOfRows: 1,
        ServiceKey: 'Bd0%2B6yx2xjRuyFIowD%2FrXjEHqSvswGMUS0faaVwEG0WsYF97%2Bto1oL8ghG%2BzcIe7YXLaUK4aX%2B8Pxhci0oMTXQ%3D%3D' // 여기에 사용자의 API 키를 입력하세요.
      }
    });
    const xmlData = response.data;

    // XML 파싱
    const jsonData = await parseXmlData(xmlData);

    // 필요한 정보 추출
    const pharmacies = jsonData.response.body[0].items[0].item.map(item => ({
      name: item.dutyName[0],
      address: item.dutyAddr[0],
      phoneNumber: item.dutyTel1[0],
      latitude: parseFloat(item.latitude[0]),
      longitude: parseFloat(item.longitude[0])
      // 필요한 정보를 추가로 추출하세요.
    }));
//이부분 싹다수정할 예정 하는방법 살짝꺠달음 
    res.json(pharmacies);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// XML 파싱을 비동기적으로 처리하는 함수
function parseXmlData(xmlData) {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

