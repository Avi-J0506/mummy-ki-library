import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


//Adding a new book
router.post('/', async(req,res)=>{
    try{
        if(
            !req.body.title || !req.body.author || !req.body.pages
        ){
            return res.status(404).send({
                message : 'Teeno field bharo mummy: Bookname, Author aur Total Pages',
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages
        };
        const book = await Book.create(newBook);
        res.status(200).send(book);
    } catch(error) {
        console.log(error);
        res.status(500).send({message: error.message})
    }
})

//Route to get all books from database
router.get('/', async(req,res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//Route to get one book from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

//Updating the book
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body.title || !req.body.author || !req.body.pages) {
            return res.status(400).json({
                message: "Send all required fields"
            });
        }

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Book not found" });
    }
});

//Deleting a book
router.delete('/:id', async(req,res) =>{
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).send({message: 'Book successfully deleted'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
})

export default router;