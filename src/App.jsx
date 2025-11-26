import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

function App() {
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState('WPA')
  const [showQR, setShowQR] = useState(false)

  // WiFi QR 코드 형식: WIFI:T:<암호화>;S:<SSID>;P:<비밀번호>;;
  const generateWifiString = () => {
    const escapedSsid = ssid.replace(/[\\;,:]/g, (char) => `\\${char}`)
    const escapedPassword = password.replace(/[\\;,:]/g, (char) => `\\${char}`)
    return `WIFI:T:${encryption};S:${escapedSsid};P:${escapedPassword};;`
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    if (ssid.trim()) {
      setShowQR(true)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container">
      <h1>WiFi QR 코드 생성기</h1>
      <p className="subtitle">카메라로 찍기만 하면 자동으로 WiFi에 연결됩니다</p>

      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label htmlFor="ssid">WiFi 이름 (SSID)</label>
          <input
            type="text"
            id="ssid"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="WiFi 이름을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="WiFi 비밀번호를 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="encryption">암호화 방식</label>
          <select
            id="encryption"
            value={encryption}
            onChange={(e) => setEncryption(e.target.value)}
          >
            <option value="WPA">WPA/WPA2/WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">암호 없음</option>
          </select>
        </div>

        <button type="submit" className="generate-btn">
          QR 코드 생성
        </button>
      </form>

      {showQR && (
        <div className="qr-section">
          <div className="qr-container" id="qr-printable">
            <div className="qr-wrapper">
              <QRCodeSVG
                value={generateWifiString()}
                size={200}
                level="M"
                includeMargin={true}
              />
            </div>
            <div className="wifi-info">
              <p><strong>WiFi:</strong> {ssid}</p>
              {encryption !== 'nopass' && <p><strong>비밀번호:</strong> {password}</p>}
            </div>
          </div>

          <div className="nudge-box">
            <span className="printer-icon">🖨️</span>
            <p>인쇄해서 벽에 붙여두세요!</p>
            <p className="nudge-sub">손님들이 QR코드만 스캔하면 바로 WiFi에 연결할 수 있어요</p>
          </div>

          <button onClick={handlePrint} className="print-btn">
            🖨️ 인쇄하기
          </button>
        </div>
      )}
    </div>
  )
}

export default App
