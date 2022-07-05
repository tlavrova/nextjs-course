import {NextApiRequest, NextApiResponse} from "next";
import {MongoClient} from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const eventId = req.query.eventId

    const client = await MongoClient.connect('mongodb+srv://tatiana:STe6IzNBZlFKw4jo@cluster0.fmv6a.mongodb.net/events?retryWrites=true&w=majority')

    if (req.method === 'POST') {
        const {email, name, text, id} = req.body

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({message: 'Invalid input.'})
            return
        }

        const newComment = {
            email,
            name,
            text,
            eventId,
            id
        }

        const db = client.db()
        const result = await db.collection('comments').insertOne(newComment)

        console.log(result)

        newComment.id = result.insertedId
        res.status(201).json({message: 'Added comment.', comment: newComment})
    }

    if (req.method === 'GET') {
        const db = client.db()
        const documents = await db.collection('comments').find().sort({_id: -1}).toArray()

        res.status(200).json({comments: documents})
    }

    client.close()
}

export default handler
