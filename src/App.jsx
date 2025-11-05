import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

// Daftar jenis kertas
const PAPERS = [
  { id: 'folio', label: 'Folio (300×441)', src: '/img/folio.jpg', ratio: 300 / 441 },
  { id: 'folio2', label: 'Folio 2 (960×1280)', src: '/img/folio2.jpg', ratio: 960 / 1280 }
]

// Daftar font
const FONTS = [
  { id: 'patrick', label: 'Patrick Hand', css: "'Patrick Hand', cursive" },
  { id: 'shadows', label: 'Shadows Into Light', css: "'Shadows Into Light', cursive" },
  { id: 'gloria', label: 'Gloria Hallelujah', css: "'Gloria Hallelujah', cursive" },
  { id: 'indie', label: 'Indie Flower', css: "'Indie Flower', cursive" },
  { id: 'reenie', label: 'Reenie Beanie', css: "'Reenie Beanie', cursive" },
  { id: 'caveat', label: 'Caveat', css: "'Caveat', cursive" },
  { id: 'handlee', label: 'Handlee', css: "'Handlee', cursive" },
  { id: 'handwritingcr2', label: 'HandwritingCR 2', css: "'HandwritingCR 2', cursive" },
  { id: 'heartwarming', label: 'Heart Warming by Situjuh', css: "'Heart Warming by Situjuh', cursive" },
  { id: 'noonaland', label: 'Noona Land', css: "'Noona Land', cursive" }
]

export default function App() {
  const [paperId, setPaperId] = useState('folio')
  const [font, setFont] = useState('patrick')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [kelas, setKelas] = useState('')
  const [fakultas, setFakultas] = useState('')
  const [text, setText] = useState('')
  const previewRef = useRef(null)

  const selectedPaper = PAPERS.find(p => p.id === paperId)
  const selectedFont = FONTS.find(f => f.id === font)?.css || FONTS[0].css

  const handleDownload = async () => {
    if (!previewRef.current) return
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true })
    const link = document.createElement('a')
    link.download = 'nulis-result.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const handleClear = () => {
    setDate('')
    setName('')
    setKelas('')
    setFakultas('')
    setText('')
  }

  return (
    <div className="app-root">
      <h1>Males Nulis - By Dav</h1>
      <div className="container">
        <div className="controls">
          
          {/* Pilihan jenis kertas */}
          <label>Pilih Jenis Kertas:
            <select value={paperId} onChange={e => setPaperId(e.target.value)}>
              {PAPERS.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </label>

          {/* Pilihan font */}
          <label>Pilih Font:
            <select value={font} onChange={e => setFont(e.target.value)}>
              {FONTS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
          </label>

          <label>Hari / Tanggal:
            <input value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. Senin, 1 Jan 2025" />
          </label>

          <label>Nama:
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nama lengkap" />
          </label>

          <label>Kelas / NIM:
            <input value={kelas} onChange={e => setKelas(e.target.value)} placeholder="Kelas atau NIM" />
          </label>

          <label>Fakultas:
            <input value={fakultas} onChange={e => setFakultas(e.target.value)} placeholder="Fakultas" />
          </label>

          <label>Teks:
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Tulis di sini..." rows={10} />
          </label>

          <div className="buttons">
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleClear} className="muted">Hapus Semua</button>
          </div>
        </div>

        {/* Area Preview */}
        <div className="preview-area">
          <div className="preview-wrap">
            <div
              ref={previewRef}
              className="paper"
              style={{
                width: '720px',
                aspectRatio: `${selectedPaper.ratio}`,
                fontFamily: selectedFont,
                backgroundImage: `url(${selectedPaper.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="meta-row">
                <div className="date">{date}</div>
                <div className="meta-right">
                  <div className="name">{name}</div>
                  <div className="kelas">{kelas}</div>
                </div>
              </div>

              <div className="fakultas">{fakultas}</div>

              <div className="written">
                {text.split('\n').map((line, i) => (
                  <p key={i} className="line">{line || '\u00A0'}</p>
                ))}
              </div>
            </div>
          </div>
          <p className="hint">©️Dav</p>
        </div>
      </div>
    </div>
  )
}
