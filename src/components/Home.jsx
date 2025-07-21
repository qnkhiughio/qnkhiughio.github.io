import React, {useEffect, useState} from "react"
import "../styles/Home.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import axios from 'axios';
import * as XLSX from "xlsx";

export default function Home() {
  const [splitData, setSplitData] = useState([]);
  const [isPortrait, setIsPortrait] = useState(false);

  const screenWidth = window.innerWidth

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const handleOrientationChange = (e) => {
      setIsPortrait(e.matches);
    };

    setIsPortrait(mediaQuery.matches); // Set initial state
    mediaQuery.addEventListener('change', handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, []);
 

  const chunkArray = (arr, chunkSize) => {
    const result = [[],[],[],[]];
    for (let i = 0; i < arr.length; i += 1) {
      console.log(i)
      console.log(i%4)
      if (i%4===0) {
        result[0].push(arr[i]);
      }
      else if (i%4===1) {
        result[1].push(arr[i]);
      }
      else if (i%4===2) {
        result[2].push(arr[i]);
      }
      if (i%4===3) {
        result[3].push(arr[i]);
      }
    }
    console.log(result);
    return result;
  }


  useEffect(() => {
    const fetchExcelFromRepo = async () => {
      try {
        const url = '/data/OSCAR APPRECIATION (Responses).xlsx';
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: 'array' });
        console.log("workbook:", workbook);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const chunkedData = chunkArray(jsonData, 4);
        console.log("chunkedData:", chunkedData);
        setSplitData(chunkedData);
      } catch (error) {
        console.error('Error fetching Excel file:', error);
      }
    };
    fetchExcelFromRepo(); 
  }, []);

  return (
    <div style={{padding: "5%"}}>
      <div className="home-grid">
        <div className="row">
          <div
            className="photo"
            style={{ backgroundImage: "url(/img/IMG_6453.JPG)" }}
          />
          <div className="text" style={{ paddingLeft: "5%"}}>
            <div className="header" style={{ fontSize: screenWidth>1000 ? "5rem" : "3rem" }}>Oscar Piastri</div>
            <div className="body-text" style={{ fontSize: screenWidth>1000 ? "2.2rem" : "1.4rem", marginBottom: "2.5%" }}>
              A talented and fierce driver in Formula One, fighting for his first World's Driver Championship.
            </div>
          </div>
        </div>
        <div className="row reverse">
          <div className="text bottom-right">
            <div className="text-grid">
              <div className="text-row">
                <span className="label" style={{ fontSize: screenWidth > 1000 ? "5rem" : "3rem" }}>7</span>
                <span className="value" style={{ fontSize: screenWidth > 1000 ? "2.2rem" : "1.4rem" }}>WINS</span>
              </div>
              <div className="text-row">
                <span className="label" style={{ fontSize: screenWidth > 1000 ? "5rem" : "3rem" }}>20</span>
                <span className="value" style={{ fontSize: screenWidth > 1000 ? "2.2rem" : "1.4rem" }}>PODIUMS</span>
              </div>
              <div className="text-row">
                <span className="label" style={{ fontSize: screenWidth > 1000 ? "5rem" : "3rem" }}>4</span>
                <span className="value" style={{ fontSize: screenWidth > 1000 ? "2.2rem" : "1.4rem" }}>POLES</span>
              </div>
            </div>
          </div>
          <div
            className="photo"
            style={{ backgroundImage: "url(/img/KasuHY96.jpg)" }}
          />
        </div>
      </div>
      <div style={{ paddingTop: "3.5%"}}>
        <hr></hr>
      </div>
      <div className="header" style={{ fontSize: screenWidth > 1000 ? "5rem" : "3rem", color: "#69443c", marginTop: "2%" }}>
        Born to be champion.
      </div>
      <div className="body-text" style={{ fontSize: screenWidth > 1000 ? "2.2rem" : "1.4rem", marginTop:"0", marginBottom: "2%", color: "#69443c" }}>
        With love, all of your fans.
      </div>
      <div className="bootstrap-classes row-container">
        {splitData.map((chunk, index) => (
          <div key={index} className="column">
            {console.log("chunk:", chunk)}
            {chunk.map((item, itemIndex) => (
              <Card
                key={itemIndex}
                style={{ width: "90%" }}
              >
                <Card.Body>
                  <Card.Text style={{ whiteSpace: 'pre-line', fontSize: 'medium' }}>
                    {item.Message}
                  </Card.Text>
                  {item.TwitterUsername && (
                    <Card.Title style={{fontSize: "medium"}}>{item.TwitterUsername}</Card.Title>
                  )}
                  
                </Card.Body>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
