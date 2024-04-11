import './App.css'
import books from '../src/assets/books.json'
import { useState } from 'react';
import { useEffect } from 'react';
import Card from './components/Card';
function App() {
  const [available, setAvailable] = useState(books.library)
  const [selected, setSelected] = useState(localStorage.getItem('selected') == undefined ? [] : JSON.parse(localStorage.selected))
  const [category, setCategory] = useState('All')
  const [maxPages, setMaxPages] = useState('5000')
  const [search, setSearch] = useState('')
  useEffect(() => {
    showBooks()
    localStorage.setItem('selected', JSON.stringify(selected))

  }, [category, selected, maxPages])
  function showBooks() {
    if (category != 'All') {
      setAvailable(books.library.filter(bk => (bk.book.genre == category) && ((selected.find(element => element.book.title == bk.book.title)) == undefined) && bk.book.pages <= maxPages))
    }
    else {
      setAvailable(books.library.filter(bk => ((selected.find(element => element.book.title == bk.book.title)) == undefined) && bk.book.pages <= maxPages))
    }
  }
  function handleAdd(book) {
    setSelected([...selected, book])
    setAvailable(available.filter(bk => bk.book.title != book.book.title))
    handleResetSearch()
  }
  function handleChange(e) {
    setCategory(e.target.value)
  }
  function handleDelete(book) {
    setAvailable([...available, book])
    setSelected(selected.filter(bk => bk.book.title != book.book.title))
    showBooks()
  }
  function handleFilter(e) {
    setMaxPages(e.target.value)
  }
  function handleSearch(e) {
    setSearch(e.target.value)
  }
  function handleResetSearch(e) {
    setSearch('')
  }
  return (
    <>
      <section className='lg:px-12 px-4 py-6 lg:flex lg:justify-around w-screen flex flex-wrap'>
        <div className='flex gap-5 w-full'>
          <div className='w-3/4 bg-lime-200 flex rounded-xl flex-col'>
            <div className='flex flex-col p-2 lg:gap-24 items-center'>
              <div className='flex flex-col lg:flex-row items-center justify-around lg:gap-10'>
                <div>
                  <h2 className='text-2xl'> {available.length} Available Books</h2>
                  <h2 className='text-2xl'>{selected.length} On Reading List</h2>
                </div>
                <label>
                  Max pages:
                  50
                  <input onChange={handleFilter} value={maxPages} min="50" max="1500" type='range' />
                  1500
                </label>
                <p>{maxPages} Pages.</p>
                <div className='flex relative gap-10 flex-col'>
                  <label>Search
                    <input value={search} onChange={handleSearch} />
                  </label>
                  <div className=''>
                    <div className=' absolute z-10 '>
                      {search && available.map(bks => {
                        if (bks.book.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                          return (
                            <div className='relative' key={bks.book.title}>
                              <div onClick={() => handleAdd(bks)} >
                                <Card book={bks} />
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                </div>
                <select onChange={handleChange}>
                  <option>All</option>
                  <option>Fantasía</option>
                  <option>Ciencia ficción</option>
                  <option>Zombies</option>
                  <option>Terror</option>

                </select>
              </div>
            </div>
            <div className='flex p-2 flex-wrap lg:gap-10'>
              {available.map(book => {
                return (
                  <div className='relative' key={book.book.title}>
                    <div onClick={() => handleAdd(book)} >
                      <Card book={book} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {selected.length != 0 && <div className='w-1/4 bg-sky-300 rounded-xl p-2'>
            <h2 className='text-2xl'>Reading List</h2>
            <div className='flex flex-wrap lg:gap-10' >
              {selected.map(book => {
                return (
                  <div key={book.book.title} className='relative w-24'>
                    {/* <img className='w-24' src={book.book.cover} /> */}
                    <Card book={book} />
                    <button className='absolute z-5 right-0 top-0 bg-white p-1 items-center justify-center rounded-full' onClick={() => handleDelete(book)}>X</button>
                  </div>
                )
              })}
            </div>
          </div>}
        </div>
      </section>
    </>
  )
}

export default App
