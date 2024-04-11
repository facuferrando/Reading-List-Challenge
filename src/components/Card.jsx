import { useState } from "react";
export default function Card({ book }) {
    const [show, setShow] = useState(false);


    return (
        <>
            <img onMouseOut={() => setShow(false)} onMouseOver={() => setShow(true)} className='w-24 hover:cursor-pointer ' src={book.book.cover} />
            {show &&
                <div className='absolute p-2 rounded-md bg-white top-0 left-28 w-32 z-10'>
                    <p className="text-xl font-bold">{book.book.title}</p>
                    <p>Year: {book.book.year}.</p>
                    <p>{book.book.synopsis}</p>
                    <p>Author: {book.book.author.name}</p>
                    <p>Pages: {book.book.pages}</p>
                </div>}
        </>)
}