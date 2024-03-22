import { useState } from 'react'

function App() {
  const [items, setItems] = useState([{ key: '', value: '' }])

  const pasteHandle = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    const lines = text.split("\n")
    const newItems = lines.map((items) => {
      const [key, value] = items.split('=')
      return { key, value }
    })
    setItems(newItems.filter(item => (item.key !== '' && item.value !== '') && item.key !== '\r'))
  }

  const copyHandle = () => {
    let copied = ""
    //items.map((item) => item.key ? copied += item.key + '=' + item.value + '\n' : null)
    items.map((item, index) => item.key ? copied += item.key + '=' + item.value + (index !== items.length - 1 ? '\n' : '') : null)
    navigator.clipboard.writeText(copied)
  }
  return (
    <>
      <div className="flex flex-col gap-4 w-full items-start bg-black/80 min-h-screen p-4">
        {items.map((item, index) =>
          <div key={index} className="flex items-center w-full gap-4">
            <input onChange={e =>
              setItems(items => items.map((item, i) => {
                if (i === index) {
                  item.key = e.target.value
                }
                return item
              }))
            } onPaste={(e) => pasteHandle(e)} value={item.key} className='flex-1 h-8 bg-black/80 outline-none text-white px-2 rounded' type="text" placeholder='ex: APP_URL' />
            <input onChange={e =>
              setItems(items => items.map((item, i) => {
                if (i === index) {
                  item.value = e.target.value
                }
                return item
              }))
            } value={item.value} className='flex-1 h-8 bg-black/80 outline-none text-white px-2 rounded' type="text" />
            <button onClick={() => items.length > 1 ? setItems(items => items.filter((_, i) => i !== index)) : null} className='text-white bg-red-700 h-8 w-8 rounded'>X</button>
          </div>
        )
        }
        <div className="flex gap-4">
          <button onClick={() => setItems(items => [...items, { key: '', value: '' }])} className='text-white border-white border px-4 py-2 rounded'>Add Key</button>
          <button onClick={copyHandle} className='text-white bg-blue-600 px-4 py-2 rounded'>Copy to Clipboard</button>
          <button onClick={() => setItems([{ key: '', value: '' }])} className='text-white bg-red-700 px-4 py-2 rounded'>Clear</button>
        </div>
      </div>
    </>
  )
}

export default App
